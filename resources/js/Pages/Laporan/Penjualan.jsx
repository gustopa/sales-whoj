import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import { Button, FormControl, Grid2 as Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useSnapshot } from 'valtio'
import state from '../../store/store'
function Penjualan({sales,items}) {
  const [idSales,setIdSales] = useState(0)
  const [idItem,setIdItem] = useState(0)
  const [type,setType] = useState("")
  const types = ["Excel","PDF"]
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
    <Layout title="Sell Out" page="Sell Out">
      <Grid container spacing={2} size={{xs:12,md:8}}>
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
            <InputLabel shrink id="store" style={{color:"#b89474"}}>Sales</InputLabel>
            <Select
                displayEmpty
                name='sales'
                labelId="sales"
                id="sales-select"
                label="Sales"
                value={idSales}
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
                displayEmpty
                name='item'
                labelId="item"
                id="item-select"
                label="Item"
                value={idItem}
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
                displayEmpty
                name='tipe'
                labelId="tipe"
                id="tipe-select"
                label="Type"
                value={idItem}
            >
                    <MenuItem key={0} value={0}></MenuItem>
                {types.map((a,i) => 
                    <MenuItem key={i} value={a}>{a}</MenuItem>
                )}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{xs:12,md:4}}>
          <Button disabled variant='contained' style={{background : "#b89474"}}>Export</Button>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Penjualan
