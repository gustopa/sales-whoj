<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index(){
        return inertia('Customer/Customer',['session' => session()->all()]);
    }
}
