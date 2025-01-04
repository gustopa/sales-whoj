<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
Route::get('/', function () {
    return inertia('Home',['page' => 'Home']);
});
Route::inertia('/login','Auth/Login');
Route::post('/login',[AuthController::class,'login']);
