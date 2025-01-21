<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class TandaTerimaController extends Controller
{
    public function index(){
        $access = checkPermission('tanda_terima');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        return inertia('TandaTerima/TandaTerima',[
            'session' => session()->all(),
            'access' => $access->menu_access,
            'menu' => $menu
        ]);
    }

    public function getAll(){
        $data = datatable('vw_tanda_terimalist',function($query){
            $query->where('is_deleted',0);
            $query->where('company_id',session('company_id'));
            $query->orderBy('row_id','desc');
        });
        return $data;
    }

    public function getItem($id){
        $data = DB::table('vw_tanda_terima_itemlist')->where([
            ['row_id','=',decrypt_id($id)],
            ['is_deleted','=',0],
            ['company_id','=',session('company_id')]
        ])->get();
        // dd($data);
        return response()->json([
            "data" => $data
        ]);
    }
}
