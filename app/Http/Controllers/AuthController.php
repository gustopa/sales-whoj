<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PragmaRX\Google2FALaravel\Support\Google2FA;

class AuthController extends Controller
{
    public function login(Request $request){

        // $user =  DB::table('sysuser')->select(
        //     'sysuser.row_id',
        //     'syscompany.name as company_name',
        //     'syscompany.row_id as company_id',
        //     'syscompany.is_active as is_active_company',
        //     'sysuser.role_id',
        //     'sysrole.name as role_name',
        //     'store.row_id as id_store',
        //     'store.name as store_name',
        //     'sysuser.name',
        //     'sysuser.email',
        //     'sysuser.user_id',
        //     'sysuser.pswrd as password',
        //     'sysuser.encrypt_user_id',
        //     'sysuser.google_token',
        //     'sysuser.is_login',
        //     'sysuser.is_active',
        //     'sysuser.is_submitted',
        //     'sysuser.created_date',
        //     'sysuser.created_by',
        //     'sysuser.modified_date',
        //     'syscompany.color',
        //     'sysuser.modified_by')
        //     ->Leftjoin('syscompany','sysuser.company_id','=','syscompany.row_id')
        //     ->Leftjoin('sysrole','sysuser.role_id','=','sysrole.row_id')
        //     ->Leftjoin('store','sysuser.store_id','=','store.row_id')
        //     ->where([
        //         ['sysuser.user_id','=',$request['userid']],
        //         ['sysuser.is_deleted','=','0']
        //     ])
        //     ->first();

        $user = DB::table("vw_sysuserlist")
        ->where([
            ["is_active","=",1],
            ['user_id','=',$request['userid']],
            ['is_deleted','=',0]
        ])
        ->first();
        // dd($user);
        if($user && md5($request['password']) == $user->pswrd){
            $request->session()->put($this->session_data($user));
            return redirect()->route('dashboard');
        }

        $google2fa = app('pragmarx.google2fa');
        if($user){
            if($user->google_token){
                if($google2fa->verifyKey($user->google_token,$request['password'])){
                    $request->session()->put($this->session_data($user));
                    return redirect()->route('dashboard');
                }
            }
        }

        // return false;
    }

    protected function session_data($user){
        $period = DB::table('sysperiod')->where('is_active','1')->first();
        $session_data = [
            "login" => true,
            'user_id' => $user->row_id,
            'store_id' => $user->store_id,
            'store_name' => $user->store_id_txt,
            'email' => $user->email,
            'username' => $user->name,
            'role_id' => $user->role_id,
            'role_name' => $user->role_id_txt,
            'company_id' => $user->company_id,
            'company_name' => $user->company_id_txt,
            'period' => $period->name,
            'period_id' => $period->row_id,
            'session_id' => strtotime(date('Y-m-d H:i:s'))
        ];
        return $session_data;
    }

    public function logout(Request $request){
        $request->session()->flush();
        return redirect()->route('login');   

    }
}
