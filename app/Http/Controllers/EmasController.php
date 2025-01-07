<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class EmasController extends Controller
{
    public function bahanEmas(Request $request){
        $session = $request->session()->all();
        $totalBerat = DB::table('vw_msmaterialgold_totalweight_activeperiod')->select(DB::raw('SUM(last_weight) as total_weight'))->first();
        $listMaterialGold = DB::table('msmaterialgold')->select('msmaterialgold.*','vw_msmaterialgold_totalweight_activeperiod.last_weight')
        ->Leftjoin('vw_msmaterialgold_totalweight_activeperiod','vw_msmaterialgold_totalweight_activeperiod.materialgold_id','=','msmaterialgold.row_id')
        ->where('is_deleted','0')->orderBy('msmaterialgold.name','ASC')->get();
        return inertia('Stok/BahanEmas',["total_berat" => $totalBerat->total_weight,"list_material_gold" => $listMaterialGold,'session' => $session]);
    }

    public function tambahEmas(){
        $query = DB::table('msmaterialgold')->get();
        $logdata = setDataAuditLog($query->toSql());
        return $logdata;
    }
}
