import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import { Card, Grid2 as Grid, TextField } from '@mui/material';
import { useSnapshot } from 'valtio';
import state from '../../store/store';
function WebInfo({access,data}) {
    const snap = useSnapshot(state)
    const [dataForm,setDataForm] = useState({
      application_name : data.application_name,
      web_title : data.web_title,
      web_description : data.web_description,
      format_tanggal : data.format_date,
      email_admin : data.email_admin,
      email_from : data.email_from,
      email_contact : data.email_contact_name,
      smtp_host : data.smtp_host,
      smtp_port : data.smtp_port,
      smtp_user : data.smtp_user,
      smtp_password : data.smtp_pass,
      file_logo_w : data.file_logo_w,
      file_logo_c : data.file_logo_c,
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

    const handleInput = (e) => {
      const {name, value} = e.target
      
      setDataForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  return (
    <Layout title="Web Info" page="Web Info">
      <Card className='dark:bg-navy-800 p-4'>
        <Grid container spacing={2}>
          <Grid size={{xs:12, md: 4}}>
            <TextField 
              InputLabelProps={{ shrink: true, }}
              onChange={handleInput}
              name='application_name' value={dataForm.application_name} sx={sxInputField} fullWidth variant="outlined" label="Nama Aplikasi"/>
          </Grid>
          <Grid size={{xs:12, md: 4}}>
            <TextField 
              InputLabelProps={{ shrink: true, }}
              onChange={handleInput}
              name='web_title' value={dataForm.web_title} sx={sxInputField} fullWidth variant="outlined" label="Judul Web"/>
          </Grid>
          <Grid size={{xs:12, md: 4}}>
            <TextField 
              InputLabelProps={{ shrink: true, }}
              onChange={handleInput}
              name='web_description' value={dataForm.web_description} sx={sxInputField} fullWidth variant="outlined" label="Deskripsi Web"/>
          </Grid>
          <Grid size={{xs:12, md: 4}}>
            <TextField 
              InputLabelProps={{ shrink: true, }}
              onChange={handleInput}
              name='format_tanggal' value={dataForm.format_tanggal} sx={sxInputField} fullWidth variant="outlined" label="Format Tanggal"/>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
            <Grid size={12}>
                <h2 className='text-1xl font-bold mt-3 dark:text-white'>EMAIL</h2>
            </Grid>
            <Grid size={{xs:6,md:4}}>
              <TextField 
                InputLabelProps={{ shrink: true, }}
                onChange={handleInput}
                name='email_admin' value={dataForm.email_admin} sx={sxInputField} fullWidth variant="outlined" label="Email Admin"/>
            </Grid>
            <Grid size={{xs:6,md:4}}>
              <TextField 
                InputLabelProps={{ shrink: true, }}
                onChange={handleInput}
                name='email_from' value={dataForm.email_from} sx={sxInputField} fullWidth variant="outlined" label="Email Dari"/>
            </Grid>
            <Grid size={{xs:6,md:4}}>
              <TextField 
                InputLabelProps={{ shrink: true, }}
                onChange={handleInput}
                name='email_contact' value={dataForm.email_contact} sx={sxInputField} fullWidth variant="outlined" label="Nama Kontak Email"/>
            </Grid>
            <Grid size={{xs:6,md:4}}>
              <TextField 
                InputLabelProps={{ shrink: true, }}
                onChange={handleInput}
                name='smtp_host' value={dataForm.smtp_host} sx={sxInputField} fullWidth variant="outlined" label="SMTP Host"/>
            </Grid>
            <Grid size={{xs:6,md:4}}>
              <TextField 
                InputLabelProps={{ shrink: true, }}
                onChange={handleInput}
                name='smtp_port' value={dataForm.smtp_port} sx={sxInputField} fullWidth variant="outlined" label="SMTP Port"/>
            </Grid>
            <Grid size={{xs:6,md:4}}>
              <TextField 
                InputLabelProps={{ shrink: true, }}
                onChange={handleInput}
                name='smtp_user' value={dataForm.smtp_user} sx={sxInputField} fullWidth variant="outlined" label="SMTP User"/>
            </Grid>
            <Grid size={{xs:6,md:4}}>
              <TextField 
                InputLabelProps={{ shrink: true, }}
                onChange={handleInput}
                name='smtp_password' value={dataForm.smtp_password} sx={sxInputField} fullWidth variant="outlined" label="SMTP Password"/>
            </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid size={12}>
            <h2 className='text-1xl font-bold dark:text-white mt-3'>ASSETS</h2>
          </Grid>
          <Grid size={{xs : 12, md:4}}>
            <TextField 
              InputLabelProps={{ shrink: true, }}
              onChange={handleInput}
              name='file_logo_w' sx={sxInputField} fullWidth type='file' variant="outlined" label="Logo Putih"
            />
            <Card className='p-4 mt-2' style={{background : "#f0f0f0"}}>
              <img src={`https://system-mahakarya.com/assets/uploaded/${data.file_logo_w}`} alt="" />
            </Card>
          </Grid>
          <Grid size={{xs : 12, md:4}}>
            <TextField 
              InputLabelProps={{ shrink: true, }}
              onChange={handleInput}
              name='file_logo_c' sx={sxInputField} fullWidth type='file' variant="outlined" label="Logo Berwarna"
            />
            <Card className='p-4 mt-2' style={{background : "#f0f0f0"}}>
              <img src={`https://system-mahakarya.com/assets/uploaded/${data.file_logo_c}`} alt="" />
            </Card>
          </Grid>
          {/* <Grid size={{xs : 12, md:4}}>
            <TextField 
              InputLabelProps={{ shrink: true, }}
              onChange={handleInput}
              name='file_icon' sx={sxInputField} fullWidth type='file' variant="outlined" label="Icon"
            />
            <Card className='p-4 mt-2' style={{background : "#f0f0f0"}}>
              <img src={`https://system-mahakarya.com/assets/uploaded/${data.file_icon}`} alt="" />
            </Card>
          </Grid> */}
        </Grid>
      </Card>
    </Layout>
  )
}

export default WebInfo
