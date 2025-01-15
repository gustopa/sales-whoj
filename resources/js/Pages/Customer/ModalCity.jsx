import React, { useState } from 'react'
import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, Modal } from '@mui/material'
import { useSnapshot } from 'valtio';
import state from '../../store/store';
import { AgGridReact } from 'ag-grid-react';
import DataTable from '../Layouts/components/Datatable';
import { useIsMobile } from '../../hooks/IsMobile';
function ModalCity({city,setCity,setData}) {
    const snap = useSnapshot(state)
    const [open,setOpen] = useState(false)
    const isMobile = useIsMobile()
    const handleModal = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleSelect = (data) => {
        setCity(data.city_name)
        setData(prev => ({
            ...prev,
            city_id : data.row_id,
        }))
        setOpen(false)
    } 
    const [columnDefs, setColumnDefs] = useState([
        {field : "row_id", headerName : "", filter : false, maxWidth : 130,
            cellRenderer : params => (
                <Button onClick={() => handleSelect(params.data)} variant='text' >Select</Button>
            )
        },
        {field : "province_name" , headerName : "Province", maxWidth : 300},
        {field : "city_name", headerName : "City", flex : isMobile ? undefined  : 1}
    ])
  return (
    <>
        <IconButton onClick={handleModal} type="button" sx={{ border : "1px solid #b89474",borderRadius : "0 5px 5px 0px",padding : "16px 12px", }} aria-label="search">
            <SearchIcon style={{color : "#b89474"}} />
        </IconButton>
        <Modal open={open}>
            <div>
                <Button onClick={handleClose} variant="contained" sx={{position:'absolute',right:'12%',background:'#b89474',top:'13%',zIndex:'999'}}>
                    <CloseIcon style={{color:'white'}}/>
                </Button>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "70%",
                        height : "70%",
                        bgcolor: "background.paper",
                        overflowY : 'auto',
                        boxShadow: 24,
                        p: 4,
                        zIndex:9,
                        background : snap.theme == 'dark' ? '#111c44' : '',
                        color : snap.theme == 'dark' ? 'white' : ''
                    }}
                >
                    <DataTable data={city} columns={columnDefs}/>
                </Box>
            </div>
        </Modal>
    </>
  )
}

export default ModalCity
