<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StoreController extends Controller
{
    public function getAll(){
        $access = checkPermission('store');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_storelist',function($query){
            $query->orderBy('row_id','desc');
        });
        return $data;

    }
}
