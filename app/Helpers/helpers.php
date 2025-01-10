<?php
   
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
/**
 * Write code on Method
 *
 * @return response()
 */
if (! function_exists('enkripsi')) {
    function enkripsi($string) {
        if($string != "") {
            $output = false;
            $key = hash("sha256", env("SECURITY_KEY"));
            $iv = substr(hash("sha256", env("SECURITY_IV")), 0, 16);
            $result = openssl_encrypt($string, env("SECURITY_METHOD"), $key, 0, $iv);
            $output = base64_encode($result);
            return $output;
        } else {        
            return "";
        }
    }
}

if(! function_exists('checkPermission')){
    function checkPermission($page){
        $row_id = session('user_id');
        $data = DB::table('vw_sysaccessmenuuserlist')->where('row_id',3)->get();
        if($row_id == 1 || $row_id == 2){
            $access_page = "Full control";
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


