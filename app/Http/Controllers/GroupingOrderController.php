<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GroupingOrderController extends Controller
{
    public function getAll(){
        $access = checkPermission('grouping_order');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_grouping_orderlist',function($query){
            $query->orderBy('row_id','desc');
        });
        return $data;
    }

    public function getDetailDiamond($id){
        $access = checkPermission('grouping_order');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_grouping_order_diamondlist',function($query) use ($id){
            $query->orderBy('line_id','desc');
            $query->where('row_id',decrypt_id($id));
        });
        return $data;
    }
    
}
