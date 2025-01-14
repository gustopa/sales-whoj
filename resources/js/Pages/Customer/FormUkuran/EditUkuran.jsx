import React, { useRef, useState } from 'react'
import LayoutModal from '../../Layouts/components/LayoutModal'
import { Grid2 as Grid, TextField, Button } from '@mui/material'
import { useSnapshot } from 'valtio';
import state from '../../../store/store';
import { useIsMobile } from '../../../hooks/IsMobile';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MdEdit } from 'react-icons/md';
function EditUkuran({params,id,onSuccess}) {
    const [barang,setBarang] = useState(params.data.product)
    const [details,setDetails] = useState(params.data.txt)
    const refModal = useRef()
    const handleTambah = async () => {
        try{
            const response = await axios.post('/customer/editDataSize',{line_id : id, barang : barang, details : details})
            const data = await response.data
            console.log(data);
            Swal.fire({
                title : "Berhasil",
                icon : "success",
                text : "Size berhasil diubah"
            })
            onSuccess(`tambah ${data.data}`)
            refModal.current.close()
        }catch(err){
            Swal.fire({
                title : "Gagal",
                icon : "error",
                text : "Document gagal diubah"
            })
        }
    } 
    const isMobile = useIsMobile()
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
    <LayoutModal ref={refModal} width={isMobile ? '80vw' : '50vw'} height={isMobile ? "80vw" : "20vw"} closeButton={false} sxButton={{backgroundColor : "#1976d2",padding : "9px"}} iconButton={<MdEdit style={{color:'white'}}/>}>
        <h2 className='mb-3 font-bold'>EDIT UKURAN</h2>
        <Grid container spacing={2}>
            <Grid size={12}>
                <TextField 
                InputLabelProps={{
                    shrink: true,
                }}
                sx={sxInputField} onChange={e => setBarang(e.target.value)} value={barang} fullWidth label="Barang" variant='outlined' />
            </Grid>
            <Grid size={12}>
                <TextField 
                InputLabelProps={{
                    shrink: true,
                }}
                sx={sxInputField} onChange={e => setDetails(e.target.value)} value={details} fullWidth label="Details" variant='outlined' />
            </Grid>
            <Grid size={12}>
                <Button onClick={() => refModal.current?.close() } variant="contained" color="error">Batal</Button>
                <Button onClick={handleTambah} style={{marginLeft : '10px'}} variant='contained' color="success">Simpan</Button>
            </Grid>
        </Grid>
    </LayoutModal>
  )
}

export default EditUkuran
