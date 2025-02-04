import React, { useState } from 'react'
import Table from '../../Components/Table'

function TableDetail({row_id}) {
    const [columnDefs] = useState([
        {field : "grain", headerName : "Butir", minWidth : 70, width : 70, flex : false},
        {field : "grade", headerName : "Karat",minWidth : 90, width : 90, flex : false},
        {field : "diamond_type", headerName : "Tipe",minWidth : 70, width : 70, flex : false},
        {field : "no_sert", headerName : "SERT No"},
        {field : "diameter", headerName : "Diameter"},
        {field : "color", headerName : "Warna"},
    ])
  return (
    <Table kolomFilter={false} minWidth={100} filter={false} floatingFilter={false} pagination={false} columnDefs={columnDefs} endpoint={`/request_order/getDiamondDetail/${row_id}`}/>
  )
}

export default TableDetail
