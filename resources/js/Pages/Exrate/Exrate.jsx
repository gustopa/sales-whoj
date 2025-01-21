import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import { Link } from '@inertiajs/react'
import { Button } from '@mui/material'
import { MdEdit } from 'react-icons/md'
function Exrate() {
    const [columnDefs, setColumnDefs] = useState([
        {field : "row_id",headerName : "", filter : false,resizable : false, width : 60,
            cellRenderer : params => (
                <Link>
                    <Button sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="primary">
                        <MdEdit/>
                    </Button>
                </Link>
            )
        },
        {field : "rate_beli",headerName : "Rate beli (IDR)",flex : 1, minWidth : 180, cellRenderer : params => Intl.NumberFormat("id-ID").format(params.value)},
        {field : "rate_jual",headerName : "Rate jual (IDR)",flex : 1, minWidth : 180, cellRenderer : params => Intl.NumberFormat("id-ID").format(params.value)},
        {field : "profit_margin",headerName : "Profit margin",flex : 1, minWidth : 180},
        {field : "gold_price",headerName : "Harga emas (USD)",flex : 1, minWidth : 180},
    ])
  return (
    <Layout title="Setup Rate" page="Setup Rate">
        <Table columnDefs={columnDefs} endpoint="/exrate/getAll"/>
    </Layout>
  )
}

export default Exrate
