<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Leave;
use Illuminate\Support\Facades\Auth;

class VerlofController extends Controller
{


    /**
     * @OA\Post(
     *     path="api/leave/request",
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
     *                 property="reden",
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
     *         response=400,
     *         description="Bad Request",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="The given data was invalid."
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
            'LeaveReason' => $request->reden,
            'Status' => 'pending',
            'LeaveCategory' => $request->category,
            'UserID' =>  $user->UserID


        ]);

        return response()->json(['message' => 'Leave request made'], 200);
    }
}
