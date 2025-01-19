@extends('pdf.layout')
@section('document_name','INVOICE')
@section('content')
<style>
    body{
    font-size: 16px !important;
  }
</style>

<div class="space-20"></div>
<div class="space-20"></div>
<div class="space-20"></div>

<table class="noborder">
<tr>
  <td class="width-150 text-left" style="color:#999"><b><i>IDATE</i><b></td>
  <td class="text-left"><?= $payment->trans_date ?></td>
</tr>     
</table>
<table class="noborder">
<tr>
  <td class="width-150 text-left" style="color:#999"><b><i>REFF. NO.</i><b></td>
  <td class="text-left"><?= $payment->doc_no ?> / <?= $payment->identity_code ?></td>
  <td class="text-right"><b><?= $payment->customer_id_txt ?></b></td>
</tr>     
</table>

<div style="clear:both; height:15px;"></div>
<div style="clear:both; height:1px; background: #ccc"></div>
<div style="clear:both; height:15px;"></div>

<table class="noborder">
<tr>
  <td class="width-150 text-left" style="color:#999"><b><i>ITEM</i><b></td>
  <td class="text-left"><?= $payment->inventory_id_txt ?></td>
</tr>     
</table>
<table class="noborder">
<tr>
  <td class="width-150 text-left" style="color:#999"><b><i>AMOUNT</i><b></td>
  <td class="text-left"><?= $payment->amount ?></td>
</tr>     
</table>

<table class="noborder">
<tr>
  <td class="width-150 text-left" style="color:#999"><b><i>PAYMENT</i><b></td>
  <td class="text-left"><?= $payment->payment_type_id_txt ?></td>
</tr>     
</table>

<div class="space-20"></div>
<div class="space-20"></div>

<table class="noborder">
<tr>
  <td class="width-150 text-left" style="color:#999"><b><i>PIC</i><b></td>
  <td class="text-left"><?= $payment->sales_id_txt ?></td>
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