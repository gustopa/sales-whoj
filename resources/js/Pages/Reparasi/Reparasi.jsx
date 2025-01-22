import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import { MdDelete, MdEdit } from 'react-icons/md'
import { Button, Chip } from '@mui/material'
import { Link } from '@inertiajs/react'
import ModalComponent from '../Components/Modal'
import { formatDate } from '../../helper'
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


function Reparasi({access}) {
    const [columnDef,setColumnDef] = useState([
        {field : "row_id", headerName : "", pinned : "left", resizable : false,filter : false, width : 105, minWidth : 105, hide : access == "Read only" ? true : false,
            headerComponent : params => (
                <Link className='flex justify-center' href='/reparation/create' method="post" style={{background: "#b89474",padding : "10px",borderRadius : "10px",width : "80%",textAlign : "center"}}>
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
  return (
    <Layout title="Reparasi" page="Reparasi">
        <Table columnDefs={columnDef} endpoint="/reparation/getAll" />
    </Layout>   
  )
}

export default Reparasi
