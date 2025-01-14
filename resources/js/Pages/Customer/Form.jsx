import React, { useState } from 'react'
import Layout from '../Layouts/Layout';
import { Grid2 as Grid, TextField , Box, FormControl,InputLabel,Select, MenuItem ,InputBase, Paper, Button} from '@mui/material';

import { Link, useForm } from '@inertiajs/react';
import ModalCity from './ModalCity';
import { useSnapshot } from 'valtio';
import state from '../../store/store';
import FormDocument from './FormDokumen/FormDocument';
import FormUkuran from './FormUkuran/FormUkuran';
import axios from 'axios';
import Swal from 'sweetalert2';
function Form({customer,city}) {
  const snap = useSnapshot(state)
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
  
  const listAgama = ["","Budha","Hindu","Islam","Katolik","Khonghucu","Kristen"]
  const ListGender = ["Pria","Wanita"]
  const [cityName, setCityName] = useState(customer.city_name == null ? "" : customer.city_name)
  const handleInput = (e) => {
    const {name, value} = e.target
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  
  const handleSimpan = async () => {
    console.log(data.name);
    
    if(data.name == "" || data.name == null){
      Swal.fire({
        text : "Gagal",
        icon : "warning",
        text : "Nama harus diisi"
      })
      return false;
    }
    if(data.jenis_kelamin == "" || data.jenis_kelamin == null){
      Swal.fire({
        text : "Gagal",
        icon : "warning",
        text : "Gender harus diisi"
      })
      return false;
    }
    if(data.city_id == "" || data.city_id == null){
      Swal.fire({
        text : "Gagal",
        icon : "warning",
        text : "Kota harus diisi"
      })
      return false;
    }
    
    try{
      const response = await axios.post('/customer/save',{
        row_id : customer.row_id,
        ...data,
        action : "simpan"
      })
      const response_data = await response.data
      console.log(response_data);
      Swal.fire({
        text : "Berhasil",
        icon : "success",
        text : "Customer berhasiil disimpan"
      })
    }catch(err){
      Swal.fire({
        text : "Gagal",
        icon : "error",
        text : "Data gagal disimpan"
      })
    }
    
  }

  const handleSubmit = async () => {
    if(data.name == "" || data.name == null){
      Swal.fire({
        text : "Gagal",
        icon : "warning",
        text : "Nama harus diisi"
      })
      return false;
    }
    if(data.jenis_kelamin == "" || data.jenis_kelamin == null){
      Swal.fire({
        text : "Gagal",
        icon : "warning",
        text : "Gender harus diisi"
      })
      return false;
    }
    if(data.city_id == "" || data.city_id == null){
      Swal.fire({
        text : "Gagal",
        icon : "warning",
        text : "Kota harus diisi"
      })
      return false;
    }
    
    try{
      const response = await axios.post('/customer/save',{
        row_id : customer.row_id,
        ...data,
        action : "submit"
      })
      const response_data = await response.data
      console.log(response_data);
      Swal.fire({
        text : "Berhasil",
        icon : "success",
        text : "Data berhasiil disubmit"
      })
    }catch(err){
      Swal.fire({
        text : "Gagal",
        icon : "error",
        text : "Data gagal disubmit"
      })
    }
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
            <TextField 
            InputLabelProps={{
              shrink: true,
            }} 
            onChange={handleInput} name='name' fullWidth color='#b89474' defaultValue={data.name} label={<h1>Nama <span style={{color:'red',fontSize:'24px'}}>*</span></h1>} variant="outlined" sx={sxInputField} />
          </Grid>

          <Grid size={{xs:12,md:4}}>
            <TextField 
            InputLabelProps={{
              shrink: true,
            }} 
            onChange={handleInput} fullWidth name='tgl_lahir' type='date' defaultValue={data.tgl_lahir} focused  label="Tanggal Lahir" variant="outlined" sx={sxInputField} />
          </Grid>

          <Grid size={{xs:12,md:4}}>
            <TextField 
            InputLabelProps={{
              shrink: true,
            }} 
            onChange={handleInput} fullWidth name='no_hp' color='#b89474' defaultValue={customer.hp_bo} label="HP No" variant="outlined" sx={sxInputField} />
          </Grid>
          
          <Grid size={{xs:12,md:4}} sx={sxInputField}>
            <FormControl fullWidth>
              <InputLabel shrink id="agama" style={{color:"#b89474"}}>Agama</InputLabel>
              <Select
                displayEmpty
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
              <InputLabel shrink id="jenis_kelamin" style={{color:"#b89474"}}>Gender<span style={{color:'red',fontSize:'24px'}}>*</span></InputLabel>
              <Select
                displayEmpty
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
            <TextField 
            InputLabelProps={{
              shrink: true,
            }} 
            onChange={handleInput} fullWidth name='member_PI' color='#b89474' defaultValue={data.member_PI} label="ID Member PI" variant="outlined" sx={sxInputField} />
          </Grid>

          <Grid size={{xs:12,md:4}}>
            <TextField 
            InputLabelProps={{
              shrink: true,
            }} 
            onChange={handleInput} fullWidth name='instagram' color='#b89474' defaultValue={data.instagram} label="Instagram " variant="outlined" sx={sxInputField} />
          </Grid>

          <Grid size={{xs:12,md:4}}>
            <TextField 
            InputLabelProps={{
              shrink: true,
            }} 
            onChange={handleInput} fullWidth name='tgl_datang' type='date' defaultValue={data.tgl_datang} focused label="Tanggal Datang" variant="outlined" sx={sxInputField} />
          </Grid>

          <Grid size={{xs:12,md:4}}>
            <TextField 
            InputLabelProps={{
              shrink: true,
            }} 
            minRows={2} multiline maxRows={4} onChange={handleInput} fullWidth name='alamat' color='#b89474' defaultValue={data.alamat} label="Alamat" variant="outlined" sx={sxInputField} />
          </Grid>

          <Grid size={{xs:12,md:4}}>
            <Paper
              component="form"
              sx={{ display: 'flex', alignItems: 'center', boxShadow : "none",background : "transparent" }}
            >
              <InputBase
                sx={{ flex: 1, border : "1px solid #b89474", boxShadow : "none",padding : "12px 12px",borderRadius : "5px 0 0 5px",color:snap.theme == 'dark' ? 'white' : 'dark',borderRight : 'none' }}
                value={cityName}
                placeholder='Kota*'
                
                inputProps={{ 'label': 'city', 'readOnly' : true }}
              />
              <ModalCity setCity={setCityName} setData={setData} city={city}/>
            </Paper>
          </Grid>

          <Grid size={{xs:12,md:4}}>
            <Grid container justifyContent="center" spacing={1}>
              <Grid size={{xs:4,md:4}} justifyContent="center">
                <Link href="/customer">
                  <Button variant="contained" style={{background: "#b89474"}}>Kembali</Button>
                </Link>
              </Grid>
              <Grid size={{xs:4,md:4}}>
                <Button onClick={handleSimpan} variant="contained" style={{background: "#b89474"}}>Simpan</Button>
              </Grid>
              <Grid size={{xs:4,md:4}}>
                <Button onClick={handleSubmit} variant="contained" style={{background: "#b89474"}}>Submit</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <FormUkuran customer={customer}/>
      <FormDocument customer={customer} />
    </Layout>
  )
}

export default Form
