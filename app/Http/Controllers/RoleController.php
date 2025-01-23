<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function getAll(){
        $access = checkPermission('sysrole');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_sysrolelist',function($query){
            $query->orderBy('row_id','desc');
        });
        return $data;
        
    }
    public function getAllAccess(){
        $access = checkPermission('sysaccess');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_sysaccesslist',function($query){
            $query->orderBy('row_id','desc');
        });
        return $data;
        
    }
    public function getListAccess($id){
        $access = checkPermission('sysaccess');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_sysaccess_linelist',function($query) use ($id){
            $query->where('row_id',decrypt_id($id));
            $query->orderBy('row_id','desc');
        });
        return $data;
        
    }
}
