<?php

namespace App\Http\Controllers;

use App\Mail\RegisterMail;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;


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
    public function register(Request $request, string $token): JsonResponse
    {
        // Find the user with the given register token
        $user = User::where('RegistrationToken', $token)->first();

        if (!$user) {
            return response()->json([
                'message' => 'Invalid or expired token',
            ], 422);
        }

        // Validate the incoming request
        $request->validate([
            'password' => 'required|string',
        ]);

        // Update the user's registration status and set the password
        $user->update([
            'password' => $request->password,
            'RegistrationStatus' => 'completed',
            'RegistrationToken' => null,
        ]);

        return response()->json([
            'message' => 'User registered successfully',
        ], 200);
    }

    /**
     * @OA\Post(
     *     path="api/auth/create-user",
     *     tags={"Authentication"},
     *     summary="create user",
     *     description="Register a new user",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="firstName",
     *                 type="string",
     *                 example="John"
     *             ),
     *             @OA\Property(
     *                 property="lastName",
     *                 type="string",
     *                 example="Doe"
     *             ),
     *             @OA\Property(
     *                 property="email",
     *                 type="string",
     *                 format="email",
     *                 example="admin@example.com"
     *             ),
     *             @OA\Property(
     *                 property="dateHired",
     *                 type="string",
     *                 format="date",
     *                 example="2023-12-01"
     *             ),
     *             @OA\Property(
     *                 property="role",
     *                 type="integer",
     *                 example=1
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="User successfully created",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="user successfully created"
     *             ),
     *             @OA\Property(
     *                 property="token",
     *                 type="string",
     *                 example="random string token"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Email already has an account",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="email already has an account"
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
     * )*/
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

        $token = (string) Str::uuid();

        // Create a signed URL
        $signedUrl = URL::temporarySignedRoute(
            'register.confirm',
            Carbon::now()->addDay(),
            ['token' => $token],
        );

        // Store the token in the cache
        Cache::put($token, true, Carbon::now()->addDay());

        User::create([
            'UserFirstName' => $request->firstName,
            'UserLastName' => $request->lastName,
            'email' => $request->email,
            'DateHired' => $request->dateHired,
            'UserRoleID' => $request->roleId,
            'RegistrationStatus' => 'pending',
            'RegistrationToken' => $token

        ]);

        Mail::to($request->email)->send(new RegisterMail($signedUrl, $request->email));

        return response()->json([
            'message' => 'user successfully created',
        ], 200);
    }
}
