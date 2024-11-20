<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\WelcomeMail;
use Illuminate\Support\Facades\Mail;

class HealthController extends Controller
{

    /**
     * @OA\Get(
     *     path="api/health",
     *     tags={"Health"},
     *     summary="Health check",
     *     description="Check if the API is up",
     *     @OA\Response(
     *         response=200,
     *         description="The API is currently up",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="status",
     *                 type="string",
     *                 example="ok"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error"
     *     )
     * )
     */
    public function index()
    {
        return response()->json(['status' => 'ok'], 200);
    }

    public function mailTest(){
        Mail::to('vandekolkjake@gmail.com')->send(new WelcomeMail());
    }
}
