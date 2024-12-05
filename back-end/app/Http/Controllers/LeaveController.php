<?php

namespace App\Http\Controllers;

use App\Models\Contracts;
use Illuminate\Http\Request;
use App\Models\Leave;
use App\Models\UserContract;
use Illuminate\Support\Facades\Auth;

class LeaveController extends Controller
{


    /**
     * @OA\Post(
     *     path="api/leave",
     *     tags={"Leave Management"},
     *     summary="Store Leave Request",
     *     description="Submit a leave request for approval by an admin.",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="start_date",
     *                 type="string",
     *                 format="date",
     *                 example="25-12-2024",
     *                 description="Start date of the leave in DD-MM-YYYY format."
     *             ),
     *             @OA\Property(
     *                 property="end_date",
     *                 type="string",
     *                 format="date",
     *                 example="31-12-2024",
     *                 description="End date of the leave in DD-MM-YYYY format. Must be the same or after the start_date."
     *             ),
     *             @OA\Property(
     *                 property="reason",
     *                 type="string",
     *                 example="Vacation with family",
     *                 description="Reason for the leave request."
     *             ),
     *             @OA\Property(
     *                 property="category",
     *                 type="integer",
     *                 example=1,
     *                 description="Category ID of the leave request."
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Leave request created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Leave request made"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Bad Request",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="The <field-name> field is required"
     *             ),
     *             @OA\Property(
     *                 property="errors",
     *                 type="string[]",
     *                 example="The <field-name> field must be an email"
     *              )
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
    public function storeLeaveRequest(Request $request)
    {

        //validate user input
        $request->validate([
            'start_date' => 'required|date_format:d-m-Y',
            'end_date' => 'required|date_format:d-m-Y|after_or_equal:start_date',
            'reason' => 'required|string|max:255',
            'category' => 'required|int'
        ]);

        //further date validation
        $leaveStartDate = \Carbon\Carbon::createFromFormat('d-m-Y', $request->start_date)->format('Y-m-d');
        $leaveEndDate = \Carbon\Carbon::createFromFormat('d-m-Y', $request->end_date)->format('Y-m-d');

        //get user session
        $user = Auth::user();

        //make leave reqeust
        $leaveRequest = Leave::create([
            'LeaveStartDate' => $leaveStartDate,
            'LeaveEndDate' => $leaveEndDate,
            'LeaveReason' => $request->reason,
            'Status' => 'pending',
            'LeaveCategory' => $request->category,
            'UserID' =>  $user->UserID
        ]);

        return response()->json(['message' => 'Leave request made'], 200);
    }


    /**
     * @OA\Get(
     *     path="/api/leave-hours",
     *     tags={"Leave Management"},
     *     summary="Get total leave hours",
     *     description="Retrieve the total leave hours for the authenticated user.",
     *     @OA\Response(
     *         response=200,
     *         description="The total leave hours for the user",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="integer",
     *                 example=120
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error"
     *     ),
     * )
     */
    public function getLeaveHours()
    {
        $user = Auth::user();

        $contract = Contracts::join('user_contract', 'contracts.ContractID', '=', 'user_contract.ContractID')
            ->where('user_contract.UserID', $user->UserID)
            ->select('contracts.*')
            ->first();


        return response()->json(['hours' => $contract->ContractTotalLeaveHours], 200);
    }

    public function getLeaveStatus()
    {

        $user = Auth::user();

        $leave = Leave::where('UserID', $user->UserID)->get();

        return response()->json(['leave requests' => $leave]);
    }
}
