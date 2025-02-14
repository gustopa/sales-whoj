<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PaymentModel;
use Illuminate\Support\Facades\DB;

class DashboardSalesController extends Controller
{
    public function getPiechartItem()
    {
        return PaymentModel::select('item.name as item_name', DB::raw('sum(payment.amount) as amount'))
            ->join('inventory', 'payment.inventory_id', '=', 'inventory.row_id')
            ->join('item', 'inventory.item_id', '=', 'item.row_id')
            ->where('payment.status', 'PAID')
            ->where('payment.is_submitted', 1)
            ->where('payment.is_deleted', 0)
            // ->when($condition, function ($query) use ($condition) {
            //     return $query->whereRaw($condition);
            // })
            ->groupBy('item.name')
            ->get();
    }
}
