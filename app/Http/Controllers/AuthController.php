<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PragmaRX\Google2FALaravel\Support\Google2FA;

class AuthController extends Controller
{
    public function login(Request $request){
        $user = DB::table('sysuser')->where([
            ['user_id','=',$request['userid']],
            ['is_deleted','=','0']
        ])->first();
        if($user && password_verify($request['password'],$user->pswrd)){
            $request->session()->put($this->session_data($user));
            return redirect()->route('dashboard');
        }

        $google2fa = app('pragmarx.google2fa');
        if($user){
            if($user->google_secret_code){
                if($google2fa->verifyKey($user->google_secret_code,$request['password'])){
                    $request->session()->put($this->session_data($user));
                    return redirect()->route('dashboard');
                }
            }
        }

        return false;
    }

    protected function session_data($user){
        $session_data = [
            "row_id" => enkripsi($user->row_id),
            "user_id" => $user->user_id,
            "name" => $user->name,
            "title" => $user->title,
            "email" => $user->email,
            "employee_id" => enkripsi($user->employee_id),
            "user_access_id" => enkripsi($user->user_access_id),
            "login" => true
        ];
        return $session_data;
    }
}
