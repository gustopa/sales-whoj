<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class PesananExport implements WithMultipleSheets
{
    protected $from_date, $to_date;

    public function __construct($from_date, $to_date)
    {
        $this->from_date = $from_date;
        $this->to_date = $to_date;
    }
    public function sheets(): array
    {
        return [
            new RequestOrderSheet($this->from_date, $this->to_date,['DRAFT','CANCELLED',''])
        ];
    }
}
