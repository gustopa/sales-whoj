<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ItemController extends Controller
{
    public function getAll(){
        $access = checkPermission('item');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_itemlist',function($query){
            $query->orderBy('row_id','desc');
        });
        return $data;

    }
    public function getAllType(){
        $access = checkPermission('item_type');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_item_typelist',function($query){
            $query->orderBy('row_id','desc');
        });
        return $data;

    }
    public function getAllModel(){
        $access = checkPermission('model');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_modellist',function($query){
            $query->orderBy('row_id','desc');
        });
        return $data;

    }
    public function getAllLabour(){
        $access = checkPermission('model');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_labour_pricelist',function($query){
            $query->orderBy('row_id','desc');
        });
        return $data;

    }
}
