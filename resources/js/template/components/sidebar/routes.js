const Pelanggan = [
    {
      name : "Pelanggan",
      link : "/customer",
      IsSubMenu : false,
      group : 'Pelanggan'
    },
    {
      name : "Kunjungan Pelanggan",
      link : "/customer-visit",
      IsSubMenu : false,
      group : 'Pelanggan'
    },
    {
      name : "Pengiriman",
      link : "/shipping",
      IsSubMenu : false,
      group : 'Pelanggan'
    },
  ]
const Transaksi = [
    {
      name : "Dashboard Penjualan",
      link : "/dashboard_sales",
      IsSubMenu : false,
      group : 'Transaksi'
    },
    {
      name : "Pembayaran",
      link : "/payment",
      IsSubMenu : false,
      group : 'Transaksi'
    },
    {
      name : "Pesanan",
      link : "/request_order",
      IsSubMenu : false,
      group : 'Transaksi'
    },
    {
      name : "Pesanan Sales",
      link : "/request_order_bysales",
      IsSubMenu : false,
      group : 'Transaksi'
    },
    {
      name : "Reparasi",
      link : "/reparation",
      IsSubMenu : false,
      group : 'Transaksi'
    },
    {
      name : "Kembalikan/Tukar",
      link : "/refund",
      IsSubMenu : false,
      group : 'Transaksi'
    },
    {
      name : "Tanda Terima",
      link : "/tanda_terima",
      IsSubMenu : false,
      group : 'Transaksi'
    },
    {
      name : "Setup Rate",
      link : "/exrate",
      IsSubMenu : false,
      group : 'Transaksi'
    },
  ]


  const Inventory = [
    {
      name : "Summary Inventory",
      link : "/inventory_summary",
      IsSubMenu : false,
      group : 'Inventory'
    },
    {
      name : "Barang",
      link : "/inventory_list",
      IsSubMenu : false,
      group : 'Inventory'
    },
    {
      name : "Detail Inventory",
      link : "/inventory",
      IsSubMenu : false,
      group : 'Inventory'
    },
    {
      name : "Kirim Barang",
      link : "/inventory_out",
      IsSubMenu : false,
      group : 'Inventory'
    },
    {
      name : "Terima Barang",
      link : "/inventory_out_received",
      IsSubMenu : false,
      group : 'Inventory'
    },
    {
      name : "Matriks Harga",
      link : "/diamond_pricing",
      IsSubMenu : false,
      group : 'Inventory'
    },
    {
      name : "Pergerakan Barang",
      link : "/inventory_movement",
      IsSubMenu : false,
      group : 'Inventory'
    },
    {
      name : "Foto",
      link : "/photo_inventory",
      IsSubMenu : false,
      group : 'Inventory'
    },
    {
      name : "Stock Opname",
      link : "/stock_opname",
      IsSubMenu : false,
      group : 'Inventory'
    },
    {
      name : "Miscellaneous",
      link : "/miscellaneous",
      IsSubMenu : false,
      group : 'Inventory'
    },
    {
      name : "Stok Harian",
      link : "/daily_stock",
      IsSubMenu : false,
      group : 'Inventory'
    },
    {
      name : "Kalkulasi Harga",
      link : "/inventory_price_calculation",
      IsSubMenu : false,
      group : 'Inventory'
    },
  ]
  const Produksi = [
    {
      name : "Open Periode Stok",
      link : "",
      IsSubMenu : false,
      group : 'Produksi'
    },
    {
      name : "Tipe Emas",
      link : "",
      IsSubMenu : false,
      group : 'Produksi'
    },
    {
      name : "Tipe Berlian",
      link : "",
      IsSubMenu : false,
      group : 'Produksi'
    },
    {
      name : "Tipe Frame",
      link : "",
      IsSubMenu : false,
      group : 'Produksi'
    },
    {
      name : "Input Stok Emas",
      link : "",
      IsSubMenu : false,
      group : 'Produksi'
    },
    {
      name : "Input Stok Berlian",
      link : "",
      IsSubMenu : false,
      group : 'Produksi'
    },
    {
      name : "Produksi",
      link : "",
      IsSubMenu : false,
      group : 'Produksi'
    },
    {
      name : "Daftar Transaksi Emas",
      link : "",
      IsSubMenu : false,
      group : 'Produksi'
    },
    {
      name : "Daftar Transaksi Berlian",
      link : "",
      IsSubMenu : false,
      group : 'Produksi'
    },
  ]
  const Master = [
    {
      name : "item",
      link : "/item",
      IsSubMenu : false,
      group : 'Master'
    },
    {
      name : "Jenis",
      link : "/item_type",
      IsSubMenu : false,
      group : 'Master'
    },
    {
      name : "Model",
      link : "/model",
      IsSubMenu : false,
      group : 'Master'
    },
    {
      name : "Store",
      link : "/store",
      IsSubMenu : false,
      group : 'Master'
    },
    {
      name : "Tipe Transaksi",
      link : "/trans_type",
      IsSubMenu : false,
      group : 'Master'
    },
    {
      name : "Tipe Pembayaran",
      link : "/payment_type",
      IsSubMenu : false,
      group : 'Master'
    },
    {
      name : "EDC",
      link : "/edc",
      IsSubMenu : false,
      group : 'Master'
    },
    {
      name : "Lokasi ",
      link : "/location",
      IsSubMenu : false,
      group : 'Master'
    },
    {
      name : "Harga Labour",
      link : "/labour_price",
      IsSubMenu : false,
      group : 'Master'
    },
    {
      name : "Letak Barang",
      link : "/position",
      IsSubMenu : false,
      group : 'Master'
    },
    {
      name : "Grouping Pesanan",
      link : "/grouping_order",
      IsSubMenu : false,
      group : 'Master'
    },
    {
      name : "Sales",
      link : "/sales",
      IsSubMenu : false,
      group : 'Master'
    },
    {
      name : "Pengrajin",
      link : "/craftsman",
      IsSubMenu : false,
      group : 'Master'
    },
    {
      name : "Kota",
      link : "city",
      IsSubMenu : false,
      group : 'Master'
    },
    {
      name : "Nama Produk",
      link : "/productname",
      IsSubMenu : false,
      group : 'Master'
    },
  ]
  const Laporan = [
    {
      name : "Penjualan",
      link : "/report_sellout",
      IsSubMenu : false,
      group : 'Master'
    },
    {
      name : "Stock Opname",
      link : "/report_stock",
      IsSubMenu : false,
      group : 'Master'
    },
    {
      name : "Input Inventory",
      link : "/report_inventory",
      IsSubMenu : false,
      group : 'Master'
    },
    {
      name : "Pesanan",
      link : "/report_request_order",
      IsSubMenu : false,
      group : 'Master'
    },
    {
      name : "Nota Penjualan",
      link : "/report_nota_penjualan",
      IsSubMenu : false,
      group : 'Master'
    },
    {
      name : "Outstanding Pesanan",
      link : "/request_order_summary",
      IsSubMenu : false,
      group : 'Master'
    },
    {
      name : "Rekap Pembayaran",
      link : "/payment_summary",
      IsSubMenu : false,
      group : 'Master'
    },
    {
      name : "Report Pengrajin ",
      link : "/report_craftsman",
      IsSubMenu : false,
      group : 'Master'
    },
  ]
  const Konfigurasi = [
    {
      name : "Entitas",
      link : "/company",
      IsSubMenu : false,
      group : 'Konfigurasi'
    },
    {
      name : "Web Info",
      link : "/web_info",
      IsSubMenu : false,
      group : 'Konfigurasi'
    },
    {
      name : "Akun Login",
      link : "/users",
      IsSubMenu : false,
      group : 'Konfigurasi'
    },
    {
      name : "Folder Menu",
      link : "/folder_menu",
      IsSubMenu : false,
      group : 'Konfigurasi'
    },
    {
      name : "Menu",
      link : "/menu",
      IsSubMenu : false,
      group : 'Konfigurasi'
    },
    {
      name : "Peran Akun",
      link : "/role",
      IsSubMenu : false,
      group : 'Konfigurasi'
    },
    {
      name : "Akses Akun",
      link : "/access",
      IsSubMenu : false,
      group : 'Konfigurasi'
    },
  ]

 

export {Pelanggan,Transaksi,Produksi,Inventory,Laporan,Master,Konfigurasi}