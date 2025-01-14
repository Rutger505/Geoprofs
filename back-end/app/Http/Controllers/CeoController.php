<?php

namespace App\Http\Controllers;


use App\Models\Sections;
use App\Models\SectionUser;

class CeoController extends Controller
{
    public function showSection()
    {
        $sections = Sections::all();

        $leave = array();
        foreach ($sections as $section) {
            $leave[] = SectionUser::where('sectionId', $section->id)->with(['user.leave'])->get()->pluck('user.leave');
        }

        return response()->json($leave);
    }
}
