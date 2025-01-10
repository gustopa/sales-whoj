<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index(){
        $permission = checkPermission('customer');
        $menu = listMenu();
        checkAccess('customer');
        return inertia('Customer/Customer',[
            'session' => session()->all(),
            'permission' => $permission,
            'menu' => $menu
        ]);
    }
}
