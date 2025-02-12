@extends('pdf.layout')
@section('document_name','DOWN PAYMENT')
@section('content')
<style type="text/css">
    body{
      font-size: 11px !important;
    }
</style>

<table class="noborder">
    <tr>
      <td class="font-s" style="font-weight:bold; font-size:13px !important">TRANSAKSI: <?= formatDate($from_date) ?> - <?= formatDate($to_date) ?></td>
    </tr>
    <tr>
</table>

<div class="space-20"></div>
<b>PENJUALAN</b>
<table class="table-print">
  <thead>
    <tr>
    <th class="width-100 text-center font-s">TANGGAL</th>
    <th class="width-100 text-center font-s">INVOICE</th>
    <th class="width-100 text-center font-s">CUSTOMER</th>
    <th class="width-100 text-center font-s">SALES</th>
    <th class="width-50 text-center font-s">PLU</th>
    <th class="width-100 text-center font-s">ITEM</th>
    <th class="width-100 text-center font-s">PEMBAYARAN</th>
    <th class="width-50 text-center font-s">STATUS</th>
    <th class="width-100 text-right font-s">HARGA BARANG</th>
    <th class="width-100 text-right font-s">HARGA INVOICE</th>
    </tr>
  </thead>
</table>
<?php
    if(!empty($payment)) {
        $total = 0;
        foreach($payment as $row) {
            $selling_price = 0;

            if($row->status == "PAID") {
                $total += $row->amount;
                $selling_price = $row->amount;
            }

            echo '<table class="table-print">';
            echo '<tr>';
            echo '<td class="width-100 text-center font-s">'.formatDate($row->trans_date).'</td>';
            echo '<td class="width-100 text-center font-s">'.$row->doc_no.'</td>';
            echo '<td class="width-100 text-center font-s">'.$row->customer_id_txt.'</td>';
            echo '<td class="width-100 text-center font-s">'.$row->sales_id_txt.'</td>';
            echo '<td class="width-50 text-center font-s">'.$row->identity_code.'</td>';
            echo '<td class="width-100 text-center font-s">'.$row->inventory_id_txt.'</td>';
            echo '<td class="width-100 text-center font-s">'.$row->payment_type_id_txt.'</td>';
            echo '<td class="width-50 text-center font-s">'.$row->status.'</td>';
            echo '<td class="width-100 text-right font-s">'.formatRupiah($row->inventory_price).'</td>';
            echo '<td class="width-100 text-right font-s">'.formatRupiah($selling_price).'</td>';
            echo '</tr>';
            echo '</table>';
        }
        echo '<div class="space-10"></div>';
        echo '<table class="noborder">';
        echo '<tr>';
        echo '<td class="text-right"><b>&nbsp;</b></td>';
        echo '<td class="width-100 text-right  font-s"><b>'.formatRupiah($total).'</b></td>';
        echo '</tr>';
        echo '</table>';
    } else {
        echo '<table class="table-print">';
        echo '<tr>';
        echo '<td class="text-center font-s">Tidak ada penjualan</td>';
        echo '</tr>';
        echo '</table>';      
    }
?> 

<div class="space-20"></div>
<div class="space-20"></div>
<b>PESANAN</b>
<table class="table-print">
  <thead>
    <tr>
    <th class="width-100 text-center font-s">TANGGAL</th>
    <th class="width-100 text-center font-s">INVOICE</th>
    <th class="width-100 text-center font-s">CUSTOMER</th>
    <th class="width-100 text-center font-s">SALES</th>
    <th class="width-100 text-center font-s">ITEM</th>
    <th class="width-50 text-center font-s">STATUS</th>
    <th class="width-100 text-right font-s">ESTIMASI HARGA</th>
    <th class="width-100 text-right font-s">DOWN PAYMENT</th>
    </tr>
  </thead>
</table>
<?php
    if(!empty($request_order)) {
        $total = 0;
        foreach($request_order as $row) {
            $total += $row->down_payment;
            echo '<table class="table-print">';
            echo '<tr>';
            echo '<td class="width-100 text-center font-s">'.formatDate($row->dp_date).'</td>';
            echo '<td class="width-100 text-center font-s">'.$row->doc_no."-".$row->dp_ke.'</td>';
            echo '<td class="width-100 text-center font-s">'.$row->customer_id_txt.'</td>';
            echo '<td class="width-100 text-center font-s">'.$row->sales_id_txt.'</td>';
            echo '<td class="width-100 text-center font-s">'.$row->name.'</td>';
            echo '<td class="width-50 text-center font-s">'.$row->status.'</td>';
            echo '<td class="width-100 text-right font-s">'.formatRupiah($row->estimated_price).'</td>';
            echo '<td class="width-100 text-right font-s">'.formatRupiah($row->down_payment).'</td>';
            echo '</tr>';
            echo '</table>';
        }
        echo '<div class="space-10"></div>';
        echo '<table class="noborder">';
        echo '<tr>';
        echo '<td class="text-right"><b>&nbsp;</b></td>';
        echo '<td class="width-100 text-right font-s"><b>'.formatRupiah($total).'</b></td>';
        echo '</tr>';
        echo '</table>';
    } else {
        echo '<table class="table-print">';
        echo '<tr>';
        echo '<td class="text-center font-s">Tidak ada pesanan</td>';
        echo '</tr>';
        echo '</table>';      
    }
