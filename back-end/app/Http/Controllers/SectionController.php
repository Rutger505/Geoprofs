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


        $usersWithLeave = SectionUser::where('sectionId', $request['sectionId'])
            ->with(['user.leave'])
            ->get()
            ->pluck('user');

        return response()->json([$usersWithLeave], 200);
    }

}
