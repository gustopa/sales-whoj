import React, { useEffect, useState } from 'react'
import Table from '../../Components/Table'
import DataTable from '../../Layouts/components/Datatable'
import { showAlert } from '../../../helper'
function TableDetail({row_id}) {
    const [columnDefs] = useState([
        {field : "grain", headerName : "Butir", minWidth : 70, width : 70, flex : false},
        {field : "grade", headerName : "Karat",minWidth : 90, width : 90, flex : false},
        {field : "diamond_type", headerName : "Tipe",minWidth : 70, width : 70, flex : false},
        {field : "no_sert", headerName : "SERT No",minWidth : 100, width : 100},
        {field : "diameter", headerName : "Diameter",minWidth : 100, width : 100},
        {field : "color", headerName : "Warna"},
    ])
    const [data,setData] = useState([])
    const getData = async () => {
      try{
        const response = await axios.get(`/request_order/getDiamondDetail/${row_id}`)
        const row_data = await response.data
        setData(row_data)
      }catch(err){
        showAlert("Error!", "Terjadi kesalahan silahkan coba lagi","error")
      }
    }
    useEffect(()=>{
      getData()
    },[row_id])
  return (
    <DataTable data={data} columns={columnDefs} pagination={false} filter={false} />
  )
}

export default TableDetail
