const Stok = [
    {
      name : "Bahan Emas",
      link : "bahan-emas",
      IsSubMenu : false
    },
    {
      name : "Transaksi Bahan Emas",
      link : "",
      IsSubMenu : false
    },
    {
      name : "Batu",
      link : "",
      IsSubMenu : false
    },
    {
      name : "Transaksi Batu",
      link : "",
      IsSubMenu : false
    },
    {
      name : "Rangka",
      link : "",
      IsSubMenu : false
    },
    {
      name : "Diamond",
      link : "",
      IsSubMenu : false
    },
    {
      name : "Chain",
      link : "",
      IsSubMenu : false
    }
  ]
const Produksi = [
    {
      name : "Produksi",
      link : "",
      IsSubMenu : false
    },
    {
      name : "Bongkaran",
      link : "",
      IsSubMenu : false
    },
    {
      name : "Permintaan Kerja JWCAD",
      link : "",
      IsSubMenu : false
    },
    {
      name : "Resin",
      link : "",
      IsSubMenu : false
    },
    {
      name : "Coran",
      link : "",
      IsSubMenu : false
    },
    {
      name : "Finishing/Handmade",
      link : "",
      IsSubMenu : false
    },
    {
      name : "Grafir",
      link : "",
      IsSubMenu : false
    },
    {
      name : "Poles Rangka",
      link : "",
      IsSubMenu : false
    },
    {
      name : "Poles Batu",
      link : "",
      IsSubMenu : false
    },
    {
      name : "Poles Chrome",
      link : "",
      IsSubMenu : false
    },
    {
      name : "Reparasi Finishing Handmade",
      link : "",
      IsSubMenu : false
    },
    {
      name : "Reparasi Pasang Batu",
      link : "",
      IsSubMenu : false
    },
    {
      name : "Reparasi Poles Chrome",
      link : "",
      IsSubMenu : false
    },
  ]


  const HR = [
    {
        name : "Kepegawaian",
        IsSubMenu : true,
        childMenu : [
            {
                name : "Data Pegawai",
                link : ""
            },
            {
                name : "Department",
                link : ""
            },
            {
                name : "Divisi",
                link : ""
            },
            {
                name : "Jabatan",
                link : ""
            },
        ]
    },
    {
        name : "Reimbursment",
        IsSubMenu : true,
        childMenu : [
            {
                name : "Pengajuan Reimbursment",
                link : ""
            },
            {
                name : "Approval Reimbursment",
                link : ""
            },
        ]
    },
    {
        name : "Jadwal Harian Supir",
        IsSubMenu : true,
        childMenu : [
            {
                name : "Pengajuan Jadwal Supir",
                link : ""
            },
            {
                name : "Approval Jadwal Supir",
                link : ""
            },
        ]
    },
    {
        name : "Absensi",
        IsSubMenu : true,
        childMenu : [
            {
                name : "Absensi Karyawan",
                link : ""
            },
        ]
    },
    {
        name : "Cuti",
        IsSubMenu : true,
        childMenu : [
            {
                name : "Pengajuan Cuti",
                link : ""
            },
            {
                name : "Approval Cuti",
                link : ""
            },
        ]
    },
    {
        name : "Keterlambatan",
        IsSubMenu : true,
        childMenu : [
            {
                name : "Pengajuan Keterlambatan",
                link : ""
            },
            {
                name : "Approval Keterlambatan",
                link : ""
            },
        ]
    },
    {
        name : "Lembur",
        IsSubMenu : true,
        childMenu : [
            {
                name : "Pengajuan Lembur",
                link : ""
            },
            {
                name : "Approval Lembur",
                link : ""
            },
        ]
    },
    {
        name : "Stationery",
        IsSubMenu : true,
        childMenu : [
            {
                name : "Stok Stationery",
                link : ""
            },
            {
                name : "Pengajuan Stationery",
                link : ""
            },
            {
                name : "Approval Stationery",
                link : ""
            },
        ]
    },
    {
        name : "Pembelian",
        IsSubMenu : true,
        childMenu : [
            {
                name : "Pengajuan Pembelian",
                link : ""
            },
            {
                name : "Approval Pembelian",
                link : ""
            },
        ]
    },

  ]

  const Laporan = [
    {
        name : "HR",
        IsSubMenu : true,
        childMenu : [
            {
                name : "Laporan Cuti",
                link : ""
            },
            {
                name : "Laporan Reimbursement",
                link : ""
            },
            {
                name : "Laporan Stationery",
                link : ""
            },
        ]
    },
    {
        name : "Produksi",
        IsSubMenu : true,
        childMenu : [
            {
                name : "Laporan Pemakaian Bahan Emas",
                link : ""
            },
            {
                name : "Laporan Pemakaian Batu",
                link : ""
            },
            {
                name : "Laporan Pemakaian Diamond",
                link : ""
            },
            {
                name : "Laporan Pemakaian Chain",
                link : ""
            },
            {
                name : "Laporan Pemakaian Susut",
                link : ""
            },
            {
                name : "Laporan Susut Pasang Batu",
                link : ""
            },
            {
                name : "Laporan OPB",
                link : ""
            },
        ]
    },
    {
        name : "Stok",
        IsSubMenu : true,
        childMenu : [
            {
                name : "Laporan Stok Bahan Emas",
                link : ""
            },
            {
                name : "Laporan Stok Batu",
                link : ""
            },
            {
                name : "Laporan Stok Diamond",
                link : ""
            },
            {
                name : "Laporan Rangka",
                link : ""
            },
        ]
    },
    {
        name : "Tanda Terima Proses",
        link : "",
        IsSubMenu : false
    }
  ]

  const Master = [
    {
        name : "Produksi",
        IsSubMenu : true,
        childMenu : [
            {
                name : "Items",
                link : ""
            },
            {
                name : "Supplier",
                link : ""
            },
            {
                name : "Pengrajin",
                link : ""
            },
            {
                name : "Bentuk Batu",
                link : ""
            },
        ]
    },
    {
        name : "HR",
        IsSubMenu : true,
        childMenu : [
            {
                name : "Stationery",
                link : ""
            },
            {
                name : "Tipe Stationery",
                link : ""
            },
            {
                name : "Tipe Biaya",
                link : ""
            },
            {
                name : "Tipe Cuti",
                link : ""
            },
            {
                name : "Mobil",
                link : ""
            },
            {
                name : "Libur Nasional",
                link : ""
            },
        ]
    },
    {
        name : "General",
        IsSubMenu : true,
        childMenu : [
            {
                name : "Periode",
                link : ""
            },
            {
                name : "Tipe Transaksi",
                link : ""
            }
        ]
    }
  ]

  const Administrator = [
    {
        name : "Users",
        link : "",
        IsSubMenu : false
    },
    {
        name : "User Access",
        link : "",
        IsSubMenu : false
    },
    {
        name : "Status",
        link : "",
        IsSubMenu : false
    },
    {
        name : "Menu",
        link : "",
        IsSubMenu : false
    },
    {
        name : "Icon",
        link : "",
        IsSubMenu : false
    },
    {
        name : "Web Info",
        link : "",
        IsSubMenu : false
    },
    {
        name : "Audit Log",
        link : "",
        IsSubMenu : false
    },
    {
        name : "Generate Master",
        link : "",
        IsSubMenu : false
    },
    {
        name : "Generate Header Detail",
        link : "",
        IsSubMenu : false
    },
  ]

export {Stok,Produksi,HR,Laporan,Master,Administrator}