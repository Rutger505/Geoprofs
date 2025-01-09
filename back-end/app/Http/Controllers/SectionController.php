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

    public function update(Request $request, $sectionId)
    {
        $request->validate([
            'name' => 'required|string',
        ]);

        Sections::where('id', $sectionId)->update(['    name' => $request['name']]);

        return response()->json(["message" => "Project updated successfully"], 200);
    }


    public function delete($sectionId)
    {
        if (SectionUser::where('sectionId', $sectionId)->exists()) {
            return response()->json(["message" => "Section still has users assigned"], 400);
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

        SectionUser::create([
            'userId' => $request['userId'],
            'sectionId' => $request['sectionId']
        ]);

        return response()->json(["message" => "User added to section successfully"], 200);
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
            ->with(['user.leave'])
            ->get()
            ->pluck('user');

        return response()->json([$usersWithLeave], 200);
    }

}
