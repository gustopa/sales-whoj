<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DiamondPricingModel;
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

    public function tambah(Request $request){
        $access = checkPermission("diamond_pricing");
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        DiamondPricingModel::insert($request['data']);
        return response()->json(["message" => "berhasil"]);
    }

    public function edit($id){
        $access = checkPermission("diamond_pricing");
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        $request = request();
        DiamondPricingModel::where('row_id',$id)->update($request['data']);
        return response()->json(["messaage" => "berhasil"]);
    }
    public function delete($id){
        $access = checkPermission("diamond_pricing");
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        DiamondPricingModel::where('row_id',$id)->update([
            "is_deleted" => 1,
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username')
        ]);
        return response()->json(["messaage" => "berhasil"]);
    }
}
