import React, { useEffect, useState } from 'react'
import Table from '../../Components/Table'
import DataTable from '../../Layouts/components/Datatable'
import { encrypt, showAlert } from '../../../helper'
import FormItem from './FormItem'

function TableItem({row_id}) {
    const [columnDefs, setColumnDefs] = useState([
        {field : "row_id",headerName : "", flex : false, width : 110, minWidth :110,filter: false,
            headerComponent : params => <FormItem/>,
            cellRenderer : params => console.log(params.value)
        },
        {field : "inventory_id_txt",headerName : "PLU",flex : false, width : 110, minWidth :110},
        {field : "payment_id_txt",headerName : "Invoice",flex : false, width : 130, minWidth :130},
        {field : "sertificate_1",headerName : "Sertificate 1"},
        {field : "sertificate_2",headerName : "Sertificate 2"},
        {field : "photo",headerName : "Foto"},
    ])
    const [data,setData] = useState([])
    const getData = async () => {
        try{
            const response = await axios.get(`/tanda_terima/getItem/${encrypt(row_id)}`)
            const responseData = await response.data
            setData(responseData.data)
        }catch(err){
            console.log(err);
            showAlert("Error!","Terjadi kesalahan silahkan coba lagi","error")
        }
    }
    useEffect(()=>{
        getData()
    },[row_id])
  return (
    <DataTable pagination={false} data={data} columns={columnDefs}/>
  )
}

export default TableItem
