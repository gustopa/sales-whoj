import React, { useRef, useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import ModalInvoice from '../Components/ModalInvoice'
import { Button, Chip } from '@mui/material'
import { FaCirclePlus } from 'react-icons/fa6'
import ModalViewCustomer from '../Customer/ModalViewCustomer'
import { Link } from '@inertiajs/react'
import { MdCancel, MdEdit, MdPrint } from 'react-icons/md'
import { IoMdDocument } from "react-icons/io";

import { encrypt, formatDate } from '../../helper'
import Swal from 'sweetalert2'
function Payment({access}) {

    const handleCancel = (id) => {
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
        {field : "row_id",headerName : "", minWidth : 170, width : 170,resizable: false, filter : false,
            hide : access == "Read only" ? true : false,
            pinned : "left",
            headerComponent : params => (
                <Link key={params.value} className='flex justify-center' href='/payment/create' method="post" style={{background: "#2e7d32",padding : "10px",borderRadius : "10px",width : "80%",textAlign : "center"}}>
                    <FaCirclePlus className='text-white'/>
                </Link>
            ),
            cellRenderer : params => (
                <div key={params.value}>
                    {params.data && 
                        <>
                            {params.data?.status != "CANCELLED" && params.data?.is_print == 0   && 
                                <Link style={{ width: "30px", display: 'inline-block' }} href={`/payment/form/${encrypt(params?.value)}`}>
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
                    {params.data?.status != "CANCELLED" &&
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
        {field : "doc_no",headerName : "Invoice No", minWidth : 130, width : 130,
            cellRenderer : params => <ModalInvoice key={params.value} row_id={params.data?.row_id} params={params}/>
        },
        {field : "trans_date",headerName : "Tanggal", cellRenderer : params => formatDate(params.value), filter: 'agDateColumnFilter'},
        {field : "sales_id_txt",headerName : "Sales", minWidth : 120, width : 120},
        {field : "customer_id_txt",headerName : "Customer", minWidth : 160, width : 160,
            cellRenderer : params => <ModalViewCustomer key={params.value} id_customer={params.data?.customer_id} params={params}/>
        },
        {field : "notes",headerName : "Catatan"},
        {field : "identity_code",headerName : "PLU", minWidth : 100, width : 100},
        {field : "amount",headerName : "Pembayaran",
            filter: 'agNumberColumnFilter',
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
                    <Chip size='small' label={params.value == null || params.value == "" ? "DRAFT" : params.value} color={color} />
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
