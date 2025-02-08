@extends('pdf.layout')
@section('document_name','INVOICE')
@section('content')
<div class="space-20"></div>

<table class="noborder">
    <tr>
        <td>
            <table class="noborder margin-bottom-table">
              <tr>
                <td class="width-30 text-left">1.</td>
                <td class="width-150 text-left"><b>Doc No.</b></td>
                <td class="width-30 text-left">:</td>
                <td class="text-left"><?= $request_order->doc_no ?></td>
              </tr>     
            </table>
            <table class="noborder margin-bottom-table">
              <tr>
                <td class="width-30 text-left">2.</td>
                <td class="width-150 text-left"><b>Store</b></td>
                <td class="width-30 text-left">:</td>
                <td class="text-left"><?= $request_order->store_id_txt ?></td>
              </tr>     
            </table>
            <table class="noborder margin-bottom-table">
              <tr>
                <td class="width-30 text-left">3.</td>
                <td class="width-150 text-left"><b>Customer</b></td>
                <td class="width-30 text-left">:</td>
                <td class="text-left"><?= $request_order->customer_id_txt ?></td>
              </tr>     
            </table>
            <table class="noborder margin-bottom-table">
              <tr>
                <td class="width-30 text-left">4.</td>
                <td class="width-150 text-left"><b>Tanggal</b></td>
                <td class="width-30 text-left">:</td>
                <td class="text-left"><?= $request_order->trans_date ?></td>
              </tr>     
            </table>
            <table class="noborder margin-bottom-table">
              <tr>
                <td class="width-30 text-left">5.</td>
                <td class="width-150 text-left"><b>Perkiraan Delivery Time</b></td>
                <td class="width-30 text-left">:</td>
                <td class="text-left"><?= $request_order->estimated_date ?></td>
              </tr>     
            </table>
            <table class="noborder margin-bottom-table">
              <tr>
                <td class="width-30 text-left">6.</td>
                <td class="width-150 text-left"><b>Nama item</b></td>
                <td class="width-30 text-left">:</td>
                <td class="text-left"><?= $request_order->item_id_txt ?></td>
              </tr>     
            </table>
            <table class="noborder margin-bottom-table">
              <tr>
                <td class="width-30 text-left">7.</td>
                <td class="width-150 text-left"><b>Type Order</b></td>
                <td class="width-30 text-left">:</td>
                <td class="text-left"><?= $request_order->txt ?></td>
              </tr>     
            </table>
            <table class="noborder margin-bottom-table">
              <tr>
                <td class="width-30 text-left">8.</td>
                <td class="width-150 text-left"><b>Ukuran</b></td>
                <td class="width-30 text-left">:</td>
                <td class="text-left"><?= $request_order->size ?></td>
              </tr>     
            </table>
            <table class="noborder margin-bottom-table">
              <tr>
                <td class="width-30 text-left">9.</td>
                <td class="width-150 text-left"><b>Warna Emas</b></td>
                <td class="width-30 text-left">:</td>
                <td class="text-left"><?= $request_order->warna_emas ?></td>
              </tr>     
            </table>
            <table class="noborder margin-bottom-table">
              <tr>
                <td class="width-30 text-left">&nbsp;</td>
                <td class="width-150 text-left"><b>Kadar Emas</b></td>
                <td class="width-30 text-left">:</td>
                <td class="text-left"><?= $request_order->kadar_emas ?></td>
              </tr>     
            </table>
            <table class="noborder margin-bottom-table">
              <tr>
                <td class="width-30 text-left">&nbsp;</td>
                <td class="width-150 text-left"><b>Berat Emas</b></td>
                <td class="width-30 text-left">:</td>
                <td class="text-left"><?= $request_order->berat_emas ?></td>
              </tr>     
            </table>
        </td>
        {{-- <td><div style="float:right;"><?= $logo ?></div></td> --}}
    </tr>
</table>

