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
