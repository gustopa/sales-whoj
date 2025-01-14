import { Box, Grid2 as Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { HiDocumentAdd } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import axios from 'axios';
import { useIsMobile } from '../../hooks/IsMobile';
import LayoutModal from '../Layouts/components/LayoutModal';
import DataTable from '../Layouts/components/Datatable'
function FormDocument({customer}) {
    const isMobile = useIsMobile()
    const [columnDefs, setColumnDefs] = useState([
        {field : "line_id", headerName : "", filter : false,
            headerComponent : params => (
                    <LayoutModal sxButton={{backgroundColor : "#b89474"}} iconButton={<HiDocumentAdd style={{color:'white'}}/>}>
                        <h1>Tambah</h1>
                    </LayoutModal>
              ),
            cellRenderer : params => (
                <>
                    <LayoutModal iconButton={<MdEdit style={{fontSize: "20px"}}/>}>
                        <h1>Edit</h1>
                    </LayoutModal>
                    <LayoutModal iconButton={<MdDelete style={{fontSize: "20px"}}/>}>
                        <h1>Delete</h1>
                    </LayoutModal>
                </>
            )
        },
        {field : "name" , headerName : "Dokumens"},
        {field : "notes" , headerName : "Notes"},
        {field : "status", headerName : "Status", flex : isMobile ? undefined  : 1 }
    ])
    const [rowsData,setRowsData] = useState([])
    const getCustomerDocument = async () => {
        const response = await axios.post('/customer/getDataDocument',{row_id : customer.row_id})
        const data = await response.data
        setRowsData(data);
    }
    useEffect(()=>{
        getCustomerDocument()
    },[])
  return (
    <Box className="dark:bg-[#111c44] bg-white p-5 mt-4" style={{borderRadius:"10px"}}>
        <Grid container spacing={2}>
            <Grid size={12}>
                <DataTable columns={columnDefs} data={rowsData}/>
            </Grid>
        </Grid>
    </Box>
  )
}

export default FormDocument
