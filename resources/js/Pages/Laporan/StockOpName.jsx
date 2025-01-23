import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import { FormControl, InputLabel, MenuItem, Select, Grid2 as Grid, Card, Button } from '@mui/material'
import { useSnapshot } from 'valtio'
import state from '../../store/store'
function StockOpName({stores}) {
  const [store,setStore] = useState(0)
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
    <Layout title="Stock" page="Stock">
      <Card className='p-4 dark:bg-navy-800' style={{width : "40%"}}>
        <Grid container spacing={2}>
            <Grid size={{xs:12,md:12}}>
              <FormControl fullWidth sx={sxInputField}>
                <InputLabel shrink id="store" style={{color:"#b89474"}}>Store</InputLabel>
                <Select
                    displayEmpty
                    name='store'
                    labelId="store"
                    id="store-select"
                    label="Store"
                    value={store}
                >
                        <MenuItem key={0} value={0}></MenuItem>
                    {stores.map((a) => 
                        <MenuItem key={a.row_id} value={a.row_id}>{a.name}</MenuItem>
                    )}
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

export default StockOpName
