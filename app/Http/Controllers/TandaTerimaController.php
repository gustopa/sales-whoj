<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\TandaTerimaModel;
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
        return response()->json([
            "data" => $data
        ]);
    }

    public function create(){
        $access = checkPermission('tanda_terima');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        $id = DB::transaction(function(){
            $last_doc = TandaTerimaModel::latest('row_id')->where('doc_no','not like','')->first()->doc_no;
            $prefix = substr($last_doc, 0, 2);
            $number = (int) substr($last_doc, 2);
            $nextNumber = $number + 1;
            $currentCode = $prefix . str_pad($nextNumber, 9, '0', STR_PAD_LEFT);
            $newData = TandaTerimaModel::create([
                "company_id"    => session("company_id"),
                "doc_no"        => $currentCode,
                "is_submitted"  => 0,
                "is_deleted"    => 0,
                "created_date"  => date("Y-m-d H:i:s"),
                "created_by"    => session('username'),
                "modified_date" => date("Y-m-d H:i:s"),
                "modified_by"   => session('username'),
            ]);
            return $newData->id;
        });
        return redirect('/tanda_terima/form/'.encrypt_id($id));
    }

    public function form($id){
        $access = checkPermission('tanda_terima');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        $menu = listMenu();
        $data = DB::table('vw_tanda_terimalist')->where('row_id',decrypt_id($id))->first();
        return inertia("TandaTerima/Form",[
            "data" => $data,
            "menu" => $menu,
            "session" => session()->all()
        ]);
    }
}
