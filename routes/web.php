<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmasController;
use App\Http\Middleware\IsAuthenticated;
use App\Http\Middleware\NotLogin;


Route::prefix('/')->middleware(IsAuthenticated::class)->group(function(){
    Route::get('/',function(){
        return inertia('Home',['page' => 'Home', 'name' => session('name'), 'session' => session()->all()]);
    })->name('dashboard');
    Route::get('/bahan-emas',[EmasController::class,'bahanEmas']);
});
Route::get('/login',function(){
    return inertia('Auth/Login');
})->middleware(NotLogin::class)->name('login');

Route::post('/login',[AuthController::class,'login']);
Route::get('/logout',[AuthController::class,'logout']);
