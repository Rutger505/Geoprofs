<?php

namespace App\Http\Controllers;

use App\Models\Contracts;
use App\Models\UserContract;
use Illuminate\Http\Request;

class ContractController extends Controller
{

    /**
     * @OA\Post(
     *     path="api/contract/store",
     *     tags={"Contracts"},
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
    /**
     * @OA\Get(
     *     path="/api/contract/show",
     *     tags={"Contracts"},
     *     summary="Get contracts information",
     *     description="Retrieve contracts that exist in the user_contract table and those that do not.",
     *     @OA\Response(
     *         response=200,
     *         description="Successfully retrieved contracts information",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="existsInUserContract",
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(property="ContractID", type="integer", example=1),
     *                     @OA\Property(property="ContractName", type="string", example="Contract A"),
     *                     @OA\Property(property="StartDate", type="string", format="date", example="2024-01-01"),
     *                     @OA\Property(property="EndDate", type="string", format="date", example="2024-12-31")
     *                 )
     *             ),
     *             @OA\Property(
     *                 property="notExistsInUserContract",
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(property="ContractID", type="integer", example=2),
     *                     @OA\Property(property="ContractName", type="string", example="Contract B"),
     *                     @OA\Property(property="StartDate", type="string", format="date", example="2024-02-01"),
     *                     @OA\Property(property="EndDate", type="string", format="date", example="2024-12-31")
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized"
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Forbidden - User is not an admin"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error"
     *     ),
     *     security={{"bearerAuth":{}}},
     * )
     */
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

    /**
     * @OA\Delete(
     *     path="/api/contract/delete/{id}",
     *     tags={"Contracts"},
     *     summary="Delete a contract",
     *     description="Delete a contract by its ID if it does not have an assigned user in the user_contract table.",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the contract to delete",
     *         @OA\Schema(
     *             type="integer",
     *             example=1
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Contract deleted",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Contract deleted")
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Forbidden - The contract has an assigned user",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The contract has a assigned user")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error - Missing or invalid input",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The id field is required.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized - Invalid or missing token"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error"
     *     ),
     *     security={{"bearerAuth":{}}},
     * )
     */
    public function delete($id)
    {

        if (!Contracts::where('ContractID', $id)->exists()) {
            return (response()->json(['message' => "The contract doesn't exist"], 403));
        }

        if (UserContract::where('ContractID', $id)->exists()) {
            return response()->json(['message' => 'The contract has a assigned user'], 403);
        }

        Contracts::destroy($id);

        return response()->json(['message' => 'Contract deleted'], 200);
    }

    /**
     * @OA\Put(
     *     path="/api/contract/update/{id}",
     *     tags={"Contracts"},
     *     summary="Update an existing contract",
     *     description="Updates the contract details for a specific contract ID. Requires admin privileges.",
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="The ID of the contract to update.",
     *         @OA\Schema(
     *             type="integer",
     *             example=1
     *         )
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="contract_name",
     *                 type="string",
     *                 example="Part-Time Employee",
     *                 description="The new name of the contract."
     *             ),
     *             @OA\Property(
     *                 property="contract_leave_hours",
     *                 type="integer",
     *                 example=80,
     *                 description="The updated total leave hours allowed for this contract."
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Contract updated successfully.",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Contract updated"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Forbidden: Contract does not exist or has assigned users.",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="The contract doesn't exist or the contract has an assigned user."
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error.",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="The given data was invalid."
     *             ),
     *             @OA\Property(
     *                 property="errors",
     *                 type="object",
     *                 example={
     *                     "contract_name": {"The contract name field is required."},
     *                     "contract_leave_hours": {"The contract leave hours field must be an integer."}
     *                 }
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized access.",
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
    public function update(Request $request, $id)
    {
        $request->validate([
            'contract_name' => 'required|string',
            'contract_leave_hours' => 'required|integer'
        ]);

        if (!Contracts::where('ContractID', $id)->exists()) {
            return (response()->json(['message' => "The contract doesn't exist"], 403));
        }

        if (UserContract::where('ContractID', $id)->exists()) {
            return response()->json(['message' => 'The contract has a assigned user'], 403);
        }


        $contract = Contracts::find($id);


        $contract->ContractName = $request['contract_name'];
        $contract->ContractTotalLeaveHours = $request['contract_leave_hours'];

        $contract->save();


        return response()->json(['message' => 'Contract updated'], 200);
    }
}
