<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function getAll(){
        $access = checkPermission('location');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_locationlist',function($query){
            $query->orderBy('row_id','desc');
        });
        return $data;

    }
}
