<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RequestOrderModel;
use App\Models\ReparationModel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
class ReparasiController extends Controller
{
    public function index(){
        $access = checkPermission('reparation');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        return inertia("Reparasi/Reparasi",[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access
        ]);
    }

    public function getAll(){
        $request_order = datatable("vw_request_orderlist",function ($query) {
            $query->where([
                ['status','not like','PAID'],
                ['type_order','=','REPARASI']
            ]);
            $query->orderBy('trans_date','desc');
        });
        return $request_order;
    }

    public function create(){
        $access = checkPermission('reparation');
        if($access == null || $access == "" || $access->menu_access == 'Read only'){
            return abort(403);
        }
        $newRequestOrder = RequestOrderModel::create([
            "status" => "",
            "is_submitted" => 1,
			"trans_date" => date("Y-m-d H:i:s"),
			"type_order" => "REPARASI",
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
            "work_estimated_date" => date('Y-m-d',0),
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

        return redirect('/reparation/form/'.encrypt_id($newRequestOrder->id));
    } 

    public function form($id){
        $stores = DB::table('vw_storelist')->where('is_deleted',0)->get();
        $sales = DB::table('sysuser')->select('row_id','name')->where([
            ["is_deleted",'=',0],
            ["role_id",'=',6],
        ])->get();
        $items = DB::table("vw_itemlist")->where([
            "company_id" => session("company_id"),
            "is_deleted" => 0
        ])->get();
        $menu = listMenu();
        $status_list = array("ORDER", "ON GOING", "POLES","PASANG BATU","CORAN","FINISHING","READY","PAID");
        $order = RequestOrderModel::select('request_order.*','customer.name as customer_id_txt')
        ->leftJoin('customer','request_order.customer_id','=','customer.row_id')
        ->where('request_order.row_id',decrypt_id($id))->first();
        return inertia('Reparasi/Form',[
            "session" => session()->all(),
            "stores" => $stores,
            "items" => $items,
            "sales" => $sales,
            "menu" => $menu,
            "data" => $order,
            "statusList" => $status_list
        ]);
    }

    public function getPayment($id){
        $data = ReparationModel::where('row_id',$id)->where('is_deleted',0)->where('company_id',session('company_id'))->get();
        return response()->json($data);
    }
    public function tambahPayment(Request $request){
        $doc_no = DB::transaction(function() use($request) {
            $requestOrder = RequestOrderModel::where('row_id',$request['row_id'])->first();
            $updateRequestOrder = [
                "modified_date" => date("Y-m-d H:i:s"),
                "modified_by" => session('username'),
            ];
            if($requestOrder->doc_no == null){
                $last_doc = RequestOrderModel::where('doc_no','not like','')->where('doc_no','like','RP-%')->latest('row_id')->first()->doc_no;
                $current_doc = incrementID($last_doc);
                updateLastId('reparasi_id');
                $updateRequestOrder["doc_no"] = $current_doc;
            }
            ReparationModel::insert([
                "row_id" => $request['row_id'],
                "company_id" => session('company_id'),
                "amount_txt" => $request['amount_txt'],
                "amount_type" => $request['amount_type'],
                "amount" => $request['amount'],
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
    public function editPayment($id){
        $request = request();
        ReparationModel::where('line_id',$id)->update([
            "amount_txt" => $request['amount_txt'],
            "amount_type" => $request['amount_type'],
            "amount" => $request['amount'],
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username'),
        ]);
        return response()->json([
            "timestamp" => password_hash(time(),PASSWORD_DEFAULT)
        ]);
    }
    public function deletePayment($id){
        ReparationModel::where('line_id',$id)->update([
            "is_deleted" => 1,
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username'),
        ]);
        return response()->json([
            "timestamp" => password_hash(time(),PASSWORD_DEFAULT)
        ]);
    }

    public function save(Request $request){
        $doc_no = DB::transaction(function() use($request){
            $filename = "";
            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $filename = "photo_file".time().'.jpeg';
                $destinationPath = storage_path('app/public/uploaded');

                $manager = new ImageManager(new Driver());
                $image = $manager->read($file->getRealPath());
                $image->scale(1920,1080);

                $image->save($destinationPath . '/' . $filename); // Simpan dengan kompresi

            }
            $updatedData = $request['data'];
            $updatedData['photo_file'] = $filename;
            $updatedData['is_submitted'] = $request['mode'] == "submit" ? 1 : 0;
            $updatedData['modified_date'] = date("Y-m-d H:i:s");
            $updatedData['modified_by'] = session('username');
            if($request['data']['doc_no'] == ""){
                $last_doc = RequestOrderModel::where('doc_no','not like','')->where('doc_no','like','RP-%')->latest('row_id')->first()->doc_no;
                $current_doc = incrementID($last_doc);
                updateLastId('payment_order_id');
                $updatedData["doc_no"] = $current_doc;
            }
            RequestOrderModel::where('row_id',$request['row_id'])->update($updatedData);
            return RequestOrderModel::select('doc_no')->where('row_id',$request['row_id'])->first()->doc_no;
        });
        return response()->json([
            "doc_no" => $doc_no,
            "timestamp" => password_hash(time(),PASSWORD_DEFAULT)
        ]);
        
    }
}
