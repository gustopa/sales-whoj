<?php
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
if (!function_exists('datatable')) {
    function datatable($table, $queryModifier = null) {
        $request = request();
        $startRow = $request->get('startRow', 0);
        $endRow = $request->get('endRow', 100);

        $filterModel = $request->get('filterModel', []);
        $sortModel = $request->get('sortModel', []);

        // Mulai query builder
        $query = DB::table($table);

        // Terapkan filter dari filterModel
        if (!empty($filterModel)) {
            foreach ($filterModel as $field => $filter) {
                if ($filter['filterType'] === 'text') {
                    switch ($filter['type']) {
                        case 'contains':
                            $query->where($field, 'like', '%' . $filter['filter'] . '%');
                            break;
                        case 'equals': 
                            $query->where($field, '=', $filter['filter']);
                            break;
                        case 'notContains': 
                            $query->where($field, 'not like', $filter['filter']);
                            break;
                        case 'notEqual':
                            $query->where($field, '<>', $filter['filter']);
                            break;
                        case 'startsWith':
                            $query->where($field, 'like', $filter['filter'] . '%');
                            break;
                        case 'endsWith':
                            $query->where($field, 'like', '%' . $filter['filter']);
                            break;
                        case 'blank':
                            $query->whereNull($field)->orWhere($field, '=', '');
                            break;
                        case 'notBlank':
                            $query->where($field, '<>', '');
                            break;
                    }
                } else if ($filter['filterType'] === 'number') {
                    switch($filter['type']){
                        case 'equals':
                            $query->where($field, "=", $filter['filter']);
                            break;
                        case 'notEqual':
                            $query->where($field, '<>', $filter['filter']);
                            break;
                        case 'greaterThan':
                            $query->where($field, '>', $filter['filter']);
                            break;
                        case 'greaterThanOrEqual':
                            $query->where($field, '>=', $filter['filter']);
                            break;
                        case 'lessThan':
                            $query->where($field, '<', $filter['filter']);
                            break;
                        case 'lessThanOrEqual':
                            $query->where($field, '<=', $filter['filter']);
                            break;
                        case 'inRange':
                            $query->whereBetween($field, [$filter['filter'], $filter['filterTo']]);
                            break;
                        case 'blank':
                            $query->whereNull($field)->orWhere($field, '=', '');
                            break;
                        case 'notBlank':
                            $query->where($field, '<>', '');
                            break;
                    }
                }else if($filter['filterType'] === "date"){
                    switch($filter['type']){
                        case 'equals' :
                            $query->whereDate($field, $filter['dateFrom']);
                            break;
                        case 'notEqual' :
                            $query->whereDate($field,'<>', $filter['dateFrom']);
                            break;
                        case 'lessThan' :
                            $query->whereDate($field,'<', $filter['dateFrom']);
                            break;
                        case 'greaterThan' :
                            $query->whereDate($field,'>', $filter['dateFrom']);
                            break;
                        case 'inRange' :
                            $query->whereBetween($field, [$filter['dateFrom'], $filter['dateTo']]);
                            break;
                        case 'blank':
                            $query->whereNull($field)->orWhere($field, '=', '');
                            break;
                        case 'notBlank':
                            $query->where($field, '<>', '');
                            break;
                    }
                }
            }
        }

        // Terapkan sortModel
        if (!empty($sortModel)) {
            foreach ($sortModel as $sort) {
                $query->orderBy($sort['colId'], $sort['sort']);
            }
        }

        // Tambahkan kondisi default
        if (Schema::hasColumn($table, 'is_deleted')) {
            $query->where($table.'.is_deleted', '=', 0);
        }
        if (Schema::hasColumn($table, 'company_id')) {
            $query->where($table.'.company_id', '=', session('company_id'));
        }
        // $query->where([
        //     ["is_deleted", "=", 0],
        //     ["company_id", "=", session('company_id')]
        // ]);

        // Terapkan modifikasi query melalui callback (jika ada)
        if (is_callable($queryModifier)) {
            $queryModifier($query);
        }

        // Hitung total data
        $totalCount = $query->count();

        // Ambil data dengan pagination
        $data = $query->skip($startRow)
            ->take($endRow - $startRow)
            ->get();

        return response()->json([
            'rows' => $data,
            'lastRow' => $totalCount,
        ]);
    }
}


if(!function_exists('generateDiamondPrice')){
    function generateDiamondPrice($diamond_type,$size,$qty){
        $size_crt = $size / $qty;
        $size_formatted = xnumber_format($size_crt, 3);

        $diamond_pricing = DB::table('diamond_pricing')
            ->where('diamond_type', $diamond_type)
            ->whereRaw('? BETWEEN size_from AND size_to', [$size_formatted])
            ->first();
        if(!empty($diamond_pricing)){
            $price = $diamond_pricing->price;
            $total_amount = $size * $price;
            $output = [
                "total_amount" => $total_amount,
                "price" => $price,
                "size_crt" => $size_crt,

            ];
        }else{
            $output = [
                "total_amount" => 0,
                "price" => 0,
                "size_crt" => 0,
            ];
        }

        return $output;

    }
}
