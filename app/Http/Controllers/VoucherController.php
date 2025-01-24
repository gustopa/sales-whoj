<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        $lastVoucher = DB::table('voucher')->where('unique_code', 'like', "{$code}-%")->get(); 
        return response()->json($lastVoucher);
    }
}
