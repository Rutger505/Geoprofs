<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Health;
use App\Http\Controllers\HealthController;

/**
 * @OA\Info(
 *     version="0.1",
 *     title="API Documentation for the Geoprofs leaven management system",
 * ),
 */

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/', function () {
    return response()->json(['message' => 'Hello World!']);
});


Route::get('/health', [HealthController::class, 'index']);
