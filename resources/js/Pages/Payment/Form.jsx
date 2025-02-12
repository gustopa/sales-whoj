import React, { useEffect, useState } from 'react'
import Layout from '../Layouts/Layout'
import { Button, Card, FormControl, Grid2 as Grid, InputAdornment, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material'
import { useSnapshot } from 'valtio'
import state from '../../store/store'
import { Link, useForm } from '@inertiajs/react'
import ModalProduct from '../Components/ModalProduct'
import ModalCustomer from '../Components/ModalCustomer'
import ModalPesanan from '../Components/ModalPesanan'
import { formatNumber, getTodayDate, sanitizedNumber, showAlert, unformatNumber } from '../../helper'
import { FaPlus } from 'react-icons/fa6'
import { MdCancel, MdSave } from 'react-icons/md'
import { FaSearch } from 'react-icons/fa'
import { router } from '@inertiajs/react'
import axios from 'axios'
function Form({stores,payment,sales,payment_types,edc,paymentDetails}) {
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
      const [idCustomer,setIdCustomer] = useState(payment.customer_id == 0 ? -1 : payment.customer_id)
      const [item,setItem] = useState(payment.inventory_id_txt == null ? "" : payment.inventory_id_txt)
      const [idOrder,setIdOrder] = useState(payment.payment_order_id)
      const [idItem,setIdItem] = useState(payment.inventory_id)
      const [price, setPrice] = useState(payment.inventory_price == null ? 0 : payment.inventory_price)
      const [disc, setDisc] = useState(0)
      const [selisih,setSelisih] = useState(payment.diff_percent == null ? 0 : payment.diff_percent)
      const [amountRequestOrder,setAmountRequestOrder] = useState(payment.down_payment)
      const [sisaPembayaran,setSisaPembayaran] = useState(0)
      const [sellPrice, setSellPrice] = useState(payment.selling_price)
      const [displaySellPrice, setDisplaySellPrice] = useState(formatNumber(Number(payment.selling_price)))
      const [totalAmount, setTotalAmount] = useState(0)
      const [submitDisable, setSubmitDisable] = useState(true)
      let defaultPayment
      if(paymentDetails.length == 0){
        defaultPayment = [{
          id : null,
          sequence : 1,
          payment_type: 0,
          edc: 0,
          tanggal: getTodayDate(),
          amount: 0,
          displayAmount : "0",
          id_voucher : 0,
          voucher : ""
        }];
      }else{
        defaultPayment = paymentDetails.map((p,i) => {
          
          return {
            id : p.id,
            sequence : i+1,
            payment_type: p.payment_type_id,
            edc: p.edc_id,
            tanggal: p.trans_date.split(" ")[0],
            amount: p.amount,
            displayAmount : formatNumber(Number(p.amount)),
            id_voucher : p.voucher_id,
            voucher : p.kode_voucher?.replace("WGC-","")
          }
        })
      }
      
      
      const [payments, setPayments] = useState(defaultPayment)

      const handleAddPayment = () => {
        setPayments((prev) => 
          [...payments, 
          {
            id : null,
            sequence : prev.length + 1,
            payment_type: 0,
            edc: 0,
            tanggal: getTodayDate(),
            amount: 0,
            displayAmount : "0",
            id_voucher : 0,
            voucher : ""
          }
      ]);
      };
      
      const handleDeletePayment = (index) => {
        setPayments((prev) =>
          prev.map((payment, i) =>
            i === index
              ? payment.id !== null ? { ...payment, is_deleted: true } : null // Hapus dari list jika belum ada di database
              : payment
          ).filter((payment) => payment !== null) // Hapus data yang bernilai null
        );
      };
      

      const handlePaymentChange = (index, field, value) => {
        const updatedPayments = [...payments];
        updatedPayments[index][field] = value;
        setPayments(updatedPayments); 
      };

      const resetPayment = (index) => {
        setPayments((prevPayments) =>
            prevPayments.map((payment, i) =>
                // i === index ? defaultPayment : payment
              i === index ? { ...payment, amount: 0, edc: 0, displayAmount : "0", voucher : "", id_voucher: 0, tanggal: getTodayDate() } : payment
            )
        );

    };

      const handleInput = (e) => {
        const {name, value} = e.target
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
            setPayments((prevPayments) =>
              prevPayments.map((payment, i) =>
                i === index ? { ...payment, amount : 0, displayAmount : formatNumber(0) } : payment
              )
            );
            return showAlert("Gagal!","Voucher tidak ditemukan","error")
          }

          if(data.status == 1 || isVoucherUsed){
            showAlert("Gagal!","Kode sudah digunakan", "warning")
            
            data.amount = 0
            setPayments((prevPayments) =>
              prevPayments.map((payment, i) =>
                i === index ? { ...payment, amount : data.amount, displayAmount : formatNumber(data.amount), voucher : "", id_voucher : 0} : payment
              )
            );

          }else if(data.status == 0 && !isVoucherUsed){
            showAlert("Berhasil!","Kode berhasil digunakan","success")
          }
          setPayments((prevPayments) =>
            prevPayments.map((payment, i) =>
              i === index ? { ...payment, amount : data.amount, displayAmount : formatNumber(data.amount), id_voucher : data.row_id } : payment
            )
          );
        }catch(err){
          showAlert("Error!","Terjadi kesalahan silahkan coba lagi","error")
        }
        
      }

      useEffect(() => {
        calculateSisaBayar()
        calculateTotalAmount()
        
      },[sellPrice,amountRequestOrder,price,payments]);

      const calculateTotalAmount = () => {
        const totalAmountPayments = payments
        .filter((payment) => !payment.is_deleted)
        .reduce((total, payment) => total + Number(payment.amount), 0);
        setTotalAmount(totalAmountPayments + Number(amountRequestOrder))
        // console.log(totalAmount);
      }

      const calculateSisaBayar = () => {
        const totalAmountPayments = payments
        .filter((payment) => !payment.is_deleted)
        .reduce((total, payment) => total + Number(payment.amount), 0);
        const sisaBayar = sellPrice - Number(amountRequestOrder) - totalAmountPayments
        sisaBayar == 0 ? setSubmitDisable(false) : setSubmitDisable(true)
        setSisaPembayaran(sisaBayar)
      }
      
      const handleSubmit = async (mode) => {
        if(data.store == 0){
          return showAlert("Waning!","Store belum dipilih",'warning') 
        }
        if(data.sales == 0){
          return showAlert("Waning!","Sales belum dipilih",'warning')
        }
        if(idCustomer == -1){
          return showAlert("Waning!","Customer belum dipilih",'warning') 
        }
        if(sellPrice == 0){
          return showAlert("Waning!","Harga jual belum diisi",'warning') 
        }
        
        for (let index = 0; index < payments.length; index++) {
          let payment = payments[index];

          if (payment.is_deleted) continue;
  
          if (payment.payment_type_id == 0 || payment.amount == 0) {
              showAlert("Warning!", `Lengkapi field pembayaran ke ${index + 1}`, 'warning');
              return;
          }
        }
        
        const formData = {
          row_id : payment.row_id,
          doc_no : data.invoice_no,
          store_id : data.store,
          sales_id : data.sales,
          customer_id : idCustomer,
          trans_date : data.tanggal,
          notes : data.notes,
          payment_type_id : payments[0].payment_type,
          edc_id : payments[0].edc,
          payment_order_id : idOrder,
          inventory_id : idItem,
          inventory_price : price,
          percent_disc : disc,
          selling_price : sellPrice,
          diff_percent : selisih,
          amount : totalAmount,
          unpaid_amount : sisaPembayaran,
          status : sisaPembayaran > 0 ? "UNPAID" : "PAID",
          payment_details : payments,
          mode : mode
        }

        try{
          const response = await axios.post("/payment/save",formData)
          const data = await response.data
          console.log(data);
          showAlert("Success!",`Pembayaran berhasil di${mode}`,"success")
          router.visit('/payment')
        }catch(err){
          showAlert("Error!","Terjadi kesalahan silahkan coba lagi","error")
        }
        
      }
      

      // function handleDisc(e){
      //   let hargaDisc = (price * e.target.value) / 100
      //   let hargaAkhir = price - hargaDisc
      //   let selisihHarga = price - hargaAkhir
      //   let percentSelisih = (selisihHarga / price) * 100
      //   setSelisih(- Math.round(percentSelisih))
      //   setSellPrice(hargaAkhir)
      //   setDisc(e.target.value)
      // }
  return (
    <Layout title="Form Pembayaran" page="Form Pembayaran">
        {/* <Snackbar open={true} style={{marginTop : "90px"}} anchorOrigin={{vertical:"top",horizontal:"right"}} message={`INVOICE NO : ${data.invoice_no}`}/> */}
        <Grid container spacing={2}>
            <Grid size={{xs:12,md : 4}}>
                <Card className='p-4 dark:bg-navy-800'>
                    <div className=''>
                        <TextField size='small' InputLabelProps={{ shrink: true, }} value={data.tanggal} onChange={handleInput} name='tanggal' type='date' sx={sxInputField} fullWidth variant="outlined" label="Tanggal"/>
                    </div>
                    <div className='mt-4'>
                        <FormControl fullWidth sx={sxInputField}>
                            <InputLabel shrink id="store" style={{color:"#b89474"}}>Store</InputLabel>
                            <Select
                                size='small'
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
                    <div className='mt-4'>
                        <FormControl fullWidth sx={sxInputField}>
                            <InputLabel shrink id="sales" style={{color:"#b89474"}}>Sales</InputLabel>
                            <Select
                                size='small'
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
                    <div className='mt-4'>
                      <TextField size='small' variant="outlined" value={customer} sx={sxInputField} label="Pelanggan" fullWidth
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
                </Card>
            </Grid>
            <Grid size={{xs:12,md:8}}>
                <Card className='p-4 dark:bg-navy-800'>
                    <Grid container spacing={2}>
                        <Grid size={{xs :12, md:6}}>
                            <TextField size='small' variant="outlined" value={item} sx={sxInputField} label="Barang" fullWidth
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
                                size='small'
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
                              size='small'
                              InputLabelProps={{ shrink: true, }}
                              onChange={ e => handleSellPrice(e.target.value)}
                              sx={sxInputField} value={displaySellPrice} type='text' fullWidth variant="outlined" label="Harga Jual"/>
                        </Grid>

                        <Grid size={{xs :12, md:6}}>
                          <TextField 
                                size='small'
                                InputLabelProps={{ shrink: true, }}
                                InputProps={{
                                  readOnly : true
                                }}
                                name='selisih' sx={sxInputField} value={selisih} fullWidth variant="outlined" label="Selisih (%)"/>
                        </Grid>
                        
                        <Grid size={{xs : 12, md:6}}>
                          <TextField size='small' variant="outlined" sx={sxInputField} label="Pesanan (DP)" fullWidth
                              InputProps={{
                              endAdornment: (
                                  <InputAdornment position="end">
                                      <ModalPesanan setIdOrder={setIdOrder} id={idCustomer} onSelect={setAmountRequestOrder}/>
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
                          <TextField size='small' variant="outlined" sx={sxInputField} label="Sisa pembayaran" fullWidth
                              InputProps={{
                                  readOnly : true
                              }}
                              value={Intl.NumberFormat('en-US').format(sisaPembayaran)}
                              InputLabelProps={{
                                  shrink: true,
                              }}
                          />
                        </Grid>
                        <Grid size={{xs:12,md:6}}>
                          <TextField size='small' InputLabelProps={{ shrink: true, }} value={data.notes} onChange={handleInput} name='notes' type='text' sx={sxInputField} fullWidth variant="outlined" label="Notes"/>
                        </Grid>

                        <Grid size={{xs:12,md:6}}>
                          <TextField 
                          size='small'
                          InputLabelProps={{ shrink: true, }}
                          slotProps={{
                              input: {
                              readOnly: true,
                              }, 
                          }}
                          onChange={handleInput}
                          name='invoice_no' value={data.invoice_no} sx={sxInputField} fullWidth variant="outlined" label="Invoice No"/>
                        </Grid>
                        
                    </Grid>
                </Card>
            </Grid>
            <Grid size={6}>
              {/* <Button style={{marginRight : "6px"}} variant="contained" color="info">
                <Link href='/payment'>Kembali</Link>
              </Button> */}
              <Button onClick={handleAddPayment} variant='contained' style={{marginRight : "6px"}}>
                <FaPlus/> <span className='ml-2'>Tambah Pembayaran</span> 
              </Button>
              <Button onClick={() => handleSubmit("simpan")} variant='contained' color='secondary' style={{color : "white",marginRight : "6px"}}>
                <MdSave/> 
                Simpan</Button>
              <Button disabled={submitDisable} onClick={() => handleSubmit("submit")} style={{background : submitDisable ? "#e9ecef" : "#b89474",color : "white"}}>Submit</Button>
            </Grid>
            <Grid size={12}>
              <Grid container spacing={2}>
                {payments.map((payment, index) => (
                    <Grid size={{xs:12,md:6}} key={index}>
                        {!payment.is_deleted &&
                      <Card className='p-3 dark:bg-navy-800'>

                          <Grid container spacing={2}>
                            <Grid size={12}>
                              <h2 className='font-bold dark:text-white text-center'>
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
                                      size='small'
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
                                          <MenuItem key={0} value={0}><span className='p-3'></span></MenuItem>
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
                                          size='small'
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
                                            <MenuItem key={0} value={0}><span className='p-3'></span></MenuItem>
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
                                  size='small'
                                  InputLabelProps={{ shrink: true, }} 
                                  InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Button onClick={()=> checkVoucher(`WGC-${payment.voucher}`,index)} size="large" variant="contained"><FaSearch/></Button>
                                        </InputAdornment>
                                    ),
                                    startAdornment : (
                                      <InputAdornment position="start">
                                            <span className='dark:text-white'>WGC-</span>
                                      </InputAdornment>
                                    )
        
                                  }}
                                  value={payment.voucher}
                                  onChange={e => handlePaymentChange(index, "voucher", e.target.value)} type='text' sx={sxInputField} fullWidth variant="outlined" label="Masukan kode voucher :"/>
                                </Grid>
                              }
                              </>
                            )}

                            <Grid size={{xs:12, md: 6}}>
                              <TextField size='small' InputLabelProps={{ shrink: true, }} value={payment.tanggal} onChange={e => handlePaymentChange(index, "tanggal", e.target.value)} type='date' sx={sxInputField} fullWidth variant="outlined" label="Tanggal :"/>
                            </Grid>

                            <Grid size={{xs:12, md: 6}}>
                              <TextField size='small' InputLabelProps={{ shrink: true, }} value={payment.displayAmount} 
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
                      </Card>
                        }
                    </Grid>
                  ))}
              </Grid>
            </Grid>
        </Grid>
    </Layout>
  )
}

export default Form
