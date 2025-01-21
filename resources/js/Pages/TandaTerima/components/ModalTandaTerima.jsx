import React, { useEffect, useState } from 'react'
import { useIsMobile } from '../../../hooks/IsMobile';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { encrypt, formatDate } from '../../../helper';
import { useSnapshot } from 'valtio';
import state from '../../../store/store';
import { Box, Button, Modal, Grid2 as Grid } from '@mui/material';
import DataTable from '../../Layouts/components/Datatable'
function ModalTandaTerima({params}) {
  const tandaTerimaData = params.data
  const [item,setitem] = useState([])
  const [loaded, setLoaded] = useState(false)
  const snap = useSnapshot(state)
  const [open,setOpen] = useState(false)
  const [loading,setLoading] = useState(true)
  const getItem = async () => {
    const response = await axios.get(`/tanda_terima/getItem/${encrypt(params.data?.row_id)}`)
    const data = await response.data
    console.log(data.data);
    setLoaded(true)
    setLoading(false)
    setitem(data.data)
  }
  const handleModal = () => {
    if(!loaded){
      getItem()
    }
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const isMobile = useIsMobile()
  const [columnItem] = useState([
    {field : "inventory_id_txt",headerName : "PLU",flex : 1, minWidth : 150},
    {field : "payment_id_txt",headerName : "Invoice",flex : 1, minWidth : 150},
    {field : "sertificate_1",headerName : "Sertificate 1",flex : 1, minWidth : 250},
    {field : "sertificate_2",headerName : "Sertificate 2",flex : 1, minWidth : 250},
  ])
  return (
    <>
      <Button onClick={handleModal} sx={{textDecoration : 'underline',color : "#b89474"}} variant="text" type="button" aria-label="search">
          {params.value}
      </Button>
      <Modal open={open}>
          <div>
              
              <Box
                  className='transition-all duration-300 ease-in-out'
                  sx={{
                      position: "absolute",
                      overflowX : 'hidden',
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: isMobile ? "80%" : "60%",
                      height : isMobile ? "80%" : "65%",
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
                        <span>{tandaTerimaData?.doc_no}</span>
                    </Grid>
                    <Grid size={{xs:6,md:4}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>TANGGAL</label><br />
                        <span>{tandaTerimaData?.trans_date == "0000-00-00" ? "-" : formatDate(tandaTerimaData?.trans_date)}</span>
                    </Grid>
                    <Grid size={{xs:6,md:4}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>PELANGGAN</label><br />
                        <span>{tandaTerimaData?.customer_id_txt == null ? "-" : tandaTerimaData?.customer_id_txt}</span>
                    </Grid>
                    <Grid size={12}>
                      <DataTable data={item} columns={columnItem} loading={loading}/>
                    </Grid>
                    <Grid size={12}>
                        <h2 className='my-3 font-bold dark:text-[#b89474]'>RIWAYAT DATA</h2>
                        <Grid container spacing={2}>
                            <Grid size={{md : 3, xs: 6}}>
                                <label className='text-[#999]' style={{fontSize:'10px'}}>CREATED DATE</label><br />
                                <span>{tandaTerimaData?.created_date == "" ? "-" : formatDate(tandaTerimaData?.created_date)}</span>
                            </Grid>
                            <Grid size={{md : 3, xs: 6}}>
                                <label className='text-[#999]' style={{fontSize:'10px'}}>CREATED BY</label><br />
                                <span>{tandaTerimaData?.created_by == "" ? "-" : tandaTerimaData?.created_by}</span>
                            </Grid>
                            <Grid size={{md : 3, xs: 6}}>
                                <label className='text-[#999]' style={{fontSize:'10px'}}>MODIFIED DATE</label><br />
                                <span>{tandaTerimaData?.modified_date == "" ? "-" : formatDate(tandaTerimaData?.modified_date)}</span>
                            </Grid>
                            <Grid size={{md : 3, xs: 6}}>
                                <label className='text-[#999]' style={{fontSize:'10px'}}>MODIFIED BY</label><br />
                                <span>{tandaTerimaData?.modified_by == "" ? "-" : tandaTerimaData?.modified_by}</span>
                            </Grid>
                        </Grid>
                    </Grid>
                  </Grid>
              </Box>
          </div>
      </Modal>
    </>
  )
}

export default ModalTandaTerima
