import { Button, Modal,Box,Grid2 as Grid, Table, TableBody, TableCell,TableContainer,TableHead,TableRow } from '@mui/material'
import React, {useEffect, useState} from 'react'

function ModalComponent({params}) {
    const row_id = params.data.row_id;
    const dataOrder = params.data
    
    const [open, setOpen] = useState(false);
    const [data,setData] = useState([])
    const handleModal = ()=>{
        setOpen(true)
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
            console.log(err);   
        }
    }
    console.log(data);
    
    useEffect(()=>{
        getDataDetailRequestOrder()
    },[])
    
  return (
    <div>
      <Button onClick={handleModal}>
        {params.value}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            height : "90%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            overflowY : 'auto',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Grid container spacing={2}>
            <Grid size={{md : 4, xs: 6}}>
                <label className='text-[#999]' style={{fontSize:'10px'}}>DOC NO.</label><br />
                <span>{dataOrder.doc_no}</span>
            </Grid>
            <Grid size={{md : 4, xs: 6}}>
                <label className='text-[#999]' style={{fontSize:'10px'}}>STORE</label><br />
                <span>{dataOrder.store_id_txt}</span>
            </Grid>
            <Grid size={{md : 4, xs: 6}}>
                <label className='text-[#999]' style={{fontSize:'10px'}}>SALES</label><br />
                <span>{dataOrder.sales_id_txt}</span>
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
                <span>{dataOrder.size}</span>
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
                <span>{dataOrder.customer_materil}</span>
            </Grid>
            <Grid size={{md : 4, xs: 6}}>
                <label className='text-[#999]' style={{fontSize:'10px'}}>ESTIMATED PRICE</label><br />
                <span>{dataOrder.estimated_price}</span>
            </Grid>
            <Grid size={{md : 4, xs: 6}}>
                <label className='text-[#999]' style={{fontSize:'10px'}}>UANG MUKA</label><br />
                <span>{dataOrder.down_payment}</span>
            </Grid>
            <Grid size={{md : 4, xs: 6}}>
                <label className='text-[#999]' style={{fontSize:'10px'}}>PELUNASAN</label><br />
                <span>{dataOrder.settlement}</span>
            </Grid>
            <Grid size={{md : 4, xs: 6}}>
                <label className='text-[#999]' style={{fontSize:'10px'}}>CUSTOM BOX</label><br />
                <span>{dataOrder.custom_box}</span>
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
                <span>{dataOrder.photo_file}</span>
            </Grid>

            <Grid size={{md:12,xs:12}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Butir</TableCell>
                            <TableCell>Karat</TableCell>
                            <TableCell>Tipe</TableCell>
                            <TableCell>SERT No</TableCell>
                            <TableCell>Diameter</TableCell>
                            <TableCell>Warna</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item,index) => 
                            <TableRow key={index}>
                                <TableCell>{ item.grain }</TableCell>
                                <TableCell>{ item.grade }</TableCell>
                                <TableCell>{ item.diamond_type }</TableCell>
                                <TableCell>{ item.no_sert }</TableCell>
                                <TableCell>{ item.diameter }</TableCell>
                                <TableCell>{ item.color }</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Grid>
          </Grid>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalComponent
