<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
Route::get('/', function () {
    return view('welcome');
});

 // public routes
// Route::post('/register', [AuthController::class, 'store']);
// Route::post('/login', [AuthController::class, 'login']);

// auth routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});
