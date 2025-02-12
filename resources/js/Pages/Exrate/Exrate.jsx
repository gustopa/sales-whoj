import React, { useRef, useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import { MdEdit } from 'react-icons/md'
import FormExrate from './Components/FormExrate'
function Exrate({access}) {
    const table = useRef(null)
    const [columnDefs, setColumnDefs] = useState([
        {field : "row_id",headerName : "", filter : false,resizable : false, width : 90, minWidth : 90, pinned : "left", hide : access == "Read only" ? true : false,
            cellRenderer : params => (
                params.data && (
                    <FormExrate table={table} title="EDIT" iconButton={<MdEdit color='white'/>} endpoint={`/exrate/edit/${params.value}`} sxButton={{background : "#1976d2", minWidth : "30px"}} data={params.data}/>
                )
            )
        },
        {field : "rate_beli",headerName : "Rate beli (IDR)",flex : 1, minWidth : 180, cellRenderer : params => Intl.NumberFormat("id-ID").format(params.value)},
        {field : "rate_jual",headerName : "Rate jual (IDR)",flex : 1, minWidth : 180, cellRenderer : params => Intl.NumberFormat("id-ID").format(params.value)},
        {field : "profit_margin",headerName : "Profit margin",flex : 1, minWidth : 180},
        {field : "gold_price",headerName : "Harga emas (USD)",flex : 1, minWidth : 180},
    ])
  return (
    <Layout title="Setup Rate" page="Setup Rate">
        <Table ref={table} columnDefs={columnDefs} endpoint="/exrate/getAll"/>
    </Layout>
  )
}

export default Exrate
