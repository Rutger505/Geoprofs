<?php

namespace App\Http\Controllers;

use App\Models\Projects;
use App\Models\ProjectUser;
use App\Models\User;
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

    public function update(Request $request, $projectId)
    {
        $request->validate([
            'name' => 'required|string',
        ]);

        Projects::where('id', $projectId)->update(['name' => $request['name']]);

        return response()->json(["message" => "Project updated successfully"], 200);
    }

    public function delete($projectId)
    {

        if (ProjectUser::where('projectId', $projectId)->exists()) {
            return response()->json(["message" => "Project still has users assigned"], 400);
        }

        Projects::where('id', $projectId)->delete();

        return response()->json(["message" => "Project deleted successfully"], 200);
    }

    public function addUserToProject(Request $request)
    {
        $request->validate([
            'userId' => 'required|int',
            'projectId' => 'required|int',
        ]);


        if (!Projects::where('id', $request['projectId'])->exists() || !User::where('id', $request['userId'])->exists()) {

            return response()->json(["message" => "User or project doesn't exist"], 404);
        }

        ProjectUser::where('userId', $request['userId'])->delete();

        ProjectUser::create([
            'userId' => $request['userId'],
            'projectId' => $request['projectId']
        ]);

        return response()->json(["message" => "User added to project successfully"], 200);
    }

    public function removeUserFromProject($projectId, Request $request)
    {
        $request->validate(['userId' => 'required|int']);

        if (!ProjectUser::where('projectId', $projectId)->exists() || !ProjectUser::where('userId', $request['userId'])->exists()) {
            return response()->json(["message" => "Project or users doesn't exists"], 400);
        }

        ProjectUser::where('projectId', $projectId)->where('userId', $request['userId'])->delete();

        return response()->json(["message" => "User removed successfully"], 200);

    }

    public function showUsers($projectId)
    {

        $users = ProjectUser::where('projectId', $projectId)->with('user')->get()->pluck('user');

        return response()->json($users);
    }

    public function getAllLeaveFromProject(Request $request, $projectId)
    {
        $usersWithLeave = ProjectUser::where('projectId', $projectId)
            ->with(['user.leave.category'])
            ->get()
            ->pluck('user.leave')
            ->flatten();

        return response()->json($usersWithLeave, 200);
    }
}
