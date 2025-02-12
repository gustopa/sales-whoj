import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import { Button, Card, CircularProgress, FormControl, Grid2 as Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useSnapshot } from 'valtio'
import {showAlert} from '../../helper'
import state from '../../store/store'
import axios from 'axios'
function Penjualan({sales,items}) {
  const [fromDate,setFromDate] =  useState("");
  const [toDate,setToDate] =  useState("");
  const [idSales,setIdSales] = useState(0)
  const [idItem,setIdItem] = useState(0)
  const [type,setType] = useState("")
  const types = ["Excel","PDF"]
  const snap = useSnapshot(state)
  const [loading,setLoading] = useState(false)
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
  const handleSubmit = async () => {
    setLoading(true)
    try {
        const response = await axios.post("/report_sellout/export", {
            from_date: fromDate,
            to_date: toDate,
            sales_id: idSales,
            item_id: idItem,
            tipe: type
        }, {
            responseType: 'blob' // Penting! Supaya respons diperlakukan sebagai file
        });

        // Buat URL untuk Blob data
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        if(type == "PDF"){
          link.setAttribute('download', 'laporan-penjualan.pdf'); // Nama file PDF
        }else{
          link.setAttribute('download', 'laporan-penjualan.xlsx'); // Nama file PDF
        }
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } catch (err) {
        console.log(err);
        showAlert('Error!', "Terjadi kesalahan, silakan coba lagi", "error");
    }finally{
      setLoading(false)
    }
};

  return (
    <Layout title="Sell Out" page="Sell Out">
      <Card className='dark:bg-navy-800 p-3'>

        <Grid container spacing={2} size={{xs:12,md:8}}>
          <Grid size={{xs:12,md:4}}>
            <TextField
                size='small' 
                InputLabelProps={{ shrink: true, }}
                sx={sxInputField} value={fromDate} onChange={e => setFromDate(e.target.value)} type='date' fullWidth variant="outlined" label="Dari Tanggal"/>
          </Grid>
          <Grid size={{xs:12,md:4}}>
            <TextField
                size='small' 
                InputLabelProps={{ shrink: true, }}
                sx={sxInputField} type='date' value={toDate} onChange={e => setToDate(e.target.value)} fullWidth variant="outlined" label="Sampai Tanggal"/>
          </Grid>
          <Grid size={{xs:12,md:4}}>
            <FormControl fullWidth sx={sxInputField}>
              <InputLabel shrink id="store" style={{color:"#b89474"}}>Sales</InputLabel>
              <Select
                  size='small'
                  displayEmpty
                  name='sales'
                  labelId="sales"
                  id="sales-select"
                  label="Sales"
                  value={idSales}
                  onChange={e => setIdSales(e.target.value)}
              >
                      <MenuItem key={0} value={0}></MenuItem>
                  {sales.map(a => 
                      <MenuItem key={a.row_id} value={a.row_id}>{a.name}</MenuItem>
                  )}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{xs:12,md:4}}>
            <FormControl fullWidth sx={sxInputField}>
              <InputLabel shrink id="store" style={{color:"#b89474"}}>Item</InputLabel>
              <Select
                  size='small'
                  displayEmpty
                  name='item'
                  labelId="item"
                  id="item-select"
                  label="Item"
                  value={idItem}
                  onChange={e => setIdItem(e.target.value)}
              >
                      <MenuItem key={0} value={0}></MenuItem>
                  {items.map(a => 
                      <MenuItem key={a.row_id} value={a.row_id}>{a.name}</MenuItem>
                  )}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{xs:12,md:4}}>
            <FormControl fullWidth sx={sxInputField}>
              <InputLabel shrink id="store" style={{color:"#b89474"}}>Type</InputLabel>
              <Select
                  size='small'
                  displayEmpty
                  name='tipe'
                  labelId="tipe"
                  id="tipe-select"
                  label="Type"
                  value={type}
                  onChange={e => setType(e.target.value)}
              >
                      <MenuItem key={0} value={0}></MenuItem>
                  {types.map((a,i) => 
                      <MenuItem key={i} value={a}>{a}</MenuItem>
                  )}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{xs:12,md:4}}>
            <Button onClick={handleSubmit} disabled={loading} variant='contained' style={{background : "#b89474",color:'white'}}>
              {loading ? <CircularProgress style={{width:'25px',height:'25px',color:'white'}}/> : "Export"}
              
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Layout>
  )
}

export default Penjualan
