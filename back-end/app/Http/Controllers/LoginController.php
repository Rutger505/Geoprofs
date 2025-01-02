<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $request->validate( [
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ]);

        $email = $request->email;
        $password = $request->password;

        $user = User::where('email', $email)->first();

        if (!Hash::check($password, $user?->password)) {
            return response()->json([
                'message' => 'Invalid credentials',
            ], 401);
        }

        $user->setRoleName();

        return response()->json($user);
    }
}
