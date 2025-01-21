<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReparasiController extends Controller
{
    public function index(){
        $access = checkPermission('reparation');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        return inertia("Reparasi/Reparasi",[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access
        ]);
    }

    public function getAll(){
        $request_order = datatable("vw_request_orderlist",function ($query) {
            $query->where([
                ['status','not like','PAID'],
                ['type_order','=','REPARASI']
            ]);
        });
        return $request_order;
    }
}
