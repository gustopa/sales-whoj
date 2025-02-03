import React, { useRef, useState } from 'react'
import Layout from '../Layouts/Layout'
import { Card, TextField } from '@mui/material'
import { useSnapshot } from 'valtio'
import state from '../../store/store'
import Table from '../Components/Table'
import ModalInvoice from '../Components/ModalInvoice'
function PaymentSummary() {
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

  
  const [columnDefs] = useState([
    {field : "doc_no", headerName : "Invoice No",
      cellRenderer : params => <ModalInvoice params={params} row_id={params.data?.row_id}/>
    },
    {field : "trans_date", headerName : "Tanggal"},
    {field : "sales_id_txt", headerName : "Sales"},
    {field : "customer_id_txt", headerName : "Pelanggan"},
    {field : "identity_code", headerName : "PLU"},
    {field : "inventory_id_txt", headerName : "Barang"},
    {field : "amount", headerName : "Pembayaran", cellRenderer : params => {
      return (Intl.NumberFormat("en-US").format(params.value))}
    },
  ])
  // console.log(total);
  
  const getCurrentDate = () => {
    return new Date().toISOString().split('T')[0];
  };
  const [tanggal,setTanggal] = useState(getCurrentDate())
  
  return (
    <Layout title="Pembayaran" page="Pembayaran">
        <Card className='dark:bg-navy-800 p-3' style={{width : "50%"}}>
          <TextField 
            InputLabelProps={{ shrink: true, }}
            sx={sxInputField} value={tanggal} onChange={e => setTanggal(e.target.value)} type='date' fullWidth variant="outlined" label="Tanggal"/>
        </Card>

        <Card className='dark:bg-navy-800 p-3 mt-2'>
          <h2 className='text-2xl dark:text-white font-bold mb-2'>TUNAI</h2>
          <Table columnDefs={columnDefs} endpoint={`/payment_summary/getData/${tanggal}/1`}/>
        </Card>

        <Card className='dark:bg-navy-800 p-3 mt-2'>
          <h2 className='text-2xl dark:text-white font-bold mb-2'>KARTU DEBIT BCA</h2>
          <Table columnDefs={columnDefs} endpoint={`/payment_summary/getData/${tanggal}/3`}/>
        </Card>

        <Card className='dark:bg-navy-800 p-3 mt-2'>
          <h2 className='text-2xl dark:text-white font-bold mb-2'>KARTU KREDIT BCA</h2>
          <Table columnDefs={columnDefs} endpoint={`/payment_summary/getData/${tanggal}/4`}/>
        </Card>

        <Card className='dark:bg-navy-800 p-3 mt-2'>
          <h2 className='text-2xl dark:text-white font-bold mb-2'>TRANSFER</h2>
          <Table columnDefs={columnDefs} endpoint={`/payment_summary/getData/${tanggal}/7`}/>
        </Card>

        <Card className='dark:bg-navy-800 p-3 mt-2'>
          <h2 className='text-2xl dark:text-white font-bold mb-2'>KARTU KREDIT MANDIRI</h2>
          <Table columnDefs={columnDefs} endpoint={`/payment_summary/getData/${tanggal}/8`}/>
        </Card>

        <Card className='dark:bg-navy-800 p-3 mt-2'>
          <h2 className='text-2xl dark:text-white font-bold mb-2'>KARTU KREDIT CIMB</h2>
          <Table columnDefs={columnDefs} endpoint={`/payment_summary/getData/${tanggal}/9`}/>
        </Card>

    </Layout>
  )
}

export default PaymentSummary
