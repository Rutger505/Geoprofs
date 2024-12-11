<?php

namespace App\Http\Controllers;

use App\Models\Contracts;
use App\Models\UserContract;
use Illuminate\Http\Request;

class ContractController extends Controller
{
    //

    /**
     * @OA\Post(
     *     path="api/contract/store",
     *     tags={"Contract Management"},
     *     summary="Store a new contract",
     *     description="Creates a new contract with the provided name and total leave hours. Requires admin privileges.",
     *     security={{"bearerAuth": {}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="contract_name",
     *                 type="string",
     *                 example="Full-Time Employee",
     *                 description="Name of the contract."
     *             ),
     *             @OA\Property(
     *                 property="contract_leave_hours",
     *                 type="integer",
     *                 example=160,
     *                 description="Total leave hours allowed under this contract."
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Contract created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Contract created"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation Error",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="The given data was invalid."
     *             ),
     *             @OA\Property(
     *                 property="errors",
     *                 type="object",
     *                 example={"contract_name": {"The contract name field is required."}, "contract_leave_hours": {"The contract leave hours field must be an integer."}}
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Unauthenticated."
     *             )
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {
        $request->validate([
            'contract_name' => 'string',
            'contract_leave_hours' => 'int'
        ]);

        Contracts::create([
            'ContractName' => $request['contract_name'],
            'ContractTotalLeaveHours' => $request['contract_leave_hours']
        ]);

        return response()->json(['message' => 'Contract created'], 200);
    }

    public function show()
    {
        $existsInUserContract = Contracts::join('user_contract', 'contracts.ContractID', '=', 'user_contract.ContractID')
            ->select('contracts.*')
            ->get();

        $notExistsInUserContract = Contracts::whereNotIn('ContractID', function ($query) {
            $query->select('ContractID')->from('user_contract');
        })->get();

        return response()->json([
            'existsInUserContract' => $existsInUserContract,
            'notExistsInUserContract' => $notExistsInUserContract,
        ], 200);
    }

    public function delete(Request $request)
    {
        $request->validate(
            ['id' => 'int']
        );

        if (Contracts::join('user_contract', 'contracts.ContractID', '=', 'user_contract.ContractID')->select('contracts.*'))

            Contracts::destroy($request->id);
    }
}
