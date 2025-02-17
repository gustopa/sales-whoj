<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\InventoryModel;
use App\Models\StoreModel;
use App\Models\LocationModel;
use App\Models\PositionModel;
use App\Models\JenisModel;
use App\Models\ItemModel;
use App\Models\ModelModel;
use App\Models\LabourPriceModel;
use App\Models\InventoryMovementModel;

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

    public function create(){
        $access = checkPermission('inventory');
        if($access == null || $access == "" || $access == "Read only"){
            return abort(403);
        }
        $row_id = DB::transaction(function(){
            $lastPLU = InventoryModel::latest('row_id')->first()->identity_code;
            $currentPLU = incrementPLU($lastPLU);
            $rate_beli = 0;
            $rate_jual = 0;
		    $profit_margin = 0;
		    $gold_price = 0;
            $exrate = DB::table('exrate')->where('row_id',1)->first();
            if(!empty($exrate)){
                $rate_beli = $exrate->rate_beli;
                $rate_jual = $exrate->rate_jual;
                $profit_margin = $exrate->profit_margin;
                $gold_price = $exrate->gold_price;
            }
            $newProduct = InventoryModel::create([
                "is_submitted" => 1, 
                "identity_code" => $currentPLU, 
                "store_id" => 1, 
                "gold_grade" => "750", 
                "company_id" => session('company_id'),
                "status" => "READY", 
                "buy_rate" => $rate_beli, 
                "sold_rate" => $rate_jual,
                "profit_margin" => $profit_margin,
                "markup" => $profit_margin,
                "location_id" => 0,
                "position_id" => 0,
                "product_name_id" => 0,
                "kode_supplier" => "",
                "calc_price" => 0,
                "file_certificate" => "",
                "ses_id" => session("session_id"),	
                "production_cost" => 0,			
                "gold_price" => $gold_price,
                "created_date" => date("Y-m-d H:i:s"),
                "created_by" => session('username'),
                "modified_date" => date("Y-m-d H:i:s"),
                "modified_by" => session('username')
            ]);
            InventoryMovementModel::insert([
                "company_id" => session('company_id'),
                "inventory_id" => $newProduct->id,
                "notes" => "Input data Inventory",
                "trans_date" => date("Y-m-d H:i:s"),
                "is_deleted" => 0,
                "created_date" => date("Y-m-d H:i:s"),
                "created_by" => session('username'),
                "modified_date" => date("Y-m-d H:i:s"),
                "modified_by" => session('username')
            ]);
            updateLastId('inventory_id');
            return $newProduct->id;
        });

        return redirect('/inventory/form/'.encrypt_id($row_id));
    }

    public function getPhoto(){
        $data = datatable("vw_photo_inventorylist",function($query){
            $query->where('photo','!=',"");
        });
        return $data;
    }
    public function getPesanan(){
        $data = datatable('vw_request_orderlist',function($query){
            $query->select('row_id','customer_id_txt','name','down_payment');
            $query->where('status','READY');
        });
        return $data;
    }
    public function form($id){
        $access = checkPermission('inventory');
        if($access == null || $access == "" || $access == "Read only"){
            return abort(403);
        }

        $inventory = DB::table('vw_inventorylist')->where('row_id',decrypt_id($id))->first();
        $stores = StoreModel::where('company_id',session('company_id'))->where('is_deleted',0)->select('row_id','name')->get();
        $locations = LocationModel::where('is_deleted',0)->where('company_id',session('company_id'))->get();
        $positions = PositionModel::where('is_deleted',0)->where('company_id',session('company_id'))->get();
        $types = JenisModel::where('company_id',session('company_id'))->where('is_deleted',0)->get();
        $items = ItemModel::where('company_id',session('company_id'))->where('is_deleted',0)->get();
        $models = ModelModel::where('company_id',session('company_id'))->where('is_deleted',0)->get();
        $sources = ["MAHAKARYA","OUTSOURCE"];
        $status_list = array("READY", "REFUND", "SOLD", "RESIZE", "RETUR KE SUPPLIER", "RETUR KE PUSAT", "EXCHANGE", "PENDING","WP","GIFT");
        $labour_price = LabourPriceModel::where('is_deleted',0)->where('company_id',session('company_id'))->get();
        $menu = listMenu();
        return inertia('Inventory/Form',[
            "inventory" => $inventory,
            "stores" => $stores,
            "locations" => $locations,
            "positions" => $positions,
            "types" => $types,
            "items" => $items,
            "models" => $models,
            "sources" => $sources,
            "status_list" => $status_list,
            "menu" => $menu,
            "labour_price"=> $labour_price,
            "session" => session()->all()
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
        $baseQuery = DB::table('vw_inventorylist')
            ->where('is_deleted', 0)
            ->where('is_submitted', 1)
            ->whereNotNull('store_id_txt');

        $summary_storelist = (clone $baseQuery)
            ->select(
                'store_id_txt as name',
                DB::raw('count(*) as total')
            )
            ->where('status', 'READY')
            ->groupBy('store_id_txt')
            ->get();

        $summary_statuslist = (clone $baseQuery)
            ->select(
                'status as name',
                DB::raw('count(*) as total')
            )
            ->whereIn('status', ['READY','SOLD','BUYBACK','EXCHANGE'])
            ->groupBy('status')
            ->get();

        $summary_itemlist = (clone $baseQuery)
            ->select(
                'item_id_txt as name',
                DB::raw('count(*) as total')
            )
            ->where('status', 'READY')
            ->groupBy('item_id_txt')
            ->get();

        return inertia("Inventory/Summary",[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access,
            'store_list' => $summary_storelist,
            'status_list' => $summary_statuslist,
            'item_list' => $summary_itemlist
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
    public function getAllDiamondPriceCalculation($id){
        $access = checkPermission('inventory_price_calculation');
        if($access == null || $access == ""){
            return abort(403);
        }
        $totalDiamond = DB::table('vw_inventory_price_calculation_diamondlist')
        ->select(DB::raw('SUM(amount) as total_diamond'))
        ->where('row_id',decrypt_id($id))
        ->where('is_deleted',0)
        ->where('company_id',session('company_id'))
        ->value('total_diamond');
        $data = DB::table('vw_inventory_price_calculation_diamondlist')
        ->select('*',DB::raw("'$totalDiamond' as total_diamond"))
        ->where('row_id',decrypt_id($id))
        ->where('is_deleted',0)
        ->where('company_id',session('company_id'))
        ->orderBy('line_id','desc')->get();
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

    public function getDetail($id){
        $access = checkPermission('inventory_out');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_inventory_out_detaillist',function($query) use ($id){
            $query->where('row_id',decrypt_id($id));
            $query->orderBy('row_id','desc');
        });
        return $data;
    }
}
