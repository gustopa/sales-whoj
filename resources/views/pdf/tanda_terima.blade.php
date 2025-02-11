@extends('pdf.layout')
@section('document_name','TANDA TERIMA')
@section('content')
<style type="text/css">
    body {
        font-size: 14px !important;
    }
</style>
<div class="space-20"></div>
<table class="noborder">
  <tr>
    <td class="text-right">Jakarta, <?= formatDate($tanda_terima->trans_date) ?></td>
  </tr>     
</table>
<div class="space-20"></div>
<table class="noborder">
  <tr>
    <td class="width-150 text-left"><b>Sudah diterima dari<b></td>
    <td class="text-left">Wanda House Of Jewels</td>
  </tr>     
</table>
<table class="noborder">
  <tr>
    <td class="width-150 text-left"><b>Untuk<b></td>
    <td class="text-left"><?= $tanda_terima->customer_id_txt ?></td>
  </tr>     
</table>

<div class="space-20"></div>

<table class="table-print">
  <thead>
    <tr>
    <th class="width-100 text-left">GAMBAR</th>
    <th class="width-350 text-left">ITEM</th>
    </tr>
  </thead>
</table>
<?php
    if(!empty($tanda_terima_item)) {
        foreach($tanda_terima_item as $row) {
            $photo = "";
            $file_photo = $row->photo;
            
            if($row->photo_inventory_id_txt != "") {
			    $file_photo = $row->photo_inventory_id_txt;
			}
            
            if($file_photo != "" && $file_photo != " ") {
                $photo = '<img class="photo" style="width:100%" src="'.storage_path('app/public/uploaded/'.$file_photo).'" />';
            }

            $item = "";
            $item .= $row->item_id_txt." ".$row->inventory_id_txt."<br>";  
            $item .= "Invoice ".$row->payment_id_txt."<br>";  
            $item .= $row->sertificate_1."<br>";  
            $item .= $row->sertificate_2."<br>";  
                      
            echo '<table class="table-print">';
            echo '<tr>';
            echo '<td class="width-100 text-left">'.$photo.'&nbsp;</td>';
            echo '<td class="width-350 text-left">'.$item.'</td>';
            echo '</tr>';
            echo '</table>';
        }
    }
?> 

<div class="space-20"></div>
<div class="space-20"></div>

<table class="noborder">
  <tr>
    <td class="width-150 text-left"><b>Menyerahkan<b></td>
    <td class="width-150 text-left"><b>Mengetahui<b></td>
    <td class="width-150 text-left"><b>Meneruskan<b></td>
    <td class="width-150 text-left"><b>Menerima<b></td>
  </tr>     
</table>

<div class="space-20"></div>
<div class="space-20"></div>
<div class="space-20"></div>

<table class="noborder">
  <tr>
    <td class="width-150 text-left"><b>.............<b></td>
    <td class="width-150 text-left"><b>.............<b></td>
    <td class="width-150 text-left"><b>.............<b></td>
    <td class="width-150 text-left"><b>.............<b></td>
  </tr>     
</table>
@endsection
