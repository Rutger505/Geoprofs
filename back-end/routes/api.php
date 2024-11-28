<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\RegistrationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HealthController;
use App\Http\Controllers\MailController;
use Illuminate\Support\Facades\Cache;


Route::get('/health', [HealthController::class, 'index']);

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

    Route::post('/register', [RegistrationController::class, 'adminRegister']);

    Route::put('/register/confirm/{token}', [RegistrationController::class, 'register'])
        ->name('register.confirm');

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
