import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import { Button, Card, CircularProgress, FormControl, Grid2 as Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { showAlert } from '../../helper'
function NotaPenjualan({craftsman}) {
  const [fromDate,setFromDate] = useState("")
  const [toDate,setToDate] = useState("")
  const [idCraftsman,setIdcraftsman] = useState(0)
  const [loading,setLoading] = useState(false)
  const handleSubmit = async () => {
    setLoading(true)
    try {
        const response = await axios.post("/report_craftsman/print", {
            from_date : fromDate,
            to_date : toDate,
            craftsman : craftsman
        }, {
            responseType: 'blob'
        });

        // Buat URL untuk Blob data
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'laporan-pengrajin.pdf');
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
    <Layout title="Report pengrajin" page="Report pengrajin">
      <Card className='p-4 dark:bg-navy-800' style={{width : "70%"}}>
        <Grid container spacing={2}>
            <Grid size={{xs:12,md:4}}>
              <TextField 
                  value={fromDate}
                  onChange={e => setFromDate(e.target.value)}
                  size='small'
                  InputLabelProps={{ shrink: true, }}
                   type='date' fullWidth variant="outlined" label="Dari Tanggal"/>
            </Grid>
            <Grid size={{xs:12,md:4}}>
              <TextField 
                  size='small'
                  value={toDate}
                  onChange={e => setToDate(e.target.value)}
                  InputLabelProps={{ shrink: true, }}
                   type='date' fullWidth variant="outlined" label="Sampai Tanggal"/>
            </Grid>
            <Grid size={{xs:12,md:4}}>
              <FormControl fullWidth >
                <InputLabel size='small' shrink id="store" style={{color:"#b89474"}}>Craftsman</InputLabel>
                <Select
                    size='small'
                    displayEmpty
                    name='craftsman'
                    labelId="craftsman"
                    id="craftsman-select"
                    label="Craftsman"
                    value={idCraftsman}
                >
                        <MenuItem value=""></MenuItem>
                        {craftsman.map(a => 
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
