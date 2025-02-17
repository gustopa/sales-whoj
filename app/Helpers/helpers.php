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

if(!function_exists('get_crafts_workminute')){
    function get_crafts_workminute($from, $to) {
        $start = '08:00:00';
        $finish = '18:00:00';
        $minutes = "";
		$from_date = new DateTime(date("Y-m-d", xstrtotime($from)));
		$to_date = new DateTime(date("Y-m-d", xstrtotime($to)));
		$interval_date = $from_date->diff($to_date);
        $days = $interval_date->format('%d');
        $days = (int)$days;

        if($days == 0) {
            $from_datetime = new DateTime($from);
            $to_datetime = new DateTime($to);
            $diff = date_diff($from_datetime, $to_datetime);
            $minutes = (($diff->y * 365.25 + $diff->m * 30 + $diff->d) * 24 + $diff->h) * 60 + $diff->i + $diff->s/60;
        }
        else if($days == 1) {
            $from_datetime1 = new DateTime($from);
            $from_datetime2 = new DateTime(date("Y-m-d", xstrtotime($from))." 18:00:00");
            $diff = date_diff($from_datetime1, $from_datetime2);
            $minutes_datetime1 = (($diff->y * 365.25 + $diff->m * 30 + $diff->d) * 24 + $diff->h) * 60 + $diff->i + $diff->s/60;

            $to_datetime1 = new DateTime(date("Y-m-d", xstrtotime($to))." 08:00:00");
            $to_datetime2 = new DateTime($to);
            $diff = date_diff($to_datetime1, $to_datetime2);
            $minutes_datetime2 = (($diff->y * 365.25 + $diff->m * 30 + $diff->d) * 24 + $diff->h) * 60 + $diff->i + $diff->s/60;

            $minutes = $minutes_datetime1 + $minutes_datetime2;
        } else {
            $minute_add = ($days-1) * 600; // perhari itu jam kerja 10 jam (08:00 - 18:00)

            $from_datetime1 = new DateTime($from);
            $from_datetime2 = new DateTime(date("Y-m-d", xstrtotime($from))." 18:00:00");
            $diff = date_diff($from_datetime1, $from_datetime2);
            $minutes_datetime1 = (($diff->y * 365.25 + $diff->m * 30 + $diff->d) * 24 + $diff->h) * 60 + $diff->i + $diff->s/60;

            $to_datetime1 = new DateTime(date("Y-m-d", xstrtotime($to))." 08:00:00");
            $to_datetime2 = new DateTime($to);
            $diff = date_diff($to_datetime1, $to_datetime2);
            $minutes_datetime2 = (($diff->y * 365.25 + $diff->m * 30 + $diff->d) * 24 + $diff->h) * 60 + $diff->i + $diff->s/60;

            $minutes = $minute_add + $minutes_datetime1 + $minutes_datetime2;
        }		

        $hours = floor($minutes / 60);
        $minutes = ($minutes % 60);
        $ret = array(
            "hours" => $hours,
            "minutes" => $minutes,
            "minutes_perhour" => ($minutes / 60),
            "text" => sprintf('%02d Jam %02d Menit', $hours, $minutes),
        );
        
        return $ret;
    }
}

if(!function_exists('incrementPLU')){
    function incrementPLU($plu) {
        // Konversi ke integer agar bisa di-increment
        $number = intval($plu);
        
        // Tambah nilai 1
        $number++;
    
        // Hitung panjang string awal
        $length = strlen($plu);
    
        // Format ulang agar tetap memiliki panjang yang sama
        return str_pad($number, $length, '0', STR_PAD_LEFT);
    }
}




