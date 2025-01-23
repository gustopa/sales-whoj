<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CityController extends Controller
{
    public function getAll(){
        $access = checkPermission('city');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_citylist',function($query){
            $query->orderBy('row_id','desc');
        });
        return $data;
    }
}
