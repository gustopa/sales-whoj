import React, { useState } from 'react'
import { Box, Button, Grid2 as Grid, Modal } from '@mui/material'
import { useIsMobile } from '../../../hooks/IsMobile'
import { encrypt, formatDate } from '../../../helper'
import { useSnapshot } from 'valtio'
import state from '../../../store/store'
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'
import DataTable from '../../Layouts/components/Datatable'

function ModalInventoryOut({params}) {
    const snap = useSnapshot(state)
    const isMobile = useIsMobile()
    const [loaded,setLoaded] = useState(false)
    const [open,setOpen] = useState(false)
    const [detail,setDetail] = useState([])
    const handleModal = () => {
        if(!loaded){
            getDetail()
        }
        setOpen(true)
      }
      const handleClose = () => {
        setOpen(false)
      }
      const getDetail = async () => {
        try{
            const response = await axios.get(`inventory_out/getDetail/${encrypt(params.data?.row_id)}`)
            const data = await response.data
            console.log(data);
            setDetail(data.rows)
            setLoaded(true)
        }catch(err){
            console.log(err);
        }
      }

      const [columnDetail] = useState([
        {field : "inventory_id_txt",headerName : "PLU", width : 100},
        {field : "item_id_txt",headerName : "Item", width : 150},
        {field : "received_date",headerName : "Diterima", width : 150},
        {field : "request_order_id_txt",headerName : "Reparasi Pelanggan", width : 150},
        {field : "notes",headerName : "Catatan"},
        {field : "status",headerName : "Status", width : 100},
      ])
  return (
    <>
        <Button sx={{color : "#b89474",textDecoration : "underline"}} onClick={handleModal}>{params.value}</Button>
        <Modal open={open}>
            <Box
                  className='transition-all duration-300 ease-in-out'
                  sx={{
                      position: "absolute",
                      overflowX : 'hidden',
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: isMobile ? "80%" : "60%",
                      height : "80%",
                      bgcolor: "background.paper",
                      overflowY : 'auto',
                      boxShadow: 24,
                      p: 4,
                      zIndex:9,
                      background : snap.theme == 'dark' ? '#111c44' : '',
                      color : snap.theme == 'dark' ? 'white' : ''
                  }}
              >
                    <Button onClick={handleClose} variant="contained" sx={{position:'absolute',right:'-1%',background:'#b89474',top:'-1%',zIndex:'999'}}>
                        <CloseIcon style={{color:'white'}}/>
                    </Button>
                    <Grid container spacing={2}>
                        <Grid size={{xs:6,md:4}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>DOC NO</label><br />
                            <span>{params.data?.doc_no}</span>
                        </Grid>
                        <Grid size={{xs:6,md:4}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>TANGGAL</label><br />
                            <span>{formatDate(params.data?.trans_date)}</span>
                        </Grid>
                        <Grid size={{xs : 0, md:4}}></Grid>
                        <Grid size={{xs:6,md:4}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>DARI</label><br />
                            <span>{params.data?.out_from_txt}</span>
                        </Grid>
                        <Grid size={{xs:6,md:4}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>KE</label><br />
                            <span>{params.data?.in_to_txt}</span>
                        </Grid>
                        <Grid size={{xs:6,md:4}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>CATATAN</label><br />
                            <span>{params.data?.notes}</span>
                        </Grid>
                        <Grid size={12}>
                            <h2>DETAIL</h2>
                            <DataTable columns={columnDetail} data={detail} pagination={false}/>
                        </Grid>
                        <Grid size={12}>
                            <h2 className='my-3 font-bold dark:text-[#b89474]'>RIWAYAT DATA</h2>
                            <Grid container spacing={2}>
                                <Grid size={{md : 3, xs: 6}}>
                                    <label className='text-[#999]' style={{fontSize:'10px'}}>CREATED DATE</label><br />
                                    <span>{params.data?.created_date == "" ? "-" : formatDate(params.data?.created_date)}</span>
                                </Grid>
                                <Grid size={{md : 3, xs: 6}}>
                                    <label className='text-[#999]' style={{fontSize:'10px'}}>CREATED BY</label><br />
                                    <span>{params.data?.created_by == "" ? "-" : params.data?.created_by}</span>
                                </Grid>
                                <Grid size={{md : 3, xs: 6}}>
                                    <label className='text-[#999]' style={{fontSize:'10px'}}>MODIFIED DATE</label><br />
                                    <span>{params.data?.modified_date == "" ? "-" : formatDate(params.data?.modified_date)}</span>
                                </Grid>
                                <Grid size={{md : 3, xs: 6}}>
                                    <label className='text-[#999]' style={{fontSize:'10px'}}>MODIFIED BY</label><br />
                                    <span>{params.data?.modified_by == "" ? "-" : params.data?.modified_by}</span>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
            </Box>
        </Modal>
    </>
  )
}

export default ModalInventoryOut
