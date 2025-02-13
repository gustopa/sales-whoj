@extends('pdf.layout')
@section('document_name','PESANAN')
@section('content')

<style type="text/css">
    body{
      font-size: 11px !important;
    }
</style>

<table class="noborder">
    <tr>
      <td style="font-weight:bold; font-size:13px !important">TRANSAKSI: <?= formatDate($from_date) ?> - <?= formatDate($to_date) ?></td>
    </tr>
    <tr>
</table>

<div class="space-20"></div>
<b>PESANAN</b>
<table class="table-print">
  <thead>
    <tr>
    <th class="width-100 text-center">TANGGAL</th>
    <th class="width-100 text-center">DOC NO</th>
    <th class="width-100 text-center">CUSTOMER</th>
    <th class="width-100 text-center">SALES</th>
    <th class="width-100 text-center">TIPE ITEM</th>
    <th class="width-100 text-center">NAMA ITEM</th>
    <th class="width-100 text-center">PERKIRAAN SELESAI</th>
    <th class="width-100 text-center">TIPE ORDER</th>
    <th class="width-50 text-center">STATUS</th>
    </tr>
  </thead>
</table>
<?php
    if(!empty($request_order)) {
        $total = 0;
        foreach($request_order as $row) {
            echo '<table class="table-print">';
            echo '<tr>';
            echo '<td class="width-100 text-center">'.formatDate($row->trans_date).'</td>';
            echo '<td class="width-100 text-center">'.$row->doc_no.'</td>';
            echo '<td class="width-100 text-center">'.$row->customer_id_txt.'</td>';
            echo '<td class="width-100 text-center">'.$row->sales_id_txt.'</td>';
            echo '<td class="width-100 text-center">'.$row->item_id_txt.'</td>';
            echo '<td class="width-100 text-center">'.$row->name.'</td>';
            echo '<td class="width-100 text-center">'.formatDate($row->estimated_date).'</td>';
            echo '<td class="width-100 text-center">'.$row->type_order.'</td>';
            echo '<td class="width-50 text-center">'.$row->status.'</td>';
            echo '</tr>';
            echo '</table>';
        }
    } else {
        echo '<table class="table-print">';
        echo '<tr>';
        echo '<td class="text-center">Tidak ada penjualan</td>';
        echo '</tr>';
        echo '</table>';      
    }
?> 
@endsection
