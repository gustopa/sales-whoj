<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class ExrateController extends Controller
{
    public function index(){
        $access = checkPermission('exrate');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        return inertia("Exrate/Exrate",[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access
        ]);
    }

    public function getAll(){
        $access = checkPermission('exrate');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable("vw_exratelist",function($query){
            $query->where([
                ["is_deleted","=",0],
                ["company_id","=",session('company_id')]
            ]);
        });
        return $data;
    }
    public function edit($id){
        $access = checkPermission('exrate');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        $request = request();
        DB::table('exrate')->where('row_id',$id)->update($request['data']);
        return response()->json('okké');
    }
}
