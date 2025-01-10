<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(){
        $menu = listMenu();
        return inertia('Home',[
            'page' => 'Home', 
            'name' => session('name'), 
            'session' => session()->all(),
            'menu' => $menu
        ]);
    }
    public function profile(Request $request){
        dd($request->session()->all());
    }
}
