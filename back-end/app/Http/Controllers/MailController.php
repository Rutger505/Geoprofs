<?php

namespace App\Http\Controllers;

use App\Mail\RegisterMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Carbon\Carbon;

class MailController extends Controller
{
    public function register()
    {
        $token = (string) Str::uuid(); // Convert the UUID object to a string
        // Create a signed URL
        $signedUrl = URL::temporarySignedRoute(
            'register.confirm',
            Carbon::now()->addMinutes(1),
            ['token' => $token] // Pass the string version of the token
        );

        // Store the token in the cache
        Cache::put($token, true, Carbon::now()->addMinutes(30));

        // Send the email with the signed URL
        Mail::to('vandekolkjake@gmail.com')->send(new RegisterMail($signedUrl));
    }
}
