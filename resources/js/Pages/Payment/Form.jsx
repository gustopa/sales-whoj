import React, { useEffect, useState } from 'react'
import Layout from '../Layouts/Layout'
import { Button, Card, FormControl, Grid2 as Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useSnapshot } from 'valtio'
import state from '../../store/store'
import { Link, useForm } from '@inertiajs/react'
import ModalProduct from '../Components/ModalProduct'
import ModalCustomer from '../Components/ModalCustomer'
import ModalPesanan from '../Components/ModalPesanan'
import { formatNumber, getTodayDate, sanitizedNumber, showAlert, unformatNumber } from '../../helper'
import { FaPlus } from 'react-icons/fa6'
import { MdCancel, MdCheck, MdDelete, MdSearch } from 'react-icons/md'
import { FaSearch } from 'react-icons/fa'
import axios from 'axios'
function Form({stores,payment,sales,payment_types,edc}) {
    const snap = useSnapshot(state)
    // const sxInputField = {}
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

      const {data,setData,post} = useForm({
        invoice_no : payment.doc_no,
        tanggal : payment.trans_date,
        store : payment.store_id,
        sales : payment.sales_id,
        notes : payment.notes == null ? "" : payment.notes,
        payment_type : "",
        edc : "",
      })

      const [customer,setCustomer] = useState(payment.customer_id_txt == null ? "" : payment.customer_id_txt)
      const [idCustomer,setIdCustomer] = useState(payment.customer_id == 0 ? -1 : payment.customer)
      const [item,setItem] = useState(payment.inventory_id_txt == null ? "" : payment.inventory_id_txt)
      const [idItem,setIdItem] = useState(payment.inventory_id)
      const [price, setPrice] = useState("0.00")
      const [disc, setDisc] = useState(0)
      const [selisih,setSelisih] = useState(0)
      const [amountRequestOrder,setAmountRequestOrder] = useState(0)
      const [sisaPembayaran,setSisaPembayaran] = useState(0)
      const [sellPrice, setSellPrice] = useState(0)
      const [displaySellPrice, setDisplaySellPrice] = useState("0")
      const defaultPayment = {
        payment_type: 0,
        edc: 0,
        tanggal: getTodayDate(),
        amount: 0,
        displayAmount : "0",
        voucher : ""
      };

      const [payments, setPayments] = useState([defaultPayment])

      const handleAddPayment = () => {
        setPayments([...payments, defaultPayment]);
      };

      const handleDeletePayment = (index) => {
        setPayments(payments.filter((_, i) => i !== index));
      }

      const handlePaymentChange = (index, field, value) => {
        const updatedPayments = [...payments];
        updatedPayments[index][field] = value;
        setPayments(updatedPayments); 
      };

      const resetPayment = (index) => {
        setPayments((prevPayments) =>
            prevPayments.map((payment, i) =>
                // i === index ? defaultPayment : payment
              i === index ? { ...payment, amount: 0, edc: 0, displayAmount : "0", voucher : "", tanggal: getTodayDate() } : payment
            )
        );

    };

      const handleInput = (e) => {
        const {name, value} = e.target
        console.log(value);
        
        setData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
      
      const handleSellPrice = (e) => {
        const value = sanitizedNumber(e)
        
        const rawValue = unformatNumber(value)
        // console.log(rawValue);
        const selisihHarga = Number(rawValue) - Number(price)
        const percentSelisih = (selisihHarga / price) * 100
        setSellPrice(Number(rawValue))
        setDisplaySellPrice(formatNumber(Number(rawValue)))
        setSelisih(percentSelisih.toFixed(2) == Infinity ? 0 : percentSelisih.toFixed(2))
        
      }

      const checkVoucher = async (voucher,index) => {
        try{
          const response  = await axios.post('/voucher/checkVoucher',{voucher : voucher})
          const data = await response.data
          const isVoucherUsed = payments.filter((_, i) => i != index).some(payment => `WGC-${payment.voucher}` === voucher);
          console.log(isVoucherUsed);
          
          if(data.status == -1){
            return showAlert("Gagal!","Voucher tidak ditemukan","error")
          }

          if(data.status == 1 || isVoucherUsed){
            showAlert("Gagal!","Kode sudah digunakan", "warning")
            
            data.amount = 0
            setPayments((prevPayments) =>
              prevPayments.map((payment, i) =>
                i === index ? { ...payment, amount : data.amount, displayAmount : formatNumber(data.amount), voucher : "" } : payment
              )
            );

          }else if(data.status == 0 && !isVoucherUsed){
            showAlert("Berhasil!","Kode berhasil digunakan","success")
          }
          setPayments((prevPayments) =>
            prevPayments.map((payment, i) =>
              i === index ? { ...payment, amount : data.amount, displayAmount : formatNumber(data.amount) } : payment
            )
          );
        }catch(err){
          showAlert("Error!","Terjadi kesalahan silahkan coba lagi","error")
        }
        
      }

      useEffect(() => {
        calculateSisaBayar()
      },[sellPrice,amountRequestOrder,price,payments]);

      const calculateSisaBayar = () => {
        const totalAmountPayments = payments.reduce((total, payment) => total + payment.amount, 0);
        setSisaPembayaran(sellPrice - Number(amountRequestOrder) - totalAmountPayments)
      }
      
      

      function handleDisc(e){
        let hargaDisc = (price * e.target.value) / 100
        let hargaAkhir = price - hargaDisc
        let selisihHarga = price - hargaAkhir
        let percentSelisih = (selisihHarga / price) * 100
        setSelisih(- Math.round(percentSelisih))
        setSellPrice(hargaAkhir)
        setDisc(e.target.value)
      }
  return (
    <Layout title="Form Pembayaran" page="Form Pembayaran">
        <Grid container spacing={2}>
            <Grid size={{xs:12,md : 4}}>
                <Card className='p-4 dark:bg-navy-800'>
                    <div>
                        <TextField 
                        InputLabelProps={{ shrink: true, }}
                        slotProps={{
                            input: {
                            readOnly: true,
                            }, 
                        }}
                        onChange={handleInput}
                        name='invoice_no' value={data.invoice_no} sx={sxInputField} fullWidth variant="outlined" label="Invoice No"/>
                    </div>
                    <div className='mt-5'>
                        <TextField InputLabelProps={{ shrink: true, }} value={data.tanggal} onClick={handleInput} name='tanggal' type='date' sx={sxInputField} fullWidth variant="outlined" label="Tanggal"/>
                    </div>
                    <div className='mt-5'>
                        <FormControl fullWidth sx={sxInputField}>
                            <InputLabel shrink id="store" style={{color:"#b89474"}}>Store</InputLabel>
                            <Select
                                displayEmpty
                                name='store'
                                labelId="store"
                                id="store-select"
                                value={data.store}
                                label="Store"
                                onChange={handleInput}
                            >
                                    <MenuItem key={0} value={0}></MenuItem>
                                {stores.map(a => 
                                    <MenuItem key={a.row_id} value={a.row_id}>{a.name}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </div>
                    <div className='mt-5'>
                        <FormControl fullWidth sx={sxInputField}>
                            <InputLabel shrink id="sales" style={{color:"#b89474"}}>Sales</InputLabel>
                            <Select
                                displayEmpty
                                name='sales'
                                labelId="sales"
                                id="sales-select"
                                value={data.sales}
                                label="Sales"
                                onChange={handleInput}
                            >
                                  <MenuItem key={0} value={0}> </MenuItem>
                                {sales.map(a => 
                                    <MenuItem key={a.row_id} value={a.row_id}>{a.name}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </div>
                    <div className='mt-5'>
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
                    </div>
                    <div className="mt-5">
                      <TextField InputLabelProps={{ shrink: true, }} value={data.notes} onChange={handleInput} name='notes' type='text' sx={sxInputField} fullWidth variant="outlined" label="Notes"/>
                    </div>
                </Card>
            </Grid>
            <Grid size={{xs:12,md:8}}>
                <Card className='p-4 dark:bg-navy-800'>
                    <Grid container spacing={2}>
                        <Grid size={{xs :12, md:6}}>
                            <TextField variant="outlined" value={item} sx={sxInputField} label="Barang" fullWidth
                                InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <ModalProduct setSellPrice={handleSellPrice} setPrice={setPrice} setItem={setItem} setIdItem={setIdItem} store_id={data.store} />
                                    </InputAdornment>
                                ),
                                    readOnly : true
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid size={{xs :12, md:6}}>
                            <TextField 
                                InputLabelProps={{ shrink: true, }}
                                slotProps={{
                                    input: {
                                    readOnly: true,
                                    }, 
                                }}
                                name='harga' sx={sxInputField} value={Intl.NumberFormat("en-US").format(price)} fullWidth variant="outlined" label="Harga Barang"/>
                        </Grid>

                        {/* <Grid size={{xs :12, md:6}}>
                          <TextField 
                                InputLabelProps={{ shrink: true, }}
                                inputProps={{
                                  min : 0,
                                  max : 100
                                }}
                                helperText={
                                  disc < 0 || disc > 100
                                    ? "Nilai harus antara 0 dan 100"
                                    : "Masukkan nilai antara 0 dan 100"
                                }                              
                                onChange={handleDisc}
                                name='disc' focused value={disc} sx={sxInputField} type='number' fullWidth variant="outlined" label="Disc (%)"/>
                        </Grid> */}

                        <Grid size={{xs : 12, md : 6}}>
                          <TextField 
                              InputLabelProps={{ shrink: true, }}
                              onChange={ e => handleSellPrice(e.target.value)}
                              sx={sxInputField} value={displaySellPrice} type='text' fullWidth variant="outlined" label="Harga Jual"/>
                        </Grid>

                        <Grid size={{xs :12, md:6}}>
                          <TextField 
                                InputLabelProps={{ shrink: true, }}
                                name='selisih' sx={sxInputField} value={selisih} fullWidth variant="outlined" label="Selisih (%)"/>
                        </Grid>
                        
                        <Grid size={{xs : 12, md:6}}>
                          <TextField variant="outlined" sx={sxInputField} label="Pesanan (DP)" fullWidth
                              InputProps={{
                              endAdornment: (
                                  <InputAdornment position="end">
                                      <ModalPesanan id={idCustomer} onSelect={setAmountRequestOrder}/>
                                  </InputAdornment>
                              ),
                                  readOnly : true
                              }}
                              value={Intl.NumberFormat('en-US').format(amountRequestOrder)}
                              InputLabelProps={{
                                  shrink: true,
                              }}
                          />
                        </Grid>
                        
                        <Grid size={{xs:12,md :6}}>
                          <TextField variant="outlined" sx={sxInputField} label="Sisa pembayaran" fullWidth
                              InputProps={{
                                  readOnly : true
                              }}
                              value={Intl.NumberFormat('en-US').format(sisaPembayaran)}
                              InputLabelProps={{
                                  shrink: true,
                              }}
                          />
                        </Grid>

                        {/* <Grid size={12}>
                              
                        </Grid> */}
                        
                        {payments.map((payment, index) => (
                          // <Card className='p-3' style={{width: "100%"}}>
                            <Grid key={index} container size={12} spacing={2}> 
                              <Grid size={12}>
                                <h2 className='font-bold dark:text-white'>
                                  Pembayaran ke {index + 1} 
                                  {index != 0 &&
                                    <Button onClick={() => handleDeletePayment(index)} color="error" size='small' variant="contained" style={{minWidth : "30px",marginLeft : "5px"}} >
                                      <MdCancel/>
                                    </Button>
                                  }
                                </h2>
                              </Grid>
                              <Grid size={{xs:12,md : 6}}>
                                <FormControl fullWidth sx={sxInputField}>
                                    <InputLabel shrink id="payment_type" style={{color:"#b89474"}}><span>Tipe Pembayaran :</span></InputLabel>
                                    <Select
                                        displayEmpty
                                        name='payment_type'
                                        labelId="payment_type"
                                        id="payment-type-select"
                                        value={payment.payment_type}
                                        label="Tipe Pembayaran :"
                                        onChange={(e) => {
                                          handlePaymentChange(index, "payment_type", e.target.value)
                                          resetPayment(index)
                                        }}
                                    >
                                          <MenuItem key={0} value={0}> </MenuItem>
                                        {payment_types.map(a => 
                                            <MenuItem key={a.row_id} value={a.row_id}>{a.name}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                              </Grid>
                              {payment.payment_type != 16 && payment.payment_type != 1 && payment.payment_type != 11 ? (
                                  <Grid size={{xs:12,md : 6}}>
                                    <FormControl fullWidth sx={sxInputField}>
                                        <InputLabel shrink id="edc" style={{color:"#b89474"}}><span>EDC :</span></InputLabel>
                                        <Select
                                            displayEmpty
                                            name='edc'
                                            labelId="edc"
                                            id="edc-select"
                                            value={payment.edc}
                                            label="EDC :"
                                            onChange={(e) =>
                                              handlePaymentChange(index, "edc", e.target.value)
                                            }
                                        >
                                              <MenuItem key={0} value={0}> </MenuItem>
                                            {edc.map(a => 
                                                <MenuItem key={a.row_id} value={a.row_id}>{a.name}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                  </Grid>
                              ) : (
                                <>
                                {payment.payment_type == 16 &&
                                  <Grid size={{xs:12, md: 6}}>
                                    <TextField 
                                    InputLabelProps={{ shrink: true, }} 
                                    InputProps={{
                                      endAdornment: (
                                          <InputAdornment position="end">
                                              <Button onClick={()=> checkVoucher(`WGC-${payment.voucher}`,index)} size="large" variant="contained"><FaSearch/></Button>
                                          </InputAdornment>
                                      ),
                                      startAdornment : (
                                        <InputAdornment position="start">
                                              WGC-
                                        </InputAdornment>
                                      )
          
                                    }}
                                    value={payment.voucher}
                                    onChange={e => handlePaymentChange(index, "voucher", e.target.value)} type='text' sx={sxInputField} fullWidth variant="outlined" label="Masukan kode voucher :"/>
                                  </Grid>
                                }
                                </>
                              )
                              }
                              <Grid size={{xs:12, md: 6}}>
                                <TextField InputLabelProps={{ shrink: true, }} value={payment.tanggal} onChange={e => handlePaymentChange(index, "tanggal", e.target.value)} type='date' sx={sxInputField} fullWidth variant="outlined" label="Tanggal :"/>
                              </Grid>
                              <Grid size={{xs:12, md: 6}}>
                                <TextField InputLabelProps={{ shrink: true, }} value={payment.displayAmount} 
                                  onChange={e => {
                                    const value = sanitizedNumber(e.target.value)
                                    const rawValue = unformatNumber(value)
                                    handlePaymentChange(index, "amount", Number(rawValue))
                                    handlePaymentChange(index,"displayAmount", formatNumber(rawValue))
                                  }}
                                  slotProps={{
                                    input: {
                                      readOnly: payment.payment_type == 16 ? true : false,
                                    }, 
                                  }}
                                type='text' sx={sxInputField} fullWidth variant="outlined" label="Amount :"/>
                              </Grid>
                            </Grid>
                          // </Card>
                        ))}

                        <Grid>
                          <Button onClick={handleAddPayment} variant='contained' style={{marginRight : "6px"}}>
                              <FaPlus/> <span className='ml-2'>Tambah Pembayaran</span> 
                          </Button>
                          <br /><br />
                          <Link href='/payment'>
                              <Button style={{background : "#b89474",color : "white", marginRight : "6px"}}>Kembali</Button>
                          </Link>
                          <Button style={{background : "#b89474",color : "white"}}>Submit</Button>
                        </Grid>

                        
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    </Layout>
  )
}

export default Form
