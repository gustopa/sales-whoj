<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PositionController extends Controller
{
    public function getAll(){
        $access = checkPermission('position');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_positionlist',function($query){
            $query->orderBy('row_id','desc');
        });
        return $data;
    }
}
