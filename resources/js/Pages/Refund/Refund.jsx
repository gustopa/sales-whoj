import React, { useRef, useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import { Button, Chip } from '@mui/material'
import { encrypt, formatDate, showAlert } from '../../helper'
import { FaCirclePlus } from 'react-icons/fa6'
import { Link } from '@inertiajs/react'
import { MdCancel, MdDelete, MdEdit } from 'react-icons/md'
import ModalRefund from './components/ModalRefund'
import Swal from 'sweetalert2'

function statusColor(status){
    let color = ""
    switch(status){
        case "PAID" : 
            color = "success"
            break
        case "CANCELLED" : 
            color = "error"
            break
        default : 
            color = "secondary"
    }
    return color
}


function Refund({access}) {
    const tableRef  = useRef(null)
    const handleCancel = row_id => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          }).then( async (result) => {
            if (result.isConfirmed) {
              try{
                await axios.post(`/refund/cancel/${row_id}`)
                showAlert("Berhasil!","Refund berhasil dicancel",'success')
                tableRef.current?.refreshData()
              }catch(err){
                showAlert("Error!","Terjadi kesalahan silahkan coba lagi","error")
              }
            }
          });
    }
    const [columnDef] = useState([
        {field : "row_id", headerName : "", pinned : "left", resizable : false,filter : false, width : 105, minWidth : 105, hide : access == "Read only" ? true : false,
            headerComponent : params => (
                <Link className='flex justify-center' href='/refund/create' method="post" style={{background: "#2e7d32",padding : "10px",borderRadius : "10px",width : "80%",textAlign : "center"}}>
                    <FaCirclePlus className='text-white'/>
                </Link>
            ),
            cellRenderer : params => 
                (
                    params.value && (
                        <div key={params.value}>
                            {params.data?.status != "PAID" && params.data?.status != "CANCELLED" && 
                                <Link href={`/refund/form/${encrypt(params.value)}`}>
                                    <Button sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="primary">
                                        <MdEdit/>
                                    </Button>
                                </Link>
                            }
                            <Button onClick={() => handleCancel(params.value)} sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="error">
                                <MdCancel/>
                            </Button>
                        </div>

                    )
                ),
            
        },
        {field : "doc_no", headerName : "Doc No", cellRenderer : params => <ModalRefund key={params.value} params={params}/>},
        {field : "customer_id_txt", headerName : "Pelanggan"},
        {field : "trans_date", headerName : "Tanggal", cellRenderer : params => formatDate(params.value)},
        {field : "txt", headerName : "Alasan"},
        {field : "payment_id_txt", headerName : "Pembelian"},
        {field : "amount_refund", headerName : "Refund", cellRenderer : params => Intl.NumberFormat("id-ID").format(params.value)},
        {field : "status", headerName : "Status",cellRenderer : params => <Chip color={statusColor(params.value)} label={params.value == null ? "DRAFT" : params.value} />},
    ])
  return (
    <Layout title="Refund" page="Pengembalian">
        <Table ref={tableRef} columnDefs={columnDef} endpoint="/refund/getAll"/>
    </Layout>
  )
}

export default Refund
