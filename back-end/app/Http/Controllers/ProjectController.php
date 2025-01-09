<?php

namespace App\Http\Controllers;

use App\Models\Projects;
use App\Models\ProjectUser;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
        ]);

        Projects::create([
            'name' => $request['name']
        ]);

        return response()->json(["message" => "Project added successfully"], 200);
    }

    public function show()
    {
        return response()->json(Projects::all());
    }


    public function addUserToProject(Request $request)
    {
        $request->validate([
            'userId' => 'required|int',
            'projectId' => 'required|int',
        ]);

        ProjectUser::create([
            'userId' => $request['userId'],
            'projectId' => $request['projectId']
        ]);

        return response()->json(["message" => "User added to project successfully"], 200);
    }

    public function getAllLeaveFromProject(Request $request)
    {
        $request->validate([
            'projectId' => 'required|int',
        ]);


        $usersWithLeave = ProjectUser::where('projectId', $request['projectId'])
            ->with(['user.leave'])
            ->get()
            ->pluck('user');

        return response()->json([$usersWithLeave], 200);
    }


}
