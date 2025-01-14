<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\CustomerModel;
class CustomerController extends Controller
{
    public function index(){
        $permission = checkPermission('customer');
        if($permission == null || $permission == ''){
            return redirect()->route('dashboard');
        }
        $menu = listMenu();
        checkAccess('customer');
        return inertia('Customer/Customer',[
            'session' => session()->all(),
            'permission' => $permission,
            'menu' => $menu
        ]);
    }

    public function getAll(){
        $data = DB::table('vw_customerlist')->where('is_deleted','0')->where('company_id',session('company_id'))->orderBy('row_id','DESC')->get();
        return response()->json($data);
    }
    public function getSizeList(){
        $data = DB::table('vw_customer_sizelist')->where([
            ['is_deleted','=','0'],
            ['company_id','=',session('company_id')],
            ['row_id','=',request('row_id')]
        ])->get();
        return response()->json($data);
    }

    public function getPaymentList(){
        $data = DB::table('vw_paymentlist')->where([
            ['is_deleted','=','0'],
            ['company_id','=',session('company_id')],
            ['customer_id','=',request('row_id')],
            ['status','=','PAID']
        ])->get();
        return response()->json($data);
    }

    public function getOrderList(){
        $data = DB::table('vw_request_orderlist')->where([
            ['is_deleted','=','0'],
            ['company_id','=',session('company_id')],
            ['customer_id','=',request('row_id')],
        ])->get();
        return response()->json($data);
    }

    public function getRefundList(){
        $data = DB::table('vw_refundlist')->where([
            ['is_deleted','=','0'],
            ['company_id','=',session('company_id')],
            ['customer_id','=',request('row_id')],
        ])->get();
        return response()->json($data);
    }

    public function getDocumentList(){
        $data = DB::table('vw_customer_documentlist')->where([
            ['is_deleted','=','0'],
            ['company_id','=',session('company_id')],
            ['row_id','=',request('row_id')],
        ])->get();
        return response()->json($data);
    }

    public function getVisitList(){
        $data = DB::table('vw_customer_visitlist')->where([
            ['is_deleted','=','0'],
            ['company_id','=',session('company_id')],
            ['customer_id','=',request('row_id')],
        ])->get();
        return response()->json($data);
    }

    public function create(){
        $permission = checkPermission('customer');
        if($permission == null || $permission->menu_access == "Read only"){
            return abort(403);
        }
        $newCustomer = DB::transaction(function(){
            $latestID = CustomerModel::latest('row_id')->first()->customer_no;
            $costumerID = incrementID($latestID);
            $data = [
                "company_id" => session('company_id'),
                "created_date" => date("Y-m-d H:i:s"),
                "created_by" => session('username'),
                "modified_date" => date("Y-m-d H:i:s"),
                "modified_by" => session('username'),
                "is_deleted" => 0,
                "is_submitted" => 0,
                "customer_no" => $costumerID
            ];
            updateLastId('customer_id');
            return CustomerModel::create($data);
        });

        return redirect("/customer/form/".encrypt_id($newCustomer->id));

    }

    public function delete($id){
        $permission = checkPermission('customer');
        if($permission == null || $permission == "Read only"){
            return abort(403);
        }
        $query = CustomerModel::where('row_id',$id)->update([
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username'),
            "is_deleted" => 1,
            "is_submitted" => 0
        ]);

        return response()->json($query);
    }

    public function form($id){
        $permission = checkPermission('customer');
        $menu = listMenu();
        checkAccess('customer');
        $cityList = DB::table('vw_citylist')->where('is_deleted',0)->get();
        $customer = CustomerModel::select('customer.*','city.city_name')->leftJoin('city','customer.city_id','=','city.row_id')->where('customer.row_id',intval(decrypt_id($id)))->first();
        return inertia('Customer/Form',['session' => session()->all(),'customer' => $customer,'menu' => $menu, 'city' => $cityList]);
    }
}
