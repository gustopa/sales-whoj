import React, { useState } from 'react'
import Layout from '../Layouts/Layout';
import { Grid2 as Grid, TextField , Box, FormControl,InputLabel,Select, MenuItem, IconButton,InputBase, Paper} from '@mui/material';

import { useForm } from '@inertiajs/react';
import ModalCity from './ModalCity';

function Form({session,customer,city}) {
  console.log(city);
  const [agama,setAgama] = useState("")
  const {data,setData,post} = useForm({
    name : customer.name == null ? "" : customer.name,
    tgl_lahir : customer.birth_date == null ? "" : customer.birth_date,
    no_hp : customer.hp_bo == null ? "" : customer.hp_bo,
    agama : customer.religion == null ? "" : customer.religion,
    jenis_kelamin : customer.gender == null ? "" : customer.gender,
    member_PI : customer.pi_no == null ? "" : customer.pi_no,
    instagram : customer.instagram == null ? "" : customer.instagram,
    tgl_datang : customer.visit_date == null ? "" : customer.visit_date,
    alamat : customer.address == null ? "" : customer.address,
    city_id : customer.city_id == null ? "" : customer.city_id,
  })

  
  const sxInputField = {
    "& .MuiFormLable-root" : {
      color : "#b89474 !important"
    },
    "& .MuiOutlinedInput-root": {
      color: "#b89474",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#b89474",
        borderWidth: "1px",
      },
    },
    "& .MuiInputLabel-outlined": {
      color: "#b89474",
    },
    '& .MuiInputBase-input': {
      color: '#b89474', 
    },
    '& .MuiOutlinedInput-root': {
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
        color: '#b89474', 
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
  const listAgama = ["","Budha","Hindu","Islam","Katolik","Khonghucu","Kristen"]
  const ListGender = ["Pria","Wanita"]
  const handleInput = (e) => {
    const {name, value} = e.target
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  return (
    <Layout title="Form Customer" page="Form Customer">
      <Box className="dark:bg-[#111c44] bg-white p-5" style={{borderRadius:"10px"}}>
        <Grid container spacing={2}>
          <Grid size={{xs:12,md:4}}>
            <TextField slotProps={{
              input: {
                readOnly: true,
              },
            }} fullWidth defaultValue={customer.customer_no} name='row_id' label="Pelanggan No" variant="outlined" sx={sxInputField} />
          </Grid>

          <Grid size={{xs:12,md:4}}>
            <TextField onChange={handleInput} name='nama' fullWidth color='#b89474' defaultValue={data.name} label="Nama" variant="outlined" sx={sxInputField} />
          </Grid>

          <Grid size={{xs:12,md:4}}>
            <TextField onChange={handleInput} fullWidth name='tanggal_lahir' type='date' defaultValue={data.tgl_lahir} focused  label="Tanggal Lahir" variant="outlined" sx={sxInputField} />
          </Grid>

          <Grid size={{xs:12,md:4}}>
            <TextField onChange={handleInput} fullWidth name='no_hp' color='#b89474' defaultValue={customer.hp_bo} label="HP No" variant="outlined" sx={sxInputField} />
          </Grid>
          
          <Grid size={{xs:12,md:4}} sx={sxInputField}>
            <FormControl fullWidth>
              <InputLabel id="agama" style={{color:"#b89474"}}>Agama</InputLabel>
              <Select
                sx={sxInputField}
                name='agama'
                labelId="agama"
                id="agama-select"
                value={data.agama}
                label="Agama"
                onChange={handleInput}
              >
                {listAgama.map((a,index) => 
                  <MenuItem key={index} value={a}>{a}</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{xs:12,md:4}}>
            <FormControl fullWidth sx={sxInputField}>
              <InputLabel id="jenis_kelamin" style={{color:"#b89474"}}>Gender</InputLabel>
              <Select
                sx={sxInputField}
                name='jenis_kelamin'
                labelId="jenis_kelamin"
                id="jenis_kelamin_select"
                value={data.jenis_kelamin}
                label="Agama"
                onChange={handleInput}
              >
                {ListGender.map((a,index) => 
                  <MenuItem key={index} value={a}>{a}</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{xs:12,md:4}}>
            <TextField onChange={handleInput} fullWidth name='member_PI' color='#b89474' defaultValue={data.member_PI} label="ID Member PI" variant="outlined" sx={sxInputField} />
          </Grid>

          <Grid size={{xs:12,md:4}}>
            <TextField onChange={handleInput} fullWidth name='instagram' color='#b89474' defaultValue={data.instagram} label="Instagram " variant="outlined" sx={sxInputField} />
          </Grid>

          <Grid size={{xs:12,md:4}}>
            <TextField onChange={handleInput} fullWidth name='tgl_datang' type='date' defaultValue={data.tgl_datang} focused label="Tanggal Datang" variant="outlined" sx={sxInputField} />
          </Grid>

          <Grid size={{xs:12,md:4}}>
            <TextField minRows={2} multiline maxRows={4} onChange={handleInput} fullWidth name='alamat' color='#b89474' defaultValue={data.alamat} label="Alamat" variant="outlined" sx={sxInputField} />
          </Grid>

          <Grid size={{xs:12,md:4}}>
            <Paper
              component="form"
              sx={{ display: 'flex', alignItems: 'center', boxShadow : "none",background : "transparent" }}
            >
              <InputBase
                sx={{ flex: 1, border : "1px solid #b89474", boxShadow : "none",padding : "12px 12px",borderRadius : "5px 0 0 5px",color:"#b89474",borderRight : 'none' }}
                defaultValue={customer.city_name}
                placeholder='Kota'
                inputProps={{ 'aria-label': 'city', 'readOnly' : true }}
              />
              <ModalCity city={city}/>
            </Paper>
          </Grid>

          
        </Grid>
      </Box>
    </Layout>
  )
}

export default Form
