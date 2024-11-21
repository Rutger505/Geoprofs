<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HealthController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MailController;

Route::prefix('mail')->group(function (): void {

    Route::post('register', [MailController::class, 'register']);
});

Route::prefix('auth')->group(function (): void {

    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function (): void {
        Route::post('logout', [AuthController::class, 'logout']);
    });
});

Route::get('/user', function (Request $request): mixed {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/health', [HealthController::class, 'index']);
