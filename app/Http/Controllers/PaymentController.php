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

    public function print($id){
        $data = DB::table('vw_paymentlist')->where('row_id',decrypt_id($id))->first();
        // dd($data);
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

        $stores = StoreModel::select("row_id","name")->get();

        $sales = DB::table('sysuser')->select('row_id','name')->where([
            ["is_deleted",'=',0],
            ["role_id",'=',6],
        ])->get();
        // dd($stores);
        return inertia('Payment/Form',[
            "session" => session()->all(),
            "menu" => $menu,
            "stores" => $stores,
            "payment" => $data,
            "sales" => $sales 
        ]);
    }
}
