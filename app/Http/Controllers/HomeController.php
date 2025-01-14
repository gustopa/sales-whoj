<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class HomeController extends Controller
{
    public function index(){
        $menu = listMenu();
        return inertia('Home',[
            'page' => 'Home', 
            'name' => session('name'), 
            'session' => session()->all(),
            'menu' => $menu
        ]);
    }
    public function profile(Request $request){
        dd($request->session()->all());
    }

    public function getAllInventory(Request $request)
{
    $startRow = $request->get('startRow', 0);
    $endRow = $request->get('endRow', 100);

    $filterModel = $request->get('filterModel',[]);
    $sortModel = $request->get('sortModel',[]);
    
    // Query dasar
    $query = DB::table('vw_inventorylist');
    
    // Terapkan filter
    if (!empty($filterModel)) {
        foreach ($filterModel as $field => $filter) {
            if ($filter['filterType'] === 'text') {
                $query->where($field, 'like', '%' . $filter['filter'] . '%');
            } elseif ($filter['filterType'] === 'number') {
                $query->where($field, $filter['type'], $filter['filter']);
            }
        }
    }

    // Terapkan sorting
    if (!empty($sortModel)) {
        foreach ($sortModel as $sort) {
            $query->orderBy($sort['colId'], $sort['sort']);
        }
    }

    // Total hasil pencarian
    $totalCount = $query->count();

    // Ambil data
    $data = $query->skip($startRow)
                ->take($endRow - $startRow)
                ->get();

    return response()->json([
        'rows' => $data,
        'lastRow' => $totalCount,
    ]);
}


}
