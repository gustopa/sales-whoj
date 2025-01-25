import { Button,Modal,Box,Grid2 as Grid, Table, TableHead, TableRow, TableCell, TableBody, Chip } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useSnapshot } from 'valtio';
import state from '../../store/store';
import { formatDate } from '../../helper';
import axios from 'axios';
import DataTable from '../Layouts/components/Datatable'
import '../../../css/datatable.css'
import { useIsMobile } from '../../hooks/IsMobile';
function ModalViewCustomer({params,id_customer}) {
    const [open,setOpen] = useState(false)
    const [costumerSize, setCostumerSize] = useState([])
    const [costumerPayment,setCostumerPayment] = useState([])
    const [costumerOrder,setCostumerOrder] = useState([])
    const [costumerRefund,setCostumerRefund] = useState([])
    const [costumerDocument,setCostumerDocument] = useState([])
    const [costumerVisit,setCostumerVisit] = useState([])
    const [isLoaded,setIsLoaded] = useState(false)
    const [dataCustomer,setDataCustomer] = useState([]);
    const snap = useSnapshot(state)
    const isMobile = useIsMobile()
    const handleModal = () => {
        setOpen(true)
        if(!isLoaded){
            axios.post('/customer/getCustomerById',{row_id : id_customer})
            .then(response => {
                setDataCustomer(response.data)
                Promise.all([
                    getDataSize(),
                    getDataPayment(),
                    getDataOrder(),
                    getDataRefund(),
                    getDataDocument(),
                    getDataVisit(),
                ]).then(() => setIsLoaded(true))
            })
            .catch(err => console.log(err))
        }
        
    }
    
    const getDataSize = async () => {
        return axios.post('/customer/getDataSize',{row_id : id_customer})
        .then(response => {setCostumerSize(response.data); setLoadingSize(false)})
        .catch(err => console.log(err))
    }
    
    const getDataPayment = async () => {
        return axios.post('/customer/getDataPayment',{row_id : id_customer})
        .then(response => {setCostumerPayment(response.data); setLoadingPayment(false)})
        .catch(err => console.log(err))
    }

    const getDataOrder = async () => {
        return axios.post('/customer/getDataOrder',{row_id : id_customer})
        .then(response => {setCostumerOrder(response.data); setLoadingOrder(false)})
        .catch(err => console.log(err))
    }

    const getDataRefund = async () => {
        return axios.post('/customer/getDataRefund',{row_id : id_customer})
        .then(response => {setCostumerRefund(response.data); setLoadingRefund(false)})
        .catch(err => console.log(err))
    }

    const getDataDocument = async () => {
        return axios.post('/customer/getDataDocument',{row_id : id_customer})
        .then(response => {setCostumerDocument(response.data); setLoadingDokumen(false)})
        .catch(err => console.log(err))
    }

    const getDataVisit = async () => {
        return axios.post('/customer/getDataVisit',{row_id : id_customer})
        .then(response => {setCostumerVisit(response.data); setLoadingCustomerVisit(false)})
        .catch(err => console.log(err))
    }
    
    const handleClose = () => {
        setOpen(false)
    }

    // Customer Payment
    const columnDefsPembayaran = [
        {field : "doc_no", headerName : "Invoice No", width : 130, minWidth : 130},
        {field : "created_date", headerName : "Tanggal", cellRenderer : params => formatDate(params.value), width : 130, minWidth : 130},
        {field : "identity_code", headerName : "PLU"},
        {field : "model_id_txt", headerName : "Model"},
        {field : "inventory_id_txt", headerName : "Barang"},
        {field : "inventory_price", headerName : "Harga Jual", cellRenderer : params => "Rp." + Intl.NumberFormat("id-ID").format(params.value)},
        {field : "status", headerName : "Status",width : 130, minWidth : 130, cellRenderer : params => <Chip label={params.value} color="success"/>}
    ]
    const [loadingPayment,setLoadingPayment] = useState(true) 

    // Customer Size
    const columnDefsUkuran = [
        {field : "product", headerName : "Barang",flex : 1},
        {field : "txt", headerName : "Detail", flex : 1}
    ]
    const [loadingSize,setLoadingSize] = useState(true)

    // Customer Order
    const columnDefsPesanan = [
        {field : "doc_no", headerName : "Doc No."},
        {field : "created_date", headerName : "Doc No.", cellRenderer : params => formatDate(params.value)},
        {field : "estimated_date", headerName : "Perkiraan Delivery", cellRenderer : params => params.value == "0000-00-00" ? "-" : formatDate(params.value)},
        {field : "name", headerName : "Nama Item", cellRenderer : params => params.value == "" ? "-" : params.value},
        {field : "estimated_price",headerName : "Harga Perkiraan", cellRenderer : params => Intl.NumberFormat("id-ID").format(params.value)},
        {field : "status", headerName : "Status", cellRenderer : params => <Chip label={params.value == "" ? "DRAFT" : params.value} color={`${params.value == "PAID" ? "success" : "primary"}`} />}
    ]
    const [loadingOrder,setLoadingOrder] = useState(true)

    // Customer Refund
    const columnDefsRefund = [
        {field : "doc_no",headerName : "Refund No"},
        {field : "created_date", headerName : "Tanggal", cellRenderer : params => formatDate(params.value)},
        {field : "txt", headerName : "Alasan", flex : 1, minWidth : 140},
        {field : "payment_id_txt", headerName : "Pembelian",flex : 1, minWidth : 150}
    ]
    const [loadingRefund,setLoadingRefund] = useState(true)

    // Customer Dokumen
    const columnDefsDokumen = [
        {field : "name", headerName : "Dokumen", flex : 1, minWidth : 150},
        {field : "notes", headerName : "Notes", flex : 1, minWidth : 150},
        {field : "status", headerName : "Status", flex : 1, minWidth : 150},
    ]
    const [loadingDokumen, setLoadingDokumen] =  useState(true)

    // Customer Visit
    const columnDefsCustomerVisit = [
        {field : "trans_date", headerName : "Tanggal", cellRenderer: params =>  formatDate(params.value), flex : 1, minWidth : 150 }, 
        {field : "inventory_id_txt", headerName : "PLU", flex : 1, minWidth : 150},
        {field : "item_id_txt", headerName : "ITEM", flex : 1, minWidth : 150},
    ]
    const [loadingCustomerVisit, setLoadingCustomerVisit] = useState(true)
  return (
    <>
        <Button onClick={handleModal} variant="text" style={{color:'#b89474', textDecoration : 'underline',textTransform: "capitalize"}}>
            {params.value}
        </Button>
        <Modal open={open} onClose={handleClose}>
            <div>
                <Button onClick={handleClose} variant="contained" sx={{position:'absolute',right: isMobile ? "8%" : "14%",background:'#b89474',top:'8%',zIndex:'999'}}>
                    <CloseIcon style={{color:'white'}}/>
                </Button>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: isMobile ? "80%" : "70%",
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
                    <Grid container spacing={2}>
                        <Grid size={{md : 4, xs: 6}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>PELANGGAN NO</label><br />
                            <span>{dataCustomer.customer_no}</span>
                        </Grid>
                        <Grid size={{md : 4, xs: 6}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>NAMA</label><br />
                            <span>{dataCustomer.name == "" || dataCustomer.name == null ? "-" : dataCustomer.name}</span>
                        </Grid>
                        <Grid size={{md : 4, xs: 6}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>JENIS KELAMIN</label><br />
                            <span>{dataCustomer.gender == ""|| dataCustomer.gender == null ? "-" : dataCustomer.gender}</span>
                        </Grid>
                        <Grid size={{md : 4, xs: 6}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>AGAMA</label><br />
                            <span>{dataCustomer.religion == "" || dataCustomer.religion == null ? "-" : dataCustomer.religion}</span>
                        </Grid>
                        <Grid size={{md : 4, xs: 6}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>TGL LAHIR</label><br />
                            <span>{dataCustomer.birth_date == "0000-00-00" || dataCustomer.birth_date == null ? "-" : formatDate(dataCustomer.birth_date)}</span>
                        </Grid>
                        <Grid size={{md : 4, xs: 6}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>ALAMAT</label><br />
                            <span>{dataCustomer.address == "" || dataCustomer.address == null ? "-" : dataCustomer.address}</span>
                        </Grid>
                        <Grid size={{md : 4, xs: 6}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>KOTA</label><br />
                            <span>{dataCustomer.city == "" || dataCustomer.city == null ? "-" : dataCustomer.city}</span>
                        </Grid>
                        <Grid size={{md : 4, xs: 6}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>INSTAGRAM</label><br />
                            <span>{dataCustomer.instagram == "" || dataCustomer.instagram == null ? "-" : dataCustomer.instagram}</span>
                        </Grid>
                        <Grid size={{md : 4, xs: 6}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>HP NO</label><br />
                            <span>{dataCustomer.hp_bo == "" || dataCustomer.hp_bo == null ? "-" : dataCustomer.hp_bo}</span>
                        </Grid>
                        <Grid size={{md : 4, xs: 6}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>ID MEMBER PI</label><br />
                            <span>{dataCustomer.pi_no == "" || dataCustomer.pi_no == null ? "-" : dataCustomer.pi_no}</span>
                        </Grid>
                        <Grid size={{md : 4, xs: 6}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>TANGGAL DATANG</label><br />
                            <span>{dataCustomer.visit_date == "0000-00-00" || dataCustomer.visit_date == null ? "-" : formatDate(dataCustomer.visit_date)}</span>
                        </Grid>

                        <Grid size={{md:12,xs:12}}>
                            <h2 className='my-3 ml-2 font-bold dark:text-white text-1xl'>UKURAN</h2>
                            <div style={{width:"100%",overflowX : 'auto'}}>   
                                <DataTable loading={loadingSize} columns={columnDefsUkuran} data={costumerSize}/>
                            </div>
                        </Grid>

                        <Grid size={{md:12,xs:12}}>
                            <h2 className='my-3 ml-2 font-bold dark:text-white text-1xl'>PEMBAYARAN</h2>
                            <div style={{width:"100%",overflowX : 'auto'}}>
                                <DataTable loading={loadingPayment} columns={columnDefsPembayaran} data={costumerPayment} />
                            </div>
                        </Grid>

                        <Grid size={{md:12,xs:12}}>
                            <h2 className='my-3 ml-2 font-bold dark:text-white text-1xl'>PESANAN</h2>
                            <div style={{width:"100%",overflowX : 'auto'}}>
                                <DataTable loading={loadingOrder} columns={columnDefsPesanan} data={costumerOrder}/>
                            </div>
                        </Grid>

                        <Grid size={{md:12,xs:12}}>
                            <h2 className='my-3 ml-2 font-bold dark:text-white text-1xl'>PENGEMBALIAN</h2>
                            <div style={{width:"100%",overflowX : 'auto'}}>
                                <DataTable loading={loadingRefund} columns={columnDefsRefund} data={costumerRefund} />   
                            </div>
                        </Grid>

                        <Grid size={{md:12,xs:12}}>
                            <h2 className='my-3 ml-2 font-bold dark:text-white text-1xl'>DOKUMEN</h2>
                            <div style={{width:"100%",overflowX : 'auto'}}>
                                <DataTable loading={loadingDokumen} columns={columnDefsDokumen} data={costumerDocument}/>
                            </div>
                        </Grid>
                        <Grid size={{md:12,xs:12}}>
                            <h2 className='my-3 ml-2 font-bold dark:text-white text-1xl'>KUNJUNGAN PELANGGAN</h2>
                            <div style={{width:"100%",overflowX : 'auto'}}>
                                <DataTable loading={loadingCustomerVisit} columns={columnDefsCustomerVisit} data={costumerVisit} />
                            </div>
                        </Grid>

                        <Grid size={12}>
                            <h2 className='my-3 ml-2 font-bold dark:text-[#b89474]'>RIWAYAT DATA</h2>
                            <Grid container spacing={2}>
                                <Grid size={{md : 3, xs: 6}}>
                                    <label className='text-[#999]' style={{fontSize:'10px'}}>CREATED DATE</label><br />
                                    <span>{dataCustomer.created_date == "" ? "-" : formatDate(dataCustomer.created_date)}</span>
                                </Grid>
                                <Grid size={{md : 3, xs: 6}}>
                                    <label className='text-[#999]' style={{fontSize:'10px'}}>CREATED BY</label><br />
                                    <span>{dataCustomer.created_by == "" ? "-" : dataCustomer.created_by}</span>
                                </Grid>
                                <Grid size={{md : 3, xs: 6}}>
                                    <label className='text-[#999]' style={{fontSize:'10px'}}>MODIFIED DATE</label><br />
                                    <span>{dataCustomer.modified_date == "" ? "-" : formatDate(dataCustomer.modified_date)}</span>
                                </Grid>
                                <Grid size={{md : 3, xs: 6}}>
                                    <label className='text-[#999]' style={{fontSize:'10px'}}>MODIFIED BY</label><br />
                                    <span>{dataCustomer.modified_by == "" ? "-" : dataCustomer.modified_by}</span>
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

export default ModalViewCustomer
