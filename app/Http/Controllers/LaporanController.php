<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Exports\PenjualanExport;
use App\Exports\PesananExport;
use Maatwebsite\Excel\Facades\Excel;
use PDF;
ini_set('memory_limit', '512M');
class LaporanController extends Controller
{
    public function penjualan(){
        $access = checkPermission('report_sellout');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        $sales = DB::table('vw_sysuserlist')->select('row_id','name')->where([
            ['is_deleted','=',0],
            ['is_submitted','=',1],
            ['role_id','=','6'],
        ])->get();
        $items = DB::table('vw_itemlist')->select('row_id','name')->where([
            ['is_submitted','=',1]
        ])->get();
        return inertia('Laporan/Penjualan',[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access,
            "sales" => $sales,
            "items" => $items
        ]);
    }
    public function exportPenjualan(Request $request)
    {
        // dd($request->all());
        $from_date = $request->input('from_date');
        $to_date = $request->input('to_date');
        $sales_id = $request->input('sales_id');
        $item_id = $request->input('item_id');

        // Query untuk payment
        $paymentQuery = DB::table('vw_paymentlist')
            ->where('is_submitted', 1)
            ->where('is_deleted', 0)
            ->whereNotIn('status', ['DRAFT', 'CANCELLED'])
            ->whereBetween(DB::raw("CAST(trans_date AS DATE)"), [$from_date, $to_date]);

        if (!empty($sales_id)) {
            $paymentQuery->where('sales_id', $sales_id);
        }
        if (!empty($item_id)) {
            $paymentQuery->where('inventory_id_txt', $item_id);
        }

        $payment = $paymentQuery->orderBy('row_id', 'desc')->get();

        // Query untuk request order
        $requestOrderQuery = DB::table('vw_request_order_dplist')
            ->whereNotIn('status', ['DRAFT', 'CANCELLED'])
            ->where('is_deleted', 0)
            ->whereBetween(DB::raw("CAST(dp_date AS DATE)"), [$from_date, $to_date]);

        if (!empty($sales_id)) {
            $requestOrderQuery->where('sales_id', $sales_id);
        }

        $request_order = $requestOrderQuery->orderBy('row_id', 'desc')->get();

        // Query untuk reparation
        $reparation = DB::table('vw_request_order_reparationlist')
            ->where('is_deleted', 0)
            ->whereBetween(DB::raw("CAST(created_date AS DATE)"), [$from_date, $to_date])
            ->orderBy('row_id', 'desc')
            ->get();

        // Query untuk refund
        $refund = DB::table('vw_refundlist')
            ->where('is_submitted', 1)
            ->where('is_deleted', 0)
            ->whereNotIn('status', ['DRAFT', 'CANCELLED'])
            ->whereBetween(DB::raw("CAST(trans_date AS DATE)"), [$from_date, $to_date])
            ->orderBy("row_id", "desc")
            ->get();

        if($request['tipe'] == "PDF"){
            $pdf = PDF::loadView('pdf.sell_out', [
                'request_order' => $request_order,
                'reparation' => $reparation,
                'refund' => $refund,
                'payment' => $payment,
                'from_date' => $from_date,
                'to_date' => $to_date
            ]);
            return response($pdf->output(), 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'attachment; filename="laporan-penjualan.pdf"');
        }else{
            return Excel::download(new PenjualanExport($from_date, $to_date, $sales_id, $item_id), 'laporan-penjualan.xlsx');
        }
    }


