<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class RequestOrderController extends Controller
{
    public function getAll(){
        // $request_order = DB::table('request_order')
        // ->select(
        //     "request_order.doc_no as DocNo",
        //     'customer.name as Customer',
        //     'request_order.trans_date as Tanggal',
        //     'request_order.estimated_date as PerkiraanDelivery',
        //     'item.name as TipeItem',
        //     'request_order.name as NamaItem',
        //     'request_order.estimated_price as HargaPerkiaraan',
        //     'request_order.status as Status',
        //     'request_order.type_order as TipeOrder'
        // )
        // ->leftJoin('customer','request_order.customer_id','=','customer.row_id')
        // ->leftJoin('item','request_order.item_id','=','item.row_id')
        // ->leftJoin('grouping_order','request_order.grouping_order_id','=','grouping_order.row_id')
        // ->whereIn('request_order.status',['ORDER','ON GOING'])
        // ->where('request_order.type_order','CUSTOM')
        // ->where('request_order.is_deleted','0')
        // ->where('request_order.company_id',session('company_id'))
        // ->get();
        $request_order = DB::table('vw_request_orderlist')
        ->whereIn('status',['ORDER','ON GOING'])
        ->where('type_order','CUSTOM')
        ->where('is_deleted',0)
        ->get();
        return response()->json([
            "data" => $request_order
        ]);
    }

    public function view($id){
        $request_order_diamond_list = DB::table('vw_request_order_diamondlist')
        ->where('row_id',$id)
        ->where('is_deleted',0)
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
}
