<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CraftsmanController extends Controller
{
    public function getAll(){
        $access = checkPermission('cratsman');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_craftsmanlist',function($query){
            $query->orderBy('row_id','desc');
        });
        return $data;
    }
}
