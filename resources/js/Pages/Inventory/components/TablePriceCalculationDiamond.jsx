import React, { useEffect, useState } from 'react'
import Table from '../../Components/Table'
import { showAlert } from '../../../helper'
import axios from 'axios'
import DataTable from '../../Layouts/components/Datatable'

function TablePriceCalculationDiamond({row_id}) {
    const [update,setUpdate] = useState(0)
    const [columnDefs] = useState([
        {field : "line_id",headerName : "",
            headerComponent : params => <a/>
        },
        {field : "grain",headerName : "Butir"},
        {field : "grade", headerName : "Karat"},
        {field : "line_id", headerName : "Description"},
        {field : "Calculation", headerName : "Calculation"},
        {field : "amount", headerName : "Total"}
    ])
    const [data,setData] = useState([])
    const getData = async () => {
        try{
            const response = await axios.get(`/inventory_price_calculation/getDiamond/${row_id}`)
            const responseData = await response.data
            setData(responseData)
        }catch(err){
            console.log(err)
            showAlert("Error!","Terjadi kesalahan silahkan coba lagi","error")
        }
    }
    useEffect(()=>{
        getData()
    },[row_id,update])
  return (
    <DataTable pagination={false} columns={columnDefs} data={data}/>
  )
}

export default TablePriceCalculationDiamond
