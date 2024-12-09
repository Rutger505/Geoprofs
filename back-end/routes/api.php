<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\HealthController;
use App\Http\Controllers\LeaveController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Roles;


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

        $role = Roles::where('RoleID', $request->user()->UserRoleID)->first();

        $userArray = $request->user()->toArray();
        $userArray['RoleName'] = $role ? $role->RoleName : null;

        return $userArray;
    });
});


Route::get('/leave/leave-status',  [LeaveController::class, 'getLeaveStatus'])->middleware('auth');
Route::get('/leave/leave-hours', [LeaveController::class, 'getLeaveHours'])->middleware('auth');

Route::middleware('auth')->post('/leave', [LeaveController::class, 'storeLeaveRequest']);
