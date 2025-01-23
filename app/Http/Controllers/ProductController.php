<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function getAll(){
        $access = checkPermission('productname');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_product_namelist',function($query){
            $query->orderBy('row_id','desc');
        });
        return $data;
    }
}
