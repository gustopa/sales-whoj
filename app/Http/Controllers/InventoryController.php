<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InventoryController extends Controller
{

    public function inventory(){
        $access = checkPermission('inventory');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();

        $totalInventoryList = DB::table("vw_inventorylist")
        ->select(DB::raw("count(*) as total"), "store_id_txt")
        ->where('status','READY')
        ->where('is_deleted',0)
        ->where('is_submitted',1)
        ->whereNotNull('store_id_txt')
        ->groupBy('store_id_txt')
        ->get();
        return inertia("Inventory/Inventory",[
            "session" => session()->all(),
            "access" => $access->menu_access,
            "menu"=> $menu,
            "totalInventoryList" => $totalInventoryList
        ]);
    }
    public function getByStore($store_id){
        if($store_id == 0){
            return response()->json([
                'rows' => [],
                'lastRow' => 0,
            ]);
        }
        $products = datatable('vw_inventorylist',function($query) use ($store_id){
            $query->where([
                ['store_id','=',$store_id],
                ['status','=','READY']
            ]);
            $query->orderby("row_id","desc");
        });
        return $products;
    }

    public function summary(){
        $access = checkPermission('inventory_summary');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        return inertia("Inventory/Summary",[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access
        ]);

    }

    public function getAll(Request $request)
    {
        $access = checkPermission('inventory');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_inventorylist',function($query){
            $query->where("is_deleted",0);
            $query->where('company_id',session('company_id'));
            $query->orderBy("row_id","desc");
        });
        return $data;
    }

    public function getDiamond($id){
        $access = checkPermission('inventory');
        if($access == null || $access == ""){
            return abort(403);
        }

        $totalDiamond = DB::table('vw_inventory_diamondlist')
        ->select(DB::raw('SUM(amount) as total_diamond'))
        ->where('row_id',decrypt_id($id))
        ->where('is_deleted',0)
        ->where('company_id',session('company_id'))
        ->value('total_diamond');
        $data = DB::table('vw_inventory_diamondlist')
        ->select('*',DB::raw("'$totalDiamond' as total_diamond"))
        ->where('row_id',decrypt_id($id))
        ->where('is_deleted',0)
        ->where('company_id',session('company_id'))
        ->orderBy('line_id','desc')->get();
        return $data;
    }

    public function inventoryList(){
        $access = checkPermission('inventory_list');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        return inertia('Inventory/InventoryList',[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access
        ]);

    }

    public function inventoryOut(){
        $access = checkPermission('inventory_out');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        return inertia('Inventory/InventoryOut',[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access
        ]);
    }

    public function movement(){
        $access = checkPermission('inventory_movement');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        return inertia('Inventory/Movement',[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access
        ]);
    }

    public function getAllMovement(){
        $access = checkPermission('inventory_movement');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable("vw_inventory_movementlist",function($query){
            $query->orderBy('row_id','desc');
        });
        return $data;
    }

    public function photo(){
        $access = checkPermission('photo_inventory');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        return inertia('Inventory/Photo',[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access
        ]);
    }
    
    public function getAllPhoto(){
        $access = checkPermission('photo_inventory');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable("vw_photo_inventorylist",function($query){
            $query->orderBy('row_id','desc');
        });
        return $data;
    }

    public function miscellaneous(){
        $access = checkPermission('miscellaneous');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        return inertia('Inventory/Miscellaneous',[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access
        ]);
    }

    public function getAllMiscellaneous(){
        $access = checkPermission('miscellaneous');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable("vw_miscellaneouslist",function($query){
            $query->orderBy('row_id','desc');
        });
        return $data;
    }

    public function priceCalculation(){
        $access = checkPermission('inventory_price_calculation');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        return inertia('Inventory/PriceCalculation',[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access
        ]);
    }

    public function getAllPriceCalculation(){
        $access = checkPermission('inventory_price_calculation');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable("vw_inventory_price_calculationlist",function($query){
            $query->orderBy('row_id','desc');
        });
        return $data;
    }

    public function dailyStock(){
        $access = checkPermission('daily_stock');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        return inertia('Inventory/DailyStock',[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access
        ]);
    }

    public function getAllDailyStock(){
        $access = checkPermission('daily_stock');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_daily_stocklist',function($query){
            $query->orderBy('row_id','desc');
        });
        return $data;
    }

    public function stockOpname(){
        $access = checkPermission('stock_opname');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        return inertia('Inventory/StockOpname',[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access
        ]);
    }
}
