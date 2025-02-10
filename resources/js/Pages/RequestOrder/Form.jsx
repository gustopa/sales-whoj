import React, { useRef, useState } from 'react'
import Layout from '../Layouts/Layout'
import { Box, Button, Card, FormControl, Grid2 as Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Input from '../Layouts/components/Input'
import { MdCheck, MdPayment, MdPrint, MdSave } from 'react-icons/md';
import TableDetail from './Components/TableDetail';
import TablePembayaran from './Components/TablePembayaran';
import { useSnapshot } from 'valtio';
import state from '../../store/store';
import ModalCustomer from '../Components/ModalCustomer';
import { encrypt, formatNumber, sanitizedNumber, showAlert, unformatNumber } from '../../helper';
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';
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
      const [onOff,setOnOff] = useState(data.online_offline || "OFFLINE")
      const [dataStatus,setDataStatus] = useState(data.status || "")
      const [estimatedPrice,setEstimatedPrice] = useState(data.estimated_price || "")
      const [displayEstimatedPrice,setDisplayEstimatedPrice] = useState(formatNumber(Number(data.estimated_price)))
      const [photo,setPhoto] = useState(data.photo_file)
      const [preview,setPreview] = useState(data.photo_file != null ? `${snap.base_url}/storage/uploaded/${data.photo_file}` : null)

      const [estimatedDelivery,setEstimatedDelivery] = useState(data.estimated_date == "0000-00-00" || data.estimated_date == null ? "" : data.estimated_date)
      const [item,setItem] = useState(data.item_id || 0)
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
      const [timestamp,setTimestamp] = useState(0)
      const tableDp = useRef(null)

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
                    setGoldWeight(responseData.gold_weight)
                    setGrouping(responseData.grouping)
                    setItem(responseData.item_id)
                    setTimestamp(responseData.timestamp)
                    showAlert('Berhasil!', 'Data berhasil diset','success')
                }catch(err){
                    console.log(err);
                    showAlert('Gagal!','Terjadi kesalahan silahkan coba lagi', "error");
                }
            }
        });
      }

    const handleFileChange = e => {
        const file = e.target.files[0]
        if (file) {
            setPhoto(file);
            setPreview(URL.createObjectURL(file));
        }
    }
      
      const printDp = () => {
        if(tableDp.current?.total_dp == 0){
            return showAlert('Warning!','Belum ada data DP yang diinput','warning');
        }
        window.open(`/request_order/print_dp/${encrypt(data.row_id)}`,'__blank')
      }

      const handleSend = async mode => {
        console.log(origin);
        
        if(store == 0){
            return showAlert('Warning!',"Store tidak boleh kosong",'warning')
        }
        if(idCustomer == 0){
            return showAlert('Warning!',"Customer tidak boleh kosong",'warning')
        }
        if(dataStatus == ""){
            return showAlert('Warning!',"Status tidak boleh kosong",'warning')
        }
        if(transDate == ""){
            return showAlert('Warning!',"Tanggal tidak boleh kosong",'warning')
        }
        const formData = {
            mode : mode,
            row_id : data.row_id,
            doc_no : docNo,
            grouping_order_id : grouping,
            store : store,
            sales : idSales,
            customer_id : idCustomer,
            trans_date : transDate,
            online_offline : onOff,
            status : dataStatus,
            estimated_price : estimatedPrice,
            file_photo : photo,
            estimeated_delivery_time : estimatedDelivery,
            item_type : item,
            order_type : tipe,
            origin : origin,
            pengiriman : qty,
            size : size,
            gold_color : goldColor,
            gold_weight : goldWeight,
            customer_material : customerMaterial,
            custom_box : customBox,
            deskripsi : deskripsi 
        }
        if(mode == 'submit'){
            Swal.fire({
                title: "Apakah anda yakin?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, lanjutkan!",
                cancelButtonText: "Batal"
              }).then(async (result) => {
                if (result.isConfirmed) {
                    try{
                        const response = await axios.post("/request_order/save",formData,{
                            headers : {
                                "Content-Type" : "multipart/form-data"
                            }
                        })
                        const responseData = await response.data
                        router.visit('/request_order')
                        showAlert('Berhasil!',`Data berhasil di${mode}`,'success')
                    }catch(err){
                        console.log(err);
                        showAlert('Error!','Terjadi kesalahan silahkan coba lagi','error')
                    }
                }
              });
        }else{
            try{
                const response = await axios.post("/request_order/save",formData,{
                    headers : {
                        "Content-Type" : "multipart/form-data"
                    }
                })
                const responseData = await response.data
                if(mode == 'simpan') setDocNo(responseData.doc_no)
                showAlert('Berhasil!',`Data berhasil di${mode}`,'success')
            }catch(err){
                console.log(err);
                showAlert('Error!','Terjadi kesalahan silahkan coba lagi','error')
            }
        }
        

      }
  return (
    <Layout title="Form Pesanan" page="Form Pesanan">
        <Grid container spacing={2}>

            <Grid size={{xs:12,md:6}}>
                <Card className='p-3 dark:bg-navy-800'>
                    <h2 className='font-bold dark:text-white text-1xl mb-2 text-center'>PESANAN</h2>
                    <Grid container spacing={2}>
                        <Grid size={{xs:12,md : 6}}>
                            <Input slotProps={{
                              input: {
                              readOnly: true,
                              }, 
                          }} value={docNo} fullWidth label="Doc no : "/>
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
                                        <MenuItem key={0} value={0}><span className='p-3'></span></MenuItem>
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
                                    onChange={e => setStore(e.target.value)}
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
                                    onChange={e => setIdSales(e.target.value)}
                                >
                                        <MenuItem key={0} value={0}><span className='p-3'></span></MenuItem>
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
                            <Input value={transDate} onChange={e => setTransDate(e.target.value)} type="date" fullWidth label="Tanggal : "/>
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
                                    onChange={e => setOnOff(e.target.value)}
                                >
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
                                    onChange={e => setDataStatus(e.target.value)}
                                >
                                        <MenuItem value=""><span className='p-3'></span></MenuItem>
                                    {status.map(a => 
                                        <MenuItem key={a} value={a}>{a}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <Input value={displayEstimatedPrice} onChange={e => {
                                const value = sanitizedNumber(e.target.value)
                                const rawValue = unformatNumber(value)
                                setEstimatedPrice(rawValue)
                                setDisplayEstimatedPrice(formatNumber(Number(rawValue)))
                            }} fullWidth label="Estimated Price (IDR) :"/>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <Input type="file" onChange={handleFileChange} fullWidth label="Foto :"/>
                            {preview != null && preview != "" && 
                                <Card className='dark:bg-navy-800 mt-2' style={{maxHeight : 300}}>
                                    <img src={preview} alt="" />
                                </Card>
                            }
                        </Grid>
                        <Grid size={12}>
                            <Grid container spacing={1}>
                                <Grid size={{xs:6,md:4}}>
                                    <a href={`/request_order/print/${encrypt(data.row_id)}`} target="__blank">
                                        <Button fullWidth variant='contained'><MdPrint/> Print Order</Button>
                                    </a>
                                </Grid>
                                <Grid size={{xs:6,md:4}}>
                                    <a onClick={printDp} target="__blank">
                                        <Button fullWidth variant='contained'><MdPrint/> Print DP</Button>
                                    </a>
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
                            <Input value={estimatedDelivery} onChange={e => setEstimatedDelivery(e.target.value)} type="date" fullWidth label="Perkiraan Delivery Time :"/>
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
                                    onChange={e => setItem(e.target.value)}
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
                                    onChange={e => setTipe(e.target.value)}
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
                                    onChange={e => setOrigin(e.target.value)}
                                >
                                    <MenuItem value=""><span className='py-3'></span></MenuItem>
                                    <MenuItem value="MAHAKARYA">MAHAKARYA</MenuItem>
                                    <MenuItem value="OUTSOURCE">OUTSOURCE</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <Input type="number" value={qty} onChange={e => setQty(e.target.value)} fullWidth label="Pengiriman : "/>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <Input value={size} onChange={e => setSize(e.target.value)} fullWidth label="Ukuran : "/>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <Input value={goldColor} onChange={e => setGoldColor(e.target.value)} fullWidth label="Warna Emas : "/>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <Input value={goldWeight} onChange={e => setGoldWeight(e.target.value)} fullWidth label="Berat Emas (Gr) : "/>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <Input value={customerMaterial} onChange={e => setCustomerMaterial(e.target.value)} fullWidth label="Customers Material : "/>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <Input value={customBox} onChange={e => setCustomBox(e.target.value)} fullWidth label="Custom Box : "/>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <Input value={deskripsi} onChange={e => setDeskripsi(e.target.value)} fullWidth label="Deskripsi Pesanan : "/>
                        </Grid>
                        <Grid size={{xs:12,md:6}}>
                            <Grid container spacing={2}>
                                <Grid size={6}>
                                    <Button onClick={() => handleSend("simpan")} fullWidth variant='contained'><MdSave className='mr-1'/> Simpan</Button>
                                </Grid>
                                <Grid size={6}>
                                    <Button onClick={() => handleSend("submit")} fullWidth variant='contained'><MdCheck className='mr-1'/> Submit</Button>
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
                            <TableDetail key={`detail-${timestamp}`} row_id={data.row_id}/>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>

            <Grid size={{xs:12,md:6}}>
                <Card className='p-3 dark:bg-navy-800'>
                <h2 className='font-bold dark:text-white text-1xl mb-2 text-center'>PEMBAYARAN (DP)</h2>
                <Grid container spacing={2}>
                        <Grid size={12}>
                            <TablePembayaran ref={tableDp} setDocNo={setDocNo} row_id={data.row_id}/>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>

        </Grid>
        
    </Layout>
  )
}

export default Form
