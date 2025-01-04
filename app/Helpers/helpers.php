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

