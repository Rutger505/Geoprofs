<?php

namespace App\Http\Controllers;

use App\Models\Sections;
use App\Models\SectionUser;
use App\Models\User;
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


    public function update(Request $request, $sectionId)
    {
        $request->validate([
            'name' => 'required|string',
        ]);

        Sections::where('id', $sectionId)->update(['name' => $request['name']]);

        return response()->json(["message" => "Project updated successfully"], 200);
    }


    public function delete($sectionId)
    {
        if (SectionUser::where('sectionId', $sectionId)->exists()) {
            return response()->json(["message" => "Section still has users assigned"], 409);
        }

        Sections::where('id', $sectionId)->delete();

        return response()->json(["message" => "Section deleted successfully"], 200);
    }

    public function addUserToSection(Request $request)
    {
        $request->validate([
            'userId' => 'required|int',
            'sectionId' => 'required|int',
        ]);

        if (!Sections::where('id', $request->sectionId)->exists() || !User::where('id', $request->userId)->exists()) {
            return response()->json(["message" => "Section or user doesn't exist"], 404);
        }

        SectionUser::where('userId', $request->userId)->delete();

        SectionUser::create([
            'userId' => $request->userId,
            'sectionId' => $request->sectionId
        ]);

        return response(null, 204);
    }


    public function removeUserFromSection(Request $request, $sectionId)
    {
        $request->validate(['userId' => 'required|int']);

        if (!SectionUser::where('sectionId', $sectionId)->exists() || !SectionUser::where('userId', $request['userId'])->exists()) {
            return response()->json(["message" => "Section or users doesn't exists"], 400);
        }

        SectionUser::where('sectionId', $sectionId)->where('userId', $request['userId'])->delete();

        return response()->json(["message" => "User removed successfully"], 200);
    }

    public function showUsers($sectionId)
    {


        $users = SectionUser::where('sectionId', $sectionId)->with('user')->get()->pluck('user');

        return response()->json($users);
    }

    public function getAllLeaveFromSection($sectionId)
    {
        $usersWithLeave = SectionUser::where('sectionId', $sectionId)
            ->with(['user.leave.category'])
            ->get()
            ->pluck('user.leave')
            ->flatten();

        return response()->json($usersWithLeave, 200);
    }
}