    public function stockOpName(){
        $access = checkPermission('report_stock');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        $stores = DB::table('vw_storelist')->select('row_id','name')->where([
            ['is_deleted','=',0],
        ])->get();
        return inertia('Laporan/StockOpName',[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access,
            "stores" => $stores
        ]);
    }
    public function printStock(Request $request){
        $query = DB::table('vw_inventorylist')
        ->where('status','READY');
        if(!empty($request['store'])){
            $query->where('store_id',$request['store']);
        }
        $inventory = $query->orderBy('row_id','desc')->get();
        $pdf = PDF::loadView('pdf.stock', [
            'inventory' => $inventory
        ]);
        return response($pdf->output(), 200)
        ->header('Content-Type', 'application/pdf')
        ->header('Content-Disposition', 'attachment; filename="laporan-stock.pdf"');

    }
    public function inventory(){
        $access = checkPermission('report_inventory');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        // $list = DB::table('vw_inventoryprintlist')
        // ->selectRaw('DISTINCT ses_id, modified_by, CAST(modified_date AS DATE) AS modified_date')
        // ->orderByDesc('modified_date')
        // ->get();
        $list = [];
        return inertia('Laporan/Inventory',[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access,
            "list" => $list
        ]);
    }
    public function getSession(){
        $access = checkPermission('report_inventory');
        if($access == null || $access == ""){
            return abort(403);
        }
        $list = DB::table('vw_inventoryprintlist')
        ->selectRaw('DISTINCT ses_id, modified_by, CAST(modified_date AS DATE) AS modified_date')
        ->orderByDesc('modified_date')
        ->limit(100)
        ->get();
        return response()->json($list);
    }

    public function printInventory(Request $request){
        $data = DB::table('vw_inventoryprintlist')
        ->where('ses_id',$request['session'])->get();
        $pdf = PDF::loadView('pdf.inventory', [
            'list' => $data,
            "ses_id" => $request['session']
        ])->setPaper('a4','landscape');
        return response($pdf->output(), 200)
        ->header('Content-Type', 'application/pdf')
        ->header('Content-Disposition', 'attachment; filename="laporan-inventory.pdf"');
    }

    public function requestOrder(){
        $access = checkPermission('report_request_order');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        return inertia('Laporan/RequestOrder',[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access
        ]);
    }

    public function printOrder(Request $request){
        $access = checkPermission('report_request_order');
        if($access == null || $access == ""){
            return abort(403);
        }
        $request_order = DB::table('vw_request_orderlist')
        ->where('is_deleted',0)
        ->whereBetween('trans_date',[$request['from_date'],$request['to_date']])
        ->get();
        if($request['tipe'] == 'PDF'){
            $pdf = PDF::loadView('pdf.pesanan', [
                'request_order' => $request_order,
                'from_date' => $request['from_date'],
                'to_date' => $request['to_date'],
            ])->setPaper('a4','landscape');
            return response($pdf->output(), 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'attachment; filename="laporan-pesanan.pdf"');
        }else{
            return Excel::download(new PesananExport($request['from_date'], $request['to_date']), 'laporan-pesanan.xlsx');
        }   
    }

    public function notaPenjualan(){
        $access = checkPermission('report_nota_penjualan');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        $sales = DB::table('vw_sysuserlist')->select('row_id','name')->where([
            ['is_deleted','=',0],
            ['is_submitted','=',1],
            ['role_id','=','6'],
        ])->get();
        return inertia('Laporan/NotaPenjualan',[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access,
            "sales" => $sales
        ]);
    }

