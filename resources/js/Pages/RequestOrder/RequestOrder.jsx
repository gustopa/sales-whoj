import React, { useRef, useState } from 'react'
import Layout from '../Layouts/Layout'
import { Button, Chip, Grid2 as Grid } from '@mui/material'
import Table from '../Components/Table'
import { Link } from '@inertiajs/react'
import { MdDelete, MdDone, MdEdit } from 'react-icons/md'
import { formatDate } from '../../helper'
import ModalComponent from '../Components/Modal'
import { FaCirclePlus } from 'react-icons/fa6'
function statusColor(status){
    let color = ""
    switch(status){
        case "PAID" : 
            color = "success"
            break
        case "ORDER" : 
            color = "primary"
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


function RequestOrder() {
    const [columnDef,setColumnDef] = useState([
        {field : "row_id", headerName : "", pinned : "left", resizable : false,filter : false, width : 137,
            headerComponent : params => (
                <Link className='flex justify-center' href='/request_order/create' method="post" style={{background: "#b89474",padding : "10px",borderRadius : "10px",width : "80%",textAlign : "center"}}>
                    <FaCirclePlus className='text-white'/>
                </Link>
            ),
            cellRenderer : params => 
                (
                    <div key={params.value}>
                        <Link>
                            <Button sx={{ width: "30px", minWidth: "30px" }} size="small" variant='contained' color="primary">
                                <MdEdit/>
                            </Button>
                        </Link>
                        <Button sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="error">
                            <MdDelete/>
                        </Button>
                        <Button sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="success">
                            <MdDone/>
                        </Button>
                    </div>
                ),
            
        },
        {field : "doc_no", headerName : "Doc No", cellRenderer : params => <ModalComponent key={params.value} params={params}/>},
        {field : "customer_id_txt", headerName : "Pelanggan"},
        {field : "trans_date", headerName : "Tanggal", cellRenderer : params => params.value == "0000-00-00" ? "-" : formatDate(params.value)},
        {field : "estimated_date", headerName : "Perkiraan delivery time",cellRenderer : params => params.value == "0000-00-00" ? "-" : formatDate(params.value)},
        {field : "item_id_txt", headerName : "Tipe item"},
        {field : "type_order", headerName : "Tipe order"},
        {field : "outsource_intern", headerName : "Outsource"},
        {field : "status", headerName : "Status",cellRenderer : params => <Chip color={statusColor(params.value)} label={params.value == "" ? "DRAFT" : params.value} />},
    ])
    const [columnPaid] = useState([
        {field : "doc_no", headerName : "Doc No", cellRenderer : params => <ModalComponent params={params}/>},
        {field : "customer_id_txt", headerName : "Pelanggan"},
        {field : "trans_date", headerName : "Tanggal", cellRenderer : params => params.value == "0000-00-00" ? "-" : params.value},
        {field : "estimated_date", headerName : "Perkiraan delivery time",cellRenderer : params => params.value == "0000-00-00" ? "-" : params.value},
        {field : "item_id_txt", headerName : "Tipe item"},
        {field : "type_order", headerName : "Tipe order"},
        {field : "outsource_intern", headerName : "Outsource"},
        {field : "status", headerName : "Status",cellRenderer : params => <Chip color={statusColor(params.value)} label={params.value == "" ? "DRAFT" : params.value} />},
    ])
    const tableWaiting = useRef(null)
    const tableProccess = useRef(null)
    const tableReady = useRef(null)
    const tablePaid = useRef(null)
    
  return (
    <Layout title="Pesanan" page="Pesanan">
        <Grid container spacing={2}>
            <Grid size={12}>
                <h2 className='text-2xl dark:text-white font-bold mb-2'>WAITING</h2>
                <Table ref={tableWaiting} columnDefs={columnDef} endpoint="/request_order/getCustomOrder?status[]=&status[]=ORDER"/>
            </Grid>
            <Grid size={12}>
                <h2 className='text-2xl dark:text-white font-bold mb-2'>ON PROCESS</h2>
                <Table ref={tableProccess} columnDefs={columnDef} endpoint="/request_order/getCustomOrder?status[]=&status[]=ON GOING"/>
            </Grid>
            <Grid size={12}>
                <h2 className='text-2xl dark:text-white font-bold mb-2'>COMPLETED</h2>
                <Table ref={tableReady} columnDefs={columnDef} endpoint="/request_order/getCustomOrder?status[]=READY"/>
            </Grid>
            <Grid size={12}>
                <h2 className='text-2xl dark:text-white font-bold mb-2'>PAID</h2>
                <Table ref={tablePaid} columnDefs={columnPaid} endpoint="/request_order/getCustomOrder?status[]=PAID"/>
            </Grid>
        </Grid>
    </Layout>
  )
}

export default RequestOrder
