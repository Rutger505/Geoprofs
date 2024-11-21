<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HealthController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MailController;
use Illuminate\Support\Facades\Cache;


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





Route::get('/register/confirm/{token}', function ($token) {
    // Validate the token and URL signature
    if (! request()->hasValidSignature() || ! Cache::pull($token)) {
        abort(403, 'Invalid or expired token.');
    }

    // Logic for confirming registration
    return response()->json(['status' => 'good'], 200);
})->name('register.confirm')->middleware('signed');

Route::get('/user', function (Request $request): mixed {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/health', [HealthController::class, 'index']);
