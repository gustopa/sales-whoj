<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PDF;
use App\Models\PaymentModel;
use App\Models\InventoryModel;
use App\Models\RequestOrderModel;
use App\Models\StoreModel;
use App\Models\PaymentDetailsModel;
use App\Models\VoucherModel;
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
                "company_id"    => session('company_id'),
                "created_date"  => date("Y-m-d H:i:s"),
                "created_by"    => session('username'),
                "modified_date" => date("Y-m-d H:i:s"),
                "modified_by"   => session('username'),
                "is_deleted"    => 0,
                "is_submitted"  => 0,
                "doc_no"        => $current_doc,
                "trans_date"    => date("Y-m-d H:i:s"),
            ];
            updateLastId('payment_id');
            return PaymentModel::create($data);
        });
        return redirect("/payment/form/".encrypt_id($newPayment->id));

    }

    public function save(Request $request){
        $access = checkPermission("payment");
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        // dd($request['payment_details']);
        DB::transaction(function() use ($request){
            PaymentModel::where('row_id',$request['row_id'])
            ->update([
                "sales_id"            => $request['sales_id'],
                "store_id"            => $request['store_id'],
                "customer_id"         => $request['customer_id'],
                "trans_date"          => $request['trans_date'],
                "notes"               => $request['notes'],
                "payment_type_id"     => $request['payment_type_id'],
                "edc_id"              => $request['edc_id'],
                "payment_order_id"    => $request['payment_order_id'],
                "inventory_id"        => $request['inventory_id'],
                "inventory_price"     => $request['inventory_price'],
                "selling_price"       => $request['selling_price'],
                "diff_percent"        => $request['diff_percent'],
                "amount"              => $request['amount'],
                "unpaid_amount"       => $request['unpaid_amount'],
                "status"              => $request['unpaid_amount'] > 0 ? "UNPAID" : "PAID",
                "is_print"            => 0,
                "is_submitted"        => 1,
                "modified_date"       => date("Y-m-d H:i:s"),
                "modified_by"         => session('username')
            ]);
            foreach ($request['payment_details'] as $payment) {
                if (isset($payment['is_deleted']) && $payment['is_deleted']) {
                    if($payment['id_voucher'] != 0){
                        VoucherModel::where('row_id',$payment['id_voucher'])->update([
                            "is_used" => 0,
                            "date_used" => null,
                            "modified_date" => date("Y-m-d H:i:s"),
                            "modified_by" => session('username')
                        ]);
                    }
                    PaymentDetailsModel::where('id', $payment['id'])->update(['is_deleted' => 1]);
                }else{
                    if($payment['id'] != null){
                        $voucher = PaymentDetailsModel::where('id',$payment['id'])->first()->voucher_id;
                        if($voucher != 0){
                            VoucherModel::where('row_id',$voucher)->update([
                                "is_used" => 0,
                                "date_used" => null,
                                "modified_date" => date("Y-m-d H:i:s"),
                                "modified_by" => session('username')
                            ]);
                        }
                    }
                    PaymentDetailsModel::updateOrCreate(
                        [
                            "row_id"          => $request['row_id'],
                            "sequence"        => $payment['sequence']
                        ],
                        [
                            "row_id"          => $request['row_id'],
                            "trans_date"      => $payment['tanggal'],
                            "sequence"        => $payment['sequence'],
                            "payment_type_id" => $payment['payment_type'],
                            "edc_id"          => $payment['edc'],
                            "amount"          => $payment['amount'],
                            "voucher_id"      => $payment['id_voucher'],
                            "is_deleted"      => 0,
                            "created_date"    => date("Y-m-d H:i:s"),
                            "created_by"      => session('username'),
                            "modified_date"   => date("Y-m-d H:i:s"),
                            "modified_by"     => session('username')
                        ]
                    );
                    VoucherModel::where('row_id',$payment['id_voucher'])
                    ->update([
                        "is_used"        => 1,
                        "date_used"      => date("Y-m-d H:i:s"),
                        "modified_date"  => date("Y-m-d H:i:s"),
                        "modified_by"    => session('username')
                    ]);
                }
                }
            InventoryModel::where('row_id',$request['inventory_id'])->update([
                "status" => "SOLD",
                "store_id" => $request['store_id'],
                "modified_date" => date("Y-m-d H:i:s"),
                "modified_by" => session('username')
            ]);

        });
        return response()->json([
            "message" => "Berhasil"
        ]);
    }

    public function print($id){
        $data = DB::table('vw_paymentlist')->where('row_id',decrypt_id($id))->first();
        PaymentModel::where('row_id',decrypt_id($id))->update([
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by"   => session('username'),
            "is_print"      => 1
        ]);
        $pdf = PDF::loadView('pdf.payment', ['payment' => $data]);
        // return view('pdf/payment',['payment' => $data]);
        return $pdf->stream("invoice-$data->trans_date.pdf",["Attachment" => false]);

    } 

    public function cancel($id){
        $access = checkPermission("payment");
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        DB::transaction(function() use ($id){
            PaymentModel::where("row_id",$id)->update([
                "status"            => "CANCELLED",
                "modified_date"     => date("Y-m-d H:i:s"),
                "modified_by"       => session("username")
            ]);
            $payment = DB::table('vw_paymentlist')->where('row_id',$id)->first();

            $inventory = $payment->inventory_id;
            InventoryModel::where('row_id',$inventory)->update([
                "status"            => "READY",
                "store_id"          => 2,
                "modified_date"     => date("Y-m-d H:i:s"),
                "modified_by"       => session('username')
            ]);

            $payment_order_id = $payment->payment_order_id;
            RequestOrderModel::where('row_id',$payment_order_id)->update([
                "status"            => "READY",
                "modified_date"     => date("Y-m-d H:i:s"),
                "modified_by"       => session('username')
            ]);

            $paymentDetails = PaymentDetailsModel::where('row_id',$id)->get();
            foreach($paymentDetails as $payment){
                VoucherModel::where('row_id',$payment->voucher_id)->update([
                    "is_used"       => 0,
                    "date_used"     => null,
                    "modified_date" => date("Y-m-d H:i:s"),
                    "modified_by"   => session('username')
                ]);
            }

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
        
        $paymentDetails = PaymentDetailsModel::where('payment_detail.row_id',decrypt_id($id))
        ->where('payment_detail.is_deleted',0)
        ->select('payment_detail.*','voucher.unique_code as kode_voucher')
        ->leftJoin("voucher",'payment_detail.voucher_id','=','voucher.row_id')->get();
        return inertia('Payment/Form',[
            "session" => session()->all(),
            "menu" => $menu,
            "stores" => $stores,
            "payment" => $data,
            "sales" => $sales ,
            "payment_types" => $paymentType,
            "edc" => $edc,
            "paymentDetails" => $paymentDetails
        ]);
    }


    public function getAllType(){
        $access = checkPermission('payment_type');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_payment_typelist',function($query){
            $query->orderBy('row_id','desc');
        });
        return $data;
    }

    public function getAllEdc(){
        $access = checkPermission('edc');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_edclist',function($query){
            $query->orderBy('row_id','desc');
        });
        return $data;
    }

    public function getDetail($id){
        $data = PaymentDetailsModel::where('payment_detail.row_id',$id)
        ->select("payment_detail.*",'payment_type.name as payment_type_id_txt','edc.name as edc_id_txt')
        ->join('payment_type','payment_detail.payment_type_id','=','payment_type.row_id')
        ->leftJoin('edc','edc.row_id','=','payment_detail.edc_id')
        ->where('payment_detail.is_deleted',0)->get();
        return response()->json([
            "data" => $data
        ]);
    }
}
