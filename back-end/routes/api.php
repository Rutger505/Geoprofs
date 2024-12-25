<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\ContractController;
use App\Http\Controllers\HealthController;
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\RegistrationController;
use App\Http\Middleware\EnsureUserIsAdmin;
use App\Models\Roles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/health', [HealthController::class, 'index']);

Route::prefix('auth')->group(function (): void {
    Route::post('/login', [AuthenticatedSessionController::class, 'store'])
        ->name('login');

    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::post('/reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');

    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
        ->middleware('auth')
        ->name('logout');

    Route::post('/register', [RegistrationController::class, 'adminRegister'])
        ->middleware(EnsureUserIsAdmin::class);


    Route::put('/register/complete/{token}', [RegistrationController::class, 'register'])
        ->name('register.confirm');

    Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {

        $role = Roles::where('RoleID', $request->user()->UserRoleID)->first();

        $userArray = $request->user()->toArray();
        $userArray['RoleName'] = $role;


        if ($role['RoleName'] == null || trim($role['RoleName']) == "") {
            return response()->json(['message' => "user doesn't have a role"], 424);
        }

        return $userArray;
    });
});


Route::get('/leave/leave-requests',  [LeaveController::class, 'getLeaveStatus'])->middleware('auth');
Route::get('/leave/leave-hours', [LeaveController::class, 'getLeaveHours'])->middleware('auth');

Route::prefix('contract')->group(function () {
    Route::post('/store',  [ContractController::class, 'store'])->middleware('auth', EnsureUserIsAdmin::class);
    Route::get('/show', [ContractController::class, 'show'])->middleware('auth', EnsureUserIsAdmin::class);
    Route::delete('/delete', [ContractController::class, 'delete'])->middleware('auth', EnsureUserIsAdmin::class);
});

Route::middleware('auth')->post('/leave', [LeaveController::class, 'storeLeaveRequest']);
