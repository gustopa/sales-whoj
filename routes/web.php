<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\RequestOrderController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\CustomerVisitController;
use App\Http\Controllers\TransaksiController;
use App\Http\Controllers\ShippingController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\ReparasiController;
use App\Http\Controllers\RefundController;
use App\Http\Controllers\TandaTerimaController;
use App\Http\Controllers\ExrateController;
use App\Http\Controllers\DiamondPricingController;
use App\Http\Controllers\InventoryOutController;

use App\Http\Middleware\IsAuthenticated;
use App\Http\Middleware\NotLogin;


Route::prefix('/')->middleware(IsAuthenticated::class)->group(function(){
    Route::get('/',[HomeController::class,'index'])->name('dashboard');

    Route::get('/profile',[HomeController::class,'profile']);

    Route::get('/dashboard_sales',[TransaksiController::class,'dashboard']);

    // Start Request order
    Route::prefix('/request_order')->group(function(){
        Route::get('/',[RequestOrderController::class,'index']);
        Route::get('/getAll/{type}',[RequestOrderController::class,'getAll']);
        Route::get('/getBySales/{id}',[RequestOrderController::class,'getBySales']);
        Route::get('/getCustomOrder',[RequestOrderController::class,'getCustomOrder']);
        Route::post('/view/{id}',[RequestOrderController::class,'view']);
        Route::post('/getDPList/{id}',[RequestOrderController::class,'getDPList']);
    });

    // Start Request Order By Sales
    Route::prefix('/request_order_bysales')->group(function(){
        Route::get('/',[RequestOrderController::class,'requestBySales']);
    });
    // End Request Order By Sales

    // Start reparation
    Route::prefix('/reparation')->group(function(){
        Route::get('/',[ReparasiController::class,'index']);
        Route::get('/getAll',[ReparasiController::class,'getAll']);
    });
    // End reparation

    // Start refund
    Route::prefix('/refund')->group(function(){
        Route::get('/',[RefundController::class,'index']);
        Route::get('/getAll',[RefundController::class,'getAll']);
    });
    // End refund

    // Start tanda terima
    Route::prefix('/tanda_terima')->group(function(){
        Route::get('/',[TandaTerimaController::class,'index']);
        Route::get('/getAll',[TandaTerimaController::class,'getAll']);
        Route::get('/getItem/{id}',[TandaTerimaController::class,'getItem']);
    });
    // End tanda terima

    // Start setup rate
    Route::prefix('/exrate')->group(function(){
        Route::get('/',[ExrateController::class,'index']);
        Route::get('/getAll',[ExrateController::class,'getAll']);
    });
    // End setup rate

    // Start inventory summary
    Route::prefix('/inventory_summary')->group(function(){
        Route::get('/',[InventoryController::class,'summary']);
    });
    // End inventory summary

    // Start inventory
    Route::prefix('/inventory')->group(function(){
        Route::get('/',[InventoryController::class,'inventory']);
        Route::get('/getAll',[InventoryController::class,'getAll']);
        Route::get('/getDiamond/{id}',[InventoryController::class,'getDiamond']);
    });
    // End inventory

    // Start inventory list
    Route::prefix('/inventory_list')->group(function(){
        Route::get('/',[InventoryController::class,'inventoryList']);
    });
    // End inventory list

    // Start inventory out
    Route::prefix('/inventory_out')->group(function(){
        Route::get('/',[InventoryController::class,'inventoryOut']);
        Route::get('/getAll',[InventoryOutController::class,'getAll']);
    });
    // End inventory out
    
    // Start inventory out
    Route::prefix('/inventory_out_received')->group(function(){
        Route::get('/',[InventoryOutController::class,'received']);
    });
    // End inventory out

    // Start inventory out
    Route::prefix('/inventory_movement')->group(function(){
        Route::get('/',[InventoryController::class,'movement']);
        Route::get('/getAll',[InventoryController::class,'getAllMovement']);
    });
    // End inventory out

    // Start inventory out
    Route::prefix('/photo_inventory')->group(function(){
        Route::get('/',[InventoryController::class,'photo']);
        Route::get('/getAll',[InventoryController::class,'getAllPhoto']);
    });
    // End inventory out

    // Start stock opname
    Route::prefix('/stock_opname')->group(function(){
        Route::get('/',[InventoryController::class,'stockOpname']);
    });
    // End stock opname

    // Start miscellaneous
    Route::prefix('/miscellaneous')->group(function(){
        Route::get('/',[InventoryController::class,'miscellaneous']);
        Route::get('/getAll',[InventoryController::class,'getAllMiscellaneous']);
    });
    // End miscellaneous

    // Start inventory price calculation
    Route::prefix('/inventory_price_calculation')->group(function(){
        Route::get('/',[InventoryController::class,'priceCalculation']);
        Route::get('/getAll',[InventoryController::class,'getAllPriceCalculation']);
    });
    // End inventory price calculation

    // Start daily stock
    Route::prefix('/daily_stock')->group(function(){
        Route::get('/',[InventoryController::class,'dailyStock']);
        Route::get('/getAll',[InventoryController::class,'getAllDailyStock']);
    });
    // End daily stock

    // Start diamond pricing
    Route::prefix('/diamond_pricing')->group(function(){
        Route::get('/',[DiamondPricingController::class,'diamondPricing']);
        Route::get('/getAll',[DiamondPricingController::class,'getAll']);
    });
    // End diamond pricing



    // End Request order

    // Customer
    Route::prefix('/customer')->group(function(){
        // Stat crud Customer
        Route::get('/',[CustomerController::class,'index']);
        Route::get('/create',[CustomerController::class,'create']);
        Route::post('/save',[CustomerController::class,'save']);
        Route::get('/form/{id}',[CustomerController::class,'form'])->name('form_customer');
        // End Crud customer

        // Route::delete('/delete/{id}',[CustomerController::class,'delete']);
        Route::get('/getAllCustomer',[CustomerController::class,'getAll']);
        Route::post('/getCustomerById',[CustomerController::class,'getOneCustomer']);
        Route::post('/getDataVisit',[CustomerController::class,'getVisitList']);

        // Start customer size
        Route::group([],function(){
            Route::post('/getDataSize',[CustomerController::class,'getSizeList']);
            Route::post('/addDataSize',[CustomerController::class,'addSize']);
            Route::delete('/deleteDataSize/{id}',[CustomerController::class,'deleteSize']);
            Route::post('/editDataSize',[CustomerController::class,'editSize']);
        });
        // End customer size

        // Start customer document
        Route::group([],function(){
            Route::post('/getDataDocument',[CustomerController::class,'getDocumentList']);
            Route::post('/addDocument',[CustomerController::class,'addDocument']);
            Route::delete('/deleteDocument/{id}',[CustomerController::class,'deleteDocument']);
            Route::post('/editDokumen',[CustomerController::class,'editDocument']);
        });
        // End customer document

        Route::post('/getDataPayment',[CustomerController::class,'getPaymentList']);
        Route::post('/getDataOrder',[CustomerController::class,'getOrderList']);
        Route::post('/getDataRefund',[CustomerController::class,'getRefundList']);
        
    });
    // End customer

    // Start customer visit
    Route::prefix('/customer_visit')->group(function(){
        Route::get('/',[CustomerVisitController::Class,'index']);
        Route::get('/getDataList',[CustomerVisitController::Class,'getList']);
        Route::delete('/delete/{id}',[CustomerVisitController::class,'delete']);
        Route::post('/save',[CustomerVisitController::class,'save']);
    });
    // End customer visit

    // Start shipping
    Route::prefix('/shipping')->group(function(){
        Route::get('/',[ShippingController::class,'index']);
        Route::get('/getAll',[ShippingController::class,'getAll']);
        Route::delete('/delete/{id}',[ShippingController::class,'delete']);
        Route::post('/save',[ShippingController::class,'save']);
    });
    // End shipping

    
    Route::get('/inventory/getByStore/{store_id}',[InventoryController::class,'getByStore']);
    Route::get('/invoice/getById/{id}',[HomeController::class,'getById']);
    Route::get('/payment/getByCustomer/{id}',[HomeController::class,'getByCustomer']);

    // Start payment
    Route::prefix('/payment')->group(function(){
        Route::get('/',[PaymentController::class,'index']);
        Route::post('/create',[PaymentController::class,'create']);
        Route::get('/getAll',[PaymentController::class,'getAll']);
        Route::get('/print/{id}',[PaymentController::class,'print']);
        Route::delete('/cancel/{id}',[PaymentController::class,'cancel']);
        Route::get('/form/{id}',[PaymentController::class,'form']);
    });

});

Route::get('/testImport',[HomeController::class,'testImport']);
Route::post('/import',[HomeController::class,'import']);


Route::get('/login',function(){
    return inertia('Auth/Login');
})->middleware(NotLogin::class)->name('login');

Route::post('/login',[AuthController::class,'login']);
Route::get('/logout',[AuthController::class,'logout']);
