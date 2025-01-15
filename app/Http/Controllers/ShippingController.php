<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ShippingModel;
use App\Http\Controllers\CustomerController;
class ShippingController extends Controller
{
    public function index(){
        $access = checkPermission('shipping');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        $customerController = new CustomerController();
        $customer = $customerController->getAll();
        return inertia('Shipping/Shipping',['menu'=>$menu,'session'=>session()->all(),'customer' => $customer,"access" => $access->menu_access]);
    }
    public function getAll(){
        $access = checkPermission('shipping');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_shippinglist',["field" => "row_id","order" => "desc"]);
        return $data;
    }

    public function delete($id){
        ShippingModel::where('row_id',$id)->update([
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username'),
            "is_deleted" => 1
        ]);
        return response()->json([
            "data" => "berhasil"
        ]);
    }
}
