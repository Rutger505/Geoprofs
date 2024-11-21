<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HealthController;
use App\Http\Controllers\MailController;
use Illuminate\Support\Facades\Cache;


Route::prefix('mail')->group(function (): void {

    Route::post('register', [MailController::class, 'register']);
});

Route::prefix('auth')->group(function (): void {
    Route::post('/login', [AuthenticatedSessionController::class, 'store'])
        ->middleware('guest')
        ->name('login');

    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
        ->middleware('guest')
        ->name('password.email');

    Route::post('/reset-password', [NewPasswordController::class, 'store'])
        ->middleware('guest')
        ->name('password.store');

    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
        ->middleware('auth')
        ->name('logout');

    Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
        return $request->user();
    });
});


Route::get('/register/confirm/{token}', function ($token) {
    // Validate the token and URL signature
    if (! request()->hasValidSignature() || ! Cache::pull($token)) {
        abort(403, 'Invalid or expired token.');
    }

    // Logic for confirming registration
    return response()->json(['status' => 'Succesfully validated token.'], 200);
})->name('register.confirm')->middleware('signed');

Route::get('/user', function (Request $request): mixed {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/health', [HealthController::class, 'index']);
