import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import { formatDate } from '../../helper'
function Movement() {
    const [columnDefs] = useState([
        {field : "inventory_id_txt", headerName : "Barang",width : 140},
        {field : "store_id_txt", headerName : "Store", flex : 1, minWidth : 150},
        {field : "notes", headerName : "Catatan", flex : 1, minWidth : 150},
        {field : "trans_date", headerName : "Tanggal", flex : 1, minWidth : 150, cellRenderer : params => formatDate(params.value)},
    ])
  return (
    <Layout title="Inventory movement" page="Inventory movement">
        <Table columnDefs={columnDefs} endpoint="/inventory_movement/getAll"/>
    </Layout>
  )
}

export default Movement
