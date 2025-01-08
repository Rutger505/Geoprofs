<?php

namespace App\Http\Controllers;

use App\Models\Sections;
use App\Models\SectionUser;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    //

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
        ]);

        Sections::create([

            'name' => $request['name']
        ]);

        return response()->json(["message" => "Section added successfully"], 200);
    }

    public function show()
    {
        return response()->json(Sections::all(), 200);
    }

    public function addUserToSection(Request $request)
    {
        $request->validate([
            'userId' => 'required|int',
            'sectionId' => 'required|int',
        ]);

        SectionUser::create([
            'userId' => $request['userId'],
            'sectionId' => $request['sectionId']
        ]);

        return response()->json(["message" => "User added to section successfully"], 200);
    }

    public function getAllLeaveFromSection(Request $request)
    {
        $request->validate([
            'sectionId' => 'required|int',
        ]);

        $leaveData = SectionUser::join('users', 'section_user.userId', '=', 'users.id')
            ->join('leave', 'leave.userId', '=', 'users.id')
            ->where('section_user.sectionId', $request->sectionId)
            ->select(
                'users.id as userId',
                'users.firstName',
                'users.lastName',
                'leave.*'
            )
            ->get();

        return response()->json($leaveData, 200);
    }


}
