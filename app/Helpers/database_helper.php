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
                } elseif ($filter['filterType'] === 'number') {
                    $query->where($field, $filter['type'], $filter['filter']);
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

