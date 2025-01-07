<?php

namespace App\Http\Controllers;

use App\Models\LeaveCategory;
use Illuminate\Http\Request;

class LeaveCategoryController extends Controller
{
    public function createLeaveCategory(Request $request){
        $request->validate(
            ['categoryName' => 'required|string|max:255',
                'isPaidLeave' => 'required|boolean']
        );

        LeaveCategory::create([
            'name' => $request['categoryName'],
            'isPaidLeave' => $request['isPaidLeave'],
        ]);

        return response()->json(['message' => 'Leave category created'], 200);
    }

    public function getLeaveCategories(){
        return response()->json(LeaveCategory::all(), 200);
    }
}
