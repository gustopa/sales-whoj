@extends('pdf.layout')
@section('document_name','NOTA PENJUALAN')
@section('content')
<style type="text/css">
    body{
      font-size: 9px !important;
    }

    .width-60 {
        width: 60px;
    }
</style>

<table class="noborder">
    <tr>
      <td class="font-xs" style="font-weight:bold; font-size:13px !important">TRANSAKSI: <?= formatDate($from_date) ?> - <?= formatDate($to_date) ?></td>
    </tr>
    <tr>
</table>

<div class="space-20"></div>
<b>PENJUALAN</b>
<table class="table-print">
  <thead>
    <tr>
    <th class="width-100 text-center font-xs">TANGGAL</th>
    <th class="width-100 text-center font-xs">CUSTOMER</th>
    <th class="width-50 text-center font-xs">ITEM</th>
    <th class="width-50 text-center font-xs">PLU</th>
    <th class="width-60 text-center font-xs">DP</th>
    <th class="width-100 text-center font-xs">HARGA PLU</th>
    <th class="width-50 text-center font-xs">DISC</th>
    <th class="width-50 text-center font-xs">%</th>
    <th class="width-60 text-center font-xs">EXCHANGE</th>
    <th class="width-60 text-center font-xs">PAYMENT</th>
    <th class="width-60 text-center font-xs">HARGA JUAL</th>
    <th class="width-60 text-center font-xs">SALES</th>
    <th class="width-50 text-center font-xs">INVOICE</th>
    <th class="width-50 text-center font-xs">SERTIFIKAT</th>
    </tr>
  </thead>
</table>
<?php
    if(!empty($data)) {
        $total = 0;
        foreach($data as $row) {

            echo '<table class="table-print">';
            echo '<tr>';
            echo '<td class="width-100 text-center font-xs">'.formatDate($row->tanggal).'</td>';
            echo '<td class="width-100 text-center font-xs">'.$row->nama_customer.'</td>';
            echo '<td class="width-50 text-center font-xs">'.$row->item.'</td>';
            echo '<td class="width-50 text-center font-xs">'.$row->plu.'</td>';
            echo '<td class="width-60 text-right font-xs">'.formatRupiah($row->dp).'</td>';
            echo '<td class="width-100 text-right font-xs">'.formatRupiah($row->harga_plu).'</td>';
            echo '<td class="width-50 text-right font-xs">'.formatRupiah($row->jumlah_diskon).'</td>';
            echo '<td class="width-50 text-center font-xs">'.$row->persen_diskon.'</td>';
            echo '<td class="width-60 text-right font-xs">'.formatRupiah($row->exchange).'</td>';
            echo '<td class="width-60 text-center font-xs">'.$row->tipe_pembayaran.'</td>';
            echo '<td class="width-60 text-right font-xs">'.formatRupiah($row->harga_jual).'</td>';
            echo '<td class="width-60 text-center font-xs">'.$row->sales.'</td>';
            echo '<td class="width-50 text-center font-xs">'.$row->dokumen_invoice.'</td>';
            echo '<td class="width-50 text-center font-xs">'.$row->dokumen_sertifikat.'</td>';
            echo '</tr>';
            echo '</table>';
        }
        echo '<div class="space-10"></div>';
        echo '<table class="noborder">';
        echo '<tr>';
        echo '<td class="text-right"><b>&nbsp;</b></td>';
        echo '<td class="width-100 text-right font-xs"><b>'.formatRupiah($total).'</b></td>';
        echo '</tr>';
        echo '</table>';
    } else {
        echo '<table class="table-print">';
        echo '<tr>';
        echo '<td class="text-center font-xs">Tidak ada penjualan</td>';
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