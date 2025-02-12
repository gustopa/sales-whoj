@extends('pdf.layout')
@section('document_name','DOWN PAYMENT')
@section('content')
<style type="text/css">
    body{
      font-size: 11px !important;
    }
</style>

<table class="table-print">
  <thead>
    <tr>
    <th class="width-100 text-center">PLU</th>
    <th class="width-100 text-center">LOKASI</th>
    <th class="width-100 text-center">JENIS</th>
    <th class="width-100 text-center">ITEM</th>
    <th class="width-100 text-center">BERAT</th>
    <th class="width-100 text-center">KARAT</th>
    <th class="width-100 text-right">HARGA JUAL</th>
    </tr>
  </thead>
</table>
<?php
    if(!empty($inventory)) {
        $i = 0;
        foreach($inventory as $row) {
            echo '<table class="table-print">';
            echo '<tr>';
            echo '<td class="width-100 text-center">'.$row->identity_code.'</td>';
            echo '<td class="width-100 text-center">'.$row->store_id_txt.'</td>';
            echo '<td class="width-100 text-center">'.$row->item_type_id_txt.'</td>';
            echo '<td class="width-100 text-center">'.$row->item_id_txt.'</td>';
            echo '<td class="width-100 text-center">'.$row->gold_weight.' gr</td>';
            echo '<td class="width-100 text-center">'.$row->gold_grade.'</td>';
            echo '<td class="width-100 text-right">'.formatRupiah($row->sell_price).'</td>';
            echo '</tr>';
            echo '</table>';
            $i++;
        }
        echo '<table class="table-print">';
        echo '<tr>';
        echo '<td class="width-100 text-right"><b>Total: '.$i.'<b></td>';
        echo '</tr>';
        echo '</table>';
    } else {
        echo '<table class="table-print">';
        echo '<tr>';
        echo '<td class="text-center">Tidak ada penjualan</td>';
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

