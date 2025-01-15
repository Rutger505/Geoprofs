<?php

namespace App\Http\Controllers;


use App\Models\Sections;

class CeoController extends Controller
{
    public function showSection()
    {

        $leave = Sections::with('user.leave')->get();

        return response()->json($leave);


    }
}
