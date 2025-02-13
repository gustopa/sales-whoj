import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import { Button, Card, CircularProgress, FormControl, Grid2 as Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useSnapshot } from 'valtio'
import state from '../../store/store'
import { showAlert } from '../../helper'
function NotaPenjualan({sales}) {
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

  const [fromDate,setFromDate] = useState("")
  const [toDate,setToDate] = useState("")
  const [idSales,setIdSales] = useState(0)

  const [loading,setLoading] = useState(false)
  const handleSubmit = async () => {
    setLoading(true)
    try {
        const response = await axios.post("/report_nota_penjualan/print", {
            from_date : fromDate,
            to_date : toDate,
            sales : idSales
        }, {
            responseType: 'blob'
        });

        // Buat URL untuk Blob data
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'nota-penjualan.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (err) {
        console.log(err);
        showAlert('Error!', "Terjadi kesalahan, silakan coba lagi", "error");
    }finally{
      setLoading(false)
    }
  }
  return (
    <Layout title="Nota penjualan" page="Nota penjualan">
      <Card className='p-4 dark:bg-navy-800' style={{width : "70%"}}>
        <Grid container spacing={2}>
            <Grid size={{xs:12,md:4}}>
              <TextField 
                  size='small'
                  InputLabelProps={{ shrink: true, }}
                  sx={sxInputField} type='date' onChange={e => setFromDate(e.target.value)} fullWidth variant="outlined" label="Dari Tanggal"/>
            </Grid>
            <Grid size={{xs:12,md:4}}>
              <TextField 
                  size='small'
                  InputLabelProps={{ shrink: true, }}
                  sx={sxInputField} onChange={e => setToDate(e.target.value)} type='date' fullWidth variant="outlined" label="Sampai Tanggal"/>
            </Grid>
            <Grid size={{xs:12,md:4}}>
              <FormControl fullWidth sx={sxInputField}>
                <InputLabel shrink id="store" style={{color:"#b89474"}}>Sales</InputLabel>
                <Select
                    size='small'
                    displayEmpty
                    name='type'
                    labelId="type"
                    id="type-select"
                    label="Type"
                    value={idSales}
                    onChange={e => setIdSales(e.target.value)}
                >
                        <MenuItem value=""></MenuItem>
                        {sales.map(a => 
                            <MenuItem key={a.row_id} value={a.row_id}>{a.name}</MenuItem>
                        )}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={12}>
              <Button onClick={handleSubmit} disabled={loading} style={{background:"#b89474",color:'white'}}>
                {loading ? <CircularProgress style={{width:'25px',height:'25px',color:'white'}}/> : "Generate"}
              </Button>
            </Grid>
        </Grid>
      </Card>
    </Layout>
  )
}

export default NotaPenjualan
