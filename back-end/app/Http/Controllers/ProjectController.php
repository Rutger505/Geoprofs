<?php

namespace App\Http\Controllers;

use App\Models\Projects;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function store(Request $request){
        $request->validate([
            'projectName' => 'required|string',
        ]);

        Projects::create([
            'name' => $request['projectName']
        ]);

        return response()->json(["message" => "Project added successfully"], 200);
    }
}
