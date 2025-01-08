<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(){
        return inertia('Home',['page' => 'Home', 'name' => session('name'), 'session' => session()->all()]);
    }
}
