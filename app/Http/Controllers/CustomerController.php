<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\CustomerModel;
use App\Models\CustomerDocumentModel;
use App\Models\CustomerSizeModel;
class CustomerController extends Controller
{
    public function index(){
        $permission = checkPermission('customer');
        if($permission == null || $permission == ''){
            return redirect()->route('dashboard');
        }
        $menu = listMenu();
        return inertia('Customer/Customer',[
            'session' => session()->all(),
            'permission' => $permission,
            'menu' => $menu
        ]);
    }

    public function getAll(){
        $data = datatable('vw_customerlist',function($query){
            $query->where('is_submitted',1);
            $query->orderBy("row_id","DESC");
        });
        return $data;
    }
    public function getOneCustomer(){
        $data = DB::table('vw_customerlist')->where('row_id',request('row_id'))->where('company_id',session('company_id'))->first();
        return response()->json($data);
    }

    public function save(){
        $permission = checkPermission('customer');
        if($permission == null || $permission == "" || $permission->menu_access == "Read only"){
            return abort(403);
        }
        $data = [
            "name" => request('name'),
            "telp_no" => request('no_hp'),
            "hp_bo" => request('no_hp'),
            "birth_date" => request('tgl_lahir') == "0000-00-00" ? null : request('tgl_lahir'),
            "address" => request('alamat'),
            "city_id" => request('city_id'),
            "gender" => request('jenis_kelamin'),
            "religion" => request('agama'),
            "instagram" => request('instagram'),
            "pi_no" => request('member_PI'),
            "visit_date" => request('tgl_datang') == "0000-00-00" ? null : request('tgl_datang'),
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username')
        ];
        if(request("action") == "submit"){
            $data["is_submitted"] = 1;
        }
        CustomerModel::where('row_id',request('row_id'))->update($data);
        return response()->json([
            "data" => "berhasil"
        ]);
    }

    // Start CRUD Size
    public function getSizeList(){
        $data = DB::table('vw_customer_sizelist')->where([
            ['is_deleted','=','0'],
            ['company_id','=',session('company_id')],
            ['row_id','=',request('row_id')]
        ])->get();
        return response()->json($data);
    }

    public function addSize(){
        $acccess = checkPermission('customer')->menu_access;
        if($acccess == null || $acccess == '' || $acccess == "Read only"){
            return abort(403);
        }
        $id = CustomerSizeModel::insertGetId([
            "row_id" => request("row_id"),
            "product" => request('barang'),
            "txt" => request('details'),
            "company_id" => session("company_id"),
            "is_deleted" => 0,
            "created_date" => date("Y-m-d H:i:s"),
            "created_by" => session('username'),
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session("username")
        ]);
        return response()->json([
            "data" => $id
        ]);
    }

    public function deleteSize($id){
        CustomerSizeModel::where("line_id",$id)->update([
            "is_deleted" => 1,
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session("username")
        ]);
        return response()->json([
            "data" => password_hash($id,PASSWORD_DEFAULT)
        ]);
    }

    public function editSize(){
        CustomerSizeModel::where('line_id',request('line_id'))->update([
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session("username"),
            "product" => request('barang'),
            "txt" => request('details')
        ]);
        return response()->json([
            "data" => password_hash(request("line_id"),PASSWORD_DEFAULT)
        ]);
    }
    // End CRUD Size


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

    // Start CRUD Document
    public function getDocumentList(){
        $data = DB::table('vw_customer_documentlist')->where([
            ['is_deleted','=','0'],
            ['company_id','=',session('company_id')],
            ['row_id','=',request('row_id')],
        ])->get();
        return response()->json($data);
    }

    public function addDocument(){
        $id = CustomerDocumentModel::insertGetId([
            "row_id" => request('row_id'),
            "name" => request('dokumen'),
            "company_id" => session('company_id'),
            "status" => request('status'),
            "notes" => request('notes'),
            "is_deleted" => 0,
            "created_date" => date("Y-m-d H:i:s"),
            "created_by" => session('username'),
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username')
        ]);
        return response()->json([
            "data" => $id
        ]);
    }

    public function deleteDocument($id){
        CustomerDocumentModel::where('line_id',$id)->update([
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session("username"),
            "is_deleted" => 1
        ]);

        return response()->json([
            "data" => password_hash($id,PASSWORD_DEFAULT)
        ]);
    }

    public function editDocument(){
        CustomerDocumentModel::where('line_id',request('line_id'))->update([
            "name" => request('dokumen'),
            "notes" => request('notes'),
            "status" => request("status"),
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username')
        ]);
        return response()->json([
            "data" => password_hash(request("line_id"),PASSWORD_DEFAULT)
        ]);
    }
    // End CRUD Document

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
        if($permission == null || $permission->menu_access == "Read only"){
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
        $acccess = checkPermission('customer');
        if($acccess == null || $acccess == '' || $acccess->menu_access == "Read only"){
            return abort(403);
        }
        $permission = checkPermission('customer');
        $menu = listMenu();
        checkAccess('customer');
        $cityList = DB::table('vw_citylist')->where('is_deleted',0)->get();
        $customer = CustomerModel::select('customer.*','city.city_name')->leftJoin('city','customer.city_id','=','city.row_id')->where('customer.row_id',intval(decrypt_id($id)))->first();
        return inertia('Customer/Form',['session' => session()->all(),'customer' => $customer,'menu' => $menu, 'city' => $cityList]);
    }
}
