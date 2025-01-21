import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import { Button, Card, Chip } from '@mui/material'
import Table from '../Components/Table'
import ModalComponent from '../Components/Modal'
import { Link, usePage } from '@inertiajs/react'
import { formatDate } from '../../helper'
import { MdEdit } from 'react-icons/md'

function statusColor(status){
    let color = ""
    switch(status){
        case "PAID" : 
            color = "success"
            break
        case "ORDER" : 
            color = "secondary"
            break
        case "READY" : 
            color = "warning"
            break
        case "ON GOING" : 
            color = "info"
            break
        default : 
            color = "secondary"
    }
    return color
}


function BySales() {
    const session = usePage().props.session
    
    const [columnPaid] = useState([
        {field : "doc_no", headerName : "Doc No", cellRenderer : params => <ModalComponent params={params}/>},
        {field : "customer_id_txt", headerName : "Pelanggan"},
        {field : "trans_date", headerName : "Tanggal", cellRenderer : params => params.value == "0000-00-00" ? "-" : formatDate(params.value)},
        {field : "estimated_date", headerName : "Perkiraan delivery time",cellRenderer : params => params.value == "0000-00-00" ? "-" : formatDate(params.value)},
        {field : "item_id_txt", headerName : "Tipe item"},
        {field : "type_order", headerName : "Tipe order"},
        {field : "outsource_intern", headerName : "Outsource"},
        {field : "status", headerName : "Status",cellRenderer : params => <Chip color={statusColor(params.value)} label={params.value == "" ? "DRAFT" : params.value} />},
        {field : "last_process", headerName : "Proses", cellRenderer : params => params.value == null ? "-" : params.value}
    ])

    const [columnDefs] = useState([
        {field : "row_id", headerName : "", filter : false, resizable : false, width : 70, pinned : "left",
            cellRenderer : params => 
                (
                    <Link>
                        <Button sx={{ width: "30px", minWidth: "30px" }} size="small" variant='contained' color="primary">
                            <MdEdit/>
                        </Button>
                    </Link>
                )
        },
        {field : "doc_no", headerName : "Doc No", cellRenderer : params => <ModalComponent params={params}/>},
        {field : "customer_id_txt", headerName : "Pelanggan"},
        {field : "trans_date", headerName : "Tanggal", cellRenderer : params => params.value == "0000-00-00" ? "-" : formatDate(params.value)},
        {field : "estimated_date", headerName : "Perkiraan delivery time",cellRenderer : params => params.value == "0000-00-00" ? "-" : formatDate(params.value)},
        {field : "item_id_txt", headerName : "Tipe item"},
        {field : "type_order", headerName : "Tipe order"},
        {field : "outsource_intern", headerName : "Outsource"},
        {field : "status", headerName : "Status",cellRenderer : params => <Chip color={statusColor(params.value)} label={params.value == "" ? "DRAFT" : params.value} />},
        {field : "last_process", headerName : "Proses", cellRenderer : params => params.value == null ? "-" : params.value}
    ])
  return (
    <Layout title="Pesanan" page="Pesanan">
        <Card className='dark:bg-navy-800 p-4'>
            <h2 className='text-2xl dark:text-white font-bold mb-2'>WAITING</h2>
            <Table columnDefs={columnDefs} endpoint={`/request_order/getBySales/${session.user_id}?status[]=ORDER&status[]=ON GOING&status[]=READY&status[]=`}/>
        </Card>
        <Card className='dark:bg-navy-800 p-4'>
            <h2 className='text-2xl dark:text-white font-bold mb-2'>COMPLETED</h2>
            <Table columnDefs={columnPaid} endpoint={`/request_order/getBySales/${session.user_id}?status[]=PAID`}/>
        </Card>
    </Layout>
  )
}

export default BySales
