import React, { useEffect, useRef, useState } from 'react'
import { useIsMobile } from '../../../hooks/IsMobile';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { encrypt, formatDate } from '../../../helper';
import { useSnapshot } from 'valtio';
import state from '../../../store/store';
import { Box, Button, Modal, Grid2 as Grid, Table, TableHead, TableRow, TableCell } from '@mui/material';
import DataTable from '../../Layouts/components/Datatable'
import { IoMdDocument } from "react-icons/io";
function ModalInventory({params}) {
  const item = params.data
  const [diamond,setdiamond] = useState([])
  const [loaded, setLoaded] = useState(false)
  const snap = useSnapshot(state)
  const [open,setOpen] = useState(false)
  const [loading,setLoading] = useState(true)
  const [totalDiamond,setTotalDiamond] = useState(0)
  const tableRef = useRef(null)

  const getItem = async () => {
    const response = await axios.get(`/inventory/getDiamond/${encrypt(params.data?.row_id)}`)
    const data = await response.data
    setdiamond(data)
    setLoaded(true)
    setLoading(false)
  }


  const handleModal = () => {
    if(!loaded){
      getItem()
      calculateTotalDiamond()
    }
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const calculateTotalDiamond = () => {
    if (tableRef.current) {
      const nodes = tableRef.current?.api?.getRenderedNodes();
      console.log(tableRef.current.api);
      
      const sum = nodes?.reduce((acc, node) => acc + (node.data.amount || 0), 0);
      setTotalDiamond(sum);
    //   console.log(sum);
      
    }
  };
  
  const isMobile = useIsMobile()
  const [columnItem] = useState([
    {field : "grain",headerName : "PLU",},
    {field : "grade",headerName : "Invoice",},
    {field : "diamond_type",headerName : "Tipe"},
    {field : "row_id",headerName : "Description", autoHeight : true,
        cellRenderer : params => (
            <>
                <h2><b>Tipe : </b><span> {params.data?.diamond_type}</span></h2>
                <h2><b>SERT no : </b><span> {params.data?.no_sert}</span></h2>
                <h2><b>Diameter : </b><span> {params.data?.diameter}</span></h2>
                <h2><b>Warna : </b><span> {params.data?.color}</span></h2>
            </>
        )
    },
    {field : "row_id",headerName : "Calculation", width : 230,
        cellRenderer : params => (
            <>
                <h2>{params.data?.grade} / {params.data?.grain} = {params.data?.karat_perbutir}</h2>
                <h2>Harga/crt dari {params.data?.karat_perbutir} = {Intl.NumberFormat('id-ID').format(params.data?.harga_perbutir)}</h2>
                <h2>{params.data?.grade} * {params.data?.harga_perbutir} = {Intl.NumberFormat('id-ID').format(params.data?.amount)}</h2>
            </>
        )
    },
    {field : "amount",headerName : "Total",
        cellRenderer : params => {
            return (Intl.NumberFormat('id-ID').format(params.value))
        }
    },
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
                      width: "90%",
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
                    <Grid size={{xs:6,md:3}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>PLU</label><br />
                        <span>{item?.identity_code}</span>
                    </Grid>
                    <Grid size={{xs:6,md:3}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>STORE</label><br />
                        <span>{item?.store_id_txt}</span>
                    </Grid>
                    <Grid size={{xs:6,md:3}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>STORE</label><br />
                        <span>{item?.location_id_txt}</span>
                    </Grid>
                    <Grid size={{xs:6,md:3}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>LETAK BARANG</label><br />
                        <span>{item?.position_id_txt == null ? "-" : item?.position_id_txt}</span>
                    </Grid>
                    <Grid size={{xs:6,md:3}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>NAMA PRODUK</label><br />
                        <span>{item?.product_name_id_txt == null ? "-" : item?.product_name_id_txt}</span>
                    </Grid>
                    <Grid size={{xs:6,md:3}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>TIPE</label><br />
                        <span>{item?.item_type_id_txt}</span>
                    </Grid>
                    <Grid size={{xs:6,md:3}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>ITEM</label><br />
                        <span>{item?.item_id_txt}</span>
                    </Grid>
                    <Grid size={{xs:6,md:3}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>MODEl</label><br />
                        <span>{item?.model_id_txt}</span>
                    </Grid>
                    <Grid size={{xs:6,md:3}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>SOURCE</label><br />
                        <span>{item?.item_source}</span>
                    </Grid>
                    <Grid size={{xs:6,md:3}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>KODE SUPPLIER</label><br />
                        <span>{item?.kode_supplier == "" ? "-" : item?.kode_supplier }</span>
                    </Grid>
                    <Grid size={{xs:6,md:3}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>PRODUCTION COST (USD)</label><br />
                        <span>{Intl.NumberFormat('us-US').format(item?.production_cost)}</span>
                    </Grid>
                    <Grid size={{xs:6,md:3}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>MARKUP</label><br />
                        <span>{item?.markup}</span>
                    </Grid>
                    <Grid size={{xs:6,md:3}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>BERAT EMAS (GR)</label><br />
                        <span>{item?.gold_weight}</span>
                    </Grid>
                    <Grid size={{xs:6,md:3}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>KADAR EMAS</label><br />
                        <span>{item?.gold_grade}</span>
                    </Grid>
                    <Grid size={{xs:6,md:3}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>RATE BELI</label><br />
                        <span>{item?.buy_rate}</span>
                    </Grid>
                    <Grid size={{xs:6,md:3}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>STATUS</label><br />
                        <span>{item?.status}</span>
                    </Grid>
                    <Grid size={{xs:6,md:3}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>FILE CERTIFICATE</label><br />
                        {item?.file_certificate != "" ? (
                            <a target='__blank' href={`https://system-mahakarya.com/assets/uploaded/${item?.file_certificate}`}>
                                <IoMdDocument/>
                                <span>{item?.file_certificate}</span>
                            </a>
                            ) : (
                                <span>-</span>
                            )
                        }
                    </Grid>

                    <Grid size={12}>
                        <h2>BERLIAN</h2>
                        <DataTable refTable={tableRef} columns={columnItem} data={diamond}/>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Total berlian : </b></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </Grid>
                  </Grid>
              </Box>
          </div>
      </Modal>
    </>
  )
}

export default ModalInventory
