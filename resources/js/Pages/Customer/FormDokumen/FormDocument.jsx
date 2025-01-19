import { Box, Button, Grid2 as Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import axios from 'axios';
import { useIsMobile } from '../../../hooks/IsMobile';
import LayoutModal from '../../Layouts/components/LayoutModal';
import DataTable from '../../Layouts/components/Datatable'
import TambahDokumen from './TambahDokumen';
import Swal from 'sweetalert2';
import EditDokumen from './EditDokumen';
function FormDocument({customer}) {
    const isMobile = useIsMobile()
    const [update,setUpdate] = useState("")

    const handleDelete = (id) => {
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
            const response = await axios.delete(`/customer/deleteDocument/${id}`)
            const data = await response.data
            Swal.fire({
                title : "Berhasil",
                icon : "success",
                text : "Dokumen berhasil dihapus"
            })
            setUpdate(`delete dokumen ${data.data}`)
          }catch(err){
            Swal.fire({
                title : "Gagal",
                icon : "error",
                text : "Dokumen gagal dihapus"
            })
          }
        }
      })
    }
    const [columnDefs, setColumnDefs] = useState([
        {field : "line_id", headerName : "", filter : false, width : 180,
            headerComponent : params => (
                <TambahDokumen onSuccess={setUpdate} params={params} customerID={customer.row_id} />
            ),
            cellRenderer : params => (
                <>
                    <EditDokumen params={params} customerID={customer.row_id} onSuccess={setUpdate}/>
                    <Button onClick={() => handleDelete(params.value)} style={{marginLeft : "5px"}} variant='contained' color="error">
                      <MdDelete style={{fontSize: "20px",color:"white"}}/>
                    </Button>
                </>
            )
        },
        {field : "name" , headerName : "Dokumens", flex : 1, minWidth : 150},
        {field : "notes" , headerName : "Notes",flex : 1 , minWidth : 150},
        {field : "status", headerName : "Status", flex : 1, minWidth : 150 }
    ])
    const [rowsData,setRowsData] = useState([])
    const getCustomerDocument = async () => {
        const response = await axios.post('/customer/getDataDocument',{row_id : customer.row_id})
        const data = await response.data
        setRowsData(data);
    }
    useEffect(()=>{
        getCustomerDocument()
    },[update])
  return (
    <Box className="dark:bg-[#111c44] bg-white p-5 mt-4" style={{borderRadius:"10px"}}>
        <h2 className='font-bold text-[#b89474]'>DOKUMEN</h2>
        <Grid container spacing={2}>
            <Grid size={12}>
                <DataTable columns={columnDefs} data={rowsData}/>
            </Grid>
        </Grid>
    </Box>
  )
}

export default FormDocument
