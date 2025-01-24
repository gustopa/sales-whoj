import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import { Card, Chip } from '@mui/material'
import ModalComponent from '../Components/Modal'
import ModalViewCustomer from '../Customer/ModalViewCustomer'
import { formatDate } from '../../helper'
function RequestOrderSummary() {
  const [columnDefs] = useState([
    {field : "doc_no",headerName : "Doc No",
      cellRenderer : params => <ModalComponent params={params} />
    },
    {field : "customer_id_txt",headerName : "Pelanggan", cellRenderer : params => <ModalViewCustomer params={params} id_customer={params.data?.customer_id}/>},
    {field : "trans_date",headerName : "Tanggal",
      cellRenderer : params => params.value == "0000-00-00" ? "-" : formatDate(params.value)
    },
    {field : "estimated_date",headerName : "Perkiraan delivery",
      cellRenderer : params => params.value == "0000-00-00" ? "-" : formatDate(params.value)
    },
    {field : "item_id_txt",headerName : "Tipe item"},
    {field : "type_order",headerName : "Tipe order"},
    {field : "status",headerName : "Status",
      cellRenderer : params => <Chip label={params.value} color={params.value == "ORDER" ? "primary" : "success"} />
    },
  ])
  return (
    <Layout title="Summary Pesanan" page="Summary Pesanan">
      <Card className='dark:bg-navy-800 p-3'>
        <Table columnDefs={columnDefs} endpoint="/request_order/getAllCustomOrder/ORDER"/>
      </Card>
      <Card className='dark:bg-navy-800 p-3'>
        <Table columnDefs={columnDefs} endpoint="/request_order/getAllCustomOrder/READY"/>
      </Card>
    </Layout>
  )
}

export default RequestOrderSummary
