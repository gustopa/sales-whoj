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
      <td style="font-weight:bold; font-size:13px !important">SESSION ID: <?= $ses_id ?></td>
    </tr>
    <tr>
</table>

<div class="space-20"></div>
<b>INPUT INVENTORY</b>
<table class="table-print">
  <thead>
    <tr>
    <!-- <th class="width-100 text-center">&nbsp;</th> -->
    <th class="width-100 text-center">PLU</th>
    <th class="width-100 text-center">KODE SUP</th>
    <th class="width-100 text-center">ITEM</th>
    <th class="width-100 text-right">BERAT EMAS</th>
    <th class="width-100 text-right">PCS</th>
    <th class="width-100 text-right">BUTIR</th>
    <th class="width-100 text-right">SHAPE</th>
    <th class="width-100 text-center">OLEH</th>
    </tr>
  </thead>
</table>
<?php
    if(!empty($list)) {
        $i = 0;
        $current_plu = "";
        $next_plu = "";
        $is_print = 1;
        $image = "";

        foreach($list as $row) {
            $next_plu = $row->identity_code;

            if($i == 0) {
                $plu = $row->identity_code;
                $kode_sup = $row->item_source;
                $jenis_brg = $row->item_id_txt;
                $berat_emas = $row->gold_weight;
                $pcs = $row->grain;
                $butir = $row->grade;
                $shape = $row->diamond_type;
                $created = $row->created_by;
                $current_plu = $next_plu;
            }

            if($current_plu != $next_plu) {    

                echo '<table class="table-print">';
                echo '<tr>';
                // echo '<td class="width-100 text-center">'.$image.'&nbsp;</td>';
                echo '<td class="width-100 text-center">'.$plu.'&nbsp;</td>';
                echo '<td class="width-100 text-center">'.$kode_sup.'&nbsp;</td>';
                echo '<td class="width-100 text-center">'.$jenis_brg.'&nbsp;</td>';
                echo '<td class="width-100 text-right">'.$berat_emas.'&nbsp;</td>';
                echo '<td class="width-100 text-right">'.$pcs.'&nbsp;</td>';
                echo '<td class="width-100 text-right">'.$butir.'&nbsp;</td>';
                echo '<td class="width-100 text-right">'.$shape.'&nbsp;</td>';
                echo '<td class="width-100 text-center">'.$created.'&nbsp;</td>';
                echo '</tr>';
                echo '</table>';

                $plu = $row->identity_code;
                $kode_sup = $row->item_source;
                $jenis_brg = $row->item_id_txt;
                $berat_emas = $row->gold_weight;
                $pcs = $row->grain."<br>";
                $butir = $row->grade."<br>";
                $shape = $row->diamond_type."<br>";
                $created = $row->created_by;
                $current_plu = $plu;

                $image = "";
                // if($row->photo_inventory_id_txt != "") {
                //   $file = asset_uploaded().'/'.$row->photo_inventory_id_txt;
                //   $type = pathinfo($file, PATHINFO_EXTENSION);
                //   $get_content = file_get_contents($file);
                //   $img = 'data:image/'.$type.';base64,'.base64_encode($get_content);
                //   $image = '<img class="photo" style="width:100%" src="'.$img.'" />';
                // }
            } else {
                $pcs .= $row->grain."<br>";
                $butir .= $row->grade."<br>";
                $shape .= $row->diamond_type."<br>";                  
            }

            $is_print = 0;
            $i++;
        }
    } else {
        echo '<table class="table-print">';
        echo '<tr>';
        echo '<td class="text-center">Tidak ada input inventory</td>';
        echo '</tr>';
        echo '</table>';      
    }
?> 

@endsection

