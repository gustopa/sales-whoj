<?php

namespace App\Exports;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class ReparationSheet implements FromCollection, WithHeadings,WithTitle
{
    protected $from_date, $to_date;

    public function __construct($from_date, $to_date)
    {
        $this->from_date = $from_date;
        $this->to_date = $to_date;
    }

    public function collection()
    {
        return DB::table('vw_request_order_reparationlist')
            ->where('is_deleted', 0)
            ->whereBetween(DB::raw("CAST(created_date AS DATE)"), [$this->from_date, $this->to_date])
            ->orderBy('row_id', 'desc')
            ->get();
    }

    public function headings(): array
    {
        return ["Tanggal", "Doc No"];
    }
    public function title() : string
    {
        return "Reparasi";
    }
}
