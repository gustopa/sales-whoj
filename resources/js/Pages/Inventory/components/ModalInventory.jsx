import React, { useEffect, useRef, useState } from 'react'
import { useIsMobile } from '../../../hooks/IsMobile';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { encrypt, formatDate } from '../../../helper';
import { useSnapshot } from 'valtio';
import state from '../../../store/store';
import { Box, Button, Modal, Grid2 as Grid, Table, TableHead, TableRow, TableCell, Card, CardActionArea, CardContent } from '@mui/material';
import DataTable from '../../Layouts/components/Datatable'
import { IoMdDocument } from "react-icons/io";
function ModalInventory({params}) {
  const item = params.data
  const [diamond,setdiamond] = useState([])
  const [loaded, setLoaded] = useState(false)
  const snap = useSnapshot(state)
  const [open,setOpen] = useState(false)
  const [loading,setLoading] = useState(true)
  const tableRef = useRef(null) 
  const [totalDiamond,setTotalDiamond] = useState(0)
  const getItem = async () => {
    const response = await axios.get(`/inventory/getDiamond/${encrypt(params.data?.row_id)}`)
    const data = await response.data
    setTotalDiamond(data[0].total_diamond);
    setdiamond(data)
    setLoaded(true)
    setLoading(false)
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
    {field : "grain",headerName : "Butir",filter : false,floatingFilter : false, minWidth : 100, width : 100, flex : false},
    {field : "grade",headerName : "Karat",filter : false,floatingFilter : false,},
    {field : "diamond_type",headerName : "Tipe",filter : false,floatingFilter : false,},
    {field : "row_id",headerName : "Description", autoHeight : true, flex : 1,minWidth : 200,
        cellRenderer : params => (
            <>
                <h2><b>Tipe : </b><span> {params.data?.diamond_type}</span></h2>
                <h2><b>SERT no : </b><span> {params.data?.no_sert}</span></h2>
                <h2><b>Diameter : </b><span> {params.data?.diameter}</span></h2>
                <h2><b>Warna : </b><span> {params.data?.color}</span></h2>
            </>
        )
    ,filter : false,floatingFilter : false,},
    {field : "row_id",headerName : "Calculation", width : 230,
        cellRenderer : params => (
            <>
                <h2>{params.data?.grade} / {params.data?.grain} = {params.data?.karat_perbutir}</h2>
                <h2>Harga/crt dari {params.data?.karat_perbutir} = {Intl.NumberFormat('id-ID').format(params.data?.harga_perbutir)}</h2>
                <h2>{params.data?.grade} * {params.data?.harga_perbutir} = {Intl.NumberFormat('id-ID').format(params.data?.amount)}</h2>
            </>
        )
    ,filter : false,floatingFilter : false,},
    {field : "amount",headerName : "Total",
        cellRenderer : params => {
            
            return (Intl.NumberFormat('en-US').format(params.value))
        }
    ,filter : false,floatingFilter : false,},
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
                        <DataTable getRowStyle={() => ({
          borderLeft: "2px solid #ccc",
          borderRight: "2px solid #ccc",
        })} domLayout='normal' height={500} refTable={tableRef} columns={columnItem} pagination={false} data={diamond}/>
                        <Grid container spacing={2} sx={{mt:2}}>

                            <Grid size={{xs:12,md:3}}>
                                <Card className='!bg-whoj'>
                                    <CardActionArea>
                                        <CardContent className='text-center !text-white'>
                                            <h1 className='font-bold text-1xl'>Total Berlian</h1>
                                            <hr className='my-2' />
                                            <span>{Intl.NumberFormat('en-US').format(totalDiamond)}</span>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid size={{xs:12,md:3}}>
                                <Card className='!bg-whoj'>
                                    <CardActionArea>
                                        <CardContent className='text-center text-white'>
                                            <h1 className='font-bold text-1xl'>Biaya Lainnya </h1>
                                            <hr className='my-2' />
                                            <span>{item?.other_expense}</span>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid size={{xs:12,md:3}}>
                                <Card className='!bg-whoj !text-white'>
                                    <CardActionArea>
                                        <CardContent className='text-center text-white'>
                                            <h1 className='font-bold text-1xl'>Harga Emas/gr (USD) </h1>
                                            <hr className='my-2' />
                                            <span>
                                                {item?.gold_weight == null ? 0 : item?.gold_weight} gr * {parseFloat(item?.gold_price).toFixed(2)} = {(parseFloat(item?.gold_weight == null ? 0 : item?.gold_weight) * parseFloat(item?.gold_price).toFixed(2)).toFixed(2)}
                                            </span>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid size={{xs:12,md:3}}>
                                <Card className='!bg-whoj !text-white'>
                                    <CardActionArea>
                                        <CardContent className='text-center text-white'>
                                            <h1 className='font-bold text-1xl'>HPP (USD) </h1>
                                            <hr className='my-2' />
                                            <span>{Intl.NumberFormat('en-US').format(item?.basic_price_usd)}</span>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid size={{xs:12,md:3}}>
                                <Card className='!bg-whoj !text-white'>
                                    <CardActionArea>
                                        <CardContent className='text-center text-white'>
                                            <h1 className='font-bold text-1xl'>HPP (IDR) </h1>
                                            <hr className='my-2' />
                                            <span>
                                            Rate jual (IDR) : {Intl.NumberFormat('id-ID').format(item?.sold_rate)} <br />
                                            HPP : {Intl.NumberFormat('id-ID').format(item?.basic_price_usd * item?.sold_rate)}
                                            </span>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid size={{xs:12,md:3}}>
                                <Card className='!bg-whoj !text-white'>
                                    <CardActionArea>
                                        <CardContent className='text-center text-white'>
                                            <h1 className='font-bold text-1xl'>Margin (IDR) </h1>
                                            <hr className='my-2' />
                                            <span>
                                                Margin (%) : {item?.profit_margin} <br />
                                                Margin : {Intl.NumberFormat('id-ID').format((item?.basic_price_usd * item?.sold_rate) * (item?.profit_margin / 100))}
                                            </span>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid size={{xs:12,md:3}}>
                                <Card className='!bg-whoj !text-white'>
                                    <CardActionArea>
                                        <CardContent className='text-center text-white'>
                                            <h1 className='font-bold text-1xl'>Harga Kalkulasi </h1>
                                            <hr className='my-2' />
                                            <span>{Intl.NumberFormat('id-ID').format(item?.calc_price)}</span>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid size={{xs:12,md:3}}>
                                <Card className='!bg-whoj !text-white'>
                                    <CardActionArea>
                                        <CardContent className='text-center text-white'>
                                            <h1 className='font-bold text-1xl'>Harga Jual </h1>
                                            <hr className='my-2' />
                                            <span>{Intl.NumberFormat('id-ID').format(item?.sell_price)}</span>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>

                        </Grid>
                        {/* <Table className='mt-3' sx={{width:"50%"}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{background : "#b89474",color : "white"}}><b>Total berlian : </b></TableCell>
                                    <TableCell colSpan={2} className='dark:text-white'>{Intl.NumberFormat('en-US').format(totalDiamond)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{background : "#b89474",color : "white"}}><b>Biaya Lainnya : </b></TableCell>
                                    <TableCell colSpan={2} className='dark:text-white'>{item?.other_expense}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{background : "#b89474",color : "white"}}><b>Harga emas/gr (USD) : </b></TableCell>
                                    <TableCell className='dark:text-white'>
                                        {item?.gold_weight == null ? 0 : item?.gold_weight} gr * {parseFloat(item?.gold_price).toFixed(2)} <br /> 
                                        = {(parseFloat(item?.gold_weight == null ? 0 : item?.gold_weight) * parseFloat(item?.gold_price).toFixed(2)).toFixed(2)}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{background : "#b89474",color : "white"}}><b>HPP (USD) : </b></TableCell>
                                    <TableCell className='dark:text-white'>{Intl.NumberFormat('en-US').format(item?.basic_price_usd)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{background : "#b89474",color : "white"}}><b>HPP (IDR) : </b></TableCell>
                                    <TableCell className='dark:text-white'>
                                        Rate jual (IDR) : {Intl.NumberFormat('id-ID').format(item?.sold_rate)} <br />
                                        HPP : {Intl.NumberFormat('id-ID').format(item?.basic_price_usd * item?.sold_rate)}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{background : "#b89474",color : "white"}}><b>Margin (IDR) : </b></TableCell>
                                    <TableCell colSpan={2} className='dark:text-white'>
                                        Margin (%) : {item?.profit_margin} <br />
                                        Margin : {Intl.NumberFormat('id-ID').format((item?.basic_price_usd * item?.sold_rate) * (item?.profit_margin / 100))}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{background : "#b89474",color : "white"}}><b>Harga Kalkulasi : </b></TableCell>
                                    <TableCell colSpan={2} className='dark:text-white'>{Intl.NumberFormat('id-ID').format(item?.calc_price)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{background : "#b89474",color : "white"}}><b>Harga Jual : </b></TableCell>
                                    <TableCell colSpan={2} className='dark:text-white'>{Intl.NumberFormat('id-ID').format(item?.sell_price)}</TableCell>
                                </TableRow>
                            </TableHead>
                        </Table> */}
                    </Grid>

                    <Grid size={12}>
                        <h2 className='my-3 font-bold dark:text-[#b89474]'>RIWAYAT DATA</h2>
                        <Grid container spacing={2}>
                            <Grid size={{md : 3, xs: 6}}>
                                <label className='text-[#999]' style={{fontSize:'10px'}}>CREATED DATE</label><br />
                                <span>{item?.created_date == "" ? "-" : formatDate(item?.created_date)}</span>
                            </Grid>
                            <Grid size={{md : 3, xs: 6}}>
                                <label className='text-[#999]' style={{fontSize:'10px'}}>CREATED BY</label><br />
                                <span>{item?.created_by == "" ? "-" : item?.created_by}</span>
                            </Grid>
                            <Grid size={{md : 3, xs: 6}}>
                                <label className='text-[#999]' style={{fontSize:'10px'}}>MODIFIED DATE</label><br />
                                <span>{item?.modified_date == "" ? "-" : formatDate(item?.modified_date)}</span>
                            </Grid>
                            <Grid size={{md : 3, xs: 6}}>
                                <label className='text-[#999]' style={{fontSize:'10px'}}>MODIFIED BY</label><br />
                                <span>{item?.modified_by == "" ? "-" : item?.modified_by}</span>
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

export default ModalInventory
