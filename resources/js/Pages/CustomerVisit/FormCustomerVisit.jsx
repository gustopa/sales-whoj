import React, { useState } from 'react'
import { Grid2 as Grid,TextField,Button, InputAdornment } from '@mui/material'
import { useSnapshot } from 'valtio'
import state from '../../store/store'
import ModalCustomer from '../Components/ModalCustomer'
import ModalProduct from '../Components/ModalProduct'
import axios from 'axios'
import Swal from 'sweetalert2'
function FormCustomerVisit({refModal,tanggal_visit="",notes="",customer="",barang="",customerID="",itemID="",lineId="", action,onSuccess}) {
    
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
      const [dataCustomer,setDataCustomer] = useState(customer)
      const [item,setItem] = useState(barang)
      const [idCustomer,setIdCustomer] = useState(customerID)
      const [idItem,setIdItem] = useState(itemID)

      const handleSimpan = async () => {
        const data = {
          id_customer : idCustomer,
          id_item : idItem,
          tanggal : tanggal,
          notes : dataNotes,
          line_id : lineId,
          action : action
        }
        try{
          const response = await axios.post('/customer_visit/save',data)
          const data_response = await response.data
          console.log(data_response);
          Swal.fire({
            title : "Berhasil",
            text : `Data berhasil ${action == "tambah" ? "ditambahkan" : "diedit"}`,
            icon : "success"
          })
          onSuccess()
        }catch(err){
          console.log(err);
          Swal.fire({
            title : "Gagal",
            text : `Data gagal ${action == "tambah" ? "ditambahkan" : "diedit"}`,
            icon : "error"
          })
        }
        refModal.current.close()
      }
  return (
    <>
        <h2 className='mb-3 font-bold'>FORM KUNJUNGAN PELANGGAN</h2>
        <Grid container spacing={2}>
            <Grid size={{xs:12,md:12}}>
                <TextField variant="outlined" value={dataCustomer} sx={sxInputField} label="Pelanggan" fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <ModalCustomer setCustomer={setDataCustomer} setIdCustomer={setIdCustomer} />
                    </InputAdornment>
                  ),
                  readOnly : true
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid size={{xs:12,md:12}}>
                <TextField variant="outlined" value={item} sx={sxInputField} label="Barang" fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <ModalProduct setItem={setItem} setIdItem={setIdItem}/>
                    </InputAdornment>
                  ),
                  readOnly : true
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid size={12}>
                <TextField 
                InputLabelProps={{
                    shrink: true,
                }}
                sx={sxInputField} fullWidth label="Tanggal" onChange={e => setTanggal(e.target.value)} value={tanggal} type='date' variant='outlined' />
            </Grid>
            <Grid size={12}>
                <TextField 
                InputLabelProps={{
                    shrink: true,
                }}
                sx={sxInputField} fullWidth onChange={e => setDataNotes(e.target.value)} label="Notes" value={dataNotes} variant='outlined' />
            </Grid>
            
            <Grid size={12}>
                <Button onClick={() => refModal.current?.close() } variant="contained" color="error">Batal</Button>
                <Button style={{marginLeft : '10px'}} onClick={handleSimpan} variant='contained' color="success">Simpan</Button>
            </Grid>
        </Grid>
    </>
  )
}

export default FormCustomerVisit
