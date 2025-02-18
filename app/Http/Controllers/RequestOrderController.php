<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\RequestOrderModel;
use App\Models\RequestOrderDpModel;
use App\Models\RequestOrderDiamondModel;
use App\Models\GroupingOrderModel;
use App\Models\InventoryModel;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use PDF;
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
            "status" => "",
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

    public function save(Request $request){
        $doc_no = DB::transaction(function() use($request){
            $filename = "";
            if ($request->hasFile('file_photo')) {
                $file = $request->file('file_photo');
                $filename = "photo_file".time().'.jpeg';
                $destinationPath = storage_path('app/public/uploaded');

                // Konversi gambar agar ukurannya sekitar 200KB
                $manager = new ImageManager(new Driver());
                $image = $manager->read($file->getRealPath());
                $image->scale(1920,1080);

                $image->save($destinationPath . '/' . $filename); // Simpan dengan kompresi

            }
            $updateOrder = [
                "grouping_order_id" => $request['grouping_order_id'],
                "store_id" => $request['store'],
                "sales_id" => $request['sales'],
                "customer_id" => $request['customer_id'],
                "trans_date" => $request['trans_date'],
                "online_offline" => $request['online_offline'],
                "status" => $request['status'],
                "estimated_price" => $request['estimated_price'],
                "photo_file" => $filename,
                "estimated_date" => $request['estimated_delivery_time'],
                "item_id" => $request['item_type'],
                "type_order" => $request['order_type'],
                "outsource_intern" => $request['origin'] == null ? "" : $request['origin'],
                "qty" => $request['pengiriman'],
                "size" => $request['size'],
                "warna_emas" => $request['gold_color'],
                "berat_emas" => $request['gold_weight'],
                "customer_material" => $request['customer_material'],
                "custom_box" => $request['custom_box'],
                "txt" => $request['deskripsi'],
                "is_submitted" => $request['mode'] == "simpan" ? 0 : 1,
            ];
            if($request['doc_no'] == ""){
                $last_doc = RequestOrderModel::where('doc_no','not like','')->where('doc_no','like','DP-%')->latest('row_id')->first()->doc_no;
                $current_doc = incrementID($last_doc);
                updateLastId('payment_order_id');
                $updateOrder["doc_no"] = $current_doc;
            }
            RequestOrderModel::where('row_id',$request['row_id'])->update($updateOrder);
            $updatedRequestOrder = RequestOrderModel::where('row_id', $request['row_id'])->first();
            return $updatedRequestOrder->doc_no;
        });
        
        return response()->json([
            "doc_no" => $doc_no
        ]);
    }

    public function orderReady($id){
        $access = checkPermission('request_order');
        if($access == null || $access == "" || $access == "Read only"){
            return abort(403);
        }
        $request = request();
        $barang = InventoryModel::where('identity_code',$request['PLU'])->first();
        if(!$barang){
            return response()->json([
                "status" => 404,
                "message" => "PLU tidak ditemukan"
            ]);
        }
        DB::transaction(function() use($id,$request){
            RequestOrderModel::where('row_id',$id)->update([
                "status" => "READY",
                "identity_code" => $request['PLU'],
                "modified_date" => date("Y-m-d H:i:s"),
                "modified_by" => session('username'),
            ]);
            InventoryModel::where('identity_code',$request['PLU'])->update([
                "payment_order_id" => $id,
                "status" => "SOLD",
                "store_id" => 3, //Customer
                "modified_date" => date("Y-m-d H:i:s"),
                "modified_by" => session('username'),
            ]);
        });
        return response()->json([
            "status" => 200,
            "message" => "Tersimpan!"
        ]);
    }
    public function delete($id){
        $access = checkPermission('request_order');
        if($access == null || $access == "" || $access == "Read only"){
            return abort(403);
        }
        RequestOrderModel::where('row_id',$id)->update([
            "is_deleted" => 1,
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username'),
        ]);
        return response()->json("okee");

    }

    public function getDiamondDetail($id){
        $data = DB::table('vw_request_order_diamondlist')->where([
            ['row_id','=',$id],
            ['company_id','=',session('company_id')],
            ['is_deleted','=',0]
        ])->get();
        return $data;
    }
    public function getDownPayment($id){
        $data = DB::table('request_order_dp')->where([
            ['row_id','=',$id],
            ['company_id','=',session('company_id')],
            ['is_deleted','=',0]
        ])->get();
        return $data;
    }

    public function editDownPayment($id){
        $access = checkPermission("request_order");
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        $request = request();
        $filename = RequestOrderDpModel::where('line_id',$id)->first()->bukti_dp;
        if ($request->hasFile('bukti_dp')) {
            $file = $request->file('bukti_dp');
            $filename = "bukti_dp".time().'.jpeg';
            $destinationPath = storage_path('app/public/uploaded');

            // Konversi gambar agar ukurannya sekitar 200KB
            $manager = new ImageManager(new Driver());
            $image = $manager->read($file->getRealPath());
            $image->scale(1920,1080);

            $image->save($destinationPath . '/' . $filename); // Simpan dengan kompresi

        }
        RequestOrderDpModel::where('line_id',$id)->update([
            "dp_date" => $request['tanggal'],
            "down_payment" => $request['amount'],
            "dp_ke" => $request['dp_ke'],
            "bukti_dp" => $filename,
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username'),
        ]);
        return response()->json(time());
    }
    public function tambahDownPayment(Request $request){
        $access = checkPermission("request_order");
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        $filename = "";
        if ($request->hasFile('bukti_dp')) {
            $file = $request->file('bukti_dp');
            $filename = "bukti_dp".time().'.jpeg';
            $destinationPath = storage_path('app/public/uploaded');

            // Konversi gambar agar ukurannya sekitar 200KB
            $manager = new ImageManager(new Driver());
            $image = $manager->read($file->getRealPath());
            $image->scale(1920,1080);

            $image->save($destinationPath . '/' . $filename); // Simpan dengan kompresi

        }
        $doc_no = DB::transaction(function() use($request,$filename){
            $requestOrder = RequestOrderModel::where('row_id',$request['row_id'])->first();
            
            $updateRequestOrder = [
                "modified_date" => date("Y-m-d H:i:s"),
                "modified_by" => session('username'),
            ];
            if($requestOrder->doc_no == ""){
                $last_doc = RequestOrderModel::where('doc_no','not like','')->where('doc_no','like','DP-%')->latest('row_id')->first()->doc_no;
                $current_doc = incrementID($last_doc);
                updateLastId('payment_order_id');
                $updateRequestOrder["doc_no"] = $current_doc;
            }
            RequestOrderDpModel::insert([
                "row_id" => $request['row_id'],
                "company_id" => session('company_id'),
                "dp_date" => $request['tanggal'],
                "down_payment" => $request['amount'],
                "dp_ke" => $request['dp_ke'],
                "bukti_dp" => $filename,
                "is_deleted" => 0,
                "created_date" => date("Y-m-d H:i:s"),
                "created_by" => session('username'),
                "modified_date" => date("Y-m-d H:i:s"),
                "modified_by" => session('username'),
            ]);
            RequestOrderModel::where('row_id',$request['row_id'])->update($updateRequestOrder);
            
            $updatedRequestOrder = RequestOrderModel::where('row_id', $request['row_id'])->first();
            return $updatedRequestOrder->doc_no;
        });
        return response()->json([
            "doc_no" => $doc_no,
            "timestamp" => time()
        ]);
    }

    public function deleteDownPayment($id){
        $access = checkPermission("request_order");
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        RequestOrderDpModel::where('line_id',$id)->update([
            "is_deleted" => 1,
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username'),
        ]);
        return response()->json(time());
    }

    public function setGroupingOrder(Request $request){
        $access = checkPermission("request_order");
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        $data = DB::transaction(function() use($request){
            $dataDiamond = DB::table("grouping_order_diamond")
            ->where('row_id',$request['order_group_id'])
            ->where('is_deleted',0)
            ->get();
            $dataGrouping = GroupingOrderModel::where('row_id',$request['order_group_id'])->first();
            foreach($dataDiamond as $diamond){
                RequestOrderDiamondModel::insert([
                    "row_id" => $request['row_id'],
                    "company_id" => session('company_id'),
                    "grain" => $diamond->grain,
                    "grade" => $diamond->grade,
                    "diamond_type" => $diamond->diamond_type,
                    "no_sert" => $diamond->no_sert,
                    "diameter" => $diamond->diameter,
                    "color" => $diamond->color,
                    "work_size" => "",
                    "is_deleted" => 0,
                    "created_date" => date("Y-m-d H:i:s"),
                    "created_by" => session('username'),
                    "modified_date" => date("Y-m-d H:i:s"),
                    "modified_by" => session('username'),
                ]);
            }

            $updateRequestOrder = [
                "modified_date" => date("Y-m-d H:i:s"),
                "modified_by" => session('username'),
                "item_id" => $dataGrouping->item_id,
                "grouping_order_id" => $dataGrouping->row_id,
                "berat_emas" => $dataGrouping->gold_weight
            ];
            if($request['doc_no'] == ""){
                $last_doc = RequestOrderModel::where('doc_no','not like','')->where('doc_no','like','DP-%')->latest('row_id')->first()->doc_no;
                $current_doc = incrementID($last_doc);
                updateLastId('payment_order_id');
                $updateRequestOrder["doc_no"] = $current_doc;
            }
            RequestOrderModel::where('row_id',$request['row_id'])->update($updateRequestOrder);
            $updatedRequestOrder = RequestOrderModel::where('row_id', $request['row_id'])->first();
            return [
                "item_id" => $updatedRequestOrder->item_id,
                "grouping" => $updatedRequestOrder->grouping_order_id,
                "gold_weight" => $updatedRequestOrder->berat_emas,
                "doc_no" => $updatedRequestOrder->doc_no
            ];
        });
        return response()->json([
            "doc_no" => $data['doc_no'],
            "grouping" => $data['grouping'],
            "gold_weight" => $data['gold_weight'],
            "item_id" => $data['item_id'],
            "timestamp" => time()
        ]);
    }

    public function print($id){
        // $access = checkPermission("request_order");
        // if($access == null || $access == ""){
        //     return abort(403);
        // }
        $data = DB::table('vw_request_orderlist')->where('row_id',decrypt_id($id))->first();
        $request_order_diamond = DB::table('vw_request_order_diamondlist')->where('row_id',decrypt_id($id))->where('is_deleted',0)->get();
        $pdf = PDF::loadView('pdf.requestorder', ['request_order' => $data,'request_order_diamond' => $request_order_diamond]);

        // return view('pdf/payment',['payment' => $data]);
        return $pdf->stream("pesanan-$data->doc_no.pdf",["Attachment" => false]);
    }
    public function printDp($id){
        // $access = checkPermission("request_order");
        // if($access == null || $access == ""){
        //     return abort(403);
        // }
        $data = DB::table('vw_request_order_dplist')->where('row_id',decrypt_id($id))->latest('line_id')->first();
        $dataAll = DB::table('vw_request_order_dplist')->where('row_id',decrypt_id($id))->get();
        $request_order = DB::table('vw_request_orderlist')->where('row_id',decrypt_id($id))->first();
        // dd($data);
        $pdf = PDF::loadView('pdf.requestorderdp', [
            'request_order_dp' => $data,
            'request_order_dp_all' => $dataAll,
            "request_order" => $request_order])->setPaper('a4','landscape');

        // return view('pdf/payment',['payment' => $data]);
        return $pdf->stream("dp_pesanan-$data->doc_no.pdf",["Attachment" => false]);
    }

    public function formRequestBySales($id){
        $access = checkPermission("request_order_bysales");
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
        return inertia('RequestOrder/FormBySales',[
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

    public function tambahDiamond(Request $request){
        $doc_no = DB::transaction(function() use($request){
            $requestOrder = RequestOrderModel::where('row_id',$request['row_id'])->first();
            $updateRequestOrder = [
                "modified_date" => date("Y-m-d H:i:s"),
                "modified_by" => session('username'),
            ];
            if($requestOrder->doc_no == null){
                if($requestOrder->type_order != "REPARASI"){
                    $last_doc = RequestOrderModel::where('doc_no','not like','')->where('doc_no','like','DP-%')->latest('row_id')->first()->doc_no;
                    $current_doc = incrementID($last_doc);
                    updateLastId('payment_order_id');
                    $updateRequestOrder["doc_no"] = $current_doc;
                }else{
                    $last_doc = RequestOrderModel::where('doc_no','not like','')->where('doc_no','like','RP-%')->latest('row_id')->first()->doc_no;
                    $current_doc = incrementID($last_doc);
                    updateLastId('reparasi_id');
                    $updateRequestOrder["doc_no"] = $current_doc;
                }
            }
            RequestOrderDiamondModel::insert([
                "row_id" => $request['row_id'],
                "company_id" => session('company_id'),
                "grain" => $request['grain'],
                "grade" => $request['grade'],
                "diamond_type" => $request['diamond_type'],
                "no_sert" => $request['no_sert'],
                "diameter" => $request['diameter'],
                "color" => $request['color'],
                "work_size" => "",
                "is_deleted" => 0,
                "created_date" => date("Y-m-d H:i:s"),
                "created_by" => session('username'),
                "modified_date" => date("Y-m-d H:i:s"),
                "modified_by" => session('username'),
            ]);
            RequestOrderModel::where('row_id',$request['row_id'])->update($updateRequestOrder);
            return RequestOrderModel::select('doc_no')->where('row_id',$request['row_id'])->first()->doc_no;

        });
        return response()->json([
            "doc_no" => $doc_no,
            "timestamp" => password_hash(time(),PASSWORD_DEFAULT)
        ]);
    }
    public function editDiamond($id){
        $request = request();
        RequestOrderDiamondModel::where('line_id',$id)->update([
            "grain" => $request['grain'],
            "grade" => $request['grade'],
            "diamond_type" => $request['diamond_type'],
            "no_sert" => $request['no_sert'],
            "diameter" => $request['diameter'],
            "color" => $request['color'],
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username'),
        ]);
        return response()->json([
            "timestamp" => password_hash(time(),PASSWORD_DEFAULT)
        ]);
    }
    public function deleteDiamond($id){
        $request = request();
        RequestOrderDiamondModel::where('line_id',$id)->update([
            "is_deleted" => 1,
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username'),
        ]);
        return response()->json([
            "timestamp" => password_hash(time(),PASSWORD_DEFAULT)
        ]);
    }


}
