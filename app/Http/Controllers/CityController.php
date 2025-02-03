<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CityModel;
class CityController extends Controller
{
    public function getAll(){
        $access = checkPermission('city');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_citylist',function($query){
            $query->orderBy('row_id','desc');
        });
        return $data;
    }
    public function tambah(Request $request){
        $access = checkPermission('city');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        CityModel::insert([
            "company_id" => session('company_id'),
            "region" => "",
            "province_name" => $request['province'],
            "city_name" => $request['city'],
            "is_submitted" => 1,
            "is_deleted" => 0,
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
        $access = checkPermission('city');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        CityModel::where('row_id',$id)->update([
            "province_name" => $request['province'],
            "city_name" => $request['city'],
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username')
        ]);
        return response()->json([
            "message" => "berhasil"
        ]);
    }
    public function delete($id){
        $access = checkPermission('city');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        CityModel::where('row_id',$id)->update([
            "is_deleted" => 1,
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username')
        ]);
        return response()->json([
            "message" => "berhasil"
        ]);
    }
}
