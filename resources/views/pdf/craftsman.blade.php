@extends('pdf.layout')
@section('document_name','INVENTORY')
@section('content')
<style type="text/css">
    body{
      font-size: 11px !important;
    }
</style>

<table class="noborder">
    <tr>
      <td style="font-weight:bold; font-size:13px !important"><?= formatDate($from_date) ?> - <?= formatDate($to_date) ?></td>
    </tr>
    <tr>
</table>

<div class="space-20"></div>
<table class="table-print">
  <thead>
    <tr>
    <th class="width-100 text-center">DOC NO</th>
    <th class="width-100 text-center">PEKERJAAN</th>
    <th class="width-100 text-center">DESKRIPSI</th>
    <th class="width-100 text-center">PENGRAJIN</th>
    <th class="width-100 text-center">TGL SERAH</th>
    <th class="width-100 text-center">TGL TERIMA</th>
    <th class="width-100 text-center">TOTAL JAM</th>
    </tr>
  </thead>
</table>
<?php
    if(!empty($report)) {
        foreach($report as $row) {            
				    $minutes = get_crafts_workminute($row->delivery_date, $row->received_date);
            echo '<table class="table-print">';
            echo '<tr>';
            echo '<td class="width-100 text-center">'.$row->doc_no.'</td>';
            echo '<td class="width-100 text-center">'.$row->task.'</td>';
            echo '<td class="width-100 text-center">'.$row->name.'</td>';
            echo '<td class="width-100 text-center">'.$row->craftsman_id_txt.'</td>';
            echo '<td class="width-100 text-center">'.$row->delivery_date.'</td>';
            echo '<td class="width-100 text-center">'.$row->received_date.'</td>';
            echo '<td class="width-100 text-center">'.$minutes['text'].'</td>';
            echo '</tr>';
            echo '</table>';
        }
    } else {
        echo '<table class="table-print">';
        echo '<tr>';
        echo '<td class="text-center">Tidak ada data</td>';
        echo '</tr>';
        echo '</table>';      
    }
?> 

<div class="space-20"></div>

<div class="space-20"></div>
<table class="noborder">
  <tr>
    <td class="text-left" style="font-size:10px"><?= session('username') ?>, <?= date("d-M-Y H:i:s") ?></td>
  </tr>    
</table>
@endsection

