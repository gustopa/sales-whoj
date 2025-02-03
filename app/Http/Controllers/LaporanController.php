<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class LaporanController extends Controller
{
    public function penjualan(){
        $access = checkPermission('report_sellout');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        $sales = DB::table('vw_sysuserlist')->select('row_id','name')->where([
            ['is_deleted','=',0],
            ['is_submitted','=',1],
            ['role_id','=','6'],
        ])->get();
        $items = DB::table('vw_itemlist')->select('row_id','name')->where([
            ['is_submitted','=',1]
        ])->get();
        return inertia('Laporan/Penjualan',[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access,
            "sales" => $sales,
            "items" => $items
        ]);
    }
    public function stockOpName(){
        $access = checkPermission('report_stock');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        $stores = DB::table('vw_storelist')->select('row_id','name')->where([
            ['is_deleted','=',0],
        ])->get();
        return inertia('Laporan/StockOpName',[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access,
            "stores" => $stores
        ]);
    }
    public function inventory(){
        $access = checkPermission('report_inventory');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        // $list = DB::table('vw_inventoryprintlist')
        // ->selectRaw('DISTINCT ses_id, modified_by, CAST(modified_date AS DATE) AS modified_date')
        // ->orderByDesc('modified_date')
        // ->get();
        $list = [];
        return inertia('Laporan/Inventory',[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access,
            "list" => $list
        ]);
    }
    public function requestOrder(){
        $access = checkPermission('report_request_order');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        return inertia('Laporan/RequestOrder',[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access
        ]);
    }
    public function notaPenjualan(){
        $access = checkPermission('report_nota_penjualan');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        $sales = DB::table('vw_sysuserlist')->select('row_id','name')->where([
            ['is_deleted','=',0],
            ['is_submitted','=',1],
            ['role_id','=','6'],
        ])->get();
        return inertia('Laporan/NotaPenjualan',[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access,
            "sales" => $sales
        ]);
    }
    public function requestOrderSummary(){
        $access = checkPermission('request_order_summary');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        return inertia('Laporan/RequestOrderSummary',[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access
        ]);
    }
    public function paymentSummary(){
        $access = checkPermission('payment_summary');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        return inertia('Laporan/PaymentSummary',[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access
        ]);
    }
    public function craftsman(){
        $access = checkPermission('report_craftsman');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        $craftsman = DB::table('vw_craftsmanlist')->where('is_deleted',0)->get();
        return inertia('Laporan/Craftsman',[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access,
            "craftsman" => $craftsman
        ]);
    }

    public function getDataPaymentSummary($tanggal,$idType){
        $access = checkPermission('payment_summary');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_paymentlist',function($query) use ($tanggal,$idType){
            $query->where('payment_type_id',$idType);
            $query->whereDate('trans_date',$tanggal);
        });
        return $data;
    }
}
