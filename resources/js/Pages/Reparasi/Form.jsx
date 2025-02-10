import React, { forwardRef, useState } from 'react'
import { Box, Button, Card, FormControl, Grid2 as Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Layout from '../Layouts/Layout'
import Input from '../Layouts/components/Input'
import { useSnapshot } from 'valtio'
import state from '../../store/store'
import ModalCustomer from '../Components/ModalCustomer'
import { encrypt, formatNumber, sanitizedNumber, showAlert, unformatNumber } from '../../helper'
import { MdDone, MdPrint, MdSave, MdScanner } from 'react-icons/md'
import TableDetail from '../RequestOrder/Components/TableDetail'
import TablePembayaran from './Components/TablePembayaran'
import { router } from '@inertiajs/react'
import Swal from 'sweetalert2'


function Form({data,sales,stores,items,statusList}) {
    const snap = useSnapshot(state)
    const sxInputField = {"& .MuiFormLable-root" : {color : "#b89474 !important"},"& .MuiInputLabel-outlined": {color: "#b89474",},'& .MuiInputBase-input': {color: '#b89474', },'& .MuiOutlinedInput-root': {color: "#b89474","& .MuiOutlinedInput-notchedOutline": {borderColor: "#b89474",borderWidth: "1px",},'& fieldset': {borderColor: '#b89474',},'&:hover fieldset': {borderColor: '#b89474',},'&.Mui-focused fieldset': {borderColor: '#b89474',},'& .MuiInputBase-input': {color: snap.theme == "dark" ? "white" : "black",},'& .MuiInputBase-input::placeholder': {color: '#b89474',},'& .MuiOutlinedInput-root': {'& fieldset': {borderColor: '#b89474 !important',},'&:hover fieldset': {borderColor: '#b89474',},'&.Mui-focused fieldset': {borderColor: '#b89474',},},},}
    
    const [docNo, setDocNo] = useState(data.doc_no || "")
    const [store, setStore] = useState(data.store_id || 0)
    const [idSales,setIdSales] = useState(data.sales_id || 0)
    const [customer,setCustomer] = useState(data.customer_id_txt || "")
    const [idCustomer, setIdCustomer] = useState(data.customer_id || 0)
    const [tanggal,setTanggal] = useState(data.trans_date || "")
    const [estimasi,setEstimasi] = useState(data.estimated_date == "0000-00-00" ? "" : data.estimated_date)
    const [item,setItem] = useState(data.item_id || 0)
    const [tipe,setTipe] = useState(data.type_order || "REPARASI")
    const [origin,setOrigin] = useState(data.outsource_intern || "")
    const [deskripsi, setDeskripsi] = useState(data.txt || "")
    const [qty,setQty] = useState(data.qty || 0)
    const [size,setSize] = useState(data.size || "")
    const [goldColor,setGoldColor] = useState(data.warna_emas || "")
    const [goldWeight,setGoldWeight] = useState(data.berat_emas || "0.000")
    const [customerMaterial,setCustomerMaterial] = useState(data.customer_material || "")
    const [customBox, setCustomBox] = useState(data.custom_box || "")
    const [status,setStatus] = useState(data.status || "")
    const [estimatedPrice,setEstimatedPrice] = useState(data.estimated_price)
    const [displayEstimatedPrice, setDisplayEstimatedPrice] = useState(formatNumber(Number(data.estimated_price)) || "0")
    const [beratJadi, setBeratJadi] = useState(data.berat_jadi || "0.00")
    const [photo,setPhoto] = useState(data.photo_file || "")
    const [preview,setPreview] = useState(data.photo_file != null || data.photo_file != "" ? `${snap.base_url}/storage/uploaded/${data.photo_file}` : null)
    const [timestamp,setTimestamp] = useState(0)
    
    const handleFileChange = e => {
        const file = e.target.files[0]
        if (file) {
            setPhoto(file);
            setPreview(URL.createObjectURL(file));
        }
    }
    const handleSend = async mode => {
        if(store == 0) return showAlert('Warning!','Store tidak boleh kosong','warning')
        if(idCustomer == null || idCustomer == 0) return showAlert('Warning!','Customer tidak boleh kosong','warning')
        if(origin == null || origin == "") return showAlert('Warning!','Outsource/Intern tidak boleh kosong','warning')
        const formData = {
            row_id : data.row_id,
            data : {
                doc_no : docNo,
                store_id : store,
                sales_id : idSales,
                customer_id : idCustomer,
                trans_date : tanggal,
                estimated_date : estimasi,
                item_id : item,
                type_order : tipe,
                outsource_intern : origin,
                txt : deskripsi,
                qty : qty,
                size : size,
                warna_emas : goldColor,
                berat_emas : goldWeight,
                customer_material : customerMaterial,
                custom_box : customBox,
                status : status,
                estimated_price : estimatedPrice,
                berat_jadi : beratJadi,
            },
            file : photo,
            mode : mode
        }
        if(mode == "submit"){
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
                            const response = await axios.post('/reparation/save',formData,{
                                headers : {
                                    "Content-Type" : "multipart/form-data"
                                }
                            })
                            const responseData = await response.data
                            setDocNo(responseData.doc_no)
                            showAlert("Berhasil!",`Reparasi berhasil di${mode}`,'success')
                            if(mode == "submit") return router.visit('/reparation')
                        }catch(err){
                            console.error(err);
                            showAlert("Gagal!","Terjadi kesalahan silahkan coba lagi","error")
                        }
                    }
                });
        }else{
            try{
                const response = await axios.post('/reparation/save',formData,{
                    headers : {
                        "Content-Type" : "multipart/form-data"
                    }
                })
                const responseData = await response.data
                setDocNo(responseData.doc_no)
                showAlert("Berhasil!",`Reparasi berhasil di${mode}`,'success')
                if(mode == "submit") return router.visit('/reparation')
            }catch(err){
                console.error(err);
                showAlert("Gagal!","Terjadi kesalahan silahkan coba lagi","error")
            }

        }
        
    }
  return (
    <Layout title="Form Reparasi" page="Form Reparasi">
        <Card className='p-3 mt-4 dark:bg-navy-800'>
            <Grid container spacing={2}>
                <Grid size={{lg:3,md:4,xs:12}}>
                    <Input fullWidth value={docNo} label="Doc No" inputProps={{readOnly : true}}/>
                </Grid>
                <Grid size={{lg:3,md:4,xs:12}}>
                    <FormControl fullWidth sx={sxInputField}>
                        <InputLabel shrink id="sales" style={{color:"#b89474"}}>Store</InputLabel>
                        <Select
                            displayEmpty
                            name='store'
                            labelId="store"
                            id="store-select"
                            value={store}
                            label="Store"
                            onChange={e => setStore(e.target.value)}
                        >
                                <MenuItem key={0} value={0}><span className='p-3'></span></MenuItem>
                            {stores.map(a => 
                                <MenuItem key={a.row_id} value={a.row_id}>{a.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={{lg:3,md:4,xs:12}}>
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
                <Grid size={{lg:3,md:4,xs:12}}>
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
                <Grid size={{lg:3,md:4,xs:12}}>
                    <Input fullWidth label="Tanggal" onChange={e => setTanggal(e.target.value)} type="date" value={tanggal} />
                </Grid>
                <Grid size={{lg:3,md:4,xs:12}}>
                    <Input fullWidth label="Perkiraan Delivery Time" onChange={e => setEstimasi(e.target.value)} type="date" value={estimasi} />
                </Grid>

                <Grid size={{lg:3,md:4,xs:12}}>
                    <FormControl fullWidth sx={sxInputField}>
                        <InputLabel shrink id="item" style={{color:"#b89474"}}>Tipe Item</InputLabel>
                        <Select
                            displayEmpty
                            name='item'
                            labelId="item"
                            id="item-select"
                            value={item}
                            label="Tipe Item"
                            onChange={e => setItem(e.target.value)}
                        >
                                <MenuItem key={0} value={0}><span className='p-3'></span></MenuItem>
                            {items.map(a => 
                                <MenuItem key={a.row_id} value={a.row_id}>{a.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid size={{lg:3,md:4,xs:12}}>
                    <FormControl fullWidth sx={sxInputField}>
                        <InputLabel shrink id="item" style={{color:"#b89474"}}>Tipe Order</InputLabel>
                        <Select
                            disabled
                            displayEmpty
                            name='tipe'
                            labelId="tipe"
                            id="tipe-select"
                            value={tipe}
                            label="Tipe Order"
                        >
                                <MenuItem value="REPARASI">REPARASI</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={{lg:3,md:4,xs:12}}>
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
                <Grid size={{lg:3,md:4,xs:12}}>
                    <Input label="Deskripsi Pesanan" value={deskripsi} fullWidth onChange={e => setDeskripsi(e.target.value)} />
                </Grid>
                <Grid size={{lg:3,md:4,xs:12}}>
                    <Input label="Pengiriman" value={qty} fullWidth onChange={e => setQty(e.target.value)} />
                </Grid>
                <Grid size={{lg:3,md:4,xs:12}}>
                    <Input label="Ukuran" value={size} fullWidth onChange={e => setSize(e.target.value)} />
                </Grid>
                <Grid size={{lg:3,md:4,xs:12}}>
                    <Input label="Warna Emas" value={goldColor} fullWidth onChange={e => setGoldColor(e.target.value)} />
                </Grid>
                <Grid size={{lg:3,md:4,xs:12}}>
                    <Input label="Berat Emas" value={goldWeight} fullWidth onChange={e => setGoldWeight(e.target.value)} />
                </Grid>
                <Grid size={{lg:3,md:4,xs:12}}>
                    <Input label="Customer Material" value={customerMaterial} fullWidth onChange={e => setCustomerMaterial(e.target.value)} />
                </Grid>
                <Grid size={{lg:3,md:4,xs:12}}>
                    <Input label="Custom Box" value={customBox} fullWidth onChange={e => setCustomBox(e.target.value)} />
                </Grid>
                <Grid size={{lg:3,md:4,xs:12}}>
                    <FormControl fullWidth sx={sxInputField}>
                        <InputLabel shrink id="status" style={{color:"#b89474"}}>Status</InputLabel>
                        <Select
                            displayEmpty
                            name='status'
                            labelId="status"
                            id="status-select"
                            value={status}
                            label="Status"
                            onChange={e => setStatus(e.target.value)}
                        >
                                <MenuItem value=""><span className='p-3'></span></MenuItem>
                            {statusList.map(a => 
                                <MenuItem key={a} value={a}>{a}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={{lg:3,md:4,xs:12}}>
                    <Input label="Estimasi Price (IDR)" value={displayEstimatedPrice} fullWidth onChange={e => {
                        const value = sanitizedNumber(e.target.value)
                        const rawValue = unformatNumber(value)
                        setEstimatedPrice(rawValue)
                        setDisplayEstimatedPrice(formatNumber(Number(rawValue)))
                    }} />
                </Grid>
                <Grid size={{lg:3,md:4,xs:12}}>
                    <Input label="Berat Jadi" value={beratJadi} fullWidth onChange={e => setBeratJadi(e.target.value)} />
                </Grid>
                <Grid size={{xs:12,md : 4, lg:3}}>
                    <Input type="file" onChange={handleFileChange} fullWidth label="Foto :"/>
                        {preview != null && preview != "" && 
                            <Card className='dark:bg-navy-800' style={{maxHeight : 150, maxWidth : 150}}>
                                <img src={preview} alt="" />
                            </Card>
                        }
                </Grid>
                <Grid size={{xs:12,md : 12, lg:8}}>
                    <Button onClick={() => handleSend('simpan')} variant='contained' ><MdSave className='mr-1'/> Simpan</Button>
                    <Button onClick={() => handleSend('submit')} variant='contained' sx={{ml:1}}><MdDone className='mr-1'/> Submit</Button>
                    <a href={`/reparation/print_reparasi/${encrypt(data.row_id)}`} target='__blank'>
                        <Button variant='contained' sx={{ml:1}}><MdPrint className='mr-1'/>PRINT REPARASI</Button>
                    </a>
                    <a href={`/reparation/print_pelunasan/${encrypt(data.row_id)}`} target='__blank'>
                        <Button variant='contained' sx={{ml:1}}><MdPrint className='mr-1'/>PRINT PEMBAYARAN</Button>
                    </a>
                </Grid>
            </Grid>
        </Card>
        
        <Grid container spacing={2} sx={{mt:2}}>
            <Grid size={{xs: 12,md:6}}>
                <Card className='p-3 dark:bg-navy-800'>
                    <h2 className='font-bold dark:text-white'>Detail</h2>
                    <TableDetail key={timestamp} onSuccess={setTimestamp} setDocNo={setDocNo} mode="reparasi" row_id={data.row_id}/>
                </Card>
            </Grid>
            <Grid size={{xs: 12,md: 6}}>
                <Card className='p-3 dark:bg-navy-800'>
                    <h2 className='font-bold dark:text-white'>Pembayaran</h2>
                    <TablePembayaran row_id={data.row_id} setDocNo={setDocNo}/>
                </Card>
            </Grid>
        </Grid>

    </Layout>
  )
}

export default Form
