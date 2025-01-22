<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class InventoryOutController extends Controller
{
    public function getAll(){
        $access = checkPermission('inventory_out');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_inventory_outlist',function($query){
            $query->orderBy('row_id','desc');
            if(request('status')){
                $query->whereIn('status',request('status'));
            }
        });
        return $data;
    }


    public function received(){
        $access = checkPermission('inventory_out_received');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        return inertia('Inventory/Received',[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access
        ]);
    }
}
