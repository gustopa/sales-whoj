import React, { useEffect, useState } from 'react'
import { Box, Button, Grid2 as Grid } from '@mui/material'
import DataTable from '../Layouts/components/Datatable'

import { FaCirclePlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

import axios from 'axios';
import { useIsMobile } from '../../hooks/IsMobile';
import LayoutModal from '../Layouts/components/LayoutModal';

function FormUkuran({customer}) {
    const isMobile = useIsMobile()
    const [columnDefs, setColumnDefs] = useState([
        {field : "row_id", headerName : "", filter : false,
            headerComponent : params => (
                    <LayoutModal sxButton={{backgroundColor : "#b89474"}} iconButton={<FaCirclePlus style={{color:'white'}}/>}>
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
        {field : "product" , headerName : "Barang"},
        {field : "txt", headerName : "Details", flex : isMobile ? undefined  : 1 }
    ])

    const [rowsData,setRowsData] = useState([])
    const getCustomerSize = async () => {
        const response = await axios.post('/customer/getDataSize',{row_id : customer.row_id})
        const data = await response.data
        setRowsData(data);
        
    }
    useEffect(()=>{
        getCustomerSize()
    },[])
  return (
    <Box className="dark:bg-[#111c44] bg-white p-5 mt-4" style={{borderRadius:"10px"}}>
        <h2 className='font-bold text-[#b89474]'>UKURAN</h2>
        <Grid container spacing={2}>
            <Grid size={12}>
                <DataTable columns={columnDefs} data={rowsData}/>
            </Grid>
        </Grid>
    </Box>
  )
}

export default FormUkuran
