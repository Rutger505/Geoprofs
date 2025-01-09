<?php

namespace App\Http\Controllers;

use App\Models\Sections;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    //

    public function store(Request $request)
    {
        $request->validate([
            'sectionName' => 'required|string',
        ]);

        Sections::create([
            'name' => $request['sectionName']
        ]);

        return response()->json(["message" => "Section added successfully"], 200);
    }

    public function show()
    {
        return response()->json(Sections::all(), 200);
    }
}
