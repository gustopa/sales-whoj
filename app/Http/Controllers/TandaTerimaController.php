<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\TandaTerimaModel;
use App\Models\TandaTerimaItemModel;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use PDF;
class TandaTerimaController extends Controller
{
    public function index(){
        $access = checkPermission('tanda_terima');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        return inertia('TandaTerima/TandaTerima',[
            'session' => session()->all(),
            'access' => $access->menu_access,
            'menu' => $menu
        ]);
    }

    public function getAll(){
        $data = datatable('vw_tanda_terimalist',function($query){
            $query->where('is_deleted',0);
            $query->where('company_id',session('company_id'));
            $query->orderBy('row_id','desc');
        });
        return $data;
    }

    public function getItem($id){
        $data = DB::table('vw_tanda_terima_itemlist')->where([
            ['row_id','=',decrypt_id($id)],
            ['is_deleted','=',0],
            ['company_id','=',session('company_id')]
        ])->get();
        return response()->json([
            "data" => $data
        ]);
    }

    public function create(){
        $access = checkPermission('tanda_terima');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        $id = DB::transaction(function(){
            $last_doc = TandaTerimaModel::latest('row_id')->where('doc_no','not like','')->first()->doc_no;
            $prefix = substr($last_doc, 0, 2);
            $number = (int) substr($last_doc, 2);
            $nextNumber = $number + 1;
            $currentCode = $prefix . str_pad($nextNumber, 9, '0', STR_PAD_LEFT);
            $newData = TandaTerimaModel::create([
                "company_id"    => session("company_id"),
                "doc_no"        => $currentCode,
                "is_submitted"  => 0,
                "is_deleted"    => 0,
                "created_date"  => date("Y-m-d H:i:s"),
                "created_by"    => session('username'),
                "modified_date" => date("Y-m-d H:i:s"),
                "modified_by"   => session('username'),
            ]);
            return $newData->id;
        });
        return redirect('/tanda_terima/form/'.encrypt_id($id));
    }

    public function form($id){
        $access = checkPermission('tanda_terima');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        $menu = listMenu();
        $data = DB::table('vw_tanda_terimalist')->where('row_id',decrypt_id($id))->first();
        return inertia("TandaTerima/Form",[
            "data" => $data,
            "menu" => $menu,
            "session" => session()->all()
        ]);
    }

    public function tambahItem(Request $request){
        $access = checkPermission('tanda_terima');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        DB::transaction(function() use ($request) {
            $filename = "";
            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $filename = "photo_file".time().'.jpeg';
                $destinationPath = storage_path('app/public/uploaded');
    
                $manager = new ImageManager(new Driver());
                $image = $manager->read($file->getRealPath());
                $image->scale(1920,1080);
    
                $image->save($destinationPath . '/' . $filename); 
    
            }
            $data = $request->input('data', []); 
            $data['photo'] = $filename; 
            $request->merge(['data' => $data]); 
            TandaTerimaItemModel::insert($request['data']);
        });
        return response()->json(password_hash(time(),PASSWORD_DEFAULT));
    }

    public function editItem($id){
        $access = checkPermission('tanda_terima');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        $request = request();
        if ($request->hasFile('file')) {
            $filename = "";
            $file = $request->file('file');
            $filename = "photo_file".time().'.jpeg';
            $destinationPath = storage_path('app/public/uploaded');

            $manager = new ImageManager(new Driver());
            $image = $manager->read($file->getRealPath());
            $image->scale(1920,1080);

            $image->save($destinationPath . '/' . $filename); 

            $data = $request->input('data', []); 
            $data['photo'] = $filename; 
            $request->merge(['data' => $data]); 
        }
        TandaTerimaItemModel::where('line_id',$id)->update($request['data']);

        return response()->json(password_hash(time(),PASSWORD_DEFAULT));
    }

    public function deleteItem($id){
        $access = checkPermission('tanda_terima');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        TandaTerimaItemModel::where('line_id',$id)->update([
            "is_deleted" => 1,
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by"   => session('username'),
        ]);
        return response()->json(time());
    }

    public function print($id){
        $tanda_terima = DB::table('vw_tanda_terimalist')->where('row_id',decrypt_id($id))->first();
        $tanda_terima_item = DB::table('vw_tanda_terima_itemlist')->where('row_id',decrypt_id($id))->get();
        $pdf = PDF::loadView('pdf.tanda_terima', [
            'tanda_terima' => $tanda_terima,
            'tanda_terima_item' => $tanda_terima_item])->setPaper('a4','landscape');

        // return view('pdf/payment',['payment' => $data]);
        return $pdf->stream("tanda-terima-$tanda_terima->doc_no.pdf",["Attachment" => false]);
    }

    public function save($id){
        $access = checkPermission('tanda_terima');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        $request = request();
        TandaTerimaModel::where('row_id',$id)->update($request['data']);
        return response()->json("okeee");
    }
    public function delete($id){
        $access = checkPermission('tanda_terima');
        if($access == null || $access == "" || $access->menu_access == "Read only"){
            return abort(403);
        }
        TandaTerimaModel::where('row_id',$id)->update([
            "is_deleted" => 1,
            "modified_date" => date("Y-m-d H:i:s"),
            "modified_by"   => session('username'),
        ]);
        return response()->json("okeee");
    }
}
