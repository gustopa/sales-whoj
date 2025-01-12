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


if(! function_exists('incrementID')){
    function incrementID($currentCode) {
        // Pisahkan prefix dan angka
        $parts = explode('-', $currentCode); // Misalnya "C-0004845"
        $prefix = $parts[0];                // "C"
        $number = intval($parts[1]);        // 4845 (konversi jadi integer)
    
        // Increment angka
        $newNumber = $number + 1;
    
        // Hitung panjang format angka saat ini
        $currentLength = strlen($parts[1]);
    
        // Pastikan angka tetap dalam format padding nol
        $newNumberFormatted = str_pad($newNumber, $currentLength, '0', STR_PAD_LEFT);
    
        // Gabungkan kembali prefix dengan angka baru
        return $prefix . '-' . $newNumberFormatted;
    }
}


