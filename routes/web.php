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

    Route::prefix('bahan-emas')->group(function(){
        Route::get('/',[EmasController::class,'bahanEmas']);
        Route::post('/tambah',[EmasController::class,'tambahEmas']);
    });
});
Route::get('/login',function(){
    return inertia('Auth/Login');
})->middleware(NotLogin::class)->name('login');

Route::post('/login',[AuthController::class,'login']);
Route::get('/logout',[AuthController::class,'logout']);
