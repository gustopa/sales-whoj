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

if(! function_exists('formatRupiah')){
    function formatRupiah($angka, $prefix = 'Rp ') {
        return $prefix . number_format($angka, 0, ',', '.');
    }
}
if(! function_exists('formatDate')){
    function formatDate($date){
        $dateTime = new DateTime($date);

        // Format ulang tanggal
        $formattedDate = $dateTime->format('d F, Y');

        return $formattedDate;
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

if(! function_exists('updateLastId')){
    function updateLastId($field){
        DB::transaction(function() use ($field){
            $currentId = DB::table("last_id")->first()->$field;
            DB::table("last_id")->update([
                $field => $currentId + 1
            ]);
            return true;
        });
    }
}

if(! function_exists('decrypt_id')){
    function decrypt_id($encryptedData) {
        $key = env("SECURITY_KEY");
        $data = base64_decode($encryptedData);
        $output = '';
        for ($i = 0; $i < strlen($data); $i++) {
            $output .= chr(ord($data[$i]) ^ ord($key[$i % strlen($key)]));
        }
        return $output;
	}
}

if(!function_exists('encrypt_id')){
    function encrypt_id($data) {
		$output = '';
        $data = strval($data);
        $key = env("SECURITY_KEY");
        for ($i = 0; $i < strlen($data); $i++) {
            $output .= chr(ord($data[$i]) ^ ord($key[$i % strlen($key)]));
        }
        return base64_encode($output);
	}
}




