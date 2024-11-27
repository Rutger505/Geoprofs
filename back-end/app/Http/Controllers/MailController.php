<?php

namespace App\Http\Controllers;

use App\Mail\RegisterMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MailController extends Controller
{


    /**
     * @OA\Post(
     *     path="/api/mail/register",
     *     tags={"Authentication", "Mailing"},
     *     summary="Send registration email with signed URL",
     *     description="Generates a temporary signed URL for registration and sends it to the user via email.",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="email",
     *                 type="string",
     *                 format="email",
     *                 example="user@example.com"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Registration email sent successfully",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Registration email sent successfully"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Invalid email address or failed to send email",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Invalid email address or failed to send email"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="An error occurred while processing the request"
     *             )
     *         )
     *     )
     * )
     */
    public function register(Request $request)
    {

        $request->validate([
            'email' => 'required|email',
            'firstName' => 'string',
            'lastName' => 'string'
        ]);

        $token = (string) Str::uuid(); // Convert the UUID object to a string
        // Create a signed URL
        $signedUrl = URL::temporarySignedRoute(
            'register.confirm',
            Carbon::now()->addMinutes(1),
            ['token' => $token] // Pass the string version of the token
        );

        // Store the token in the cache
        Cache::put($token, true, Carbon::now()->addMinutes(30));

        Mail::to($request->email)->send(new RegisterMail($signedUrl, $request->email, $request->firstName, $request->lastName));
    }
}
