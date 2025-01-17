<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\RequestOrderController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\CustomerVisitController;
use App\Http\Controllers\TransaksiController;
use App\Http\Controllers\ShippingController;
use App\Http\Middleware\IsAuthenticated;
use App\Http\Middleware\NotLogin;


Route::prefix('/')->middleware(IsAuthenticated::class)->group(function(){
    Route::get('/',[HomeController::class,'index'])->name('dashboard');

    Route::get('/profile',[HomeController::class,'profile']);

    Route::get('/dashboard_sales',[TransaksiController::class,'dashboard']);

    Route::prefix('/request_order')->group(function(){
        Route::get('/getAll/{type}',[RequestOrderController::class,'getAll']);
        Route::post('/view/{id}',[RequestOrderController::class,'view']);
        Route::post('/getDPList/{id}',[RequestOrderController::class,'getDPList']);
    });

    Route::prefix('/customer')->group(function(){
        Route::get('/',[CustomerController::class,'index']);
        Route::get('/create',[CustomerController::class,'create']);
        Route::post('/save',[CustomerController::class,'save']);
        Route::get('/form/{id}',[CustomerController::class,'form'])->name('form_customer');
        // Route::delete('/delete/{id}',[CustomerController::class,'delete']);
        Route::get('/getAllCustomer',[CustomerController::class,'getAll']);
        Route::post('/getCustomerById',[CustomerController::class,'getOneCustomer']);
        Route::post('/getDataVisit',[CustomerController::class,'getVisitList']);

        Route::group([],function(){
            Route::post('/getDataSize',[CustomerController::class,'getSizeList']);
            Route::post('/addDataSize',[CustomerController::class,'addSize']);
            Route::delete('/deleteDataSize/{id}',[CustomerController::class,'deleteSize']);
            Route::post('/editDataSize',[CustomerController::class,'editSize']);
        });
        Route::post('/getDataPayment',[CustomerController::class,'getPaymentList']);
        Route::post('/getDataOrder',[CustomerController::class,'getOrderList']);
        Route::post('/getDataRefund',[CustomerController::class,'getRefundList']);
        Route::group([],function(){
            Route::post('/getDataDocument',[CustomerController::class,'getDocumentList']);
            Route::post('/addDocument',[CustomerController::class,'addDocument']);
            Route::delete('/deleteDocument/{id}',[CustomerController::class,'deleteDocument']);
            Route::post('/editDokumen',[CustomerController::class,'editDocument']);
        });
        
    });

    Route::prefix('/customer_visit')->group(function(){
        Route::get('/',[CustomerVisitController::Class,'index']);
        Route::get('/getDataList',[CustomerVisitController::Class,'getList']);
        Route::delete('/delete/{id}',[CustomerVisitController::class,'delete']);
        Route::post('/save',[CustomerVisitController::class,'save']);
    });

    Route::prefix('/shipping')->group(function(){
        Route::get('/',[ShippingController::class,'index']);
        Route::get('/getAll',[ShippingController::class,'getAll']);
        Route::delete('/delete/{id}',[ShippingController::class,'delete']);
        Route::post('/save',[ShippingController::class,'save']);
    });

    Route::get('/inventory/getAll',[HomeController::class,'getAllInventory']);
    Route::get('/invoice/getById/{id}',[HomeController::class,'getById']);
    Route::get('/payment/getByCustomer/{id}',[HomeController::class,'getByCustomer']);
});

Route::get('/testImport',[HomeController::class,'testImport']);
Route::post('/import',[HomeController::class,'import']);
Route::post('/encrypt',function(){
    $encrypt_id = encrypt_id(request('id'));
    return response()->json(["encrypted" => $encrypt_id]);
});

Route::get('/login',function(){
    return inertia('Auth/Login');
})->middleware(NotLogin::class)->name('login');

Route::post('/login',[AuthController::class,'login']);
Route::get('/logout',[AuthController::class,'logout']);
