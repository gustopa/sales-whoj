<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function getByStore($store_id){
        if($store_id == 0){
            return response()->json([
                'rows' => [],
                'lastRow' => 0,
            ]);
        }
        $products = datatable('vw_inventorylist',function($query) use ($store_id){
            $query->where([
                ['store_id','=',$store_id],
                ['status','=','READY']
            ]);
            $query->orderby("row_id","desc");
        });
        return $products;
    }
}
