<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\IsAuthenticated;
use App\Http\Middleware\NotLogin;

Route::get('/', function () {
    return inertia('Home',['page' => 'Home', 'name' => session('name')]);
})->middleware(IsAuthenticated::class)->name('dashboard');

Route::get('/login',function(){
    return inertia('Auth/Login');
})->middleware(NotLogin::class)->name('login');

Route::post('/login',[AuthController::class,'login']);
Route::get('/logout',[AuthController::class,'logout']);
