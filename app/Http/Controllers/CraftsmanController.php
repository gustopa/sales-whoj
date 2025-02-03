<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CraftsmanModel;
class CraftsmanController extends Controller
{
    public function getAll(){
        $access = checkPermission('craftsman');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_craftsmanlist',function($query){
            $query->orderBy('row_id','desc');
        });
        return $data;
    }
    public function tambah(Request $request){
        $access = checkPermission('craftsman');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        CraftsmanModel::insert([
            "company_id" => session('company_id'),
            "name" => $request['name'],
            "rate_hour" => $request['rate'],
            "is_submitted" => 1,
            "is_deleted" => 0,
            "created_date" => date("Y-m-d H:i:s"),
            "created_by" => session('username'),
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session("username")
        ]);

        return response()->json([
            "message" => "berhasil"
        ]);
    }
    public function edit($id){
        $request = request();
        $access = checkPermission('craftsman');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        CraftsmanModel::where('row_id',$id)->update([
            "name" => $request['name'],
            "rate_hour" => $request['rate'],
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session("username")
        ]);

        return response()->json([
            "message" => "berhasil"
        ]);
    }
    public function delete($id){
        $access = checkPermission('craftsman');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        CraftsmanModel::where('row_id',$id)->update([
            "is_deleted" => 1,
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session("username")
        ]);

        return response()->json([
            "message" => "berhasil"
        ]);
    }
}
