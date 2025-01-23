<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class KonfigurasiController extends Controller
{
    public function syscompany(){
        $access = checkPermission('syscompany');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        $data = DB::table('vw_syscompanylist')
        ->where('is_deleted',0)->get();
        return inertia("Konfigurasi/Company",[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access,
            "data" => $data
        ]);
    }
    public function syswebinfo(){
        $access = checkPermission('syswebinfo');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        $data = DB::table('vw_syswebinfolist')
        ->where('is_deleted',0)->first();
        return inertia("Konfigurasi/WebInfo",[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access,
            "data" => $data
        ]);
    }
    public function sysuser(){
        $access = checkPermission('sysuser');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        return inertia("Konfigurasi/Sysuser",[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access
        ]);
    }
    public function sysfoldermenu(){
        $access = checkPermission('sysfoldermenu');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        return inertia("Konfigurasi/Sysfoldermenu",[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access
        ]);
    }
    public function sysmenu(){
        $access = checkPermission('sysmenu');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        return inertia("Konfigurasi/Sysmenu",[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access
        ]);
    }
    public function sysrole(){
        $access = checkPermission('sysrole');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        return inertia("Konfigurasi/Sysrole",[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access
        ]);
    }
    public function sysaccess(){
        $access = checkPermission('sysaccess');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        return inertia("Konfigurasi/Sysaccess",[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access
        ]);
    }
}
