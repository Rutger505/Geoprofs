<?php

namespace App\Http\Controllers;

use App\Mail\RegisterMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;


/**
 * @OA\Info(
 *     version="0.1",
 *     title="API Documentation for the Geoprofs leaven management system",
 * )
 */
class MailController extends Controller
{



    public function Register()
    {
        Mail::to('vandekolkjake@gmail.com')->send(new RegisterMail());
    }
}
