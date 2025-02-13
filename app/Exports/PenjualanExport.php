<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class PenjualanExport implements WithMultipleSheets
{
    protected $from_date, $to_date, $sales_id, $item_id;

    public function __construct($from_date, $to_date, $sales_id = null, $item_id = null)
    {
        $this->from_date = $from_date;
        $this->to_date = $to_date;
        $this->sales_id = $sales_id;
        $this->item_id = $item_id;
    }

    public function sheets(): array
    {
        return [
            "Payment" => new PaymentSheet($this->from_date, $this->to_date, $this->sales_id, $this->item_id),
            "Pesanan" => new RequestOrderSheet($this->from_date, $this->to_date, $this->sales_id,['DRAFT', 'CANCELLED']),
            // "Reparasi" => new ReparationSheet($this->from_date, $this->to_date),
            // "Refund" => new RefundSheet($this->from_date, $this->to_date),
        ];
    }
}
