<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function getAllFolder(){
        $access = checkPermission('sysfoldermenu');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_sysfoldermenulist',function($query){
            $query->orderBy('row_id','desc');
        });
        return $data;
    }
    public function getAllMenu(){
        $access = checkPermission('sysmenu');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_sysmenulist',function($query){
            $query->orderBy('row_id','desc');
        });
        return $data;
    }
}
