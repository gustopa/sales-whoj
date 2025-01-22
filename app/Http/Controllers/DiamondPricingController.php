<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DiamondPricingController extends Controller
{
    public function diamondPricing(){
        $access = checkPermission('inventory_list');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        return inertia('Inventory/DiamondPricing',[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access
        ]);
    }

    public function getAll(){
        $access = checkPermission('inventory_list');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable("vw_diamond_pricinglist",function($query){
            $query->orderBy('row_id','desc');
        });
        return $data;
    }
}
