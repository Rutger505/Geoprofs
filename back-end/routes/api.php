<?php

use App\Http\Controllers\ContractController;
use App\Http\Controllers\HealthController;
use App\Http\Controllers\LeaveCategoryController;
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/health', [HealthController::class, 'index']);

Route::prefix('/auth')->group(function (): void {
    Route::post('/login', [LoginController::class, 'login']);

    Route::post('/register', [RegistrationController::class, 'adminRegister']);

    Route::get('/register/pending/{token}', [RegistrationController::class, 'getPendingUser']);

    Route::put('/register/complete/{token}', [RegistrationController::class, 'register']);
});

Route::prefix('/users')->group(function (): void {
    Route::get('/', [UserController::class, 'index']);

    Route::prefix('/{user}')->group(function (): void {
        Route::get('/', [UserController::class, 'show']);
        Route::put('/', [UserController::class, 'update']);

        Route::get('/hours', [LeaveController::class, 'getLeaveHours']);

        Route::get('/section', [UserController::class, 'getSection']);
    });
});

Route::prefix('/roles')->group(function (): void {
    Route::get('/show', [RolesController::class, 'show']);
});

Route::prefix('/leave')->group(function (): void {
    Route::post('/', [LeaveController::class, 'storeLeaveRequest']);

    Route::get('/{userId}', [LeaveController::class, 'getLeaveRequests']);

    Route::get('/hours', [LeaveController::class, 'getLeaveHours']);

    Route::put('/{leaveId}', [LeaveController::class, 'updateLeaveStatus']);
    Route::delete('/{leaveId}', [LeaveController::class, 'deleteLeave']);

    Route::prefix('/category')->group(function (): void {
        Route::post('/', [LeaveCategoryController::class, 'createLeaveCategory']);
        Route::get('/', [LeaveCategoryController::class, 'getLeaveCategories']);
        Route::delete('/{leaveCategoryId}', [LeaveCategoryController::class, 'deleteLeaveCategory']);
    });
});

//contract moet gefixed worden
Route::prefix('/contract')->group(function () {
    Route::post('/store', [ContractController::class, 'store']);
    Route::get('/show', [ContractController::class, 'show']);
    Route::delete('/delete/{id}', [ContractController::class, 'delete']);
    Route::put('/update/{id}', [ContractController::class, 'update']);
});

Route::prefix('projects')->group(function () {
    Route::post('/', [ProjectController::class, 'store']);
    Route::get('/', [ProjectController::class, 'show']);
    Route::delete('/{projectId}', [ProjectController::class, 'delete']);
    Route::put('/{projectId}', [ProjectController::class, 'update']);

    Route::prefix('/users')->group(function (): void {
        Route::post('/', [ProjectController::class, 'addUserToProject']);
        Route::get('/{projectId}', [ProjectController::class, 'showUsers']);
        Route::delete('/{projectId}', [ProjectController::class, 'removeUserFromProject']);
    });

    Route::get('/leave/{projectId}', [ProjectController::class, 'getAllLeaveFromProject']);
});

Route::prefix('sections')->group(function () {
    Route::post('/', [SectionController::class, 'store']);
    Route::get('/', [SectionController::class, 'show']);
    Route::delete('/{sectionId}', [SectionController::class, 'delete']);
    Route::put('/{sectionId}', [SectionController::class, 'update']);

    Route::prefix('/users')->group(function (): void {
        Route::post('/', [SectionController::class, 'addUserToSection']);
        Route::delete('/{sectionId}', [SectionController::class, 'removeUserFromSection']);
        Route::get('/{sectionId}', [SectionController::class, 'showUsers']);
    });

    Route::get('/leave/{sectionId}', [SectionController::class, 'getAllLeaveFromSection']);
});
