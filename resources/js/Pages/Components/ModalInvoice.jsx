import { Box, Button, Modal, Grid2 as Grid, Chip, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useSnapshot } from 'valtio'
import state from '../../store/store'
import CloseIcon from '@mui/icons-material/Close';
import { formatDate } from '../../helper'
function ModalInvoice({row_id,params}) {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const snap = useSnapshot(state)
    const getDataInvoice = async () => {
        try{
            const response = await axios.get(`invoice/getById/${row_id}`)
            const data_response = await response.data
            setData(data_response.data)
            console.log(data_response);
        }catch(err){
            console.log(err);
        }
    }
    const handleOpen = () => {
        setOpen(true)
        if(!loaded){
            getDataInvoice()
            setLoaded(true)
        }
    }
    const handleClose = () => {
        setOpen(false)
    }

    let color = ""
    switch(data.status){
        case "PAID" : 
            color = "success"
            break
        case "CANCELLED" : 
            color = "error"
            break
        case "EXCHANGE" : 
            color = "warning"
            break
        case "BUYBACK" : 
            color = "info"
            break
        default : 
            color = "secondary"
    }
  return (
    <>
        <Button onClick={handleOpen}>
            <span style={{color:"#b89474",textDecoration : "underline"}}>{params.value}</span>
        </Button>
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
                    <Grid container spacing={2}>
                        <Grid size={{md : 4, xs: 6}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>INVOICE NO</label><br />
                            <span>{data.doc_no}</span>
                        </Grid>
                        <Grid size={{md : 4, xs: 6}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>SALES</label><br />
                            <span>{data.sales_id_txt == "" || data.sales_id_txt == null ? "-" : data.sales_id_txt}</span>
                        </Grid>
                        <Grid size={{md : 4, xs: 6}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>STORE</label><br />
                            <span>{data.store_id_txt == "" || data.store_id_txt == null ? "-" : data.store_id_txt}</span>
                        </Grid>
                        <Grid size={{md : 4, xs: 6}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>PELANGGAN</label><br />
                            <span>{data.customer_id_txt == "" || data.customer_id_txt == null ? "-" : data.customer_id_txt}</span>
                        </Grid>
                        <Grid size={{md : 4, xs: 6}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>TANGGAL</label><br />
                            <span>{formatDate(data.trans_date)}</span>
                        </Grid>
                        <Grid size={{md : 4, xs: 6}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>CATATAN</label><br />
                            <span>{data.notes == "" || data.notes == null ? "-" : data.notes}</span>
                        </Grid>
                        <Grid size={{md : 4, xs: 6}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>STATUS</label><br />
                            <Chip label={data.status == null || data.status == "" ? "DRAFT" : data.status} color={color}/>
                        </Grid>
                        <Grid size={12}>
                            <h2 className='font-bold mb-2'>UKURAN</h2>
                            <Table>
                                <TableHead>
                                    <TableRow style={{background:'#b89474'}}>
                                        <TableCell><b className='text-white'>PLU</b></TableCell>
                                        <TableCell><b className='text-white'>Item</b></TableCell>
                                        <TableCell><b className='text-white'>Harga Barang</b></TableCell>
                                        <TableCell><b className='text-white'>Disc (%)</b></TableCell>
                                        <TableCell><b className='text-white'>Selisih (%)</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell><span className='dark:text-white'>{data.identity_code}</span></TableCell>
                                        <TableCell><span className='dark:text-white'>{data.inventory_id_txt}</span></TableCell>
                                        <TableCell><span className='dark:text-white'>{data.inventory_price}</span></TableCell>
                                        <TableCell><span className='dark:text-white'>{data.percent_disc}</span></TableCell>
                                        <TableCell><span className='dark:text-white'>{data.diff_percent == null ? "0.00" : data.diff_percent}</span></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{background:'#b89474'}} colSpan={1}><b className='text-white'>Harga Jual</b></TableCell>
                                        <TableCell colSpan={4}><span className='dark:text-white'>: Rp.{Intl.NumberFormat("id-ID").format(data.selling_price)}</span></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{background:'#b89474'}} colSpan={1}><b className='text-white'>Pesanan (DP)</b></TableCell>
                                        <TableCell colSpan={4}><span className='dark:text-white'>: Rp.{Intl.NumberFormat("id-ID").format(data.down_payment == null ? 0 : data.down_payment)}</span></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{background:'#b89474'}} colSpan={1}><b className='text-white'>Pembayaran</b></TableCell>
                                        <TableCell colSpan={4}><span className='dark:text-white'>: Rp.{Intl.NumberFormat("id-ID").format(data.amount)}</span></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>

                        <Grid size={4}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>TIPE PEMBAYARAN</label><br />
                            <span className='dark:text-white'>{data.payment_type_id_txt == "" || data.payment_type_id_txt == null ? "-" : data.payment_type_id_txt}</span>
                        </Grid>
                        <Grid size={4}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>EDC</label><br />
                            <span className='dark:text-white'>{data.edc_id_txt == "" || data.edc_id_txt == null ? "-" : data.edc_id_txt}</span>
                        </Grid>
                    </Grid>
                    <hr className='mt-[20px]' />
                    <Grid container spacing={1} style={{marginTop : "20px"}}>
                        <Grid size={12}>
                            <h2 className='font-bold'>RIWAYAT DATA</h2>
                        </Grid>
                        <Grid size={{xs:6,md:3}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>CREATED DATE</label><br />
                            <span className='dark:text-white'>{data.created_date}</span>
                        </Grid>
                        <Grid size={{xs:6,md:3}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>CREATED BY</label><br />
                            <span className='dark:text-white'>{data.created_by}</span>
                        </Grid>
                        <Grid size={{xs:6,md:3}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>MODIFIED DATE</label><br />
                            <span className='dark:text-white'>{data.modified_date}</span>
                        </Grid>
                        <Grid size={{xs:6,md:3}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>MODIFIED BY</label><br />
                            <span className='dark:text-white'>{data.modified_by}</span>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </Modal>
    </>
  )
}

export default ModalInvoice
