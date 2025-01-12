<?php

use Illuminate\Support\Facades\DB;

if(! function_exists('checkPermission')){
    function checkPermission($page){
        $row_id = session('user_id');
        $data = DB::table('vw_sysaccessmenuuserlist')->where('row_id',3)->get();
        if($row_id == 1 || $row_id == 2){
            $object = new stdClass();
            $object->menu_access = "Full control";
            $access_page = $object;
        }else{
            $access_page = DB::table('vw_sysaccessmenuuserlist')->where([
                ['row_id','=',$row_id],
                ['controller_menu','=',$page]
            ])->first();
        }
        return $access_page;
    }
}

if(! function_exists('checkAccess')){
    function checkAccess($page){
        $access = checkPermission($page);
        if($access == null || $access == ''){
            return redirect()->route('dashboard');
        }
    }
}

if(! function_exists('listMenu')){
    function listMenu(){
        $row_id = session('user_id');
        if($row_id == 1 || $row_id == 2){
            $menus = DB::table('vw_sysaccessmenuadminlist')->orderBy('folder_seq','ASC')->orderby('menu_seq','ASC')->get();
        }else{
            $menus = DB::table('vw_sysaccessmenuuserlist')->where('row_id',$row_id)->orderBy('folder_seq','ASC')->orderby('menu_seq','ASC')->get();
        }

        return $menus;
    }
}