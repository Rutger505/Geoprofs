<?php

namespace App\Http\Controllers;

use App\Models\Leave;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class LeaveController extends Controller
{
    public function storeLeaveRequest(Request $request)
    {

        //validate user input
        $request->validate([
            'userId' => 'required|int',
            'startDate' => 'required|date_format:d-m-Y',
            'endDate' => 'required|date_format:d-m-Y|after_or_equal:start_date',
            'reason' => 'required|string|max:255',
            'categoryId' => 'required|int'
        ]);

        //further date validation
        $leaveStartDate = Carbon::createFromFormat('d-m-Y', $request->startDate)->format('Y-m-d');
        $leaveEndDate = Carbon::createFromFormat('d-m-Y', $request->endDate)->format('Y-m-d');

        //make leave reqeust
        Leave::create([
            'startDate' => $leaveStartDate,
            'endDate' => $leaveEndDate,
            'reason' => $request->reason,
            'status' => 'pending',
            'categoryId' => $request->categoryId,
            'userId' => $request->userId
        ]);

        return response()->json(['message' => 'Leave request made']);
    }


    public function getLeaveHours(User $user)
    {


        $leave_requests = User::where('id', $user->id)
            ->whereHas('leave', function ($query) {
                $query->where('status', 'accepted');
            })
            ->with('leave')
            ->get();

        $leave_hours = 0;
        foreach ($leave_requests as $leave) {

            $start = Carbon::parse($leave->startDate);
            $end = Carbon::parse($leave->endDate);

            $leave_hours = $leave_hours + round($start->diffInDays($end));
        }

        $contact = User::where('id', $user->id)->with('contract')->get();

        $contact_hours = $contact->contract->totalLeaveHours - $leave_hours;

        return response()->json(['hours' => [$leave, $contact]]);
    }

    public function getLeaveRequests($userId)
    {

        if (!User::where('id', $userId)->exists()) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $leaveRequests = Leave::where('userId', $userId)->with("category")->get();

        return response()->json($leaveRequests);
    }

    public function updateLeaveStatus($leaveId, Request $request)
    {

        if (!Leave::where('id', $leaveId)->where('status', 'pending')->exists()) {
            return response()->json(['message' => 'Leave request not found or request has already been accepted or denied'], 404);

        }

        $request->validate([
            'status' => 'required|string|in:denied,accepted',
        ], [
            'status.in' => 'The status must be either denied or accepted.',
        ]);

        Leave::where('id', $leaveId)->update([
            'status' => $request['status'],
        ]);


        return response()->json(['message' => 'Leave status updated']);
    }

    public function deleteLeave($leaveId)
    {
        Leave::where('id', $leaveId)->delete($leaveId);

        return response()->json(['message' => 'Leave deleted']);


    }

}
