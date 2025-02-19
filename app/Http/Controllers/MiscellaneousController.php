<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MiscellaneousModel;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class MiscellaneousController extends Controller
{
    public function tambah(Request $request){
        $access = checkPermission('miscellaneous');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        $filename;
        $file = $request->file('file');
        $filename = "photo_file".time().'.jpeg';
        $destinationPath = storage_path('app/public/uploaded');
        $manager = new ImageManager(new Driver());
        $image = $manager->read($file->getRealPath());
        $image->scale(1920,1080);
        $image->save($destinationPath . '/' . $filename);

        $data = $request->input('data', []); 
        $data['foto'] = $filename; 
        $request->merge(['data' => $data]);

        MiscellaneousModel::insert($request['data']);
        return response()->json(["message" => "Berhasil"]);
    }

    public function edit($id){
        $access = checkPermission('miscellaneous');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        $request = request();
        $filename = MiscellaneousModel::where('row_id',$id)->first()->foto;
        if($request->hasFile('file')){
            $file = $request->file('file');
            $filename = "photo_file".time().'.jpeg';
            $destinationPath = storage_path('app/public/uploaded');
            $manager = new ImageManager(new Driver());
            $image = $manager->read($file->getRealPath());
            $image->scale(1920,1080);
            $image->save($destinationPath . '/' . $filename);
        }

        $data = $request->input('data', []); 
        $data['foto'] = $filename; 
        $request->merge(['data' => $data]);

        MiscellaneousModel::where('row_id',$id)->update($request['data']);
        return response()->json(["message" => "Berhasil"]);
    }

    public function delete($id){
        $access = checkPermission('miscellaneous');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        MiscellaneousModel::where('row_id',$id)->update([
            "is_deleted" => 1,
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by" => session('username')
        ]);
        return response()->json(['status' => "okeee"]);
    }
}
