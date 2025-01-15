<?php

namespace App\Http\Controllers;


use App\Models\Projects;
use App\Models\Sections;

class CeoController extends Controller
{
    public function showSection()
    {

        $leave = Sections::with('user.leave')->get();

        return response()->json($leave);


    }

    public function showProject()
    {
        $leave = Projects::with('user.leave')->get();

        return response()->json($leave);

    }
}
