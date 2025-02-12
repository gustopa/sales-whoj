import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import { FormControl, InputLabel, MenuItem, Select, Grid2 as Grid, Card, Button, CircularProgress } from '@mui/material'
import { useSnapshot } from 'valtio'
import state from '../../store/store'
import { showAlert } from '../../helper'
function StockOpName({stores}) {
  const [store,setStore] = useState(0)
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
        const response = await axios.post("/report_stock/export", {
            store: store,
        }, {
            responseType: 'blob'
        });
        // Buat URL untuk Blob data
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'laporan-stock.pdf');
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
    <Layout title="Stock" page="Stock">
      <Card className='p-4 dark:bg-navy-800' style={{width : "40%"}}>
        <Grid container spacing={2}>
            <Grid size={{xs:12,md:12}}>
              <FormControl fullWidth sx={sxInputField}>
                <InputLabel shrink id="store" style={{color:"#b89474"}}>Store</InputLabel>
                <Select
                    size='small'
                    displayEmpty
                    name='store'
                    labelId="store"
                    id="store-select"
                    label="Store"
                    value={store}
                    onChange={e => setStore(e.target.value)}
                >
                        <MenuItem value=""><span className='p-3'></span></MenuItem>
                    {stores.map((a) => 
                        <MenuItem key={a.row_id} value={a.row_id}>{a.name}</MenuItem>
                    )}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={12}>
              <Button onClick={handleSubmit} variant="contained" disabled={loading} style={{background:"#b89474"}}>
                {loading ? <CircularProgress style={{width:'25px',height:'25px',color:'white'}}/> : "Generate"}
              </Button>
            </Grid>
        </Grid>
      </Card>
    </Layout>
  )
}

export default StockOpName
