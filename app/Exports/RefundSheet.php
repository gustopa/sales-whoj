<?php

namespace App\Exports;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class RefundSheet implements FromCollection, WithHeadings,WithTitle
{
    protected $from_date, $to_date;

    public function __construct($from_date, $to_date)
    {
        $this->from_date = $from_date;
        $this->to_date = $to_date;
    }

    public function collection()
    {
        return DB::table('vw_refundlist')
            ->where('is_submitted', 1)
            ->where('is_deleted', 0)
            ->whereNotIn('status', ['DRAFT', 'CANCELLED'])
            ->whereBetween(DB::raw("CAST(trans_date AS DATE)"), [$this->from_date, $this->to_date])
            ->orderBy("row_id", "desc")
            ->get();
    }

    public function headings(): array
    {
        return ["Tanggal", "Doc No", "Status"];
    }
    public function title() : string
    {
        return "Refund";
    }
}
