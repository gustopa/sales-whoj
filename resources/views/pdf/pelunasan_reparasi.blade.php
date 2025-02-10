@extends('pdf.layout')
@section('document_name','REPARASI')
@section('content')

<table class="noborder">
  <tr>
    <td class="text-right" style="font-size: 20px"><?= $request_order->doc_no ?></td>
  </tr>     
</table>

<div style="clear:both; height:1px; background: #000"></div>
<div style="clear:both; height:35px;"></div>

<table class="noborder">
  <tr>
    <td class="width-200 text-left"><b>TELAH DITERIMA DARI:<b></td>
    <td class="text-left">WANDA HOUSE OF JEWELS</td>
    <td class="text-right"><span><b>TANGGAL:</b></span> <?= formatDate($request_order->trans_date) ?></td>
  </tr>     
</table>
<table class="noborder">
  <tr>
    <td class="width-200 text-left" ><b>DISERAHKAN KEPADA:<b></td>
    <td class="text-left"><?= $request_order->customer_id_txt ?></td>
  </tr>     
</table>

<div class="space-20"></div>

<table class="table-print">
  <tr>
    <th class="width-150 text-center">JENIS BARANG</th>
    <th class="width-100 text-center">BERAT JADI</th>
    <th class="width-100 text-center">GAMBAR</th>
    <th class="width-150 text-center">KETERANGAN REPARASI</th>
    <th class="text-center">DETAILS</th>
  </tr>   
  <tr>
    <td class="text-center"><?= $request_order->item_id_txt ?></td>
    <td class="text-center"><?= $request_order->berat_jadi ?></td>
    <td class="text-center">
        @if ($request_order->photo_file != null || $request_order->photo_file != "")
            <img class="photo" style="width:100%" src="{{storage_path('app/public/uploaded/'.$request_order->photo_file)}}" />
        @endif
    </td>
    <td class="text-center"><?= $request_order->txt ?></td>
    <td class="text-left">
      <table class="table-print">
        <tr>
          <th class="text-left">REPARASI</th>
          <th class="text-left">BIAYA</th>
          <th class="text-left">JENIS PEMBAYARAN</th>
        </tr>
        
        <?php
          if(!empty($request_order_reparation)) {
            foreach($request_order_reparation as $row) {
        ?>
        <tr>
          <td class="text-left"><?= $row->amount_txt ?></td>
          <td class="text-left"><?= formatRupiah($row->amount) ?></td>
          <td class="text-left"><?= $row->amount_type ?></td>
        </tr> 
        <?php
            }
          }
        ?>
      </table>
    </td>
  </tr>  
</table>


<div class="space-20"></div>
<div class="space-20"></div>
<div style="clear:both; height:1px; background: #000"></div>
<div style="clear:both; height:35px;"></div>
<div class="space-20"></div>
<div class="space-20"></div>
<div class="space-20"></div>
<div class="space-20"></div>

<table class="noborder">
  <tr>
    <td class="text-center">(..............................)</td>
    <td class="text-center">(..............................)</td>
    <td class="text-center">(..............................)</td>
  </tr> 
  <tr>
    <td class="text-center">Finance HO</td>
    <td class="text-center">SM/ASM</td>
    <td class="text-center">Customer</td>
  </tr>     
</table>





@endsection