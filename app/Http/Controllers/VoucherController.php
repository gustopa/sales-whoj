<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\VoucherModel;
class VoucherController extends Controller
{
    public function getAll(){
        $access = checkPermission('voucher');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('voucher',function($query){
            $query->select(
                'voucher.row_id',
                'voucher.unique_code',
                'voucher.amount',
                'voucher.is_used',
                'voucher.date_used',
                'voucher.created_date',
                'voucher.created_by',
                'voucher.modified_date',
                'voucher.modified_by',
                'voucher.company_id',
                'syscompany.name as company_id_txt',
            );
            $query->leftJoin('syscompany','voucher.company_id','=','syscompany.row_id');
        });

        return $data;
    }

    public function getLastCode($code){
        $lastVoucher = DB::table('voucher')->where('unique_code', 'like', "{$code}-%")->orderBy('row_id','desc')->first(); 
        return response()->json($lastVoucher);
    }

    public function create(Request $request){
        $access = checkPermission('voucher');
        if($access == "" || $access == null || $access->menu_access == "Read only"){
            return abort(403);
        }
        VoucherModel::insert([
            "amount" => $request['amount'],
            "unique_code" => $request['unique_code'],
            "is_deleted" => 0,
            "is_used" => 0,
            "company_id" => session('company_id'),
            "created_date" => date("Y-m-d H:i:s"),
            "created_by" => session('username'),
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username')
        ]);
        return response()->json([
            "data" => "berhasil"
        ]);
    }

    public function edit($id){
        $access = checkPermission('voucher');
        if($access == "" || $access == null || $access->menu_access == "Read only"){
            return abort(403);
        }
        VoucherModel::where('row_id',encrypt_id($id))->update([
            "amount" => request("amount"),
            "unique_code" => request("unique_code"),
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username')
        ]);
        return response()->json([
            "data" => "berhasil"
        ]);
    }

    public function delete($id){
        $access = checkPermission('voucher');
        if($access == "" || $access == null || $access->menu_access == "Read only"){
            return abort(403);
        }
        VoucherModel::where('row_id',decrypt_id($id))->update([
            "is_deleted" => 1,
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username')
        ]);
        return response()->json([
            "data" => "berhasil"
        ]);
    }

    public function checkVoucher(Request $request){
        $kode_voucher = $request['voucher'];
        $voucher = VoucherModel::where('unique_code',$kode_voucher)->first();
        return response()->json([
            "amount" => $voucher ? $voucher->amount : 0,
            "status" => $voucher ? $voucher->is_used : -1,
            "row_id" => $voucher ? $voucher->row_id : 0
        ]);
    }

}
