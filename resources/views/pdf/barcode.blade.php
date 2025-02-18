
<!DOCTYPE html>
<html lang="en">
<head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>Print</title>   
        <style type="text/css" media="print">
        @page 
        {
            size: auto;   /* auto is the initial value */
            margin: 0mm;  /* this affects the margin in the printer settings */
        }

  		body{
		  font-family: helvetica;
          
		}

		table.noborder {
		  border-collapse: collapse;	
		  border: none !important;		
		  width: 100% !important;
		}

		table.noborder td{
		  border: none !important;
		}
		
		.butir {
		    min-width:5px;
		}
        </style>
    </head>
    <body>
    	<!--<div style="margin:5px 0px 0px 75px;">-->
    	<div style="margin:5px 0px 0px 10px;">
	        <table class="noborder">
              <tr>
                <td class="text-left" style="width:130px">
                    <?= $inventory->item_id_txt ?>
                </td>
                <td class="text-left" style="font-size:8px">
                    <?= $inventory->gold_grade ?> &nbsp;&nbsp;-&nbsp;&nbsp; <?= left(xnumber_format($inventory->gold_weight, 2), 6) ?>gr
                </td>
              </tr>    
            </table>
	        <table class="noborder" style="margin-top:-15px">
              <tr>
                <td class="text-left" style="width:130px">
                    <?php
                        $a = "0";
                        $b = "1";
                        $c = "2";
                        $d = "3";
                        $e = "4";
                        $f = "5";
                        $g = "6";
                        $h = "7";
                        $i = "8";
                        $j = "9";
                        
                        $array = str_split(xnumber_format(($inventory->sell_price / 1000), 0));
                        $code = "";
                        foreach ($array as $char) {
                            if($char == $a)
                                $code .= "A";
                            else if($char == $b)
                                $code .= "B";
                            else if($char == $c)
                                $code .= "C";
                            else if($char == $d)
                                $code .= "D";
                            else if($char == $e)
                                $code .= "E";
                            else if($char == $f)
                                $code .= "F";
                            else if($char == $g)
                                $code .= "G";
                            else if($char == $h)
                                $code .= "H";
                            else if($char == $i)
                                $code .= "I";
                            else if($char == $j)
                                $code .= "J";
                        }
                    ?>
                    <b><?= $inventory->identity_code ?></b>
                    <div style="clear:both; height:2px"></div>
                    <div style="margin-top:-7px"><b><?= $code ?></b></div>
                </td>
                <td class="text-left">
        	        <table class="noborder" style="margin-top:-5px">
                      <tr>
                        <?php
                        
                            $box_left = "";
                            $box_right = "";
            				if(!empty($inventory_diamond)) {
            				    $i = 1;
            					foreach($inventory_diamond as $row) {
            					    if($i <= 5) {
                						$box_left .= "<div style='margin-top:-7px'>".$row->grain." &nbsp;&nbsp;-&nbsp;&nbsp; ".left($row->grade, 6)." ".$row->diamond_type."</div>";
                						$box_left .= '<div style="clear:both; height:2px"></div>';
            					    } else {
                						$box_right .= "<div style='margin-top:-7px'>".$row->grain." &nbsp;&nbsp;-&nbsp;&nbsp; ".left($row->grade, 6)." ".$row->diamond_type."</div>";
                						$box_right .= '<div style="clear:both; height:2px"></div>';
            					    }
            					    $i++;
            					}
            				}
            			?>
                        <td class="text-left" style="width:73px;">
                            <div style="font-size:8px"><?= $box_left ?></div>
                        </td>
                        <td class="text-left" style="font-size:8px"><?= $box_right ?></td>
                      </tr> 
                    </table>
                </td>
              </tr>  
            </table>
		<div>

        <script type="text/javascript">
            window.print();
            // $(document).ready(function() {
            // });
        </script>
    </body>
</html>
