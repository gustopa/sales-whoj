import React, { useEffect, useState } from 'react'
import Layout from '../Layouts/Layout'
import { Button, Card, FormControl, Grid2 as Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Input from '../Layouts/components/Input'
import ModalCustomer from '../Components/ModalCustomer'
import ModalPayment from '../Components/ModalPayment'
import { encrypt, formatNumber, getNow, getTodayDate, sanitizedNumber, showAlert, unformatNumber } from '../../helper'
import { MdPayment } from 'react-icons/md'
import { router } from '@inertiajs/react'
import Swal from 'sweetalert2'
function Form({refund,refund_type,sales_list,store_list,session}) {
    const sxInputField = {
        // backgroundColor: "white",
        boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.2)", // Shadow halus
        borderRadius: "5px",
    }
    const [docNo,setDocNo] = useState(refund.doc_no)
    const [tanggal,setTanggal] = useState(refund.trans_date || getTodayDate())
    const [tipe,setTipe] = useState(refund.type_refund)
    const [sales,setSales] = useState(refund.sales_id || 0)
    const [store,setStore] = useState(refund.store_id || 0)
    const [customer,setCustomer] = useState(refund.customer_id_txt || "")
    const [idCustomer,setIdCustomer] = useState(refund.customer_id || 0)
    const [invoice, setInvoice] = useState(refund.payment_id_txt || "")
    const [idInvoice, setIdInvoice] = useState(refund.payment_id || 0)
    const [amountInvoice, setAmountInvoice] = useState(refund.amount_refund || 0)
    const [displayAmountInvoice,setDisplayAmountInvoice] = useState("0")
    const [disc,setDisc] = useState(refund.potongan || "0")
    const [dataRefund,setDataRefund] = useState(refund.amount_refund || 0)
    const [displayRefund, setDisplayRefund] = useState("0")
    const [alasan,setAlasan] = useState(refund.txt || "")

    const [keyInvoice,setKeyInvoice] = useState(0)
    const calculateRefund = () => {
        const potongan = (amountInvoice * Number(disc.replace(",", "."))) / 100;
        const totalRefund = amountInvoice - potongan;
        setDataRefund(totalRefund)
        setDisplayRefund(formatNumber(totalRefund))
    }

    const handlePayment = async () => {
        if(idCustomer == 0) return showAlert("Warning!","Customer belum dipilih","warning")
        if(idInvoice == 0) return showAlert("Warning!","Pembelian belum dipilih","warning")
        if(disc == "") return showAlert("Warning!","Potongan harus diisi","warning")
        if(tipe == "") return showAlert("Warning!","Tipe pengembalian belum dipilih","warning")
        if(alasan == "") return showAlert("Warning!","Alasan harus diisi","warning")
        const formData = {
            row_id : refund.row_id,
            payment_id : idInvoice,
            status : tipe,
            data : {
                doc_no : docNo,
                store_id : store,
                customer_id : idCustomer,
                trans_date : tanggal,
                txt : alasan,
                payment_id : idInvoice,
                status : "PAID",
                type_refund : tipe,
                sales_id : sales,
                potongan : disc,
                amount_invoice : amountInvoice,
                amount_refund : dataRefund,
                is_submitted : 1,
                modified_date : getNow(),
                modified_by : session.username
            }
        }
        Swal.fire({
            title: "Are you sure?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          }).then( async (result) => {
            if (result.isConfirmed) {
                try{
                    const response = await axios.post(`/refund/save`,formData)
                    const responseData = await response.data
                    showAlert("Berhasil!","Data berhasil dibuat","success")
                    window.open(`/refund/print/${encrypt(responseData)}`, '_blank');
                    router.visit('/refund')
                }catch(err){
                    console.log(err)
                    showAlert("Gagal!","Terjadi kesalahan silahkan coba lagi","error")
                }
            }
          });
        
    }
    useEffect(()=>{
        setDisplayAmountInvoice(formatNumber(Number(unformatNumber(amountInvoice))))
        calculateRefund()
    },[amountInvoice,disc])

    useEffect(() => {
        setIdInvoice(0)
        setInvoice("")
        setAmountInvoice("0")
    },[idCustomer])

  return (
    <Layout title="Refund | Form" page="Form Refund">
        <Card className='p-3 dark:bg-navy-800 w-3/4 mt-3'>
            <Grid container spacing={2}>
                <Grid size={{xs:12, md:4}}>
                    <Input size="small" fullWidth label="Refund No" value={docNo} />
                </Grid>
                <Grid size={{xs:12, md:4}}>
                    <Input size="small" type="date" onChange={e => setTanggal(e.target.value)} fullWidth label="Tanggal" value={tanggal} />
                </Grid>
                <Grid size={{xs:12,md:4}}>
                    <FormControl fullWidth sx={sxInputField}>
                        <InputLabel shrink id="tipe" style={{color:"#b89474"}}>Tipe Pengembalian</InputLabel>
                        <Select
                            size='small'
                            displayEmpty
                            name='tipe'
                            labelId="tipe"
                            id="tipe-select"
                            value={tipe}
                            label="Tipe Pengembalian"
                            onChange={e => setTipe(e.target.value)}
                        >
                                <MenuItem value=""><span className='p-3'></span></MenuItem>
                            {refund_type.map(a => 
                                <MenuItem key={a} value={a}>{a}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={{xs:12,md:4}}>
                    <FormControl fullWidth sx={sxInputField}>
                        <InputLabel shrink id="sales" style={{color:"#b89474"}}>Sales</InputLabel>
                        <Select
                            size='small'
                            displayEmpty
                            name='sales'
                            labelId="sales"
                            id="sales-select"
                            value={sales}
                            label="Sales"
                            onChange={e => setSales(e.target.value)}
                        >
                                <MenuItem key={0} value={0}><span className='p-3'></span></MenuItem>
                            {sales_list.map(a => 
                                <MenuItem key={a.row_id} value={a.row_id}>{a.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={{xs:12,md:4}}>
                    <FormControl fullWidth sx={sxInputField}>
                        <InputLabel shrink id="store" style={{color:"#b89474"}}>Store</InputLabel>
                        <Select
                            size='small'
                            displayEmpty
                            name='store'
                            labelId="store"
                            id="store-select"
                            value={store}
                            label="Store"
                            onChange={e => setStore(e.target.value)}
                        >
                                <MenuItem key={0} value={0}><span className='p-3'></span></MenuItem>
                            {store_list.map(a => 
                                <MenuItem key={a.row_id} value={a.row_id}>{a.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={{xs:12,md : 4}}>
                    <TextField variant="outlined" value={customer} sx={sxInputField} size='small' label="Pelanggan" fullWidth
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
                <Grid size={{xs:12,md : 4}}>
                    <TextField  variant="outlined" value={invoice} sx={sxInputField} size='small' label="Pembelian" fullWidth
                        InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <ModalPayment key={keyInvoice} id_customer={idCustomer} setAmount={setAmountInvoice} setIdInvoice={setIdInvoice} setInvoice={setInvoice} />
                            </InputAdornment>
                        ),
                            readOnly : true
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid size={{xs:12, md:4}}>
                    <Input size="small" onChange={e => {
                        const value = sanitizedNumber(e.target.value)
                        const raw_value = unformatNumber(value)
                        setAmountInvoice(raw_value)
                        setDisplayAmountInvoice(formatNumber(Number(raw_value)))
                    }} type="text" fullWidth label="Nominal Invoice" value={displayAmountInvoice} />
                </Grid>
                <Grid size={{xs:12,md:4}}>
                    <Input size="small" type="text" fullWidth label="Potongan (%)" onChange={e => setDisc(sanitizedNumber(e.target.value))} value={disc}/>
                </Grid>
                <Grid size={{xs:12,md:4}}>
                    <Input size="small" type="text" fullWidth label="Refund (%)" onChange={e => {
                        const value = sanitizedNumber(e.target.value)
                        const raw_value = unformatNumber(value)
                        setDataRefund(raw_value)
                        setDisplayRefund(formatNumber(Number(raw_value)))
                    }} value={displayRefund}/>
                </Grid>
                <Grid size={{xs:12,md:4}}>
                    <TextField sx={sxInputField} rows={4} multiline InputLabelProps={{ shrink: true, }} size="small" type="text" fullWidth label="Alasan" onChange={e => setAlasan(e.target.value)} value={alasan}/>
                </Grid>
                <Grid size={{xs:12,md:4}}>
                    <Button onClick={handlePayment} size='small' variant='contained'><MdPayment className='mr-1'/>Payment</Button>
                </Grid>
            </Grid>
        </Card>
    </Layout>
  )
}

export default Form
