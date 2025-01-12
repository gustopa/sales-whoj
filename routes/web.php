<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\RequestOrderController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmasController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\TransaksiController;
use App\Http\Middleware\IsAuthenticated;
use App\Http\Middleware\NotLogin;


Route::prefix('/')->middleware(IsAuthenticated::class)->group(function(){
    Route::get('/',[HomeController::class,'index'])->name('dashboard');

    Route::get('/profile',[HomeController::class,'profile']);

    Route::prefix('bahan-emas')->group(function(){
        Route::get('/',[EmasController::class,'bahanEmas']);
        Route::post('/tambah',[EmasController::class,'tambahEmas']);
    });

    Route::get('/dashboard_sales',[TransaksiController::class,'dashboard']);

    Route::post('/request_order/getAll',[RequestOrderController::class,'getAll']);
    Route::post('/request_order/view/{id}',[RequestOrderController::class,'view']);
    Route::post('/request_order/getDPList/{id}',[RequestOrderController::class,'getDPList']);

    Route::prefix('/customer')->group(function(){
        Route::get('/',[CustomerController::class,'index']);
        Route::get('/create',[CustomerController::class,'create']);
        Route::post('/getAllCustomer',[CustomerController::class,'getAll']);
        Route::post('/getDataSize',[CustomerController::class,'getSizeList']);
        Route::post('/getDataPayment',[CustomerController::class,'getPaymentList']);
        Route::post('/getDataOrder',[CustomerController::class,'getOrderList']);
        Route::post('/getDataRefund',[CustomerController::class,'getRefundList']);
        Route::post('/getDataDocument',[CustomerController::class,'getDocumentList']);
        Route::post('/getDataVisit',[CustomerController::class,'getVisitList']);
    });
});
Route::get('/login',function(){
    return inertia('Auth/Login');
})->middleware(NotLogin::class)->name('login');

Route::post('/login',[AuthController::class,'login']);
Route::get('/logout',[AuthController::class,'logout']);

Route::get('/test',[AuthController::class,'login']);
