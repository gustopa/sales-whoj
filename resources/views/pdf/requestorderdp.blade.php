@extends('pdf.layout')
@section('document_name','DOWN PAYMENT')
@section('content')
<?php 
  $is_lunas = "";
  if($request_order->down_payment == $request_order->estimated_price) {
    $is_lunas = "<div style='position:absolute; right: 0px; bottom: 330px; padding:10px; border:3px solid #ccc; color: #ccc; font-size:30px'>LUNAS</div>";
  }
  echo $is_lunas;  
?>
<div class="space-20"></div>

<table class="noborder">
  <tr>
    <td class="width-150 text-left" style="color:#999"><b><i>IDATE</i><b></td>
    <td class="text-left"><?= $request_order_dp->dp_date ?></td>
  </tr>     
</table>
<table class="noborder">
  <tr>
    <td class="width-150 text-left" style="color:#999"><b><i>REFF. NO.</i><b></td>
    <td class="text-left"><?= $request_order->doc_no ?>-<?= $request_order_dp->dp_ke ?></td>
    <td class="text-right"><b><?= $request_order->customer_id_txt ?></b></td>
  </tr>     
</table>

<div style="clear:both; height:15px;"></div>
<div style="clear:both; height:1px; background: #ccc"></div>
<div style="clear:both; height:15px;"></div>

<table class="noborder">
  <tr>
    <td class="width-150 text-left" style="color:#999"><b><i>ITEM</i><b></td>
    <td class="text-left"><?= $request_order->item_id_txt ?></td>
  </tr>     
</table>
<table class="noborder">
  <tr>
    <td class="width-150 text-left" style="color:#999"><b><i>AMOUNT</i><b></td>
    <td class="text-left"><?= formatRupiah($request_order->estimated_price) ?></td>
  </tr>     
</table>

<table class="noborder">
  <tr>
    <td class="width-150 text-left" style="color:#999"><b><i>DOWN PAYMENT</i><b></td>
    <td class="text-left">
        <?php 
            //echo xnumber_format($request_order_dp->down_payment) 
            if(!empty($request_order_dp_all)) {
                $i = 0;
                foreach($request_order_dp_all as $row) {
                    if($i == 0) {
                        echo formatRupiah($row->down_payment)." (Pembayaran ".$row->dp_ke." | ".date("d-M-Y", strtotime($row->dp_date)).")";
                    } else {
                        echo "<BR>".formatRupiah($row->down_payment)." (Pembayaran ".$row->dp_ke." | ".date("d-M-Y", strtotime($row->dp_date)).")";
                    }
                    $i++;
                }
            }
        ?>
    </td>
  </tr>     
</table>

<table class="noborder">
  <tr>
    <td class="width-150 text-left" style="color:#999"><b><i>PIUTANG</i><b></td>
    <td class="text-left"><?= formatRupiah($request_order->settlement) ?></td>
  </tr>     
</table>

<table class="noborder">
  <tr>
    <td class="width-150 text-left" style="color:#999"><b><i>NOTES</i><b></td>
    <td class="text-left"><?= $request_order->notes ?></td>
  </tr>     
</table>

<div class="space-20"></div>
<div class="space-20"></div>

<table class="noborder">
  <tr>
    <td class="width-150 text-left" style="color:#999"><b><i>PIC</i><b></td>
    <td class="text-left"><?= $request_order->sales_id_txt ?></td>
  </tr>     
</table>

<div style="clear:both; height:15px;"></div>
<div style="clear:both; height:1px; background: #ccc"></div>
<div style="clear:both; height:15px;"></div>

<div class="space-20"></div>
<div class="space-20"></div>

<table class="noborder">
  <tr>
    <td class="width-150 text-left"><b>REGARDS<b></td>
  </tr>     
  <tr>
    <td class="width-150 text-left"><b><i>Wanda House of Jewels</i><b></td>
  </tr>  
</table>

<div class="space-20"></div>

<table class="noborder">
  <tr>
    <td class="text-left" style="color:#CCC; font-size: 20px"><?= $request_order->doc_no ?>-<?= $request_order_dp->dp_ke ?></td>
  </tr>     
</table>
@endsection