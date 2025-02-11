<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RefundModel;
use App\Models\StoreModel;
use App\Models\PaymentModel;
use Illuminate\Support\Facades\DB;
use PDF;
class RefundController extends Controller
{
    public function index(){
        $access = checkPermission('refund');
        if($access == null || $access == ""){
            return abort(403);
        }

        $menu = listMenu();
        return inertia('Refund/Refund',[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access
        ]);
    }
    public function getAll(){
        $access = checkPermission('refund');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable("vw_refundlist",function($query){
            $query->where('is_deleted',0);
            $query->where('company_id',session('company_id'));
            $query->orderBy('row_id','desc');
        });
        return $data;
    }

    public function create(){
        $access = checkPermission('refund');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        $id = DB::transaction(function(){
            $last_doc = RefundModel::latest('row_id')->where('doc_no','not like','')->first()->doc_no;
            $current_doc = incrementID($last_doc);
            updateLastId('refund_id');
            $newData = RefundModel::create([
                "company_id" => session('company_id'),
                "doc_no" => $current_doc,
                "is_submitted" => 0,
                "is_deleted" => 0,
                "type_refund" => "",
                "sales_id" => 0,
                "potongan" => 0,
                "amount_invoice" => 0,
                "created_date"  => date("Y-m-d H:i:s"),
                "created_by"    => session('username'),
                "modified_date" => date("Y-m-d H:i:s"),
                "modified_by"   => session('username'),
            ]);
            return $newData->id;
        });
        return redirect("/refund/form/".encrypt_id($id));
    }

    public function form($id){
        $access = checkPermission('refund');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        $refund = DB::table('vw_refundlist')->where('row_id',decrypt_id($id))->first();
        $type_refunds = ["BUYBACK","EXCHANGE"];
        $sales = DB::table('sysuser')->select('row_id','name')->where([["is_deleted",'=',0],["role_id",'=',6]])->get();
        $stores = StoreModel::select("row_id","name")->where([["is_submitted",'=',1],["is_deleted",'=',0]])->get();
        $menu = listMenu();
        return inertia('Refund/Form',[
            "refund" => $refund,
            "menu" => $menu,
            "session" => session()->all(),
            "refund_type" => $type_refunds,
            "sales_list" => $sales,
            "store_list" => $stores,
        ]);
    }

    public function save(Request $request){
        $access = checkPermission('refund');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        RefundModel::where('row_id',$request['row_id'])->update($request['data']);
        PaymentModel::where('row_id',$request['payment_id'])->update([
            "status" => $request['status'],
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by"   => session('username'),
        ]);
        return response()->json($request['row_id']);
    }

    public function print($id){
        $data = DB::table('vw_refundlist')->where('row_id',decrypt_id($id))->first();
        $pdf = PDF::loadView('pdf.refund', ['refund' => $data]);
        return $pdf->stream("refund-$data->trans_date.pdf",["Attachment" => false]);
    }

    public function cancel($id){
        $access = checkPermission('refund');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        DB::transaction(function() use($id){
            $refund = RefundModel::where('row_id',$id)->first();
            RefundModel::where('row_id',$id)->update([
                "status" => "CANCELLED",
                "modified_date" => date("Y-m-d H:i:s"),
                "modified_by"   => session('username'),
            ]);
            PaymentModel::where('row_id',$refund->payment_id)->update([
                "status" => "PAID",
                "modified_date" => date("Y-m-d H:i:s"),
                "modified_by"   => session('username'),
            ]);
        });
        return response()->json(["status" => 200]);
    }
}
