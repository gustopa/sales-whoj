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
use App\Http\Controllers\MasterController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\GroupingOrderController;
use App\Http\Controllers\SalesController;
use App\Http\Controllers\CraftsmanController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\KonfigurasiController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\VoucherController;

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
        Route::get('/getByCustomer/{id}',[RequestOrderController::class,'getByCustomer']);
        Route::get('/getAllCustomOrder/{status}',[RequestOrderController::class,'getAllCustom']);
        Route::get('/getBySales/{id}',[RequestOrderController::class,'getBySales']);
        Route::get('/getCustomOrder',[RequestOrderController::class,'getCustomOrder']);
        Route::post('/view/{id}',[RequestOrderController::class,'view']);
        Route::post('/getDPList/{id}',[RequestOrderController::class,'getDPList']);
        Route::get('/print/{id}',[RequestOrderController::class,'print']);
        Route::get('/print_dp/{id}',[RequestOrderController::class,'printDp']);
        Route::delete('/delete/{id}',[RequestOrderController::class,'delete']);
        Route::post('/order_ready/{id}',[RequestOrderController::class,'orderReady']);

        Route::post('/create',[RequestOrderController::class,'create']);
        Route::get('/form/{id}',[RequestOrderController::class,'form']);
        Route::post('/save',[RequestOrderController::class,'save']);
        Route::get('/getDiamondDetail/{id}',[RequestOrderController::class,'getDiamondDetail']);
        Route::post('/addDiamondDetail',[RequestOrderController::class,'addDiamondDetail']);
        Route::get('/getDownPayment/{id}',[RequestOrderController::class,'getDownPayment']);
        Route::post('/tambahDownPayment',[RequestOrderController::class,'tambahDownPayment']);
        Route::post('/editDownPayment/{id}',[RequestOrderController::class,'editDownPayment']);
        Route::delete('/deleteDownPayment/{id}',[RequestOrderController::class,'deleteDownPayment']);
        Route::post('/setGroupingOrder',[RequestOrderController::class,'setGroupingOrder']);
        Route::post('/tambahDiamond',[RequestOrderController::class,'tambahDiamond']);
        Route::post('/editDiamond/{id}',[RequestOrderController::class,'editDiamond']);
        Route::delete('/deleteDiamond/{id}',[RequestOrderController::class,'deleteDiamond']);
    });
    // End Request order

    // Start Request Order By Sales
    Route::prefix('/request_order_bysales')->group(function(){
        Route::get('/',[RequestOrderController::class,'requestBySales']);
        Route::get('/form/{id}',[RequestOrderController::class,'formRequestBySales']);
    });
    // End Request Order By Sales

    // Start reparation
    Route::prefix('/reparation')->group(function(){
        Route::get('/',[ReparasiController::class,'index']);
        Route::get('/getAll',[ReparasiController::class,'getAll']);
        Route::post('/create',[ReparasiController::class,'create']);
        Route::delete('/delete/{id}',[ReparasiController::class,'delete']);
        Route::get('/form/{id}',[ReparasiController::class,'form']);
        Route::get('/getPayment/{id}',[ReparasiController::class,'getPayment']);
        Route::post('/tambahPayment',[ReparasiController::class,'tambahPayment']);
        Route::post('/editPayment/{id}',[ReparasiController::class,'editPayment']);
        Route::delete('/deletePayment/{id}',[ReparasiController::class,'deletePayment']);
        Route::post('/save',[ReparasiController::class,'save']);
        Route::get('/print_reparasi/{id}',[ReparasiController::class,'print']);
        Route::get('/print_pelunasan/{id}',[ReparasiController::class,'printPelunasan']);
    });
    // End reparation

    // Start refund
    Route::prefix('/refund')->group(function(){
        Route::get('/',[RefundController::class,'index']);
        Route::get('/getAll',[RefundController::class,'getAll']);
        Route::post('/create',[RefundController::class,'create']);
        Route::get('/form/{id}',[RefundController::class,'form']);
        Route::post('/save',[RefundController::class,'save']);
        Route::get('/print/{id}',[RefundController::class,'print']);
        Route::post('/cancel/{id}',[RefundController::class,'cancel']);
    });
    // End refund

    // Start tanda terima
    Route::prefix('/tanda_terima')->group(function(){
        Route::get('/',[TandaTerimaController::class,'index']);
        Route::get('/getAll',[TandaTerimaController::class,'getAll']);
        Route::get('/getItem/{id}',[TandaTerimaController::class,'getItem']);
        Route::post('/create',[TandaTerimaController::class,'create']);
        Route::get('/form/{id}',[TandaTerimaController::class,'form']);
        Route::post('/tambahItem',[TandaTerimaController::class,'tambahItem']);
        Route::post('/editItem/{id}',[TandaTerimaController::class,'editItem']);
        Route::delete('/deleteItem/{id}',[TandaTerimaController::class,'deleteItem']);
        Route::get('/print/{id}',[TandaTerimaController::class,'print']);
        Route::post('/save/{id}',[TandaTerimaController::class,'save']);
        Route::delete('/delete/{id}',[TandaTerimaController::class,'delete']);
    });
    // End tanda terima

    // Start setup rate
    Route::prefix('/exrate')->group(function(){
        Route::get('/',[ExrateController::class,'index']);
        Route::get('/getAll',[ExrateController::class,'getAll']);
        Route::post('/edit/{id}',[ExrateController::class,'edit']);
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
        Route::get('/getDetail/{id}',[InventoryController::class,'getDetail']);
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
        Route::get('/getDiamond/{id}',[InventoryController::class,'getAllDiamondPriceCalculation']);
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

    Route::name('Master')->group(function(){
        Route::prefix('/voucher')->group(function(){
            Route::get('/',[MasterController::class,'voucher']);
            Route::get('/getAll',[VoucherController::class,'getAll']);
            Route::get('/getLastCode/{code}',[VoucherController::class,'getLastCode']);
            Route::post('/add',[VoucherController::class,'create']);
            Route::post('/edit/{id}',[VoucherController::class,'edit']);
            Route::delete('/delete/{id}',[VoucherController::class,'delete']);
            Route::post('/checkVoucher',[VoucherController::class,'checkVoucher']);
        });

        Route::prefix('/item')->group(function(){
            Route::get('/',[MasterController::class,'item']);
            Route::get('/getAll',[ItemController::class,'getAll']);
            Route::post('/tambah',[ItemController::class,'tambah']);
            Route::post('/edit/{id}',[ItemController::class,'edit']);
            Route::delete('/delete/{id}',[ItemController::class,'delete']);
        });

        Route::prefix('/item_type')->group(function(){
            Route::get('/',[MasterController::class,'itemType']);
            Route::get('/getAll',[ItemController::class,'getAllType']);
            Route::post('/tambah',[ItemController::class,'tambahJenis']);
            Route::post('/edit/{id}',[ItemController::class,'editJenis']);
            Route::delete('/delete/{id}',[ItemController::class,'deleteJenis']);
        });

        Route::prefix('/model')->group(function(){
            Route::get('/',[MasterController::class,'model']);
            Route::get('/getAll',[ItemController::class,'getAllModel']);
            Route::post('/tambah',[ItemController::class,'tambahModel']);
            Route::post('/edit/{id}',[ItemController::class,'editModel']);
            Route::delete('/delete/{id}',[ItemController::class,'deleteModel']);
        });

        Route::prefix('/store')->group(function(){
            Route::get('/',[MasterController::class,'store']);
            Route::get('/getAll',[storeController::class,'getAll']);
            Route::post('/tambah',[storeController::class,'tambah']);
            Route::post('/edit/{id}',[storeController::class,'edit']);
            Route::delete('/delete/{id}',[storeController::class,'delete']);
        });

        Route::prefix('/trans_type')->group(function(){
            Route::get('/',[MasterController::class,'transType']);
            Route::get('/getAll',[TransaksiController::class,'getAllType']);
            Route::post('/tambah',[TransaksiController::class,'tambah']);
            Route::post('/edit/{id}',[TransaksiController::class,'edit']);
            Route::delete('/delete/{id}',[TransaksiController::class,'delete']);
        });

        Route::prefix('/payment_type')->group(function(){
            Route::get('/',[MasterController::class,'paymentType']);
            Route::get('/getAll',[PaymentController::class,'getAllType']);
            Route::post('/tambah',[PaymentController::class,'tambahType']);
            Route::post('/edit/{id}',[PaymentController::class,'editType']);
            Route::delete('/delete/{id}',[PaymentController::class,'deleteType']);
        });

        Route::prefix('/edc')->group(function(){
            Route::get('/',[MasterController::class,'edc']);
            Route::get('/getAll',[PaymentController::class,'getAllEdc']);
            Route::post('/tambah',[PaymentController::class,'tambahEdc']);
            Route::post('/edit/{id}',[PaymentController::class,'editEdc']);
            Route::delete('/delete/{id}',[PaymentController::class,'deleteEdc']);
        });

        Route::prefix('/location')->group(function(){
            Route::get('/',[MasterController::class,'location']);
            Route::get('/getAll',[LocationController::class,'getAll']);
            Route::post('/tambah',[LocationController::class,'tambah']);
            Route::post('/edit/{id}',[LocationController::class,'edit']);
            Route::delete('/delete/{id}',[LocationController::class,'delete']);
        });

        Route::prefix('/labour_price')->group(function(){
            Route::get('/',[MasterController::class,'labourPrice']);
            Route::get('/getAll',[ItemController::class,'getAllLabour']);
            Route::post('/tambah',[ItemController::class,'tambahLabour']);
            Route::post('/edit/{id}',[ItemController::class,'editLabour']);
            Route::delete('/delete/{id}',[ItemController::class,'deleteLabour']);
        });

        Route::prefix('/position')->group(function(){
            Route::get('/',[MasterController::class,'position']);
            Route::get('/getAll',[PositionController::class,'getAll']);
            Route::post('/tambah',[PositionController::class,'tambah']);
            Route::post('/edit/{id}',[PositionController::class,'edit']);
            Route::delete('/delete/{id}',[PositionController::class,'delete']);
        });

        Route::prefix('/grouping_order')->group(function(){
            Route::get('/',[MasterController::class,'groupingOrder']);
            Route::get('/getAll',[GroupingOrderController::class,'getAll']);
            Route::get('/getDetailDiamond/{id}',[GroupingOrderController::class,'getDetailDiamond']);
            Route::post('/create',[GroupingOrderController::class,'create']);
            Route::get('/form/{id}',[GroupingOrderController::class,'form']);
            Route::delete('/delete/{id}',[GroupingOrderController::class,'delete']);
            Route::get('/getDiamondDetail/{id}',[GroupingOrderController::class,'getDiamondDetail']);
            Route::post('/addDiamond',[GroupingOrderController::class,'addDiamond']);
            Route::post('/editDiamond/{id}',[GroupingOrderController::class,'editDiamond']);
            Route::delete('/deleteDiamond/{id}',[GroupingOrderController::class,'deleteDiamond']);
            Route::post('/save',[GroupingOrderController::class,'save']);
        });

        Route::prefix('/sales')->group(function(){
            Route::get('/',[MasterController::class,'sales']);
            Route::get('/getAll',[SalesController::class,'getAll']);
            Route::post('/tambah',[SalesController::class,'tambah']);
            Route::post('/edit/{id}',[SalesController::class,'edit']);
            Route::delete('/delete/{id}',[SalesController::class,'delete']);
        });

        Route::prefix('/craftsman')->group(function(){
            Route::get('/',[MasterController::class,'craftsman']);
            Route::get('/getAll',[CraftsmanController::class,'getAll']);
            Route::post('/tambah',[CraftsmanController::class,'tambah']);
            Route::post('/edit/{id}',[CraftsmanController::class,'edit']);
            Route::delete('/delete/{id}',[CraftsmanController::class,'delete']);
        });

        Route::prefix('/city')->group(function(){
            Route::get('/',[MasterController::class,'city']);
            Route::get('/getAll',[CityController::class,'getAll']);
            Route::post('/tambah',[CityController::class,'tambah']);
            Route::post('/edit/{id}',[CityController::class,'edit']);
            Route::delete('/delete/{id}',[CityController::class,'delete']);
        });

        Route::prefix('/productname')->group(function(){
            Route::get('/',[MasterController::class,'productname']);
            Route::get('/getAll',[ProductController::class,'getAll']);
            Route::post('/tambah',[ProductController::class,'tambah']);
            Route::post('/edit/{id}',[ProductController::class,'edit']);
            Route::delete('/delete/{id}',[ProductController::class,'delete']);
        });


    });    

    // Start Laporan
    Route::name('laporan')->group(function(){
        Route::prefix('/report_sellout')->group(function(){
            Route::get('/',[LaporanController::class,'penjualan'])->name('penjualan');
            Route::post('/export',[LaporanController::class,'exportPenjualan']);
        });
        Route::prefix('/report_stock')->group(function(){
            Route::get('/',[LaporanController::class,'stockOpName'])->name('stock');
            Route::post('/export',[LaporanController::class,'printStock']);
        });
        Route::prefix('/report_inventory')->group(function(){
            Route::get('/',[LaporanController::class,'inventory'])->name('inventory');
            Route::get('/getSessionList',[LaporanController::class,'getSession']);
            Route::post('/print',[LaporanController::class,'printInventory']);
        });
        Route::prefix('/report_request_order')->group(function(){
            Route::get('/',[LaporanController::class,'requestOrder'])->name('pesanan');
        });
        Route::prefix('/report_nota_penjualan')->group(function(){
            Route::get('/',[LaporanController::class,'notaPenjualan'])->name('nota_penjualan');
        });
        Route::prefix('/request_order_summary')->group(function(){
            Route::get('/',[LaporanController::class,'requestOrderSummary'])->name('outstanding_pesanan');
        });
        Route::prefix('/payment_summary')->group(function(){
            Route::get('/',[LaporanController::class,'paymentSummary'])->name('payment_summary');
            Route::get('/getData/{tanggal}/{idType}',[LaporanController::class,'getDataPaymentSummary']);
        });
        Route::prefix('/report_craftsman')->group(function(){
            Route::get('/',[LaporanController::class,'craftsman'])->name('craftsman');
        });
    });
    // End Laporan

    // Start konfigurasi
    Route::name('konfigurasi')->group(function(){
        Route::prefix('/syscompany')->group(function(){
            Route::get('/',[KonfigurasiController::class,'syscompany']);
        });
        Route::prefix('/syswebinfo')->group(function(){
            Route::get('/',[KonfigurasiController::class,'syswebinfo']);
        });
        Route::prefix('/sysuser')->group(function(){
            Route::get('/',[KonfigurasiController::class,'sysuser']);
            Route::get('/getAll',[UserController::class,'getAll']);
        });
        Route::prefix('/sysfoldermenu')->group(function(){
            Route::get('/',[KonfigurasiController::class,'sysfoldermenu']);
            Route::get('/getAll',[MenuController::class,'getAllFolder']);
        });
        Route::prefix('/sysmenu')->group(function(){
            Route::get('/',[KonfigurasiController::class,'sysmenu']);
            Route::get('/getAll',[MenuController::class,'getAllMenu']);
        });
        Route::prefix('/sysrole')->group(function(){
            Route::get('/',[KonfigurasiController::class,'sysrole']);
            Route::get('/getAll',[RoleController::class,'getAll']);
        });
        Route::prefix('/sysaccess')->group(function(){
            Route::get('/',[KonfigurasiController::class,'sysaccess']);
            Route::get('/getAll',[RoleController::class,'getAllAccess']);
            Route::get('/getListAccess/{id}',[RoleController::class,'getListAccess']);
        });
    });
    // End konfigurasi


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
        Route::post('/save',[PaymentController::class,'save']);
        Route::get('/getAll',[PaymentController::class,'getAll']);
        Route::get('/print/{id}',[PaymentController::class,'print']);
        Route::delete('/cancel/{id}',[PaymentController::class,'cancel']);
        Route::get('/form/{id}',[PaymentController::class,'form']);
        Route::get('/getDetail/{id}',[PaymentController::class,'getDetail']);
    });

});

Route::get('/testImport',[HomeController::class,'testImport']);
Route::post('/import',[HomeController::class,'import']);


Route::get('/login',function(){
    return inertia('Auth/Login');
})->middleware(NotLogin::class)->name('login');

Route::post('/login',[AuthController::class,'login']);
Route::get('/logout',[AuthController::class,'logout']);
