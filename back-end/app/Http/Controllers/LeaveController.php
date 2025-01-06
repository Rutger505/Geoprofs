<?php

namespace App\Http\Controllers;

use App\Models\Contracts;
use App\Models\Leave;
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


    public function getLeaveHours(Request $request)
    {
        $request->validate([
            'userId' => 'required|int'
        ]);

        $contract = Contracts::join('user_contract', 'contracts.id', '=', 'user_contract.contractId')
            ->where('user_contract.userId', $request->userId)
            ->select('contracts.*')
            ->first();


        return response()->json(['hours' => $contract->totalLeaveHours]);
    }

    public function getLeaveStatus(Request $request)
    {
        $request->validate([
            'userId' => 'required|int'
        ]);

        $leaveRequests = Leave::where('userId', $request->userId)->get();

        return response()->json($leaveRequests);
    }

    public function createLeaveCategory(Request $request){
        $request->validate(
            ['CategoryName' => 'required|string|max:255',
            'IsCategoryPaid' => 'required|boolean']
        );

         LeaveCategory::create([
            'LeaveCategoryName' => $request['CategoryName'],
            'LeaveCategoryIsPaidLeave' => $request['IsCategoryPaid'],
        ]);

         return response()->json(['message' => 'Leave category created'], 200);
    }
}
