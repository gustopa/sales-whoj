import React, { useEffect, useState } from 'react'
import Table from '../../Components/Table'
import DataTable from '../../Layouts/components/Datatable'
import { encrypt, showAlert } from '../../../helper'
import FormItem from './FormItem'
import { FaCirclePlus } from 'react-icons/fa6'
import { MdDelete, MdEdit } from 'react-icons/md'
import { Button } from '@mui/material'
import Swal from 'sweetalert2'
function TableItem({row_id,customer_id}) {
    const [timestamp,setTimestamp] = useState(0)
    const handleDelete = row_id =>{
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          }).then( async (result) => {
            if (result.isConfirmed) {
              try{
                await axios.delete(`/tanda_terima/deleteItem/${row_id}`)
                showAlert("Berhasil!","Item berhasil dihapus",'success')
                setTimestamp(prev => prev + 1)
              }catch(err){
                showAlert("Error!","Terjadi kesalahan silahkan coba lagi","error")
              }
            }
          });
    }
    const [columnDefs, setColumnDefs] = useState([
        {field : "line_id",headerName : "", flex : false, width : 110, minWidth :110,filter: false,
            headerComponent : params => <FormItem onSuccess={setTimestamp} sxButton={{background : "#2e7d32"}} endpoint="/tanda_terima/tambahItem" data="" row_id={row_id} customer_id={customer_id} title="TAMBAH" iconButton={<FaCirclePlus color='white'/>}/>,
            cellRenderer : params => (
                <div key={params.value}>
                    <FormItem onSuccess={setTimestamp} endpoint={`/tanda_terima/editItem/${params.value}`} data={params.data} row_id={row_id} customer_id={customer_id} sxButton={{minWidth : "30px",background : "#1976d2",padding : 4}} title="EDIT" iconButton={<MdEdit color='white'/>} />
                    <Button onClick={() => handleDelete(params.value)} variant='contained' size='small' color="error" sx={{minWidth :"30px",ml:1}}><MdDelete/></Button>
                </div>
            )
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
    },[row_id,timestamp])
  return (
    <DataTable pagination={false} data={data} columns={columnDefs}/>
  )
}

export default TableItem
