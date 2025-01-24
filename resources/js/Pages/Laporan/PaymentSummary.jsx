import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import { Card, TextField } from '@mui/material'
import { useSnapshot } from 'valtio'
import state from '../../store/store'
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
    {field : "doc_no", headerName : "Invoice No"},
    {field : "trans_date", headerName : "Tanggal"},
    {field : "sales_id_txt", headerName : "Sales"},
    {field : "customer_id_txt", headerName : "Pelanggan"},
    {field : "identity_code", headerName : "PLU"},
    {field : "inventory_id_txt", headerName : "Barang"},
    {field : "amount", headerName : "Pembayaran"},
  ])
  return (
    <Layout title="Pembayaran" page="Pembayaran">
        <Card className='dark:bg-navy-800 p-3' style={{width : "50%"}}>
          <TextField 
            InputLabelProps={{ shrink: true, }}
            sx={sxInputField} type='date' fullWidth variant="outlined" label="Tanggal"/>
        </Card>
        <Card className='dark:bg-navy-800 p-3 mt-2'>

        </Card>
    </Layout>
  )
}

export default PaymentSummary
