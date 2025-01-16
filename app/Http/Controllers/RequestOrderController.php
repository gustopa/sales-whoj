<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class RequestOrderController extends Controller
{
    public function getAll($type){
        $request_order = datatable("vw_request_orderlist",function ($query) use ($type) {
            $query->whereIn('status',['ORDER','ON GOING']);
            $query->where('type_order',"CUSTOM");
        });
        return $request_order;
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
}
