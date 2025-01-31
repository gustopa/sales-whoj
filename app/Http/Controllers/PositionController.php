<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PositionModel;
class PositionController extends Controller
{
    public function getAll(){
        $access = checkPermission('position');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_positionlist',function($query){
            $query->orderBy('row_id','desc');
        });
        return $data;
    }
    


    public function tambah(Request $request){
        $access = checkPermission('item');
        if($access == "" || $access == null || $access->menu_access == "Read only"){
            return abort(403);
        }
        PositionModel::insert([
            "company_id" => session('company_id'),
            "name" => $request['name'],
            "is_submitted" => 1,
            "created_date" => date("Y-m-d H:i:s"),
            "created_by" => session('username'),
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username')
        ]);
        return response()->json(["message" => "Berhasil"]);
    }
    public function edit($id){
        $access = checkPermission('item');
        if($access == "" || $access == null || $access->menu_access == "Read only"){
            return abort(403);
        }
        PositionModel::where('row_id',$id)->update([
            "name" => request('name'),
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username')
        ]);
        return response()->json(["message" => "Berhasil"]);
    }
    public function delete($id){
        $access = checkPermission('item');
        if($access == "" || $access == null || $access->menu_access == "Read only"){
            return abort(403);
        }
        PositionModel::where('row_id',$id)->update([
            "is_deleted" => 1,
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username')
        ]);
        return response()->json(["message" => "Berhasil"]);
    }
     
}