?> 

<div class="space-20"></div>
<div class="space-20"></div>
<b>BUYBACK</b>
<table class="table-print">
  <thead>
    <tr>
    <th class="width-100 text-center font-s">TANGGAL</th>
    <th class="width-100 text-center font-s">DOC NO</th>
    <th class="width-100 text-center font-s">INVOICE</th>
    <th class="width-100 text-center font-s">CUSTOMER</th>
    <th class="width-50 text-center font-s">PLU</th>
    <th class="width-100 text-center font-s">ITEM</th>
    <th class="width-50 text-center font-s">STATUS</th>
    <th class="width-100 text-right font-s">AMOUNT</th>
    </tr>
  </thead>
</table>
<?php
    if(!empty($refund)) {
        $total = 0;
        foreach($refund as $row) {
            $total += $row->amount_refund;
            echo '<table class="table-print">';
            echo '<tr>';
            echo '<td class="width-100 text-center font-s">'.formatDate($row->trans_date).'</td>';
            echo '<td class="width-100 text-center font-s">'.$row->doc_no.'</td>';
            echo '<td class="width-100 text-center font-s">'.$row->payment_id_txt.'</td>';
            echo '<td class="width-100 text-center font-s">'.$row->customer_id_txt.'</td>';
            echo '<td class="width-50 text-center font-s">'.$row->identity_code.'</td>';
            echo '<td class="width-100 text-center font-s">'.$row->inventory_id_txt.'</td>';
            echo '<td class="width-50 text-center font-s">'.$row->status.'</td>';
            echo '<td class="width-100 text-right font-s">'.formatRupiah($row->amount_refund).'</td>';
            echo '</tr>';
            echo '</table>';
        }
        echo '<div class="space-10"></div>';
        echo '<table class="noborder">';
        echo '<tr>';
        echo '<td class="text-right"><b>&nbsp;</b></td>';
        echo '<td class="width-100 text-right font-s"><b>'.formatRupiah($total).'</b></td>';
        echo '</tr>';
        echo '</table>';
    } else {
        echo '<table class="table-print">';
        echo '<tr>';
        echo '<td class="text-center font-s">Tidak ada refund</td>';
        echo '</tr>';
        echo '</table>';      
    }
?> 

<div class="space-20"></div>
<div class="space-20"></div>
<b>REPARASI</b>
<table class="table-print">
  <thead>
    <tr>
    <th class="width-100 text-center font-s">TANGGAL</th>
    <th class="width-100 text-center font-s">DOC NO</th>
    <th class="width-100 text-center font-s">CUSTOMER</th>
    <th class="width-100 text-center font-s">REPARASI</th>
    <th class="width-100 text-center font-s">TIPE BYR</th>
    <th class="width-100 text-center font-s">JENIS BYR</th>
    <th class="width-100 text-right font-s">AMOUNT</th>
    </tr>
  </thead>
</table>
<?php
    if(!empty($reparation)) {
        $total_charge = 0;
        $total_free = 0;
        foreach($reparation as $row) {
            if($row->amount_type == "Charge") {
              $total_charge += $row->amount;
            } else {
              $total_free += $row->amount;
            }
            echo '<table class="table-print">';
            echo '<tr>';
            echo '<td class="width-100 text-center font-s">'.formatDate($row->created_date).'</td>';
            echo '<td class="width-100 text-center font-s">'.$row->doc_no.'</td>';
            echo '<td class="width-100 text-center font-s">'.$row->customer_name.'</td>';
            echo '<td class="width-100 text-center font-s">'.$row->reparation.'</td>';
            echo '<td class="width-100 text-center font-s">'.$row->amount_txt.'</td>';
            echo '<td class="width-100 text-center font-s">'.$row->amount_type.'</td>';
            echo '<td class="width-100 text-right font-s">'.formatRupiah($row->amount).'</td>';
            echo '</tr>';
            echo '</table>';
        }
        echo '<div class="space-10"></div>';
        echo '<table class="noborder">';
        echo '<tr>';
        echo '<td class="text-right"><b>Charge:</b></td>';
        echo '<td class="width-100 text-right font-s"><b>'.formatRupiah($total_charge).'</b></td>';
        echo '</tr>';
        echo '<tr>';
        echo '<td class="text-right"><b>Free of charge:</b></td>';
        echo '<td class="width-100 text-right font-s"><b>'.formatRupiah($total_free).'</b></td>';
        echo '</tr>';
        echo '</table>';
    } else {
        echo '<table class="table-print">';
        echo '<tr>';
        echo '<td class="text-center font-s">Tidak ada refund</td>';
        echo '</tr>';
        echo '</table>';      
    }
?> 

<div class="space-20"></div>
<table class="noborder">
  <tr>
    <td class="text-left" style="font-size:10px"><?= session('username') ?>, <?= date("d-M-Y H:i:s") ?></td>
  </tr>    
</table>
@endsection

