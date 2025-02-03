<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GroupingOrderModel;
use App\Models\GroupingOrderDiamondModel;
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
        $items = DB::table('vw_itemlist')->where('company_id',session('company_id'))->where('is_deleted',0)->get();
        return inertia("Master/components/FormGroupingOrder",[
            "dataGroup" => $data,
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access,
            "items" => $items
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
    public function getDiamondDetail($id){
        $access = checkPermission('grouping_order');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_grouping_order_diamondlist',function($query) use ($id){
            $query->where('row_id',decrypt_id($id));
        });
        return $data;
    }
    public function addDiamond(Request $request){
        $access = checkPermission('grouping_order');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        GroupingOrderDiamondModel::insert([
            "row_id" => $request['row_id'],
            "company_id" => session('company_id'),
            "grain" => $request['butir'],
            "grade" => $request['karat'],
            "diamond_type" => $request['tipe'],
            "no_sert" => $request['sert_no'],
            "diameter" => $request['diameter'],
            "color" => $request['warna'],
            "is_deleted" => 0,
            "created_date"  => date("Y-m-d H:i:s"),
            "created_by"    => session('username'),
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by"   => session('username'),
        ]);
        return response()->json([
            "message" => "create"
        ]);
    }
    public function editDiamond($id){
        $request = request();
        $access = checkPermission('grouping_order');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        GroupingOrderDiamondModel::where("line_id",$id)->update([
            "grain" => $request['butir'],
            "grade" => $request['karat'],
            "diamond_type" => $request['tipe'],
            "no_sert" => $request['sert_no'],
            "diameter" => $request['diameter'],
            "color" => $request['warna'],
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by"   => session('username'),
        ]);
        return response()->json([
            "message" => "update-".$id.time()
        ]);
    }
    public function deleteDiamond($id){
        $access = checkPermission('grouping_order');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        GroupingOrderDiamondModel::where("line_id",$id)->update([
            "is_deleted" => 1,
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by"   => session('username'),
        ]);
        return response()->json([
            "message" => "delete-".$id
        ]);
    }

    public function save(Request $request){
        $access = checkPermission('grouping_order');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        GroupingOrderModel::where('row_id',$request['row_id'])->update([
            "is_submitted" => $request['mode'] == "submit" ? 1 : 0,
            "name" => $request['name'],
            "gold_weight" => $request['gold_weight'],
            "item_id" => $request['item_id'],
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by"   => session('username'),
        ]);
        return response()->json([
            "message" => "berhasil"
        ]);
    }
    
}
