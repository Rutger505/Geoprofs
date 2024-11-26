<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\HealthController;
use App\Http\Controllers\VerlofController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


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

    Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
        return $request->user();
    });
});


Route::prefix('verlof')->group(function () {
    Route::post('/verzoek', [VerlofController::class, 'storeLeaveRequest']);
});
