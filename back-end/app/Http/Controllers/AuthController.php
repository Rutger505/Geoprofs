<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return response()->json([
            'message' => 'User created successfully',
            'token' => $user->createToken('token')->plainTextToken
        ]);
    }
    /**
     * @OA\Post(
     *     path="api/auth/login",
     *     tags={"Authentication"},
     *     summary="Login",
     *     description="Log in",
     *     @OA\Response(
     *         response=200,
     *         description="The login was succesfull",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="email",
     *                 type="string",
     *                 example="user.user@example.com"
     *             ),
     *              @OA\Property(
     *                 property="password",
     *                 type="string",
     *                 example="password123"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Login failed",
     *         @OA\JsonContent(
     *              @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Invalid credentials"
     *              )
     *          )
     *     )
     * )
     */
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'UserEmail' => 'required|email',
            'UserPassword' => 'required|string'
        ]);

        $user = User::where('UserEmail', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        return response()->json([
            'message' => 'Logged in successfully',
            'token' => $user->createToken('token')->plainTextToken
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user('sanctum')->currentAccessToken()->delete();


        return response()->json(['message' => 'Logged out successfully']);
    }

    public function check(Request $request): JsonResponse
    {
        $user = auth('sanctum')->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return response()->json([
            'message' => 'Authorized',
        ]);
    }
}
