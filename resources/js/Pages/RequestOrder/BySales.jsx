import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import { Button, Card, Chip } from '@mui/material'
import Table from '../Components/Table'
import ModalComponent from '../Components/Modal'
import { Link, usePage } from '@inertiajs/react'
import { encrypt, formatDate } from '../../helper'
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
        {field : "doc_no", headerName : "Doc No", cellRenderer : params => <ModalComponent params={params}/>, minWidth : 120, width : 120, pinned : "left"},
        {field : "customer_id_txt", headerName : "Pelanggan"},
        {field : "trans_date", headerName : "Tanggal", cellRenderer : params => params.value == "0000-00-00" ? "-" : formatDate(params.value)},
        {field : "estimated_date", headerName : "Perkiraan delivery time",cellRenderer : params => params.value == "0000-00-00" ? "-" : formatDate(params.value)},
        {field : "item_id_txt", headerName : "Tipe item"},
        {field : "type_order", headerName : "Tipe order"},
        {field : "outsource_intern", headerName : "Outsource"},
        {field : "status", headerName : "Status", cellRenderer : params => <Chip color={statusColor(params.value)} label={params.value == "" ? "DRAFT" : params.value} />},
        {field : "last_process", headerName : "Proses", minWidth: 150, width : 150, cellRenderer : params => params.value == null ? "-" : params.value}
    ])

    const [columnDefs] = useState([
        {field : "row_id", headerName : "", filter : false, resizable : false, width : 70, minWidth : 70, pinned : "left",
            cellRenderer : params => 
                (
                    <div key={params.value}>
                        {params.value &&
                            <>
                                <Link href={`/request_order_bysales/form/${encrypt(params.value)}`}>
                                    <Button sx={{ width: "30px", minWidth: "30px" }} size="small" variant='contained' color="primary">
                                        <MdEdit/>
                                    </Button>
                                </Link>
                            </>
                        }
                    </div>
                )
        },
        {field : "doc_no", headerName : "Doc No", minWidth: 130, width : 130, cellRenderer : params => <ModalComponent params={params}/>},
        {field : "customer_id_txt", headerName : "Pelanggan"},
        {field : "trans_date", headerName : "Tanggal", cellRenderer : params => params.value == "0000-00-00" ? "-" : formatDate(params.value)},
        {field : "estimated_date", headerName : "Perkiraan delivery time",cellRenderer : params => params.value == "0000-00-00" ? "-" : formatDate(params.value)},
        {field : "item_id_txt", headerName : "Tipe item"},
        {field : "type_order", headerName : "Tipe order"},
        {field : "outsource_intern", headerName : "Outsource"},
        {field : "status", headerName : "Status", minWidth: 150, width : 150, flex : 0,cellRenderer : params => <Chip color={statusColor(params.value)} label={params.value == "" ? "DRAFT" : params.value} />},
        {field : "last_process", headerName : "Proses", minWidth: 150, width : 150, cellRenderer : params => params.value == null ? "-" : params.value}
    ])
  return (
    <Layout title="Pesanan" page="Pesanan">
        <Card className='dark:bg-navy-800 p-4'>
            <h2 className='text-2xl dark:text-white font-bold mb-2'>WAITING</h2>
            <Table columnDefs={columnDefs} endpoint={`/request_order/getBySales/${session.user_id}?status[]=ORDER&status[]=ON GOING&status[]=READY&status[]=FINISHING&status[]=`}/>
        </Card>
        <Card className='dark:bg-navy-800 p-4 mt-3'>
            <h2 className='text-2xl dark:text-white font-bold mb-2'>COMPLETED</h2>
            <Table columnDefs={columnPaid} endpoint={`/request_order/getBySales/${session.user_id}?status[]=PAID`}/>
        </Card>
    </Layout>
  )
}

export default BySales
