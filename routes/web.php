<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\RequestOrderController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\TransaksiController;
use App\Http\Middleware\IsAuthenticated;
use App\Http\Middleware\NotLogin;


Route::prefix('/')->middleware(IsAuthenticated::class)->group(function(){
    Route::get('/',[HomeController::class,'index'])->name('dashboard');

    Route::get('/profile',[HomeController::class,'profile']);

    Route::get('/dashboard_sales',[TransaksiController::class,'dashboard']);

    Route::prefix('/request_order')->group(function(){
        Route::post('/getAll',[RequestOrderController::class,'getAll']);
        Route::post('/view/{id}',[RequestOrderController::class,'view']);
        Route::post('/getDPList/{id}',[RequestOrderController::class,'getDPList']);
    });

    Route::prefix('/customer')->group(function(){
        Route::get('/',[CustomerController::class,'index']);
        Route::get('/create',[CustomerController::class,'create']);
        Route::get('/form/{id}',[CustomerController::class,'form'])->name('form_customer');
        Route::delete('/delete/{id}',[CustomerController::class,'delete']);
        Route::post('/getAllCustomer',[CustomerController::class,'getAll']);
        Route::post('/getDataSize',[CustomerController::class,'getSizeList']);
        Route::post('/getDataPayment',[CustomerController::class,'getPaymentList']);
        Route::post('/getDataOrder',[CustomerController::class,'getOrderList']);
        Route::post('/getDataRefund',[CustomerController::class,'getRefundList']);
        Route::post('/getDataDocument',[CustomerController::class,'getDocumentList']);
        Route::post('/getDataVisit',[CustomerController::class,'getVisitList']);
    });
});


Route::post('/encrypt',function(){
    $encrypt_id = encrypt_id(request('id'));
    return response()->json(["encrypted" => $encrypt_id]);
});

Route::get('/login',function(){
    return inertia('Auth/Login');
})->middleware(NotLogin::class)->name('login');

Route::post('/login',[AuthController::class,'login']);
Route::get('/logout',[AuthController::class,'logout']);
