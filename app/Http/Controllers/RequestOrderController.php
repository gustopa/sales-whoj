<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class RequestOrderController extends Controller
{

    public function index(){
        $access = checkPermission('request_order');
        if($access == null || $access == "" ){
            return abort(403);
        }
        $menu = listMenu();
        return inertia("RequestOrder/RequestOrder",[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access
        ]);
        
    }

    function getCustomOrder(){
        $status = request('status');
        $status = array_map(function($value){
            return $value === null ? "" : $value;
        },$status);
        $data = datatable('vw_request_orderlist',function($query) use ($status){
            $query->whereIn("status",$status);
            $query->whereIn('type_order',['CUSTOM', 'Custom (DP PO)', 'Custom (DP Stock)', 'Custom (DP Stock)', 'Nabung Bareng']);
            $query->orderBy('row_id','desc');
        });
        return $data;
    }
    public function getAll($type){
        $request_order = datatable("vw_request_orderlist",function ($query) use ($type) {
            $query->whereIn('status',['ORDER','ON GOING']);
            $query->where('type_order',$type);
        });
        return $request_order;
    }

    public function getBySales($id){
        $status = request('status');
        $status = array_map(function($value){
            return $value === null ? "" : $value;
        },$status);
        $data = datatable("vw_request_orderlist",function($query) use ($id,$status){
            $query->where('sales_id',$id);
            $query->whereIn('status',$status);
            $query->whereIn('type_order',['CUSTOM', 'Custom (DP PO)', 'Custom (DP Stock)', 'Custom (DP Stock)', 'Nabung Bareng']);
            $query->orderBy('row_id','asc');
        });
        return $data;
    }

    public function view($id){
        $request_order_diamond_list = DB::table('vw_request_order_diamondlist')
        ->where('row_id',$id)
        ->where('is_deleted',0)
        ->orderBy('line_id','DESC')
        ->get();
        return response()->json([
            "data" => $request_order_diamond_list
        ]);
    }

    public function getDPList($id){
        $ListDP = DB::table('vw_request_order_dplist')->where('row_id',$id)->where('is_deleted',0)->get();
        return response()->json([
            "data" => $ListDP
        ]);
    }


    public function requestBySales(){
        $access = checkPermission('Request_order_bysales');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        return inertia("RequestOrder/BySales",[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access
        ]);
    }
}
