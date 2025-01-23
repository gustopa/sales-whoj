<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getAll(){
        $access = checkPermission('sysuser');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_sysuserlist',function($query){
            $query->orderBy('row_id','desc');
            $query->where('is_submitted',1);
        });
        return $data;
    }
}