<table class="noborder margin-bottom-table">
  <tr>
    <td class="width-30 text-left">10.</td>
    <td class="width-150 text-left"><b>Diamond Detail</b></td>
    <td class="width-30 text-left"></td>
    <td class="text-left">&nbsp;</td>
  </tr>     
</table>

<table class="table-print" style="margin-left:35px; width:400px">
  <thead>
    <tr>
    <th class="width-80 text-left">Butir</th>
    <th class="width-80 text-left">Karat</th>
    <th class="width-80 text-left">Tipe</th>
    <th class="width-80 text-left">Diameter</th>
    <th class="width-80 text-left">Warna</th>
    </tr>
  </thead>
</table>
<?php
    if(!empty($request_order_diamond)) {
        foreach($request_order_diamond as $row) {
            echo '<table class="table-print" style="margin-left:35px; width:400px">';
            echo '<tr>';
            echo '<td class="width-80 text-left">'.$row->grain.'&nbsp;</td>';
            echo '<td class="width-80 text-left">'.$row->grade.'&nbsp;</td>';
            echo '<td class="width-80 text-left">'.$row->diamond_type.'&nbsp;</td>';
            echo '<td class="width-80 text-left">'.$row->diameter.'&nbsp;</td>';
            echo '<td class="width-80 text-left">'.$row->color.'&nbsp;</td>';
            echo '</tr>';
            echo '</table>';
        }
    }
?> 
<div class="space-20"></div>

<table class="noborder margin-bottom-table">
  <tr>
    <td class="width-30 text-left">11.</td>
    <td class="width-150 text-left"><b>Description</b></td>
    <td class="width-30 text-left">:</td>
    <td class="text-left"><?= $request_order->txt ?></td>
  </tr>     
</table>
<table class="noborder margin-bottom-table">
  <tr>
    <td class="width-30 text-left">12.</td>
    <td class="width-150 text-left"><b>Customer Material</b></td>
    <td class="width-30 text-left">:</td>
    <td class="text-left"><?= $request_order->customer_material ?></td>
  </tr>     
</table>
<table class="noborder margin-bottom-table">
  <tr>
    <td class="width-30 text-left">13.</td>
    <td class="width-150 text-left"><b>Estimated Price</b></td>
    <td class="width-30 text-left">:</td>
    <td class="text-left"><?= $request_order->estimated_price ?></td>
  </tr>     
</table>
<table class="noborder margin-bottom-table">
  <tr>
    <td class="width-30 text-left">&nbsp;</td>
    <td class="width-150 text-left"><b>Uang Muka</b></td>
    <td class="width-30 text-left">:</td>
    <td class="text-left"><?= $request_order->down_payment ?></td>
  </tr>     
</table>
<table class="noborder margin-bottom-table">
  <tr>
    <td class="width-30 text-left">&nbsp;</td>
    <td class="width-150 text-left"><b>Pelunasan</b></td>
    <td class="width-30 text-left">:</td>
    <td class="text-left"><?= $request_order->settlement ?></td>
  </tr>     
</table>
<table class="noborder margin-bottom-table">
  <tr>
    <td class="width-30 text-left">14.</td>
    <td class="width-150 text-left"><b>Custom Box</b></td>
    <td class="width-30 text-left">:</td>
    <td class="text-left"><?= $request_order->custom_box ?></td>
  </tr>     
</table>

<div class="space-20"></div>
<div class="space-20"></div>

<table class="noborder margin-bottom-table">
  <tr>
    <td class="width-30 text-left">&nbsp;</td>
    <td class="width-150 text-left"><b>PROPOSED BY</b></td>
    <td class="width-150 text-left"><b>KNOWN BY</b></td>
    <td class="text-left"><b>APPROVED BY</b></td>
  </tr>     
</table>

<div class="space-20"></div>
<div class="space-20"></div>
<div class="space-20"></div>

<table class="noborder margin-bottom-table">
  <tr>
    <td class="width-30 text-left">&nbsp;</td>
    <td class="text-left">Note:</td>
  </tr>     
</table>
@endsection

