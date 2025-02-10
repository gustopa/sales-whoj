@extends('pdf.layout')
@section('document_name','REPARASI')
@section('content')
    <style type="text/css">
    .width-ttd {
        width: 400px
    }
    .width-check {
        width: 30px
    }
    .row-berlian {
        padding:0px !important;
    }
    </style>

    <div class="space-20"></div>

    <div style="position: absolute; top:50px; left: 370px; font-size: 25px;">No: <?= $request_order->doc_no ?></div>

    <table class="noborder">
    <tr>
        <td class="width-150 text-left" style="color:#999"><b><i>Nama Customer</i><b></td>
        <td class="text-left"><b><?= $request_order->customer_id_txt ?></b></td>
    </tr>     
    </table>
    <table class="noborder">
    <tr>
        <td class="width-150 text-left" style="color:#999"><b><i>Tanggal Terima</i><b></td>
        <td class="text-left"><?= formatDate($request_order->trans_date) ?></td>
        <td class="width-150 text-left" style="color:#999"><b><i>Tanggal Selesai</i><b></td>
        <td class="width-150 text-left"><?= formatDate($request_order->estimated_date) ?></td>
    </tr>     
    </table>

    <div style="clear:both; height:15px;"></div>
    <div style="clear:both; height:1px; background: #ccc"></div>
    <div style="clear:both; height:15px;"></div>

    <table class="noborder">
    <tr>
        <td class="width-150 v-top text-left" style="color:#999"><b><i>Item</i><b></td>
        <td class="width-550 text-left"><?= $request_order->item_id_txt ?></td>
        <td class="width-ttd text-left" rowspan="6" style="color:#999">
            @if ($request_order->photo_file != null || $request_order->photo_file != "")
                <img class="photo" style="width:100px" src="{{storage_path('app/public/uploaded/'.$request_order->photo_file)}}" />
            @endif
        </td>
    </tr>     
    <tr>
        <td class="width-150 v-top text-left" style="color:#999"><b><i>Deskripsi reparasi</i><b></td>
        <td class="text-left"><?= $request_order->txt ?></td>
    </tr>  
    <tr>
        <td class="width-150 v-top text-left" style="color:#999"><b><i>Berat Emas</i><b></td>
        <td class="text-left"><?= $request_order->berat_emas ?> gr</td>
    </tr>  
    <?php
        if(!empty($request_order_diamond)) {
    ?>
    <tr>
        <td class="width-150 v-top text-left" style="color:#999"><b><i>Berlian</i><b></td>
        <td class="text-left">
            <?php
                $detail = "";
                foreach($request_order_diamond as $line) {
                    $detail .= '<b>Butir: </b>'.$line->grain;
                    $detail .= ', <b>Karat: </b>'.$line->grade;
                    $detail .= ', <b>Tipe: </b>'.$line->diamond_type;
                    $detail .= ', <b>Color: </b>'.$line->color;
                    $detail .= ', <b>Diameter: </b>'.$line->diameter."<br>";
                }
                echo $detail;
            ?> 
        </td>
    </tr>  
    <?php 
        } 
    ?>   
    <tr>
        <td class="width-150 v-top text-left" style="color:#999"><b><i>Biaya reparasi</i><b></td>
        <td class="text-left"><?= formatRupiah($request_order->estimated_price) ?></td>
    </tr>   
    </table>

    <div style="clear:both; height:15px;"></div>
    <div style="clear:both; height:1px; background: #ccc"></div>
    <div style="clear:both; height:15px;"></div>

    <table class="noborder">
    <tr>
        <td class="width-150 text-left" style="color:#999"><b><i>Tanggal Pengambilan:</i><b></td>
        <td class="text-left"><?= formatDate($request_order->trans_date) ?></td>
    </tr>     
    </table>

    <table class="table-print" style="border:1px solid #ccc; border-bottom:none !important">
    <tr>
        <td class="width-ttd text-left" style="border:1px solid #ccc; border-bottom:none !important"><i><div class="space-10"></div>Berlian ini telah ditest keasliannya<div class="space-10"></div></i></td>
        <td class="width-check text-left" style="border:1px solid #ccc; border-bottom:none !important">&nbsp;</td>
        <td class="text-center" rowspan="2" style="border:1px solid #ccc; border-bottom:none !important"><b>Penerima</b></td>
        <td class="text-center" rowspan="2" style="border:1px solid #ccc; border-bottom:none !important"><b>Customer</b></td>
    </tr>     
    <tr>
        <td class="width-150 text-left" style="border:1px solid #ccc; border-bottom:none !important"><i><div class="space-10"></div>Pasangan berlian sudah ditest kekuatannya<div class="space-10"></div></i></td>
        <td class="text-left" style="border:1px solid #ccc; border-bottom:none !important">&nbsp;</td> 
    </tr>     
    </table>
    <div style="clear:both; height:1px; background: #ccc"></div>

    <div class="space-20"></div>

    <table class="noborder">
    <tr>
        <td class="width-150 text-left" style="color:#999"><b><i>Tanggal Pengambilan:</i><b></td>
        <td class="text-left">............................</td>
    </tr>     
    </table>

    <table class="table-print" style="border:1px solid #ccc; border-bottom:none !important">
    <tr>
        <td class="width-ttd text-left" style="border:1px solid #ccc; border-bottom:none !important"><i><div class="space-10"></div>Berlian ini telah ditest keasliannya<div class="space-10"></div></i></td>
        <td class="width-check text-left" style="border:1px solid #ccc; border-bottom:none !important">&nbsp;</td>
        <td class="text-center" rowspan="2" style="border:1px solid #ccc; border-bottom:none !important"><b>Pemberi</b></td>
        <td class="text-center" rowspan="2" style="border:1px solid #ccc; border-bottom:none !important"><b>Customer</b></td>
    </tr>     
    <tr>
        <td class="width-150 text-left" style="border:1px solid #ccc; border-bottom:none !important"><i><div class="space-10"></div>Pasangan berlian sudah ditest kekuatannya<div class="space-10"></div></i></td>
        <td class="text-left" style="border:1px solid #ccc; border-bottom:none !important">&nbsp;</td> 
    </tr>     
    </table>
    <div style="clear:both; height:1px; background: #ccc"></div>

    <div style="clear:both; height:15px;"></div>
    <span style="color:#999"><i>Tanda terima reparasi ini harus dibawa pada saat pengambilan barang</i></span>
@endsection


