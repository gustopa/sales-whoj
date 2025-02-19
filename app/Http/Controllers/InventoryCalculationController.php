<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\InventoryCalculationModel;
use App\Models\LabourPriceModel;
use Illuminate\Support\Facades\DB;
class InventoryCalculationController extends Controller
{
    public function tambah(){
        $access = checkPermission("inventory_price_calculation");
        if($access == null || $access == "" || $access == "Read only"){
            return abort(403);
        }
        $rate_beli = 0;
		$rate_jual = 0;
		$profit_margin = 0;
		$gold_price = 0;
        $exrate = DB::table('exrate')->first();
        if(!empty($exrate)) {
			$rate_beli = $exrate->rate_beli;
			$rate_jual = $exrate->rate_jual;
			$profit_margin = $exrate->profit_margin;
			$gold_price = $exrate->gold_price;
		}
        $id = InventoryCalculationModel::create([
            "company_id" => session('company_id'),
            "location_id" => 0,
            "gold_grade" => "750", 
			"buy_rate" => $rate_beli, 
			"sold_rate" => $rate_jual,
			"profit_margin" => $profit_margin,
			"gold_price" => $gold_price,
            "created_date" => date("Y-m-d H:i:s"),
            "created_by" => session('username'),
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username')
        ]);
        return redirect('/inventory_price_calculation/form/'.encrypt_id($id->id));
    }

    public function form($id){
        $access = checkPermission("inventory_price_calculation");
        if($access == null || $access == "" || $access == "Read only"){
            return abort(403);
        }
        $row_id = decrypt_id($id);
        $sources = ["MAHAKARYA","OUTSOURCE"];
        $labour_price_list = LabourPriceModel::where('is_deleted',0)->where('company_id',session('company_id'))->get();
        $data = InventoryCalculationModel::where('row_id',$row_id)->first();
        $menu = listMenu();
        return inertia('Inventory/components/FormPriceCalculation',[
            "sources" => $sources,
            "labour_price_list" => $labour_price_list,
            "data" => $data,
            "menu" => $menu,
            "session" => session()->all()
        ]);
    }

    public function getDiamond($id){
        $access = checkPermission("inventory_price_calculation");
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = DB::table('vw_inventory_price_calculation_diamondlist')->where('is_deleted',0)->where('row_id',$id)->get();
        return response()->json($data);

    }
}
