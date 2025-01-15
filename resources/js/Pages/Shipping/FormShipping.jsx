import React, { useRef, useState } from 'react'
import LayoutModal from '../Layouts/components/LayoutModal'
import { Button, Grid2 as Grid, InputAdornment, TextField } from '@mui/material'
import ModalCustomer from '../Components/ModalCustomer'
import { useSnapshot } from "valtio";
import state from '../../store/store'
import ModalPayment from '../Components/ModalPayment';
function FormShipping({iconButton,bgColor,customer="",customerID="",invoice="",tanggal="",resi="",invoiceID,data,id}) {
    console.log(data);
    
    const snap = useSnapshot(state)
    const [dataCustomer,setDataCustomer] = useState(customer)
    const [idCustomer,setIdCustomer] = useState(customerID)
    const [dataInvoice,setDataInvoice] = useState(invoice)
    const [idInvoice,setIdInvoice] = useState(invoiceID)
    const [dataTanggal,setDataTanggal] = useState(tanggal)
    const [dataResi,setDataResi] = useState(resi)
    const refModal = useRef(null)
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

      const handleSimpan = () => {
        console.log(id);
        
      }
  return (
    <LayoutModal ref={refModal} sxButton={{backgroundColor : bgColor}} iconButton={iconButton}>
        <h2 className='font-bold text-2xl mb-[10px]'>FORM PENGIRIMAN</h2>
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
                <TextField variant="outlined" value={dataInvoice} sx={sxInputField} label="Invoice" fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <ModalPayment id_customer={idCustomer}/>
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
                sx={sxInputField} fullWidth label="Tanggal" onChange={e => setDataTanggal(e.target.value)} value={dataTanggal} type='date' variant='outlined' />
            </Grid>
            <Grid size={12}>
                <TextField 
                InputLabelProps={{
                    shrink: true,
                }}
                sx={sxInputField} fullWidth label="Resi No" onChange={e => setDataResi(e.target.value)} value={dataResi} type='text' variant='outlined' />
            </Grid>

            <Grid size={12}>
                <Button onClick={() => refModal.current?.close() } variant="contained" color="error">Batal</Button>
                <Button style={{marginLeft : '10px'}} onClick={handleSimpan} variant='contained' color="success">Simpan</Button>
            </Grid>
        </Grid>
    </LayoutModal>
  )
}

export default FormShipping
