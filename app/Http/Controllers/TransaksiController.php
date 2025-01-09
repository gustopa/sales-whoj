<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TransaksiController extends Controller
{
    public function dashboard(Request $request){
        return inertia('Transaksi/Dashboard',['session' => $request->session()->all()]);
    }
}
