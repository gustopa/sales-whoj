import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import { Grid2 as Grid } from '@mui/material'
import Table from '../Components/Table'
function RequestOrder() {
    const [columnDef,setColumnDef] = useState([
        {field : "row_id", headerName : ""},
        {field : "doc_no", headerName : "Doc No"},
        {field : "customer_id_txt", headerName : "Pelanggan"},
        {field : "trans_date", headerName : "Tanggal"},
        {field : "estimated_date", headerName : "Perkiraan delivery time"},
        {field : "item_id_txt", headerName : "Tipe item"},
        {field : "type_order", headerName : "Tipe order"},
        {field : "outsource_intern", headerName : "Outsource"},
        {field : "status", headerName : "Status"},
    ])
  return (
    <Layout title="Pesanan" page="Pesanan">
        <Grid container spacing={2}>
            <Grid size={12}>
                <h2 className='text-2xl dark:text-white font-bold mb-2'>WAITING</h2>
                <Table columnDefs={columnDef} endpoint="/request_order/getCustomOrder?status[]=&status[]=ORDER"/>
            </Grid>
            <Grid size={12}>
                <h2 className='text-2xl dark:text-white font-bold mb-2'>ON PROCESS</h2>
                <Table columnDefs={columnDef} endpoint="/request_order/getCustomOrder?status[]=&status[]=ON GOING"/>
            </Grid>
            <Grid size={12}>
                <h2 className='text-2xl dark:text-white font-bold mb-2'>COMPLETED</h2>
                <Table columnDefs={columnDef} endpoint="/request_order/getCustomOrder?status[]=READY"/>
            </Grid>
            <Grid size={12}>
                <h2 className='text-2xl dark:text-white font-bold mb-2'>PAID</h2>
                <Table columnDefs={columnDef} endpoint="/request_order/getCustomOrder?status[]=PAID"/>
            </Grid>
        </Grid>
    </Layout>
  )
}

export default RequestOrder
