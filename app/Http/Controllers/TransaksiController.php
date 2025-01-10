<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TransaksiController extends Controller
{
    public function dashboard(Request $request){
        $access = checkPermission('dashboard_sales');
        if($access == null || $access == ''){
            return redirect()->route('dashboard');
        }
        $menu = listMenu();
        return inertia('Transaksi/Dashboard',[
            'session' => $request->session()->all(),
            'permission' => $access,
            'menu' => $menu
        ]);
    }
}
