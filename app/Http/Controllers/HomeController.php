<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Imports\InventoryImport;
use Maatwebsite\Excel\Facades\Excel;
class HomeController extends Controller
{
    public function index(){
        $menu = listMenu();
        return inertia('Home/Home',[
            'session' => session()->all(),
            'menu' => $menu
        ]);
    }

    public function getAllInventory(Request $request)
    {
        $data = datatable('vw_inventorylist');
        return $data;
    }

    public function getById($id){
        $data = DB::table('vw_paymentlist')->where('row_id',$id)->first();
        return response()->json([
            "data" => $data
        ]);
    }

    public function getByCustomer($id){
        $data = DB::table('vw_paymentlist')->where([
            ['customer_id','=',$id],
            ['status','=','PAID'],
        ])->get();
        return response()->json([
            "data" => $data
        ]);
    }

    public function import(Request $request){
        $data = Excel::toCollection(new InventoryImport,$request->file('file'));
        dd($data->first()[0]);
    }
    public function testImport(){
        return view('test');
    }

}
