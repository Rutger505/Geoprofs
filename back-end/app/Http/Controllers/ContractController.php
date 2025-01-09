<?php

namespace App\Http\Controllers;

use App\Models\Contracts;
use App\Models\UserContract;
use Illuminate\Http\Request;

class ContractController extends Controller
{

    public function store(Request $request)
    {
        $request->validate([
            'contractName' => 'string',
            'contractLeaveHours' => 'int'
        ]);

        Contracts::create([
            'contractName' => $request->contractName,
            'contractLeaveHours' => $request->contractLeaveHours,
        ]);

        return response()->json(['message' => 'Contract created']);
    }

    public function show()
    {
        $existsInUserContract = Contracts::join('user_contract', 'contracts.id', '=', 'user_contract.contractId')
            ->select('contracts.*')
            ->get();

        $notExistsInUserContract = Contracts::whereNotIn('id', function ($query) {
            $query->select('contractId')->from('user_contract');
        })->get();

        return response()->json([
            'existsInUserContract' => $existsInUserContract,
            'notExistsInUserContract' => $notExistsInUserContract,
        ]);
    }

    public function delete($id)
    {
        if (!Contracts::where('id', $id)->exists()) {
            return response()->json(['message' => "The contract doesn't exist"], 404);
        }

        if (UserContract::where('id', $id)->exists()) {
            return response()->json(['message' => 'The contract has a assigned user'], 422);
        }

        Contracts::destroy($id);

        return response()->json(['message' => 'Contract deleted'], 200);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'contractName' => 'required|string',
            'contractLeaveHours' => 'required|integer'
        ]);

        if (!Contracts::where('id', $id)->exists()) {
            return response()->json(['message' => "The contract doesn't exist"], 404);
        }

        if (UserContract::where('id', $id)->exists()) {
            return response()->json(['message' => 'The contract has a assigned user'], 422);
        }


        $contract = Contracts::find($id);


        $contract->contractName = $request->contractName;
        $contract->contractLeaveHours = $request->contractLeaveHours;
        $contract->save();


        return response()->json(['message' => 'Contract updated']);
    }
}
