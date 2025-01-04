<?php

namespace App\Http\Controllers;

use App\Models\Sections;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    //

    public function store(Request $request){
        $request->validate([
            'SectionName' => 'required|string',
            ]);

        Sections::create([
           'SectionName' => $request['SectionName']
        ]);

        return response()->json(["message" => "Section added successfully"], 200);
    }
}
