<?php

namespace App\Http\Controllers;


use App\Models\Roles;
use Illuminate\Http\Request;

class RolesController extends Controller
{
    public function show()
    {
        $roles =  Roles::get('*');

        return response()->json(['roles' => $roles], 200);
    }
}
