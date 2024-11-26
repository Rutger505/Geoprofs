<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Leave;

class VerlofController extends Controller
{


    public function storeLeaveRequest(Request $request)
    {

        //validate user input
        $request->validate([
            'start_date' => 'required|date_format:d-m-Y',
            'end_date' => 'required|date_format:d-m-Y|after_or_equal:start_date',
            'reden' => 'required|string|max:255',
            'category' => 'required|int'
        ]);

        //further date validation
        $leaveStartDate = \Carbon\Carbon::createFromFormat('d-m-Y', $request->start_date)->format('Y-m-d');
        $leaveEndDate = \Carbon\Carbon::createFromFormat('d-m-Y', $request->end_date)->format('Y-m-d');


        //make leave reqeust
        $leaveRequest = Leave::create([
            'LeaveStartDate' => $leaveStartDate,
            'LeaveEndDate' => $leaveEndDate,
            'LeaveReason' => $request->reden,
            'Status' => 'pending',
            'LeaveCategory' => $request->category,
            'UserID' => 1 //needs session support for user


        ]);

        return response()->json(['message' => 'Verlof verzoek aangemaakt. Moet alleen nog nagekeken worden door een admin'], 200);
    }
}
