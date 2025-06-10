<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LeaveController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/leaves', [LeaveController::class, 'store'])->middleware('role:employee');
    Route::get('/leaves', [LeaveController::class, 'index']);
    Route::put('/leaves/{id}', [LeaveController::class, 'update'])->middleware('role:admin');
});