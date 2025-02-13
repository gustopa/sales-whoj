import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import { Button, Card, CircularProgress, FormControl, Grid2 as Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useSnapshot } from 'valtio'
import state from '../../store/store'
import { showAlert } from '../../helper'
function RequestOrder() {
  const snap = useSnapshot(state)
  const [fromDate,setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [type,setType] = useState("PDF")
  const [loading,setLoading] = useState(false)
  const handleSubmit = async () => {
    setLoading(true)
    try {
        const response = await axios.post("/report_request_order/print", {
          from_date : fromDate,
          to_date : toDate,
          tipe : type
        }, {
            responseType: 'blob' 
        });
        // Buat URL untuk Blob data
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        if(type == "PDF"){
          link.setAttribute('download', 'laporan-pesanan.pdf'); // Nama file PDF
        }else{
          link.setAttribute('download', 'laporan-pesanan.xlsx'); // Nama file PDF
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
    <Layout title="Pesanan" page="Pesanan">
      <Card className='p-4 dark:bg-navy-800' style={{width : "70%"}}>
        <Grid container spacing={2}>
            <Grid size={{xs:12,md:4}}>
              <TextField 
                  size='small'
                  InputLabelProps={{ shrink: true, }}
                  sx={{}} type='date' value={fromDate} onChange={e => setFromDate(e.target.value)} fullWidth variant="outlined" label="Dari Tanggal"/>
            </Grid>
            <Grid size={{xs:12,md:4}}>
              <TextField 
                  size='small'
                  InputLabelProps={{ shrink: true, }}
                  sx={{}} type='date' value={toDate} onChange={e => setToDate(e.target.value)} fullWidth variant="outlined" label="Sampai Tanggal"/>
            </Grid>
            <Grid size={{xs:12,md:4}}>
              <FormControl fullWidth sx={{}}>
                <InputLabel shrink id="store" style={{color:"#b89474"}}>Type</InputLabel>
                <Select
                    size='small'
                    displayEmpty
                    name='type'
                    labelId="type"
                    id="type-select"
                    label="Type"
                    value={type}
                    onChange={e => setType(e.target.value)}
                >
                        <MenuItem value="Excel">Excel</MenuItem>
                        <MenuItem value="PDF">PDF</MenuItem>
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

export default RequestOrder
