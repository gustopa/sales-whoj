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
        $customerController = new CustomerController();
        $customer = $customerController->getAll();
        return inertia('CustomerVisit/CustomerVisit',['menu' => $menu, 'session' => session()->all(),'customer' => $customer]);
    }

    public function getList(){
        $access = checkPermission('customer_visit');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = DB::table('vw_customer_visitlist')->where([
            "is_deleted" => 0,
            "company_id" => session('company_id'),
        ])->orderBy('row_id','desc')->get();
        return response()->json($data);
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


}
