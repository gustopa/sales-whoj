<!DOCTYPE html>
<html>
<head>
	<title>@yield('document_name')</title>
  	<style type="text/css">

  		body{
		  font-family: helvetica;
		  font-size: 13px;
		}

		#header {
            display: block;
            height: 80px;
            background-color: #fff;
            color: #000;
            text-align: center;
            line-height: 35px;
        }

        #main {
        	margin-top:10px;
        }

        .logo {
            position: absolute; 
            top: 20px; 
            right: 0px;
            height: 50px; 
        }

        .document_name {
            position: absolute; 
            top: 20px; 
            left: 0px;
            height: 50px; 
            font-weight: bold;
            font-size:25px;
        }

        .document_no {
            position: absolute; 
            top: 18px; 
            left: 0px;
            height: 50px; 
        }

        .document_border {
            position: absolute; 
            top: 65px; 
        	width:100%;
            border-bottom:4px solid #000;
        	height:1px;
        }

		table.noborder {
		  border-collapse: collapse;	
		  border: none !important;		
		  width: 100% !important;
		}

		table.noborder td{
		  border: none !important;
		}

		table.table-print {
		  font-family: helvetica;
		  border: 0px solid #000;
		  width: 100%;
		  text-align: left;
		  border-collapse: collapse;
		}

		table.table-print th {
		  border: 1px solid #000;
		  padding: 3px 2px;
		  background: #ddd;
		}

		table.table-print td {
		  border: 1px solid #000;
		  border-top: none !important;
		  padding: 3px 2px;
		}

		table.table-print tbody td {
		  font-size: 13px;
		  vertical-align: top !important;
		}

		table.table-print thead {
		  background: #EEEEEE;
		  background: -moz-linear-gradient(top, #f2f2f2 0%, #efefef 66%, #EEEEEE 100%);
		  background: -webkit-linear-gradient(top, #f2f2f2 0%, #efefef 66%, #EEEEEE 100%);
		  background: linear-gradient(to bottom, #f2f2f2 0%, #efefef 66%, #EEEEEE 100%);
		  border-bottom: 0px solid #000;
		}

		table.table-print thead th {
		  font-size: 13px;
		  font-weight: bold;
		  color: #000000;
		}

		table.table-print tfoot {
		  font-size: 13px;
		  font-weight: bold;
		  color: #000000;
		  border-top: 0px solid #000;
		}

		table.table-print tfoot td {
			font-size: 13px;
		}

		.text-left {
			text-align: left;
		}

		.text-right {
			text-align: right;
		}

		.text-center {
			text-align: center;
		}

		.percentwidth-10 {
			width: 10%;
		}

		.percentwidth-20 {
			width: 20%;
		}

		.percentwidth-30 {
			width: 30%;
		}

		.percentwidth-40 {
			width: 40%;
		}

		.percentwidth-50 {
			width: 50%;
		}

		.percentwidth-60 {
			width: 60%;
		}

		.percentwidth-70 {
			width: 70%;
		}

		.percentwidth-80 {
			width: 80%;
		}

		.percentwidth-90 {
			width: 90%;
		}

		.percentwidth-100 {
			width: 100%;
		}

		.width-10 {
			width: 10px;
		}

		.width-20 {
			width: 20px;
		}

		.width-30 {
			width: 30px;
		}

		.width-50 {
			width: 50px;
		}

		.width-60 {
			width: 60px;
		}

		.width-70 {
			width: 70px;
		}

		.width-80 {
			width: 80px;
		}

		.width-90 {
			width: 90px;
		}

		.width-100 {
			width: 100px;
		}

		.width-150 {
			width: 150px;
		}

		.width-200 {
			width: 200px;
		}

		.width-250 {
			width: 250px;
		}

		.space-10 {
			clear: both;
			height: 10px;
		}

		.space-15 {
			clear: both;
			height: 15px;
		}

		.space-20 {
			clear: both;
			height: 20px;
		}

		.space-25 {
			clear: both;
			height: 25px;
		}

		.space-30 {
			clear: both;
			height: 30px;
		}

		.space-35 {
			clear: both;
			height: 35px;
		}

		.margin-bottom-table {
			margin-bottom: 10px !important;
		}

		#footer {
	      position: fixed;
	      right: 0px;
	      bottom: 10px;
	      text-align: center;
	      border-top: 1px solid black;
	    }

	    #footer .page:after {
	      content: counter(page, #000);
	    }

	    .title {
	    	font-weight: bold;
	    	margin-top: 10px;
	    	margin-bottom: 5px;
	    	text-transform: uppercase;
	    }

		.v-top {
			vertical-align: top !important;
		}

		.font-s {
			font-size: 12px !important;
		}

		.font-xs {
			font-size: 10px !important;
		}
  	</style>
</head>
<body>


<div id="header">
	<div class="logo">	
        <img class="photo" style="width:150px" src="{{ public_path('logo.jpg') }}" />

	</div>
	<div class="document_name" style="font-size:30px !important">
        @yield('document_name')
    </div>
</div>
    <div class="width-10"></div>

<div id="main">
	@yield('content')
</div>

{{-- <script type="text/php">
    if(isset($pdf)) {
        $x = 33;
        $y = 18;
        $text = "PAGE {PAGE_NUM} OF {PAGE_COUNT}";
        $font = $fontMetrics->get_font("helvetica", "bold");
        $size = 7;
        $color = array(0, 0, 0);
        $word_space = 0.0; 
        $char_space = 0.0;
        $angle = 0.0;
        $pdf->page_text($x, $y, $text, $font, $size, $color, $word_space, $char_space, $angle);
    }
</script> --}}

</body>
</html>