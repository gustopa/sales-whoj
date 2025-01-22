<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RefundController extends Controller
{
    public function index(){
        $access = checkPermission('refund');
        if($access == null || $access == ""){
            return abort(403);
        }

        $menu = listMenu();
        return inertia('Refund/Refund',[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access
        ]);
    }
    public function getAll(){
        $access = checkPermission('refund');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable("vw_refundlist",function($query){
            $query->where('is_deleted',0);
            $query->where('company_id',session('company_id'));
            $query->orderBy('row_id','desc');
        });
        return $data;
    }
}
