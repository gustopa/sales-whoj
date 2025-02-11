@extends('pdf.layout')
@section('document_name','INVOICE')
@section('content')
<div class="space-20"></div>

<table class="noborder">
  <tr>
    <td class="width-150 text-left" style="color:#999"><b><i>IDATE</i><b></td>
    <td class="text-left"><?= formatDate($refund->trans_date) ?></td>
  </tr>     
</table>
<table class="noborder">
  <tr>
    <td class="width-150 text-left" style="color:#999"><b><i>REFF. NO.</i><b></td>
    <td class="text-left"><?= $refund->doc_no ?></td>
    <td class="text-right"><b><?= $refund->customer_id_txt ?></b></td>
  </tr>     
</table>

<div style="clear:both; height:15px;"></div>
<div style="clear:both; height:1px; background: #ccc"></div>
<div style="clear:both; height:15px;"></div>

<table class="noborder">
  <tr>
    <td class="width-150 text-left" style="color:#999"><b><i>TYPE</i><b></td>
    <td class="text-left">
        <?php 
            $type_refund = $refund->type_refund;
            if($type_refund == "REFUND") {
                $type_refund = "BUYBACK";        
            }
            echo $type_refund;
        ?>
    </td>
  </tr>     
</table>
<table class="noborder">
  <tr>
    <td class="width-150 text-left" style="color:#999"><b><i>INVOICE NO</i><b></td>
    <td class="text-left"><?= $refund->payment_id_txt ?></td>
  </tr>     
</table>
<table class="noborder">
  <tr>
    <td class="width-150 text-left" style="color:#999"><b><i>ITEM</i><b></td>
    <td class="text-left"><?= $refund->inventory_id_txt ?></td>
  </tr>     
</table>
<table class="noborder">
  <tr>
    <td class="width-150 text-left" style="color:#999"><b><i>AMOUNT</i><b></td>
    <td class="text-left"><?= formatRupiah($refund->amount_refund) ?></td>
  </tr>     
</table>

<div class="space-20"></div>
<div class="space-20"></div>

<table class="noborder">
  <tr>
    <td class="width-150 text-left" style="color:#999"><b><i>PIC</i><b></td>
    <td class="text-left"><?= $refund->sales_id_txt ?></td>
  </tr>     
</table>

<div style="clear:both; height:15px;"></div>
<div style="clear:both; height:1px; background: #ccc"></div>
<div style="clear:both; height:15px;"></div>

<div class="space-20"></div>
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
@endsection

