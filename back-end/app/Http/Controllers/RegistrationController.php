<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegistrationController extends Controller
{
    /**
     * @OA\Post(
     *     path="api/auth/register",
     *     tags={"Authentication"},
     *     summary="Register",
     *     description="Register a new user",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="name",
     *                 type="string",
     *                 example="John Doe"
     *             ),
     *             @OA\Property(
     *                 property="email",
     *                 type="string",
     *                 format="email",
     *                 example="user@example.com"
     *             ),
     *             @OA\Property(
     *                 property="password",
     *                 type="string",
     *                 format="password",
     *                 example="password123"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="User created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="User created successfully"
     *             ),
     *             @OA\Property(
     *                 property="token",
     *                 type="string",
     *                 example="random string token"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad Request",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="The given data was invalid."
     *             )
     *         )
     *     )
     * )
     */
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

    public function adminRegister(Request $request)
    {
        $request->validate([
            'firstName' => 'required|string',
            'lastName' => 'required|string',
            'email' => 'required|email',
            'dateHired' => 'required|date',
            'role' => 'required|int'
        ]);

        if (User::where('email', $request->email)->exists()) {
            return response()->json(['message' => 'email already has a account'], 403);
        }

        User::create([
            'UserFirstName' => $request->firstName,
            'UserLastName' => $request->lastName,
            'email' => $request->email,
            'DateHired' => $request->dateHired,
            'UserRoleID' => $request->role,
            'RegistrationStatus' => 'pending'
        ]);

        return response()->json(['message' => 'user successfully created'], 200);
    }
}
