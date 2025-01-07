<?php
   
use Carbon\Carbon;
  
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

if(! function_exists('addAuditLog')){
    function addAuditLog($table,$user_action,$data_submitted,$remark){
        return false;
    }
}

if(! function_exists('setDataAuditLog')){
    function setDataAuditLog($str){
        $ret = 0;
        if(!empty($str)) {
            $ret = str_replace(',"', ', "', json_encode($str));
        }
        return $ret;
    }
}

