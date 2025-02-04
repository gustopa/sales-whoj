<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\RequestOrderModel;
class RequestOrderController extends Controller
{

    public function index(){
        $access = checkPermission('request_order');
        if($access == null || $access == "" ){
            return abort(403);
        }
        $menu = listMenu();
        return inertia("RequestOrder/RequestOrder",[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access
        ]);
        
    }

    function getCustomOrder(){
        $status = request('status');
        $status = array_map(function($value){
            return $value === null ? "" : $value;
        },$status);
        $data = datatable('vw_request_orderlist',function($query) use ($status){
            $query->where('doc_no','not like', '');
            $query->whereIn("status",$status);
            $query->whereIn('type_order',['CUSTOM', 'Custom (DP PO)', 'Custom (DP Stock)', 'Custom (DP Stock)', 'Nabung Bareng']);
            $query->orderBy('row_id','desc');
        });
        return $data;
    }

    function getAllCustom($status){
        $data = datatable('vw_request_orderlist',function($query) use ($status){
            $query->where("status",$status);
            $query->where('type_order','CUSTOM');
            $query->orderBy('row_id','desc');
        });
        return $data;
    }

    public function getAll($type){
        $request_order = datatable("vw_request_orderlist",function ($query) use ($type) {
            $query->whereIn('status',['ORDER','ON GOING']);
            $query->where('type_order',$type);
            $query->orderBy('row_id','desc');
        });
        return $request_order;
    }

    public function getByCustomer($id){
        $data = datatable('vw_request_orderlist',function($query) use ($id){
            $query->where('customer_id',decrypt_id($id));
            $query->where('status','READY');
        });

        return $data;
    }

    public function getBySales($id){
        $status = request('status');
        $status = array_map(function($value){
            return $value === null ? "" : $value;
        },$status);
        $data = datatable("vw_request_orderlist",function($query) use ($id,$status){
            $query->where('sales_id',$id);
            $query->whereIn('status',$status);
            $query->whereIn('type_order',['CUSTOM', 'Custom (DP PO)', 'Custom (DP Stock)', 'Custom (DP Stock)', 'Nabung Bareng']);
            $query->orderBy('row_id','asc');
        });
        return $data;
    }

    public function view($id){
        $request_order_diamond_list = DB::table('vw_request_order_diamondlist')
        ->where('row_id',$id)
        ->where('is_deleted',0)
        ->orderBy('line_id','DESC')
        ->get();
        return response()->json([
            "data" => $request_order_diamond_list
        ]);
    }

    public function getDPList($id){
        $ListDP = DB::table('vw_request_order_dplist')->where('row_id',$id)->where('is_deleted',0)->get();
        return response()->json([
            "data" => $ListDP
        ]);
    }


    public function requestBySales(){
        $access = checkPermission('Request_order_bysales');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        return inertia("RequestOrder/BySales",[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access
        ]);
    }

    public function create(){
        $access = checkPermission("request_order");
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        $newRequestOrder = RequestOrderModel::create([
            "is_submitted" => 1,
			"trans_date" => date("Y-m-d H:i:s"),
			"type_order" => "CUSTOM",
            "company_id" => session('company_id'),
			"created_date" => date("Y-m-d H:i:s"),
            "created_by" => session('username'),
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username'),
			"is_deleted" => 0,
            "item_id" => 0,
            "grouping_order_id" => 0,
            "identity_code" => "",
            "outsource_intern" => "",
            "online_offline" => "",
            "berat_jadi" => 0,
            "work_estimated_date" => date("Y-m-d",0),
            "work_qty" => 0,
            "work_length" => "",
            "work_diameter" => "",
            "work_ring_size" => "",
            "work_gold_content" => "",
            "work_notes" => "",
            "work_supplier" => "",
            "work_status_order" => "",
            "work_spk_no" => "",
            "work_jwcad_3d" => "",
            "work_master" => "",
            "work_pb" => ""
        ]);

        return redirect('/request_order/form/'.encrypt_id($newRequestOrder->id));
    }

    public function form($id){
        $access = checkPermission("request_order");
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        $request_order = DB::table('vw_request_orderlist')->where('row_id',decrypt_id($id))->first();
        $grouping_order = DB::table('vw_grouping_orderlist')->where('is_deleted',0)->get();
        $stores = DB::table('vw_storelist')->where('is_deleted',0)->get();
        $menu = listMenu();
        $sales = DB::table('sysuser')->select('row_id','name')->where([
            ["is_deleted",'=',0],
            ["role_id",'=',6],
        ])->get();
        $online_offline_list = [
            "OFFLINE", 
            "ONLINE", 
            "Online via WA", 
            "Online via IG", 
            "Online via Website", 
            "Online via Tokopedia"
        ];
        $status_list = array("ORDER", "ON GOING", "POLES","PASANG BATU","CORAN","FINISHING","READY","PAID");
        $items = DB::table("vw_itemlist")->where([
            "company_id" => session("company_id"),
            "is_deleted" => 0
        ])->get();
        $type_order_list = array("CUSTOM","Custom (DP PO)","Custom (DP Stock)","Nabung Bareng");
        return inertia('RequestOrder/Form',[
            "menu" => $menu,
            "session" => session()->all(),
            "data" => $request_order,
            "grouping_order" => $grouping_order,
            "stores" => $stores,
            "sales" => $sales,
            "onlineOffline" => $online_offline_list,
            "status" => $status_list,
            "items" => $items,
            "tipeOrder" => $type_order_list
        ]);
    }

    public function getDiamondDetail($id){
        $access = checkPermission("request_order");
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = DB::table('vw_request_order_diamondlist')->where([
            ['row_id','=',$id],
            ['company_id','=',session('company_id')],
            ['is_deleted','=',0]
        ])->get();
        return $data;
    }
    public function getDownPayment($id){
        $access = checkPermission("request_order");
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = DB::table('request_order_dp')->where([
            ['row_id','=',$id],
            ['company_id','=',session('company_id')],
            ['is_deleted','=',0]
        ])->get();
        return $data;
    }
}
