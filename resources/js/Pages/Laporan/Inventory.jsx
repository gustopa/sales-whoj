import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import { Button, Card, FormControl, Grid2 as Grid, InputLabel, MenuItem, Select } from '@mui/material'
import { useSnapshot } from 'valtio'
import state from '../../store/store'
function Inventory({list}) {
  const [user,setUser] = useState(0)
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
    <Layout title="Input Inventory" page="Input Inventory">
      <Card className='dark:bg-navy-800 p-3'>
        <Grid container spacing={2}>
          <Grid size={{xs:12,md:4}}>
            <FormControl fullWidth sx={sxInputField}>
              <InputLabel shrink id="store" style={{color:"#b89474"}}>Session id</InputLabel>
              <Select
                  displayEmpty
                  name='tipe'
                  labelId="tipe"
                  id="tipe-select"
                  label="Session id"
                  value={user}
              >
                      <MenuItem key={0} value={0}>tes</MenuItem>
                      <MenuItem key={1} value={1}>tes</MenuItem>
                  {/* {list.map((a,i) => 
                      <MenuItem key={i} value={a.ses_id}>{a.ses_id} - {a.modified_by}({a.modified_date})</MenuItem>
                  )} */}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{xs:12,md:4}}>
            <Button disabled variant='contained' style={{background : "#b89474"}}>Generate</Button>
          </Grid>
        </Grid>

      </Card>
    </Layout>
  )
}

export default Inventory
