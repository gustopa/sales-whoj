<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PDF;
use App\Models\PaymentModel;
use App\Models\InventoryModel;
use App\Models\RequestOrderModel;
use App\Models\StoreModel;
class PaymentController extends Controller
{
    public function index(){
        $access = checkPermission('payment');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        return inertia('Payment/Payment',[
            "menu" => $menu,
            "session" => session()->all(),
            "access" => $access->menu_access
        ]);
    }

    public function getAll(){
        $data = datatable("vw_paymentlist",function($query){
            $query->orderBy('row_id','desc');
        });

        return $data;
    }

    public function create(){
        $access = checkPermission('payment');
        if($access == null || $access == "" || $access == "Read only"){
            return abort(403);
        }
        $newPayment = DB::transaction(function(){
            $last_doc = PaymentModel::latest('row_id')->first()->doc_no;
            $current_doc = incrementID($last_doc);
            $data = [
                "company_id" => session('company_id'),
                "created_date" => date("Y-m-d H:i:s"),
                "created_by" => session('username'),
                "modified_date" => date("Y-m-d H:i:s"),
                "modified_by" => session('username'),
                "is_deleted" => 0,
                "is_submitted" => 0,
                "doc_no" => $current_doc,
                "trans_date" => date("Y-m-d H:i:s"),
            ];
            updateLastId('payment_id');
            return PaymentModel::create($data);
        });
        return redirect("/payment/form/".encrypt_id($newPayment->id));

    }

    public function print($id){
        $data = DB::table('vw_paymentlist')->where('row_id',decrypt_id($id))->first();
        PaymentModel::where('row_id',decrypt_id($id))->update([
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by"   => session('username'),
            "is_print"      => 1
        ]);
        $pdf = PDF::loadView('pdf.payment', ['payment' => $data]);
        return $pdf->stream("invoice-$data->trans_date.pdf");
    } 

    public function cancel($id){
        DB::transaction(function() use ($id){
            PaymentModel::where("row_id",$id)->update([
                "status" => "CANCELLED",
                "modified_date" => date("Y-m-d H:i:s"),
                "modified_by" => session("username")
            ]);
            $payment = DB::table('vw_paymentlist')->where('row_id',$id)->first();

            $inventory = $payment->inventory_id;
            InventoryModel::where('row_id',$inventory)->update([
                "status" => "READY",
                "store_id" => 2,
                "modified_date" => date("Y-m-d H:i:s"),
                "modified_by" => session('username')
            ]);

            $payment_order_id = $payment->payment_order_id;
            RequestOrderModel::where('row_id',$payment_order_id)->update([
                "status" => "READY",
                "modified_date" => date("Y-m-d H:i:s"),
                "modified_by" => session('username')
            ]);
        });

        return response()->json([
            "data" => "berhasil"
        ]);
    }

    public function form($id){
        $access = checkPermission('payment');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        $data = DB::table('vw_paymentlist')->where('row_id',decrypt_id($id))->first();
        $menu = listMenu();

        $store_id = "2";
        if(session("store_id") == 5){
            $store_id = session("store_id");
        }
        $stores = StoreModel::select("row_id","name")->where([
            ["is_submitted",'=',1],
            ["is_deleted",'=',0],
            ["row_id","=",$store_id]
        ])->get();

        $sales = DB::table('sysuser')->select('row_id','name')->where([
            ["is_deleted",'=',0],
            ["role_id",'=',6],
        ])->get();

        $paymentType = DB::table('vw_payment_typelist')->select("row_id","name")->where([
            ['is_deleted','=',0],
            ['company_id','=',session('company_id')],
        ])->get();
        $edc = DB::table('vw_edclist')->select("row_id","name")->where([
            ['is_deleted','=',0],
            ['company_id','=',session('company_id')],
        ])->get();


        return inertia('Payment/Form',[
            "session" => session()->all(),
            "menu" => $menu,
            "stores" => $stores,
            "payment" => $data,
            "sales" => $sales ,
            "payment_types" => $paymentType,
            "edc" => $edc
        ]);
    }
}