    public function printNota(Request $request){
        $from_date = $request['from_date'];
        $to_date = $request['to_date'];
        $sales = $request['sales'];



        $query_payment = DB::table('vw_paymentlist')
        ->where('is_submitted',1)
        ->where('is_deleted',0)
        ->where('company_id',session('company_id'))
        ->whereNotIn('status',['DRAFT','CANCELLED'])
        ->whereBetween('trans_date',[$from_date,$to_date]);
        if(!empty($sales)){
            $query_payment->where('sales_id',$sales);
        }
        $payment = $query_payment->orderBy('row_id','desc')->get();

        $q_request_order = DB::table('vw_request_orderlist')
        ->where('is_submitted',1)
        ->where('is_deleted',0)
        ->where('company_id',session('company_id'))
        ->whereNotIn('status',['DRAFT','PAID','CANCELLED'])
        ->whereBetween('trans_date',[$from_date,$to_date]);
        if(!empty($sales)){
            $q_request_order->where('sales_id',$sales);
        }
        $request_order = $q_request_order->orderBy('row_id','desc')->get();

        $q_refund = DB::table('vw_refundlist')
        ->where('is_submitted',1)
        ->where('is_deleted',0)
        ->where('company_id',session('company_id'))
        ->whereNotIn('status',['DRAFT','','CANCELLED'])
        ->whereBetween('trans_date',[$from_date,$to_date]); 
        $refund = $q_refund->orderBy('row_id','desc')->get();

        $data = [];

        if(!empty($payment)) {
			foreach($payment as $row) {
				$input = array(
					'tanggal' => $row->trans_date,
					'nama_customer' => $row->customer_id_txt,
					'item' => $row->inventory_id_txt,
					'plu' => $row->identity_code,
					'dp' => $row->down_payment,
					'harga_plu' => $row->inventory_price,
					'jumlah_diskon' => $row->selling_price * ($row->percent_disc / 100),
					'persen_diskon' => $row->percent_disc,
					'exchange' => "0",
					'tipe_pembayaran' => $row->payment_type_id_txt,
					'harga_jual' => $row->amount,
					'sales' => $row->sales_id_txt,
					'dokumen_invoice' => "Yes",
					'dokumen_sertifikat' => "",
				);

				$data[] = (object)$input;
			}
		}

		if(!empty($request_order)) {
			foreach($request_order as $row) {
				$input = array(
					'tanggal' => $row->trans_date,
					'nama_customer' => $row->customer_id_txt,
					'item' => $row->item_id_txt,
					'plu' => "",
					'dp' => "0",
					'harga_plu' => $row->estimated_price,
					'jumlah_diskon' => "0",
					'persen_diskon' => "0",
					'exchange' => "0",
					'tipe_pembayaran' => "",
					'harga_jual' => $row->down_payment,
					'sales' => $row->sales_id_txt,
					'dokumen_invoice' => "",
					'dokumen_sertifikat' => "",
				);

				$data[] = (object)$input;
			}
		}

        $pdf = PDF::loadView('pdf.nota', [
            "data" => $data,
			"from_date" => $from_date,
			"to_date" => $to_date,
        ])->setPaper('a4','landscape');

        return response($pdf->output(), 200)
        ->header('Content-Type', 'application/pdf')
        ->header('Content-Disposition', 'attachment; filename="nota-penjualan.pdf"');
    }

    public function requestOrderSummary(){
        $access = checkPermission('request_order_summary');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        return inertia('Laporan/RequestOrderSummary',[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access
        ]);
    }
    public function paymentSummary(){
        $access = checkPermission('payment_summary');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        return inertia('Laporan/PaymentSummary',[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access
        ]);
    }
    public function craftsman(){
        $access = checkPermission('report_craftsman');
        if($access == null || $access == ""){
            return abort(403);
        }
        $menu = listMenu();
        $craftsman = DB::table('vw_craftsmanlist')->where('is_deleted',0)->get();
        return inertia('Laporan/Craftsman',[
            "session" => session()->all(),
            "menu" => $menu,
            "access" => $access->menu_access,
            "craftsman" => $craftsman
        ]);
    }

    public function printCraftsman(Request $request){
        $from_date = $request['from_date'];
        $to_date = $request['to_date'];
        $craftsman = $request['craftsman'];

        $query = DB::table('vw_report_craftsman_deliveryreceivedlist')
        ->whereBetween('received_date',[$from_date,$to_date]);
        if(!empty($request['craftsman'])){
            $query->where('craftsman_id',$request['craftsman']);
        }
        $data = $query->orderBy('received_date','desc')->get();

        $pdf = PDF::loadView('pdf.craftsman', [
            'report' => $data,
            'from_date' => $from_date,
            "to_date" => $to_date
        ])->setPaper('a4','landscape');
        return response($pdf->output(), 200)
        ->header('Content-Type', 'application/pdf')
        ->header('Content-Disposition', 'attachment; filename="laporan-pengrajin.pdf"');
    }

    public function getDataPaymentSummary($tanggal,$idType){
        $access = checkPermission('payment_summary');
        if($access == null || $access == ""){
            return abort(403);
        }
        $data = datatable('vw_paymentlist',function($query) use ($tanggal,$idType){
            $query->where('payment_type_id',$idType);
            $query->whereDate('trans_date',$tanggal);
        });
        return $data;
    }
}
