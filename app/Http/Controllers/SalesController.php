<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserModel;
use Illuminate\Support\Facades\DB;
class SalesController extends Controller
{
    public function getAll(){
        $access = checkPermission('sales');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_sysuserlist',function($query){
            $query->where('role_id',6);
            $query->orderBy('row_id','desc');
        });
        return $data;
    }


}
