<?php

namespace App\Http\Controllers;

use App\Models\Leave;
use App\Models\LeaveCategory;
use Illuminate\Http\Request;

class LeaveCategoryController extends Controller
{
    public function createLeaveCategory(Request $request)
    {
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

    public function getLeaveCategories()
    {
        return response()->json(LeaveCategory::all(), 200);
    }

    public function deleteLeaveCategory($leaveCategoryId)
    {
        if (Leave::where('categoryId', $leaveCategoryId)->exists()) {

            return response()->json(['message' => 'Leave category cannot be deleted, this leave category is bound to a leave request'], 400);
        }


        LeaveCategory::where('id', $leaveCategoryId)->delete();

        return response()->json(['message' => 'Leave category deleted'], 200);
    }
}
