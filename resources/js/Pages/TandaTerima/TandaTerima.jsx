import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import { Link } from '@inertiajs/react'
import { Button } from '@mui/material'
import { MdDelete, MdEdit } from 'react-icons/md'
import { FaCirclePlus } from 'react-icons/fa6'
import { formatDate } from '../../helper'
import ModalTandaTerima from './components/ModalTandaTerima'
function TandaTerima() {
    const [columnDef] = useState([
        {field : "row_id", headerName: "",filter : false, resizable : false, width : 100,pinned : "left",
            headerComponent : params => (
                <Link className='flex justify-center' href='/refund/create' method="post" style={{background: "#b89474",padding : "10px",borderRadius : "10px",width : "80%",textAlign : "center"}}>
                    <FaCirclePlus className='text-white'/>
                </Link>
            ),
            cellRenderer : params => 
                (
                    <div key={params.value}>
                        {params.data?.status != "PAID" && 
                            <Link>
                                <Button sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="primary">
                                    <MdEdit/>
                                </Button>
                            </Link>
                        }
                        <Button sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="error">
                            <MdDelete/>
                        </Button>
                    </div>
                ),
        },
        {field : "doc_no", headerName: "Doc No", flex : 1, minWidth : 150,
            cellRenderer : params => <ModalTandaTerima params={params}/>
        },
        {field : "trans_date", headerName: "Tanggal", flex : 1, minWidth : 150, cellRenderer : params => params.value == "0000-00-00" ? "-" : formatDate(params.value)},
        {field : "customer_id_txt", headerName: "Pelanggan", flex : 1, minWidth : 150},
    ])
  return (
    <Layout title="Tanda Terima" page="Tanda Terima">
        <Table columnDefs={columnDef} endpoint="/tanda_terima/getAll"/>
    </Layout>
  )
}

export default TandaTerima
