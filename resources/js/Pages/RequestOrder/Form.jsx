import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import { Box, Button, Card, FormControl, Grid2 as Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Input from '../Layouts/components/Input'
import { MdCheck, MdPayment, MdPrint, MdSave } from 'react-icons/md';
import TableDetail from './Components/TableDetail';
import TablePembayaran from './Components/TablePembayaran';
import { useSnapshot } from 'valtio';
import state from '../../store/store';
import ModalCustomer from '../Components/ModalCustomer';
import { formatNumber, showAlert } from '../../helper';
import Swal from 'sweetalert2';
function Form({data,grouping_order,stores,sales,onlineOffline,items,status,tipeOrder}) {
    const snap = useSnapshot(state)
    const sxInputField = {
        "& .MuiFormLable-root" : {
          color : "#b89474 !important"
        },
        "& .MuiInputLabel-outlined": {
          color: "#b89474",
        },
        '& .MuiInputBase-input': {
          color: '#b89474', 
        },
        '& .MuiOutlinedInput-root': {
          color: "#b89474",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#b89474",
            borderWidth: "1px",
          },
          '& fieldset': {
            borderColor: '#b89474', 
          },
          '&:hover fieldset': {
            borderColor: '#b89474', 
          },
          '&.Mui-focused fieldset': {
            borderColor: '#b89474', 
          },
          '& .MuiInputBase-input': {
            color: snap.theme == "dark" ? "white" : "black", 
          },
          '& .MuiInputBase-input::placeholder': {
            color: '#b89474', 
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#b89474 !important', 
            },
            '&:hover fieldset': {
              borderColor: '#b89474', 
            },
            '&.Mui-focused fieldset': {
              borderColor: '#b89474', 
            },
          },
          
        },
      }
      const [docNo, setDocNo] = useState(data.doc_no || "")
      const [grouping,setGrouping] = useState(data.grouping_order_id || 0)
      const [store,setStore] = useState(data.store_id || "")
      const [idSales,setIdSales] = useState(data.sales_id || "")
      const [customer,setCustomer] = useState(data.customer_id_txt || "")
      const [idCustomer,setIdCustomer] = useState(data.customer_id || "")
      const [transDate,setTransDate] = useState(data.trans_date || "")
      const [onOff,setOnOff] = useState(data.online_offline || "")
      const [dataStatus,setDataStatus] = useState(data.status || "")
      const [estimatedPrice,setEstimatedPrice] = useState(data.estimated_price || "")
      const [displayEstimatedPrice,setDisplayEstimatedPrice] = useState(formatNumber(Number(data.estimated_price)))

      const [estimatedDelivery,setEstimatedDelivery] = useState(data.estimated_date == "0000-00-00" || data.estimated_date == null ? "" : data.estimated_date)
      const [item,setItem] = useState(data.item_id || "")
      const [tipe,setTipe] = useState(data.type_order || "CUSTOM")
      const [origin,setOrigin] = useState(data.outsource_intern || "")
      const [pengiriman,setPengiriman] = useState("0")
      const [size,setSize] = useState(data.size || "")
      const [goldColor,setGoldColor] = useState(data.warna_emas || "")
      const [goldWeight,setGoldWeight] = useState(data.berat_emas || "")
      const [customerMaterial,setCustomerMaterial] = useState(data.customer_material || "")
      const [customBox,setCustomBox] = useState(data.custom_box || "")
      const [deskripsi,setDeskripsi] = useState(data.txt || "")
      const [qty,setQty] = useState(data.qty || "")

      const setDataDiamond = async e => {
        if(grouping == 0){
            return showAlert("warning!","Pilih grouping order terlebih dahulu","warning")
        }
        Swal.fire({
            title: "Apakah anda yakin?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya",
            cancelButtonText: "Batal"
        }).then( async (result) => {
            if (result.isConfirmed) {
                const formData = {
                    order_group_id : grouping,
                    row_id : data.row_id,
                    doc_no : data.doc_no
                }
                try{
                    const response = await axios.post("/request_order/setGroupingOrder",formData)
                    const responseData = await response.data
                    setDocNo(responseData.doc_no)
                    showAlert('Berhasil!', 'Data berhasil diset','success')
                }catch(err){
                    console.log(err);
                    showAlert('Gagal!','Terjadi kesalahan silahkan coba lagi', "error");
                }
            }
        });
      }
      
  return (
    <Layout title="Form Pesanan" page="Form Pesanan">
        <Grid container spacing={2}>

            <Grid size={{xs:12,md:6}}>
                <Card className='p-3 dark:bg-navy-800'>
                    <h2 className='font-bold dark:text-white text-1xl mb-2 text-center'>PESANAN</h2>
                    <Grid container spacing={2}>
                        <Grid size={{xs:12,md : 6}}>
                            <Input value={docNo} fullWidth label="Doc no : "/>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <FormControl fullWidth sx={sxInputField}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    {/* Select Box */}
                                    <FormControl sx={{ flexGrow: 1 }}>
                                    <InputLabel shrink id="grouping_order" style={{ color: "#b89474" }}>
                                        <span>Grouping Order :</span>
                                    </InputLabel>
                                    <Select
                                        displayEmpty
                                        name="grouping_order"
                                        labelId="grouping_order"
                                        id="grouping_order-select"
                                        value={grouping}
                                        label="Grouping Order :"
                                        onChange={e => setGrouping(e.target.value)}
                                    >
                                        <MenuItem key={0} value={0}> </MenuItem>
                                        {grouping_order.map(a => (
                                            <MenuItem key={a.row_id} value={a.row_id}>{a.name}</MenuItem>
                                        ))}
                                    </Select>
                                    </FormControl>

                                    {/* Button di Sebelah Kanan */}
                                    <Button 
                                    variant="contained" 
                                    color="primary" 
                                    size="small" 
                                    className='text-start'
                                    onClick={setDataDiamond}
                                    >
                                    SET <br />DATA
                                    </Button>
                                </Box>
                            </FormControl>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <FormControl fullWidth sx={sxInputField}>
                                <InputLabel shrink id="store" style={{color:"#b89474"}}><span>Store :</span></InputLabel>
                                <Select
                                    displayEmpty
                                    name='store'
                                    labelId="store"
                                    id="store-select"
                                    label="Store :"
                                    value={store}
                                >
                                        <MenuItem key={0} value={0}> </MenuItem>
                                    {stores.map(a => 
                                        <MenuItem key={a.row_id} value={a.row_id}>{a.name}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <FormControl fullWidth sx={sxInputField}>
                                <InputLabel shrink id="sales" style={{color:"#b89474"}}>Sales</InputLabel>
                                <Select
                                    displayEmpty
                                    name='sales'
                                    labelId="sales"
                                    id="sales-select"
                                    value={idSales}
                                    label="Sales"
                                >
                                        <MenuItem key={0} value={0}> </MenuItem>
                                    {sales.map(a => 
                                        <MenuItem key={a.row_id} value={a.row_id}>{a.name}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <TextField variant="outlined" value={customer} sx={sxInputField} label="Pelanggan" fullWidth
                                InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <ModalCustomer setCustomer={setCustomer} setIdCustomer={setIdCustomer} />
                                    </InputAdornment>
                                ),
                                    readOnly : true
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <Input value={transDate} type="date" fullWidth label="Tanggal : "/>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <FormControl fullWidth sx={sxInputField}>
                                <InputLabel shrink id="onof" style={{color:"#b89474"}}>Online/Offline :</InputLabel>
                                <Select
                                    displayEmpty
                                    name='onof'
                                    labelId="onof"
                                    id="onof-select"
                                    value={onOff}
                                    label="Online/Offline"
                                >
                                        <MenuItem value=""> </MenuItem>
                                    {onlineOffline.map(a => 
                                        <MenuItem key={a} value={a}>{a}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <FormControl fullWidth sx={sxInputField}>
                                <InputLabel shrink id="status" style={{color:"#b89474"}}>Status :</InputLabel>
                                <Select
                                    displayEmpty
                                    name='status'
                                    labelId="status"
                                    id="status-select"
                                    value={dataStatus}
                                    label="Status : "
                                >
                                        <MenuItem value=""> </MenuItem>
                                    {status.map(a => 
                                        <MenuItem key={a} value={a}>{a}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <Input value={displayEstimatedPrice} fullWidth label="Estimated Price (IDR) :"/>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <Input type="file" fullWidth label="Foto :"/>
                        </Grid>
                        <Grid size={12}>
                            <Grid container spacing={1}>
                                <Grid size={{xs:6,md:4}}>
                                    <Button fullWidth variant='contained'><MdPrint/> Print Order</Button>
                                </Grid>
                                <Grid size={{xs:6,md:4}}>
                                    <Button fullWidth variant='contained'><MdPrint/> Print DP</Button>
                                </Grid>
                                <Grid size={{xs:6,md:4}}>
                                    <Button fullWidth variant='contained'><MdPayment/> Pelunasan</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>

            <Grid size={{xs:12,md:6}}>
                <Card className='p-3 dark:bg-navy-800'>
                <h2 className='font-bold dark:text-white text-1xl mb-2 text-center'>DI ISI OLEH SALES</h2>
                <Grid container spacing={2}>
                        <Grid size={{xs:12,md : 6}}>
                            <Input value={estimatedDelivery} type="date" fullWidth label="Perkiraan Delivery Time :"/>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <FormControl fullWidth sx={sxInputField}>
                                <InputLabel shrink id="item" style={{color:"#b89474"}}>Tipe Item :</InputLabel>
                                <Select
                                    displayEmpty
                                    name='item'
                                    labelId="item"
                                    id="item-select"
                                    value={item}
                                    label="Tipe Item : "
                                >
                                        <MenuItem value="0"> </MenuItem>
                                    {items.map(a => 
                                        <MenuItem key={a.row_id} value={a.row_id}>{a.name}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <FormControl fullWidth sx={sxInputField}>
                                <InputLabel shrink id="tipe" style={{color:"#b89474"}}>Tipe Order :</InputLabel>
                                <Select
                                    displayEmpty
                                    name='tipe'
                                    labelId="tipe"
                                    id="tipe-select"
                                    value={tipe}
                                    label="Tipe Order : "
                                >
                                    {tipeOrder.map(a => 
                                        <MenuItem key={a} value={a}>{a}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <FormControl fullWidth sx={sxInputField}>
                                <InputLabel shrink id="origin" style={{color:"#b89474"}}>Outsource/Intern :</InputLabel>
                                <Select
                                    displayEmpty
                                    name='origin'
                                    labelId="origin"
                                    id="origin-select"
                                    value={origin}
                                    label="Outsource/Intern : "
                                >
                                    <MenuItem value=""><span className='py-3'></span></MenuItem>
                                    <MenuItem value="MAHAKARYA">MAHAKARYA</MenuItem>
                                    <MenuItem value="OUTSOURCE">OUTSOURCE</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <Input value={qty} fullWidth label="Pengiriman : "/>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <Input value={size} fullWidth label="Ukuran : "/>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <Input value={goldColor} fullWidth label="Warna Emas : "/>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <Input value={goldWeight} fullWidth label="Berat Emas (Gr) : "/>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <Input value={customerMaterial} fullWidth label="Customers Material : "/>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <Input value={customBox} fullWidth label="Custom Box : "/>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <Input value={deskripsi} fullWidth label="Deskripsi Pesanan : "/>
                        </Grid>
                        <Grid size={{xs:12,md:6}}>
                            <Grid container spacing={2}>
                                <Grid size={6}>
                                    <Button fullWidth variant='contained'><MdSave className='mr-1'/> Simpan</Button>
                                </Grid>
                                <Grid size={6}>
                                    <Button fullWidth variant='contained'><MdCheck className='mr-1'/> Submit</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>

            <Grid size={{xs:12,md:6}}>
                <Card className='p-3 dark:bg-navy-800'>
                <h2 className='font-bold dark:text-white text-1xl mb-2 text-center'>DETAIL</h2>
                <Grid container spacing={2}>
                        <Grid size={12}>
                            <TableDetail row_id={data.row_id}/>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>

            <Grid size={{xs:12,md:6}}>
                <Card className='p-3 dark:bg-navy-800'>
                <h2 className='font-bold dark:text-white text-1xl mb-2 text-center'>PEMBAYARAN (DP)</h2>
                <Grid container spacing={2}>
                        <Grid size={12}>
                            <TablePembayaran setDocNo={setDocNo} row_id={data.row_id}/>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>

        </Grid>
        
    </Layout>
  )
}

export default Form
