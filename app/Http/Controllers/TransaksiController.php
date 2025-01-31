<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TransTypeModel;
class TransaksiController extends Controller
{
    public function dashboard(Request $request){
        $access = checkPermission('dashboard_sales');
        if($access == null || $access == ''){
            return redirect()->route('dashboard');
        }
        $menu = listMenu();
        return inertia('Transaksi/Dashboard',[
            'session' => $request->session()->all(),
            'permission' => $access,
            'menu' => $menu
        ]);
    }

    public function getAllType(){
        $access = checkPermission('trans_type');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_trans_typelist',function($query){
            $query->orderBy('row_id','desc');
        });
        return $data;
    }

    public function tambah(Request $request){
        $access = checkPermission('trans_type');
        if($access == "" || $access == null || $access->menu_access == "Read only"){
            return abort(403);
        }
        TransTypeModel::insert([
            "company_id" => session('company_id'),
            "name" => $request['name'],
            "is_submitted" => 1,
            "is_deleted" => 0,
            "created_date" => date("Y-m-d H:i:s"),
            "created_by" => session('username'),
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username')
        ]);
        return response()->json(["message" => "Berhasil"]);
    }
    public function edit($id){
        $access = checkPermission('trans_type');
        if($access == "" || $access == null || $access->menu_access == "Read only"){
            return abort(403);
        }
        TransTypeModel::where('row_id',$id)->update([
            "name" => request('name'),
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username')
        ]);
        return response()->json(["message" => "Berhasil"]);
    }
    public function delete($id){
        $access = checkPermission('trans_type');
        if($access == "" || $access == null || $access->menu_access == "Read only"){
            return abort(403);
        }
        TransTypeModel::where('row_id',$id)->update([
            "is_deleted" => 1,
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username')
        ]);
        return response()->json(["message" => "Berhasil"]);
    }
}
