import React, { useState } from 'react'
import { Grid2 as Grid,TextField,Button } from '@mui/material'
import { useSnapshot } from 'valtio'
import state from '../../store/store'
function FormCustomerVisit({refModal,tanggal_visit="",notes="",customer="",barang=""}) {
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

      const [tanggal,setTanggal] = useState(tanggal_visit)
      const [dataNotes,setDataNotes] = useState(notes)
  return (
    <>
        <h2 className='mb-3 font-bold'>FORM KUNJUNGAN PELANGGAN</h2>
        <Grid container spacing={2}>
            <Grid size={12}>
                <TextField 
                InputLabelProps={{
                    shrink: true,
                }}
                sx={sxInputField} fullWidth label="Tanggal" value={tanggal} type='date' variant='outlined' />
            </Grid>
            <Grid size={12}>
                <TextField 
                InputLabelProps={{
                    shrink: true,
                }}
                sx={sxInputField} fullWidth label="Notes" value={dataNotes} variant='outlined' />
            </Grid>
            <Grid size={12}>
                <Button onClick={() => refModal.current?.close() } variant="contained" color="error">Batal</Button>
                <Button style={{marginLeft : '10px'}} variant='contained' color="success">Simpan</Button>
            </Grid>
        </Grid>
    </>
  )
}

export default FormCustomerVisit
