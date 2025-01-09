<?php

namespace App\Http\Controllers;

use App\Mail\RegisterMail;
use App\Models\Contracts;
use App\Models\User;
use App\Models\UserContract;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;


class RegistrationController extends Controller
{
    public function getPendingUser(string $token): JsonResponse
    {
        // Find the user with the given register token
        $user = User::where('registrationToken', $token)->first();
        if (!$user) {
            return response()->json([
                'message' => 'Invalid or expired token',
            ], 422);
        }

        $user->loadRoleName();

        return response()->json($user);
    }

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
    public function register(Request $request, string $token): JsonResponse
    {
        $user = User::where('registrationToken', $token)->first();

        if (!$user) {
            return response()->json([
                'message' => 'Invalid or expired token',
            ], 422);
        }

        $request->validate([
            'password' => 'required|string',
            'contractId' => 'required|int',
        ]);

        $contract = Contracts::findOrFail($request->contractId);

        UserContract::create([
            'userId' => $user->id,
            'contractId' => $contract->id,
        ]);

        $user->update([
            'password' => $request->password,
            'registrationStatus' => 'completed',
            'registrationToken' => null,
        ]);

        return response()->json([
            'message' => 'User registered successfully',
        ]);
    }

    public function adminRegister(Request $request)
    {
        $request->validate([
            'firstName' => 'required|string',
            'lastName' => 'required|string',
            'email' => 'required|email',
            'dateHired' => 'required|date',
            'roleId' => 'required|int'
        ]);

        if (User::where('email', $request->email)->exists()) {
            return response()->json(['message' => 'email already has a account'], 409);
        }

        $token = (string)Str::uuid();

        $url = config('app.url') . '/complete/' . $token;

        User::create([
            'firstName' => $request->firstName,
            'lastName' => $request->lastName,
            'email' => $request->email,
            'dateHired' => $request->dateHired,
            'roleId' => $request->roleId,
            'registrationStatus' => 'pending',
            'registrationToken' => $token,
        ]);

        Mail::to($request->email)->send(new RegisterMail($url, $request->email));

        return response()->json([
            'message' => 'user successfully created',
        ]);
    }
}
