<?php

namespace App\Http\Controllers;

use App\Models\Contracts;
use Illuminate\Http\Request;

class ContractController extends Controller
{
    //

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

    public function get()
    {
        $contracts = Contracts::get('*');

        return response()->json(['message' => $contracts]);
    }
}
