<?php

namespace App\Exports;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class RequestOrderSheet implements FromCollection, WithHeadings,WithTitle
{
    protected $from_date, $to_date, $sales_id;

    public function __construct($from_date, $to_date, $sales_id = null)
    {
        $this->from_date = $from_date;
        $this->to_date = $to_date;
        $this->sales_id = $sales_id;
    }

    public function collection()
    {
        $query = DB::table('vw_request_orderlist')
            ->select(
                'trans_date',
                'type_order',
                'doc_no',
                'store_id_txt',
                'customer_id_txt',
                'sales_id_txt',
                'item_id_txt',
                'identity_code',
                'outsource_intern',
                'status'
            )
            ->whereNotIn('status', ['DRAFT', 'CANCELLED'])
            ->where('is_deleted', 0)
            ->whereBetween(DB::raw("CAST(trans_date AS DATE)"), [$this->from_date, $this->to_date]);

        if (!empty($this->sales_id)) {
            $query->where('sales_id', $this->sales_id);
        }

        return $query->orderBy('row_id', 'desc')->get();
    }

    public function headings(): array
    {
        return ["Tanggal","Tipe Pesanan", "Doc No", "Store", "Customer",'Sales','Item','PLU','Outsource/Intern','status'];
    }
    public function title() : string
    {
        return "Pesanan";
    }
}
