import React, { useEffect, useState } from 'react'
import Layout from '../Layouts/Layout'
import { Card } from '@mui/material';
import axios from 'axios';
import { AgCharts } from 'ag-charts-react';
import { Grid } from '@mui/material';

function Dashboard({ permission }) {
  const [data, setData] = useState([]);
  const [dataPie, setDataPie] = useState([]); // Data khusus untuk Pie Chart

  // Konfigurasi Pie Chart
  const pieChartOptions = {
    data: dataPie, // Menggunakan data yang sudah dikonversi ke persen
    width: 700,
    height: 700,
    // title: {
    //   text: "Persentase Penjualan (Pie Chart)",
    // },
    series: [
      {
        type: "pie",
        angleKey: "amount", // Menggunakan persen
        calloutLabelKey: "item_name",
        sectorLabelKey: "amount",
        sectorLabel: {
          color: "white",
          fontWeight: "bold",
          formatter: ({ value }) => `${value.toFixed(2)}%`, // Format persen dengan 2 desimal
        },
      },
    ],
  };

  // Konfigurasi Bar Chart
  const barChartOptions = {
    data: data, // Menggunakan data asli (bukan persen)
    title: {
      text: "Total Penjualan (Bar Chart)",
    },
    width: 3000, // Lebar lebih besar agar kategori muat
    height: 700,
    series: [
      {
        type: "bar",
        xKey: "item_name",
        yKey: "amount",
        // label: {
        //   formatter: ({ value }) => value.toLocaleString(), // Format angka dengan separator
        // },
      },
    ],
  };

  const getData = async () => {
    try {
      const response = await axios.get("/dashboard_sales/getPieChartItem");
      let responseData = response.data.map((item) => ({
        ...item,
        amount: Number(item.amount), // Pastikan amount dalam bentuk angka
      }));

      // Hitung total amount untuk dijadikan persentase
      const totalAmount = responseData.reduce((sum, item) => sum + item.amount, 0);

      // Data untuk Pie Chart (dikonversi ke persen)
      const pieData = responseData.map((item) => ({
        item_name: item.item_name,
        amount: (item.amount / totalAmount) * 100, // Konversi ke persen
      }));

      setData(responseData); // Data asli untuk Bar Chart
      setDataPie(pieData); // Data dalam persen untuk Pie Chart
    } catch (err) {
      console.error(err);
      showAlert("Error!", "Terjadi kesalahan silakan coba lagi", "error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout title="Dashboard" page="Dashboard Penjualan">
      <Grid container spacing={2}>
        {/* Pie Chart */}
        <Grid item xs={12} md={6}>
          <Card className="p-3 dark:bg-navy-800" style={{ overflow: 'auto' }}>
            <AgCharts options={pieChartOptions} />
          </Card>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12} md={6}>
          <Card className="p-3 dark:bg-navy-800" style={{ overflow: "auto" }}>
            <AgCharts options={barChartOptions} />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Dashboard;
