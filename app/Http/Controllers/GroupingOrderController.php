<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GroupingOrderModel;
use Illuminate\Support\Facades\DB;
class GroupingOrderController extends Controller
{
    public function getAll(){
        $access = checkPermission('grouping_order');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_grouping_orderlist',function($query){
            $query->orderBy('row_id','desc');
        });
        return $data;
    }

    public function getDetailDiamond($id){
        $access = checkPermission('grouping_order');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_grouping_order_diamondlist',function($query) use ($id){
            $query->orderBy('line_id','desc');
            $query->where('row_id',decrypt_id($id));
        });
        return $data;
    }

    public function create(){
        $access = checkPermission('grouping_order');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        $data = [
            "company_id"    => session('company_id'),
            "created_date"  => date("Y-m-d H:i:s"),
            "created_by"    => session('username'),
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by"   => session('username'),
            "is_deleted"    => 0,
            "is_submitted"  => 0,
        ];
        $newGroupingOrder = GroupingOrderModel::create($data);
        return redirect()->to(url("/grouping_order/form/".encrypt_id($newGroupingOrder->id)));

    }

    public function form($id){
        $access = checkPermission('grouping_order');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        $data = GroupingOrderModel::where('row_id',decrypt_id($id))->first();
        $menu = listMenu();
        return inertia("Master/components/FormGroupingOrder",[
            "data" => $data,
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access
        ]);
    }
    public function delete($id){
        $access = checkPermission('grouping_order');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        GroupingOrderModel::where('row_id',$id)->update([
            "is_deleted" => 1
        ]);
        return response()->json([
            "message" => "berhasil"
        ]);
    }
    
}
