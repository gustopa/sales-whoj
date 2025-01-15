<?php

use Illuminate\Support\Facades\DB;

if(! function_exists('datatable')){
    function datatable($table,$orderBy=[]){
        $request = request();
        $startRow = $request->get('startRow', 0);
        $endRow = $request->get('endRow', 100);

        $filterModel = $request->get('filterModel',[]);
        $sortModel = $request->get('sortModel',[]);
        
        $query = DB::table($table);
        
        if (!empty($filterModel)) {
            foreach ($filterModel as $field => $filter) {
                if ($filter['filterType'] === 'text') {
                    switch ($filter['type']) {
                        case 'contains':
                            $query->where($field, 'like', '%' . $filter['filter'] . '%');
                            break;
                        case 'equals' : 
                            $query->where($field,'=', $filter['filter']);
                            break;
                        case 'notContains' : 
                            $query->where($field,'not like', $filter['filter']);
                            break;
                        case 'notEqual' :
                            $query->where($field, '<>' ,$filter['filter']);
                            break;
                        case 'startsWith' :
                            $query->where($field, 'like', $filter['filter'] . '%');
                            break;
                        case 'endsWith' :
                            $query->where($field, 'like', '%'.$filter['filter']);
                            break;
                        case 'blank' :
                            $query->where($field, '=', null)->orWhere($field,'=','');
                            break;
                        case 'notBlank' :
                            $query->where($field, 'not like', "");
                            break;
                    }

                } elseif ($filter['filterType'] === 'number') {
                    $query->where($field, $filter['type'], $filter['filter']);
                }
            }
        }

        if (!empty($sortModel)) {
            foreach ($sortModel as $sort) {
                $query->orderBy($sort['colId'], $sort['sort']);
            }
        }

        if(!empty($orderBy)){
            $query->orderBy($orderBy["field"],$orderBy["order"]);
        }
        
        $query->where([
            ["is_deleted","=",0],
            ["company_id","=",session('company_id')]
        ]);
        $totalCount = $query->count();

        $data = $query->skip($startRow)
                    ->take($endRow - $startRow)
                    ->get();

        return response()->json([
            'rows' => $data,
            'lastRow' => $totalCount,
        ]);
    }
}
