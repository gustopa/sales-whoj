<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserModel;
use Illuminate\Support\Facades\DB;
class SalesController extends Controller
{
    public function getAll(){
        $access = checkPermission('sales');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_sysuserlist',function($query){
            $query->where('role_id',6);
            $query->orderBy('row_id','desc');
        });
        return $data;
    }

    public function tambah(Request $request){
        $access = checkPermission('sales');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        UserModel::insert([
            "company_id" => session('company_id'),
            "role_id" => 6,
            "name" => $request['name'],
            "email" => $request['email'],
            "is_submitted" => 1,
            "is_deleted" => 0,
            "store_id" => 2,
            "is_login" => 0,
            "is_active" => $request['is_active'],
            "created_date" => date("Y-m-d H:i:s"),
            "created_by" => session('username'),
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username')
        ]);
        return response()->json([
            "message" => "berhasil"
        ]);
    }
    public function edit($id){
        $request = request();
        $access = checkPermission('sales');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        UserModel::where('row_id',$id)->update([
            "name" => $request['name'],
            "email" => $request['email'],
            "is_active" => $request['is_active'],
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username')
        ]);
        return response()->json([
            "message" => "berhasil"
        ]);
    }
    public function delete($id){
        $access = checkPermission('sales');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        UserModel::where('row_id',$id)->update([
            "is_deleted"=>1,
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username')
        ]);
        return response()->json([
            "message" => "berhasil"
        ]);
    }


}
