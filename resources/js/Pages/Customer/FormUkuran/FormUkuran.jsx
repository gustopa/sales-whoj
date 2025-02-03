import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Grid2 as Grid } from '@mui/material'
import DataTable from '../../Layouts/components/Datatable'
import { MdDelete } from "react-icons/md";

import axios from 'axios';

import TambahUkuran from './TambahUkuran';
import { useIsMobile } from '../../../hooks/IsMobile';
import Swal from 'sweetalert2';
import EditUkuran from './EditUkuran';

function FormUkuran({customer}) {
    const isMobile = useIsMobile()
    const [update, setUpdate] = useState("")
    const handleDelete = async (id) => {
      Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
      }).then(async result => {
        if(result.isConfirmed){
          try{
            const response = await axios.delete(`/customer/deleteDataSize/${id}`)
            const data = await response.data
            Swal.fire({
                title : "Berhasil",
                icon : "success",
                text : "Size berhasil dihapus"
            })
            setUpdate(`delete${data.data}`)
          }catch(err){

          }
        }
      })
      
      
    }
    const [columnDefs, setColumnDefs] = useState([
        {field : "line_id", headerName : "", filter : false, resizable : false, floatingFilter : false, width : 110, minWidth : 110, pinned : "left",
            headerComponent : params => (
                    <TambahUkuran onSuccess={setUpdate} customerID={customer.row_id} params={params}/>
              ),
            cellRenderer : params => (
                <>
                    <EditUkuran params={params} id={params.value} onSuccess={setUpdate}/>
                    <Button onClick={() => handleDelete(params.value)} style={{marginLeft : "5px"}} variant='contained' color="error">
                      <MdDelete style={{fontSize: "20px",color:"white"}}/>
                    </Button>
                </>
            )
        },
        {field : "product" , headerName : "Barang", filter : false, floatingFilter : false},
        {field : "txt", headerName : "Details", flex : 1, minWidth : 150,filter : false, floatingFilter : false}
    ])

    const [rowsData,setRowsData] = useState([])
    const getCustomerSize = async () => {
        const response = await axios.post('/customer/getDataSize',{row_id : customer.row_id})
        const data = await response.data
        setRowsData(data);
        table.current?.isLoading(false)
    }
    useEffect(()=>{
        getCustomerSize()
    },[update])
    const table = useRef(null)
  return (
    <Box className="dark:bg-[#111c44] bg-white p-5 mt-4" style={{borderRadius:"10px"}}>
        <h2 className='font-bold text-[#b89474]'>UKURAN</h2>
        <Grid container spacing={2}>
            <Grid size={12}>
                <DataTable ref={table} columns={columnDefs} data={rowsData}/>
            </Grid>
        </Grid>
    </Box>
  )
}

export default FormUkuran
