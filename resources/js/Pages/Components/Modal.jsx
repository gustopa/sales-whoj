import { Button, Modal,Box,Grid2 as Grid, Table, TableBody, TableCell,TableHead,TableRow } from '@mui/material'
import React, {useState} from 'react'
import FileOpenIcon from '@mui/icons-material/FileOpen';
import CloseIcon from '@mui/icons-material/Close';
import { useSnapshot } from 'valtio';
import state from '../../store/store';
function ModalComponent({params}) {
    const row_id = params.data.row_id;
    const dataOrder = params.data
    const snap = useSnapshot(state)
    const [open, setOpen] = useState(false);
    const [data,setData] = useState([])
    const [dataDp,setDataDp] = useState([])
    const [isLoaded,setIsLoaded] = useState(false)
    const handleModal = ()=>{
        setOpen(true)
        if(!isLoaded){
            getDataDetailRequestOrder()
            getDataDp()
            setIsLoaded(true)
        }
    }
    const handleClose = () => {
        setOpen(false)
    }

    const getDataDetailRequestOrder = async () =>{
        try{
            const response = await axios.post(`/request_order/view/${row_id}`)
            const dataJson = await response.data;
            setData(dataJson.data)
            
        }catch(err){
            console.log(err)  
        }
    }

    const getDataDp = async () => {
        try {
            const response = await axios.post(`/request_order/getDPList/${row_id}`)
            const dataJson = await response.data;
            setDataDp(dataJson)
            console.log('ok');
            
        }catch(err){
            console.log(err);
        }
    }
    
  return (
    <div className=''>
      <Button onClick={handleModal} style={{color:'#b89474'}}>
        {params.value}
      </Button>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
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
                // border: "2px solid #000",
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
                    <label className='text-[#999]' style={{fontSize:'10px'}}>DOC NO</label><br />
                    <span>{dataOrder.doc_no}</span>
                </Grid>
                <Grid size={{md : 4, xs: 6}}>
                    <label className='text-[#999]' style={{fontSize:'10px'}}>STORE</label><br />
                    <span>{dataOrder.store_id_txt}</span>
                </Grid>
                <Grid size={{md : 4, xs: 6}}>
                    <label className='text-[#999]' style={{fontSize:'10px'}}>SALES</label><br />
                    <span>{dataOrder.sales_id_txt == null ? "-" : dataOrder.sales_id_txt}</span>
                </Grid>
                <Grid size={{md : 4, xs: 6}}>
                    <label className='text-[#999]' style={{fontSize:'10px'}}>PELANGGAN</label><br />
                    <span>{dataOrder.customer_id_txt}</span>
                </Grid>
                <Grid size={{md : 4, xs: 6}}>
                    <label className='text-[#999]' style={{fontSize:'10px'}}>TANGGAL</label><br />
                    <span>{dataOrder.created_date}</span>
                </Grid>
                <Grid size={{md : 4, xs: 6}}>
                    <label className='text-[#999]' style={{fontSize:'10px'}}>TANGGAL</label><br />
                    <span>{dataOrder.estimated_date}</span>
                </Grid>
                <Grid size={{md : 4, xs: 6}}>
                    <label className='text-[#999]' style={{fontSize:'10px'}}>TIPE ITEM</label><br />
                    <span>{dataOrder.item_id_txt}</span>
                </Grid>
                <Grid size={{md : 4, xs: 6}}>
                    <label className='text-[#999]' style={{fontSize:'10px'}}>GROUPING ORDER</label><br />
                    <span>{dataOrder.grouping_order_id_txt == null ? '-' : dataOrder.grouping_order_id_txt}</span>
                </Grid>
                <Grid size={{md : 4, xs: 6}}>
                    <label className='text-[#999]' style={{fontSize:'10px'}}>PLU</label><br />
                    <span>{dataOrder.identify_code == null ? '-' : dataOrder.identify_code}</span>
                </Grid>
                <Grid size={{md : 4, xs: 6}}>
                    <label className='text-[#999]' style={{fontSize:'10px'}}>TIPE ORDER</label><br />
                    <span>{dataOrder.type_order}</span>
                </Grid>
                <Grid size={{md : 4, xs: 6}}>
                    <label className='text-[#999]' style={{fontSize:'10px'}}>OUTSOURCE / INTERN</label><br />
                    <span>{dataOrder.outsource_intern == "" ? '-' : dataOrder.outsource_intern}</span>
                </Grid>
                <Grid size={{md : 4, xs: 6}}>
                    <label className='text-[#999]' style={{fontSize:'10px'}}>PENGIRIMAN</label><br />
                    <span>{dataOrder.qty}</span>
                </Grid>
                <Grid size={{md : 4, xs: 6}}>
                    <label className='text-[#999]' style={{fontSize:'10px'}}>UKURAN</label><br />
                    <span>{dataOrder.size == "" ? "-" : dataOrder.size}</span>
                </Grid>
                <Grid size={{md : 4, xs: 6}}>
                    <label className='text-[#999]' style={{fontSize:'10px'}}>WARNA EMAS</label><br />
                    <span>{dataOrder.warna_emas}</span>
                </Grid>
                <Grid size={{md : 4, xs: 6}}>
                    <label className='text-[#999]' style={{fontSize:'10px'}}>KADAR EMAS</label><br />
                    <span>{dataOrder.kadar_emas}</span>
                </Grid>
                <Grid size={{md : 4, xs: 6}}>
                    <label className='text-[#999]' style={{fontSize:'10px'}}>BERAT EMAS</label><br />
                    <span>{dataOrder.berat_emas}</span>
                </Grid>
                <Grid size={{md : 4, xs: 6}}>
                    <label className='text-[#999]' style={{fontSize:'10px'}}>CUSTOMERS MATERIAL</label><br />
                    <span>{dataOrder.customer_materil == null ? "-" : dataOrder.customer_materil}</span>
                </Grid>
                <Grid size={{md : 4, xs: 6}}>
                    <label className='text-[#999]' style={{fontSize:'10px'}}>ESTIMATED PRICE</label><br />
                    <span>Rp.{new Intl.NumberFormat('id-ID').format(dataOrder.estimated_price)}</span>
                </Grid>
                <Grid size={{md : 4, xs: 6}}>
                    <label className='text-[#999]' style={{fontSize:'10px'}}>UANG MUKA</label><br />
                    <span>Rp.{new Intl.NumberFormat('id-ID').format(dataOrder.down_payment)}</span>
                </Grid>
                <Grid size={{md : 4, xs: 6}}>
                    <label className='text-[#999]' style={{fontSize:'10px'}}>PELUNASAN</label><br />
                    <span>Rp.{new Intl.NumberFormat('id-ID').format(dataOrder.settlement)}</span>
                </Grid>
                <Grid size={{md : 4, xs: 6}}>
                    <label className='text-[#999]' style={{fontSize:'10px'}}>CUSTOM BOX</label><br />
                    <span>{dataOrder.custom_box == "" ? "-" : dataOrder.custom_box}</span>
                </Grid>
                <Grid size={{md : 4, xs: 6}}>
                    <label className='text-[#999]' style={{fontSize:'10px'}}>ONLINE/OFFLINE</label><br />
                    <span>{dataOrder.online_offline == "" ? '-' : dataOrder.online_offline}</span>
                </Grid>
                <Grid size={{md : 4, xs: 6}}>
                    <label className='text-[#999]' style={{fontSize:'10px'}}>STATUS</label><br />
                    <span>{dataOrder.status}</span>
                </Grid>
                <Grid size={{md : 4, xs: 6}}>
                    <label className='text-[#999]' style={{fontSize:'10px'}}>FOTO</label><br />
                    <a target='__blank' style={{textDecoration:'underline'}} href={`https://system-mahakarya.com/assets/uploaded/${dataOrder.photo_file}`}>
                        <FileOpenIcon/> 
                        <span className='ml-1'>
                            View File
                        </span>
                    </a>
                </Grid>

                <Grid size={{md:12,xs:12}}>
                    <hr />
                    <h2 className='my-3 ml-2 font-bold'>DETAIL</h2>
                    <div style={{width:"100%",overflowX : 'auto'}}>
                        <Table>
                            <TableHead>
                                <TableRow style={{background:'#b89474'}}>
                                    <TableCell><b className='text-white'>Butir</b></TableCell>
                                    <TableCell><b className='text-white'>Karat</b></TableCell>
                                    <TableCell><b className='text-white'>Tipe</b></TableCell>
                                    <TableCell><b className='text-white'>SERT No</b></TableCell>
                                    <TableCell><b className='text-white'>Diameter</b></TableCell>
                                    <TableCell><b className='text-white'>Warna</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((item,index) => 
                                    <TableRow key={index} >
                                        <TableCell><span className='dark:text-white'>{ item.grain }</span></TableCell>
                                        <TableCell><span className='dark:text-white'>{ item.grade }</span></TableCell>
                                        <TableCell><span className='dark:text-white'>{ item.diamond_type }</span></TableCell>
                                        <TableCell><span className='dark:text-white'>{ item.no_sert == "" ? "-" : item.no_sert }</span></TableCell>
                                        <TableCell><span className='dark:text-white'>{ item.diameter == "" ? "-" : item.diameter }</span></TableCell>
                                        <TableCell><span className='dark:text-white'>{ item.color == "" ? "-" : item.color }</span></TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </Grid>

                <Grid size={{md:12,xs:12}}>
                    <h2 className='my-3 ml-2 font-bold'>PEMBAYARAN</h2>
                    <div style={{width:"100%",overflowX : 'auto'}}>
                        <Table style={{border:'1px solid #999'}}>
                            <TableHead>
                                <TableRow style={{background:'#b89474'}}>
                                    <TableCell><b className='text-white'>Tanggal</b></TableCell>
                                    <TableCell><b className='text-white'>Uang Muka</b></TableCell>
                                    <TableCell><b className='text-white'>DP Ke</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataDp.data?.map((i,index) => 
                                    <TableRow key={index}>
                                        <TableCell><span className='dark:text-white'>{ i.created_date }</span></TableCell>
                                        <TableCell><span className='dark:text-white'>Rp. { new Intl.NumberFormat('id-ID').format(i.down_payment) }</span></TableCell>
                                        <TableCell><span className='dark:text-white'>{ i.dp_ke }</span></TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </Grid>

                <Grid size={12}>
                    <h2 className='my-3 ml-2 font-bold'>RIWAYAT DATA</h2>
                    <Grid container>
                        <Grid size={{md:3,xs:6}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>CREATED DATE</label><br />
                            <span>{dataOrder.created_date}</span>
                        </Grid>
                        <Grid size={{md:3,xs:6}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>CREATED BY</label><br />
                            <span>{dataOrder.created_by}</span>
                        </Grid>
                        <Grid size={{md:3,xs:6}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>MODIFIED DATE</label><br />
                            <span>{dataOrder.modified_date}</span>
                        </Grid>
                        <Grid size={{md:3,xs:6}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>MODIFIED DATE</label><br />
                            <span>{dataOrder.modified_by}</span>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>

            
            </Box>
        </div>
      </Modal>
    </div>
  )
}

export default ModalComponent
