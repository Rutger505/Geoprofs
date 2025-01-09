<?php

use App\Http\Controllers\ContractController;
use App\Http\Controllers\HealthController;
use App\Http\Controllers\LeaveCategoryController;
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\SectionController;
use Illuminate\Support\Facades\Route;

Route::get('/health', [HealthController::class, 'index']);

Route::prefix('/auth')->group(function (): void {
    Route::post('/login', [LoginController::class, 'login']);

    Route::post('/register', [RegistrationController::class, 'adminRegister']);

    Route::get('/register/pending/{token}', [RegistrationController::class, 'getPendingUser']);

    Route::put('/register/complete/{token}', [RegistrationController::class, 'register']);
});

Route::prefix('/roles')->group(function (): void {
    Route::get('/show', [RolesController::class, 'show']);
});

Route::prefix('/leave')->group(function (): void {
    Route::post('/', [LeaveController::class, 'storeLeaveRequest']);

    Route::get('/leave-requests', [LeaveController::class, 'getLeaveStatus']);

    Route::get('/leave-hours', [LeaveController::class, 'getLeaveHours']);

    Route::prefix('/category')->group(function (): void {
        Route::post('/', [LeaveCategoryController::class, 'createLeaveCategory']);
        Route::get('/', [LeaveCategoryController::class, 'getLeaveCategories']);
    });
});


Route::prefix('/contract')->group(function () {
    Route::post('/store', [ContractController::class, 'store']);
    Route::get('/show', [ContractController::class, 'show']);
    Route::delete('/delete/{id}', [ContractController::class, 'delete']);
    Route::put('/update/{id}', [ContractController::class, 'update']);
});

Route::prefix('sections')->group(function () {
    Route::post('/', [SectionController::class, 'store']);
    Route::get('/', [SectionController::class, 'show']);
});

