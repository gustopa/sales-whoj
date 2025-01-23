import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import { Button, Card, FormControl, Grid2 as Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useSnapshot } from 'valtio'
import state from '../../store/store'
function RequestOrder() {
  const [type,setType] = useState("")
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
  return (
    <Layout title="Pesanan" page="Pesanan">
      <Card className='p-4 dark:bg-navy-800' style={{width : "70%"}}>
        <Grid container spacing={2}>
            <Grid size={{xs:12,md:4}}>
              <TextField 
                  InputLabelProps={{ shrink: true, }}
                  sx={sxInputField} type='date' fullWidth variant="outlined" label="Dari Tanggal"/>
            </Grid>
            <Grid size={{xs:12,md:4}}>
              <TextField 
                  InputLabelProps={{ shrink: true, }}
                  sx={sxInputField} type='date' fullWidth variant="outlined" label="Sampai Tanggal"/>
            </Grid>
            <Grid size={{xs:12,md:4}}>
              <FormControl fullWidth sx={sxInputField}>
                <InputLabel shrink id="store" style={{color:"#b89474"}}>Type</InputLabel>
                <Select
                    displayEmpty
                    name='type'
                    labelId="type"
                    id="type-select"
                    label="Type"
                    value={type}
                >
                        <MenuItem value=""></MenuItem>
                        <MenuItem value="Excel">Excel</MenuItem>
                        <MenuItem value="PDF">PDF</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={12}>
              <Button disabled style={{background:"#b89474"}}>Generate</Button>
            </Grid>
        </Grid>
      </Card>
    </Layout>
  )
}

export default RequestOrder
