import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import { Link } from '@inertiajs/react'
import { FaCirclePlus } from 'react-icons/fa6'
import { Button } from '@mui/material'
import { MdDelete, MdEdit } from 'react-icons/md'
function DailyStock() {
    const [columnDef] = useState([
        {field : 'row_id',headerName : "",filter : false,resizable : false, width : 100,
            headerComponent : params => (
                <Link className='flex justify-center' href='/refund/create' method="post" style={{background: "#b89474",padding : "10px",borderRadius : "10px",width : "80%",textAlign : "center"}}>
                    <FaCirclePlus className='text-white'/>
                </Link>
            ),
            cellRenderer : params => 
                (
                    <div key={params.value}>
                        <Link>
                            <Button sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="primary">
                                <MdEdit/>
                            </Button>
                        </Link>
                    </div>
                ),
        },
        {field : 'trans_date',headerName : "Tanggal", flex : 1, minWidth : 150},
        {field : 'grand_total',headerName : "Total item", flex : 1, minWidth : 150},
        {field : 'txt',headerName : "Notes", flex : 1, minWidth : 150},
    ])
  return (
    <Layout title="Stok harian" page="Stok harian">
        <Table columnDefs={columnDef} endpoint="/daily_stock/getAll"/>
    </Layout>
  )
}

export default DailyStock
