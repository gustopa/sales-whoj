<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\CustomerVisitModel;
use App\Http\Controllers\CustomerController;
class CustomerVisitController extends Controller
{
    public function index(){
        $access = checkPermission('customer_visit');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        return inertia('CustomerVisit/CustomerVisit',['menu' => $menu, 'session' => session()->all(), 'access' => $access->menu_access]);
    }

    public function getList(){
        $data = datatable("vw_customer_visitlist",function($query){
            $query->orderBy("row_id","desc");
        });
        return $data;
    }

    public function delete($id){
        $access = checkPermission('customer_visit');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        CustomerVisitModel::where('row_id',$id)->update([
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username'),
            "is_deleted" => 1
        ]);

        return response()->json([
            "data" => password_hash($id,PASSWORD_DEFAULT)
        ]);
    }

    public function save(){
        $data = [
            "customer_id" => request('id_customer'),
            "inventory_id" => request('id_item'),
            "trans_date" => request('tanggal'),
            "notes" => request('notes'),
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username'),
            "is_submitted" => 1,
            "is_deleted" => 0
        ];
        if(request('action') == 'tambah'){
            $data['created_date'] = date("Y-m-d H:i:s");
            $data['created_by'] = session('username');
            $data['company_id'] = session('company_id');
            $id = CustomerVisitModel::insertGetId($data);
        }else if(request('action') == "edit"){
            $id = request('line_id');
            CustomerVisitModel::where('row_id',$id)->update($data);
        }

        return response()->json([
            "data" => password_hash($id,PASSWORD_DEFAULT)
        ]);
    }


}
