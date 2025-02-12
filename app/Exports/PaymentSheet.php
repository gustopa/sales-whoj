<?php

namespace App\Exports;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class PaymentSheet implements FromCollection, WithHeadings,WithTitle
{
    protected $from_date, $to_date, $sales_id, $item_id;

    public function __construct($from_date, $to_date, $sales_id = null, $item_id = null)
    {
        $this->from_date = $from_date;
        $this->to_date = $to_date;
        $this->sales_id = $sales_id;
        $this->item_id = $item_id;
    }

    public function collection()
    {
        $query = DB::table('vw_paymentlist')
            ->select(
                "trans_date",
                "doc_no",
                "sales_id_txt",
                "customer_id_txt",
                "notes",
                "payment_type_id_txt",
                "edc_id_txt",
                "identity_code",
                "inventory_id_txt",
                "online_offline",
                "inventory_price",
                "amount",
            )
            ->where('is_submitted', 1)
            ->where('is_deleted', 0)
            ->whereNotIn('status', ['DRAFT', 'CANCELLED'])
            ->whereBetween(DB::raw("CAST(trans_date AS DATE)"), [$this->from_date, $this->to_date]);

        if (!empty($this->sales_id)) {
            $query->where('sales_id', $this->sales_id);
        }
        if (!empty($this->item_id)) {
            $query->where('inventory_id_txt', $this->item_id);
        }

        return $query->orderBy('row_id', 'desc')->get();
    }

    public function headings(): array
    {
        return ["Tanggal","Doc No","Sales","Pelangga","Notes", "Tipe Pembayaran", "EDC", "PLU", "Item","Online/Offline","Harga produk", "Amount"];
    }
    public function title() : string
    {
        return "Payment";
    }
}
