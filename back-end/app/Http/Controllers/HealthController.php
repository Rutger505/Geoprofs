<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


class HealthController extends Controller
{

    /**
     * @OA\Info(
     *     version="1.0",
     *     title="Example for response examples value"
     * ),
     * @OA\PathItem(
     *     path="/health"
     * )
     */
    public function index()
    {
        return response()->json(['status' => 'ok'], 200);
    }
}
