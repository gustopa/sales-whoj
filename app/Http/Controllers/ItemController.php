<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ItemModel;
use App\Models\JenisModel;
use App\Models\ModelModel;
use App\Models\LabourPriceModel;
class ItemController extends Controller
{
    public function getAll(){
        $access = checkPermission('item');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_itemlist',function($query){
            $query->orderBy('row_id','desc');
        });
        return $data;

    }
    public function getAllType(){
        $access = checkPermission('item_type');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_item_typelist',function($query){
            $query->orderBy('row_id','desc');
        });
        return $data;

    }
    public function getAllModel(){
        $access = checkPermission('model');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_modellist',function($query){
            $query->orderBy('row_id','desc');
        });
        return $data;

    }
    public function getAllLabour(){
        $access = checkPermission('model');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_labour_pricelist',function($query){
            $query->orderBy('row_id','desc');
        });
        return $data;

    }

    public function tambah(Request $request){
        $access = checkPermission('item');
        if($access == "" || $access == null || $access->menu_access == "Read only"){
            return abort(403);
        }
        ItemModel::insert([
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
        ItemModel::where('row_id',$id)->update([
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
        ItemModel::where('row_id',$id)->update([
            "is_deleted" => 1,
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username')
        ]);
        return response()->json(["message" => "Berhasil"]);
    }

    // Start CRUD Jenis
    public function tambahJenis(Request $request){
        $access = checkPermission('item_type');
        if($access == "" || $access == null || $access->menu_access == "Read only"){
            return abort(403);
        }
        JenisModel::insert([
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
    public function editJenis($id){
        $access = checkPermission('item_type');
        if($access == "" || $access == null || $access->menu_access == "Read only"){
            return abort(403);
        }
        JenisModel::where('row_id',$id)->update([
            "name" => request('name'),
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username')
        ]);
        return response()->json(["message" => "Berhasil"]);
    }
    public function deleteJenis($id){
        $access = checkPermission('item_type');
        if($access == "" || $access == null || $access->menu_access == "Read only"){
            return abort(403);
        }
        JenisModel::where('row_id',$id)->update([
            "is_deleted" => 1,
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username')
        ]);
        return response()->json(["message" => "Berhasil"]);
    }
    // End CRUD Jenis

    // Start CRUD Model
    public function tambahModel(Request $request){
        $access = checkPermission('model');
        if($access == "" || $access == null || $access->menu_access == "Read only"){
            return abort(403);
        }
        ModelModel::insert([
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
    public function editModel($id){
        $access = checkPermission('model');
        if($access == "" || $access == null || $access->menu_access == "Read only"){
            return abort(403);
        }
        ModelModel::where('row_id',$id)->update([
            "name" => request('name'),
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username')
        ]);
        return response()->json(["message" => "Berhasil"]);
    }
    public function deleteModel($id){
        $access = checkPermission('model');
        if($access == "" || $access == null || $access->menu_access == "Read only"){
            return abort(403);
        }
        ModelModel::where('row_id',$id)->update([
            "is_deleted" => 1,
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username')
        ]);
        return response()->json(["message" => "Berhasil"]);
    }
    // End CRUD Model
    // Start CRUD Labour Price
    public function tambahLabour(Request $request){
        $access = checkPermission('item');
        if($access == "" || $access == null || $access->menu_access == "Read only"){
            return abort(403);
        }
        LabourPriceModel::insert([
            "company_id" => session('company_id'),
            "name" => $request['name'],
            "amount" => $request['amount'],
            "is_submitted" => 1,
            "created_date" => date("Y-m-d H:i:s"),
            "created_by" => session('username'),
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username')
        ]);
        return response()->json(["message" => "Berhasil"]);
    }
    public function editLabour($id){
        $access = checkPermission('item');
        if($access == "" || $access == null || $access->menu_access == "Read only"){
            return abort(403);
        }
        LabourPriceModel::where('row_id',$id)->update([
            "name" => request('name'),
            "amount" => request('amount'),
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username')
        ]);
        return response()->json(["message" => "Berhasil"]);
    }
    public function deleteLabour($id){
        $access = checkPermission('item');
        if($access == "" || $access == null || $access->menu_access == "Read only"){
            return abort(403);
        }
        LabourPriceModel::where('row_id',$id)->update([
            "is_deleted" => 1,
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username')
        ]);
        return response()->json(["message" => "Berhasil"]);
    }
    // End Labour Price
}
