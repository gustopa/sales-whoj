import React, { useEffect, useState } from 'react'
import Layout from '../Layouts/Layout'
import { Button, Card, CircularProgress, FormControl, Grid2 as Grid, InputLabel, MenuItem, Select } from '@mui/material'
import {showAlert} from '../../helper'
import axios from 'axios'
function Inventory({list}) {
  const [user,setUser] = useState(0)
  const [dataSession,setDataSession] = useState([])
  const [loading,setLoading] = useState(false)
  const getDataSession = async ()=>{
    try{
      const response = await axios.get('/report_inventory/getSessionList')
      const responseData = await response.data
      setDataSession(responseData)
    }catch(err){
      console.log(err)
      showAlert('Gagal!',"Terjadi kesalahan silahkan coba lagi","error")
    }
  }

  useEffect(()=>{
    getDataSession()
  },[])

  const handleSubmit = async () => {
    if(user == 0) return showAlert('Warning!',"Session id tidak boleh kosong","warning")
    setLoading(true)
    try {
        const response = await axios.post("/report_inventory/print", {
            session : user.split('-')[0]
        }, {
            responseType: 'blob'
        });

        // Buat URL untuk Blob data
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'laporan-inventory.pdf');
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
    <Layout title="Input Inventory" page="Input Inventory">
      <Card className='dark:bg-navy-800 p-3'>
        <Grid container spacing={2}>
          <Grid size={{xs:12,md:4}}>
            <FormControl fullWidth>
              <InputLabel shrink id="store" style={{color:"#b89474"}}>Session id</InputLabel>
              <Select
                  size='small'
                  displayEmpty
                  name='tipe'
                  labelId="tipe"
                  id="tipe-select"
                  label="Session id"
                  value={user}
                  onChange={e => setUser(e.target.value)}
              >
                          <MenuItem key={0} value={0}><span className='p-3'></span></MenuItem>
                      {dataSession.map((a,i) => 
                          <MenuItem key={i} value={`${a.ses_id}-${a.modified_by}-${a.modified_date}`}>{a.ses_id} - {a.modified_by}({a.modified_date})</MenuItem>
                      )}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{xs:12,md:4}}>
            <Button disabled={loading} onClick={handleSubmit} variant='contained' style={{background : "#b89474"}}>
              {loading ? <CircularProgress style={{width:'25px',height:'25px',color:'white'}}/> : "Generate"}
            </Button>
          </Grid>
        </Grid>

      </Card>
    </Layout>
  )
}

export default Inventory
