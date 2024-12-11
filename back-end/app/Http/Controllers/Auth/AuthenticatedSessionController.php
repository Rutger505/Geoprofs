<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\Roles;

class AuthenticatedSessionController extends Controller
{
    /**
     * @OA\Post(
     *     path="api/auth/login",
     *     tags={"Authentication"},
     *     summary="Login",
     *     description="Authenticate a user and start a session",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
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
     *         response=204,
     *         description="Login successful",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="successful"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Invalid credentials."
     *             )
     *         )
     *     )
     * )
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();


        $user = Auth::user();

        $role = Roles::where('RoleID', $request->user()->UserRoleID)->first();

        $userArray = $request->user()->toArray();
        $userArray['RoleName'] = $role;

        if ($role['RoleName'] == null || trim($role['RoleName']) == "") {
            return response()->json(['message' => "user doesn't have a role"], 424);
        }

        return response()->json([
            'user' => $userArray
        ], 200);
    }


    /**
     * @OA\Post(
     *     path="api/auth/logout",
     *     tags={"Authentication"},
     *     summary="Logout",
     *     description="Log out the authenticated user and destroy the session",
     *     @OA\Response(
     *         response=204,
     *         description="Logout successful",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="successful"
     *             )
     *         )
     *     )
     * )
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
