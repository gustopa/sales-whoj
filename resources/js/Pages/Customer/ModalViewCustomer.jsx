import { Button,Modal,Box,Grid2 as Grid, Table, TableHead, TableRow, TableCell, TableBody, Chip } from '@mui/material'
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useSnapshot } from 'valtio';
import state from '../../store/store';
import { formatDate } from '../../helper';
import axios from 'axios';
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
    const handleModal = () => {
        setOpen(true)
        if(!isLoaded){
            getDataCustomer()
            getDataSize()
            getDataPayment()
            getDataOrder()
            getDataRefund()
            getDataDocument()
            getDataVisit()
            setIsLoaded(true)
        }
    }
    const getDataCustomer = async () => {
        try{
            const response = await axios.post('customer/getCustomerById',{row_id : id_customer})
            const data = await response.data
            setDataCustomer(data)
        }catch{

        }
    }
    const getDataSize = async () => {
        try{
            const response = await axios.post('/customer/getDataSize',{row_id : dataCustomer.row_id})
            const data = await response.data
            setCostumerSize(data)
            console.log(data);
            
        }catch(err){
            console.log(err);
        }
    }
    
    const getDataPayment = async () => {
        try{
            const response = await axios.post('/customer/getDataPayment',{row_id : dataCustomer.row_id})
            const data = await response.data
            setCostumerPayment(data)
            
        }catch(err){
            console.log(err);
            
        }
    }

    const getDataOrder = async () => {
        try{
            const response = await axios.post('/customer/getDataOrder',{row_id : dataCustomer.row_id})
            const data = await response.data
            setCostumerOrder(data)
            
        }catch(err){
            console.log(err);
            
        }
    }

    const getDataRefund = async () => {
        try{
            const response = await axios.post('/customer/getDataRefund',{row_id : dataCustomer.row_id})
            const data = await response.data
            setCostumerRefund(data)
        }catch(err){
            console.log(err);
            
        }
    }

    const getDataDocument = async () => {
        try{
            const response = await axios.post('/customer/getDataDocument',{row_id : dataCustomer.row_id})
            const data = await response.data
            setCostumerDocument(data)
        }catch(err){
            console.log(err);
            
        }
    }

    const getDataVisit = async () => {
        try{
            const response = await axios.post('/customer/getDataVisit',{row_id : dataCustomer.row_id})
            const data = await response.data
            setCostumerVisit(data)
            console.log(data);
            
        }catch(err){
            console.log(err);
        }
    }
    
    const handleClose = () => {
        setOpen(false)
    }
  return (
    <>
        <Button onClick={handleModal} variant="text" style={{color:'#b89474', textDecoration : 'underline',textTransform: "capitalize"}}>
            {params.value}
        </Button>
        <Modal open={open}>
            <div>
                <Button onClick={handleClose} variant="contained" sx={{position:'absolute',right:'3%',background:'#b89474',top:'30px',zIndex:'999'}}>
                    <CloseIcon style={{color:'white'}}/>
                </Button>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "90%",
                        height : "90%",
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
                            <h2 className='my-3 ml-2 font-bold dark:text-[#b89474] text-center'>UKURAN</h2>
                            <div style={{width:"100%",overflowX : 'auto'}}>
                                <Table>
                                    <TableHead>
                                        <TableRow style={{background:'#b89474'}}>
                                            <TableCell><b className='text-white'>Barang</b></TableCell>
                                            <TableCell><b className='text-white'>Details</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {costumerSize.length > 0 ? (
                                            costumerSize.map((item,index) => 
                                                <TableRow key={index} >
                                                    <TableCell><span className='dark:text-white'>{ item.product == null ? "-" : item.product }</span></TableCell>
                                                    <TableCell><span className='dark:text-white'>{ item.txt == null ? "-" : item.txt }</span></TableCell>
                                                </TableRow>
                                            )
                                        ) : (
                                                <TableRow>
                                                    <TableCell colSpan={2} align="center">
                                                        <span className='dark:text-white'>Data tidak tersedia</span>
                                                    </TableCell>
                                                </TableRow>
                                        ) }
                                    </TableBody>
                                </Table>
                            </div>
                        </Grid>

                        <Grid size={{md:12,xs:12}}>
                            <h2 className='my-3 ml-2 font-bold dark:text-[#b89474] text-center'>PEMBAYARAN</h2>
                            <div style={{width:"100%",overflowX : 'auto'}}>
                                <Table>
                                    <TableHead>
                                        <TableRow style={{background:'#b89474'}}>
                                            <TableCell><b className='text-white'>Invoice No</b></TableCell>
                                            <TableCell><b className='text-white'>Tanggal</b></TableCell>
                                            <TableCell><b className='text-white'>PLU</b></TableCell>
                                            <TableCell><b className='text-white'>Model</b></TableCell>
                                            <TableCell><b className='text-white'>Barang</b></TableCell>
                                            <TableCell><b className='text-white'>Harga Jual</b></TableCell>
                                            <TableCell><b className='text-white'>Status</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {costumerPayment.length > 0 ? (
                                            costumerPayment.map((item,index) => 
                                                <TableRow key={index} >
                                                    <TableCell><span className='dark:text-white'>{ item.doc_no }</span></TableCell>
                                                    <TableCell><span className='dark:text-white'>{ formatDate(item.created_date) }</span></TableCell>
                                                    <TableCell><span className='dark:text-white'>{ item.identity_code }</span></TableCell>
                                                    <TableCell><span className='dark:text-white'>{ item.model_id_txt }</span></TableCell>
                                                    <TableCell><span className='dark:text-white'>{ item.inventory_id_txt }</span></TableCell>
                                                    <TableCell><span className='dark:text-white'>Rp.{ Intl.NumberFormat('id-ID').format(item.inventory_price) }</span></TableCell>
                                                    <TableCell><span className='dark:text-white'><Chip label={item.status} color="success" /></span></TableCell>
                                                </TableRow>
                                            )
                                        ) : (
                                                <TableRow>
                                                    <TableCell colSpan={7} align="center">
                                                        <span className='dark:text-white'>Data tidak tersedia</span>
                                                    </TableCell>
                                                </TableRow>
                                        ) }
                                    </TableBody>
                                </Table>
                            </div>
                        </Grid>

                        <Grid size={{md:12,xs:12}}>
                            <h2 className='my-3 ml-2 font-bold dark:text-[#b89474] text-center'>PESANAN</h2>
                            <div style={{width:"100%",overflowX : 'auto'}}>
                                <Table>
                                    <TableHead>
                                        <TableRow style={{background:'#b89474'}}>
                                            <TableCell><b className='text-white'>Doc No.</b></TableCell>
                                            <TableCell><b className='text-white'>Tanggal</b></TableCell>
                                            <TableCell><b className='text-white' style={{whiteSpace: "nowrap"}}>Perkiraan Dlivery</b></TableCell>
                                            <TableCell><b className='text-white'>Nama Item</b></TableCell>
                                            <TableCell><b className='text-white' style={{whiteSpace: "nowrap"}}>Harga Perkiraan</b></TableCell>
                                            <TableCell><b className='text-white'>Status</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {costumerOrder.length > 0 ? (
                                            costumerOrder.map((item,index) => 
                                                <TableRow key={index} >
                                                    <TableCell><span className='dark:text-white' style={{whiteSpace: "nowrap"}}>{ item.doc_no }</span></TableCell>
                                                    <TableCell><span className='dark:text-white' style={{whiteSpace: "nowrap"}}>{ formatDate(item.created_date) }</span></TableCell>
                                                    <TableCell><span className='dark:text-white'>{ item.estimated_date == "0000-00-00" ? "-" : formatDate(item.estimated_date) }</span></TableCell>
                                                    <TableCell><span className='dark:text-white'>{ item.name == "" ? "-" : item.name }</span></TableCell>
                                                    <TableCell><span className='dark:text-white'>Rp.{  Intl.NumberFormat('id-ID').format(item.estimated_price) }</span></TableCell>
                                                    <TableCell><span className='dark:text-white'><Chip label={item.status == "" ? "DRAFT" : item.status} color={`${item.status == "PAID" ? "success" : "primary"}`} /></span></TableCell>
                                                </TableRow>
                                            )
                                        ) : (
                                                <TableRow>
                                                    <TableCell colSpan={7} align="center">
                                                        <span className='dark:text-white'>Data tidak tersedia</span>
                                                    </TableCell>
                                                </TableRow>
                                        ) }
                                    </TableBody>
                                </Table>
                            </div>
                        </Grid>

                        <Grid size={{md:12,xs:12}}>
                            <h2 className='my-3 ml-2 font-bold dark:text-[#b89474] text-center'>PENGEMBALIAN</h2>
                            <div style={{width:"100%",overflowX : 'auto'}}>
                                <Table>
                                    <TableHead>
                                        <TableRow style={{background:'#b89474'}}>
                                            <TableCell><b className='text-white' style={{whiteSpace: "nowrap"}}>Refund No</b></TableCell>
                                            <TableCell><b className='text-white'>Tanggal</b></TableCell>
                                            <TableCell><b className='text-white'>Alasan</b></TableCell>
                                            <TableCell><b className='text-white'>Pembelian</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {costumerRefund.length > 0 ? (
                                            costumerRefund.map((item,index) => 
                                                <TableRow key={index} >
                                                    <TableCell><span className='dark:text-white' style={{whiteSpace: "nowrap"}}>{ item.doc_no }</span></TableCell>
                                                    <TableCell><span className='dark:text-white' style={{whiteSpace: "nowrap"}}>{ formatDate(item.created_date) }</span></TableCell>
                                                    <TableCell><span className='dark:text-white'>{ item.txt }</span></TableCell>
                                                    <TableCell><span className='dark:text-white' style={{whiteSpace: "nowrap"}}>{ item.payment_id_txt }</span></TableCell>
                                                </TableRow>
                                            )
                                        ) : (
                                                <TableRow>
                                                    <TableCell colSpan={7} align="center">
                                                        <span className='dark:text-white'>Data tidak tersedia</span>
                                                    </TableCell>
                                                </TableRow>
                                        ) }
                                    </TableBody>
                                </Table>
                            </div>
                        </Grid>

                        <Grid size={{md:12,xs:12}}>
                            <h2 className='my-3 ml-2 font-bold dark:text-[#b89474] text-center'>DOKUMEN</h2>
                            <div style={{width:"100%",overflowX : 'auto'}}>
                                <Table>
                                    <TableHead>
                                        <TableRow style={{background:'#b89474'}}>
                                            <TableCell><b className='text-white'>Dokumen</b></TableCell>
                                            <TableCell><b className='text-white'>Notes</b></TableCell>
                                            <TableCell><b className='text-white'>Status</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {costumerDocument.length > 0 ? (
                                            costumerDocument.map((item,index) => 
                                                <TableRow key={index} >
                                                    <TableCell><span className='dark:text-white'>{ item.name }</span></TableCell>
                                                    <TableCell><span className='dark:text-white'>{ item.notes }</span></TableCell>
                                                    <TableCell><span className='dark:text-white'>{ item.status }</span></TableCell>
                                                </TableRow>
                                            )
                                        ) : (
                                                <TableRow>
                                                    <TableCell colSpan={7} align="center">
                                                        <span className='dark:text-white'>Data tidak tersedia</span>
                                                    </TableCell>
                                                </TableRow>
                                        ) }
                                    </TableBody>
                                </Table>
                            </div>
                        </Grid>
                        <Grid size={{md:12,xs:12}}>
                            <h2 className='my-3 ml-2 font-bold dark:text-[#b89474] text-center'>KUNJUNGAN PELANGGAN</h2>
                            <div style={{width:"100%",overflowX : 'auto'}}>
                                <Table>
                                    <TableHead>
                                        <TableRow style={{background:'#b89474'}}>
                                            <TableCell><b className='text-white'>Tanggal</b></TableCell>
                                            <TableCell><b className='text-white'>PLU</b></TableCell>
                                            <TableCell><b className='text-white'>Item</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {costumerVisit.length > 0 ? (
                                            costumerVisit.map((item,index) => 
                                                <TableRow key={index} >
                                                    <TableCell><span className='dark:text-white'>{ formatDate(item.trans_date) }</span></TableCell>
                                                    <TableCell><span className='dark:text-white'>{ item.inventory_id_txt }</span></TableCell>
                                                    <TableCell><span className='dark:text-white'>{ item.item_id_txt }</span></TableCell>
                                                </TableRow>
                                            )
                                        ) : (
                                                <TableRow>
                                                    <TableCell colSpan={7} align="center">
                                                        <span className='dark:text-white'>Data tidak tersedia</span>
                                                    </TableCell>
                                                </TableRow>
                                        ) }
                                    </TableBody>
                                </Table>
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
