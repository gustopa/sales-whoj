import React, { useRef, useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import ModalInvoice from '../Components/ModalInvoice'
import { Button, Chip } from '@mui/material'
import { FaCirclePlus } from 'react-icons/fa6'
import ModalViewCustomer from '../Customer/ModalViewCustomer'
import { Link } from '@inertiajs/react'
import { MdCancel, MdDelete, MdEdit, MdPrint } from 'react-icons/md'
import { IoMdDocument } from "react-icons/io";

import { encrypt } from '../../helper'
import Swal from 'sweetalert2'
function Payment({access}) {

    const handleCancel = (id) => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async result => {
            if(result.isConfirmed){
                try{
                    const response = await axios.delete(`/payment/cancel/${id}`)
                    const data = await response.data
                    Swal.fire({
                        title : "Berhasil",
                        icon : "success",
                        text : "Invoice berhasil dicancel"
                    })
                    tableRef.current?.refreshData()
                }catch(err){
                    Swal.fire({
                        title : "Gagal",
                        icon : "error",
                        text : "Terjadi kesalahan!"
                    })
                }
            }
        })
        
    }
    const [columnDefs] = useState([
        {field : "row_id",headerName : "", minWidth : 136, width : 136,resizable: false, filter : false,
            hide : access == "Read only" ? true : false,
            pinned : "left",
            headerComponent : params => (
                <Link key={params.value} className='flex justify-center' href='/payment/create' method="post" style={{background: "#b89474",padding : "10px",borderRadius : "10px",width : "80%",textAlign : "center"}}>
                    <FaCirclePlus className='text-white'/>
                </Link>
            ),
            cellRenderer : params => (
                <div key={params.value}>
                    {params.data && 
                        <>
                            {params.data?.status == null && params.data?.is_print == 0 && 
                                <Link style={{ width: "30px", display: 'inline-block', marginLeft : "5px" }} href={`/payment/form/${encrypt(params?.value)}`}>
                                    <Button sx={{ width: "30px", minWidth: "30px" }} size="small" variant='contained' color="primary">
                                        <MdEdit />
                                    </Button>
                                </Link>
                            }
                        </>
                    }
                    {params.data?.file_certificate != "" && 
                        <a
                        target="__blank"
                        style={{ marginLeft: '5px', display: 'inline-block', width: "30px" }}
                        href={`https://system-mahakarya.com/assets/uploaded/${(params.data?.file_certificate)}`}
                        >
                            <Button sx={{ width: "100%", minWidth: "30px" }} size="small" variant='contained' color="success">
                                <IoMdDocument style={{color: "white"}} />
                            </Button>
                        </a>
                    }
                    {params.data?.status == "PAID" || params.data?.status == null &&
                        <>
                            {params.data?.is_print == 0 && 
                                <a
                                    target="__blank"
                                    style={{ marginLeft: '5px', display: 'inline-block', width: "30px" }}
                                    onClick={() => tableRef.current?.refreshData()}
                                    href={`/payment/print/${encrypt(params.data?.row_id)}`}
                                >
                                    <Button sx={{ width: "100%", minWidth: "30px" }} size="small" variant='contained' color="inherit">
                                        <MdPrint style={{color: "black"}} />
                                    </Button>
                                </a>
                            }
                        </>
                    }
                    {params.data?.status !== "CANCELLED" &&
                        <Button
                            onClick={() => handleCancel(params.value)}
                            size="small"
                            sx={{ marginLeft: "5px", width: "30px", minWidth: "30px" }}
                            variant='contained'
                            color='error'
                        >
                            <MdCancel />
                        </Button>
                    }
                </div>
            )
        },
        {field : "doc_no",headerName : "Invoice No",
            cellRenderer : params => <ModalInvoice key={params.value} row_id={params.data?.row_id} params={params}/>
        },
        {field : "trans_date",headerName : "Tanggal"},
        {field : "sales_id_txt",headerName : "Sales"},
        {field : "customer_id_txt",headerName : "Customer",
            cellRenderer : params => <ModalViewCustomer key={params.value} id_customer={params.data?.customer_id} params={params}/>
        },
        {field : "notes",headerName : "Catatan"},
        {field : "identity_code",headerName : "PLU"},
        {field : "amount",headerName : "Pembayaran",
            cellRenderer : params => "Rp."+Intl.NumberFormat("id-ID").format(params.value)
        },
        {field : "status",headerName : "Status",
            cellRenderer : params => {
                let color = ""
                switch(params.value){
                    case "PAID" : 
                        color = "success"
                        break
                    case "CANCELLED" : 
                        color = "error"
                        break
                    case "EXCHANGE" : 
                        color = "warning"
                        break
                    case "BUYBACK" : 
                        color = "info"
                        break
                    default : 
                        color = "secondary"
                }
                return (
                    <Chip label={params.value == null || params.value == "" ? "DRAFT" : params.value} color={color} />
                )
            }
            
        },
    ])
    const tableRef = useRef(null)
  return (
    <Layout title="Pembayaran" page="Pembayaran">
        <Table ref={tableRef} columnDefs={columnDefs} endpoint="/payment/getAll" />
    </Layout>
  )
}

export default Payment
