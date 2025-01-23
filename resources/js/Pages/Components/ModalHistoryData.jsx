import { Box, Button, Modal, Grid2 as Grid, Chip, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useSnapshot } from 'valtio'
import state from '../../store/store'
import CloseIcon from '@mui/icons-material/Close';
import { formatDate } from '../../helper'
function ModalHistoryData({
    params,
    children,
    makeRequest=false,
    endpoint="",
    setData,
    height=undefined
}) {
    const [open, setOpen] = useState(false)
    const data = params.data
    const snap = useSnapshot(state)
    const [loaded,setLoaded] = useState(false)
    const handleOpen = () => {
        if(makeRequest){
            if(!loaded){
                getdata()
                setLoaded(true)
            }
        }
        setOpen(true)
    }

    const getdata = async () => {
        try{
            const response = await axios.get(endpoint)
            const data = await response.data
            setData(data.rows)
        }catch(err){
            console.log(err);
        }
    }
    const handleClose = () => {
        setOpen(false)
    }
  return (
    <>
        <Button onClick={handleOpen}>
            <span style={{color:"#b89474",textDecoration : "underline"}}>{params.value}</span>
        </Button>
        <Modal open={open}>
            <div>
                
                <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "70%",
                    bgcolor: "background.paper",
                    overflowY : 'auto',
                    height : height,
                    boxShadow: 24,
                    p: 4,
                    zIndex:9,
                    background : snap.theme == 'dark' ? '#111c44' : '',
                    color : snap.theme == 'dark' ? 'white' : '',
                    overflowX : 'hidden',
                }}
                >
                    <Button onClick={handleClose} variant="contained" sx={{position:'absolute',right:'-1%',background:'#b89474',top:'-1%',zIndex:'999'}}>
                        <CloseIcon style={{color:'white'}}/>
                    </Button>
                    <Grid container spacing={2}>
                        {children}
                    </Grid>
                    <hr className='mt-[20px]' />
                    <Grid container spacing={1} style={{marginTop : "20px"}}>
                        <Grid size={12}>
                            <h2 className='font-bold'>RIWAYAT DATA</h2>
                        </Grid>
                        <Grid size={{xs:6,md:3}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>CREATED DATE</label><br />
                            <span className='dark:text-white'>{data?.created_date == null ? "-" : params.data?.created_date}</span>
                        </Grid>
                        <Grid size={{xs:6,md:3}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>CREATED BY</label><br />
                            <span className='dark:text-white'>{data?.created_by == null ? "-" : params.data?.created_by}</span>
                        </Grid>
                        <Grid size={{xs:6,md:3}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>MODIFIED DATE</label><br />
                            <span className='dark:text-white'>{data?.modified_date == null ? "-" : params.data?.modified_date}</span>
                        </Grid>
                        <Grid size={{xs:6,md:3}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>MODIFIED BY</label><br />
                            <span className='dark:text-white'>{data?.modified_by == null ? "-" : params.data?.modified_by}</span>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </Modal>
    </>
  )
}

export default ModalHistoryData
