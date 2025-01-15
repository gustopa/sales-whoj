import React, { useRef, useState } from 'react'
import LayoutModal from '../../Layouts/components/LayoutModal'
import { Grid2 as Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useSnapshot } from 'valtio';
import state from '../../../store/store';
import { useIsMobile } from '../../../hooks/IsMobile';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MdEdit } from 'react-icons/md';
let i = 0
function EditDokumen({params,customerID,onSuccess}) {
    const [dokumen,setDokumen] = useState(params.data.name)
    const [notes,setNotes] = useState(params.data.notes)
    const [status,setStatus] = useState(params.data.status)
    const refModal = useRef()
    const handleEdit = async () => {
        try{
            const response = await axios.post('/customer/editDokumen',{line_id : params.value, dokumen : dokumen, notes : notes, status : status})
            const data = await response.data
            Swal.fire({
                title : "Berhasil",
                icon : "success",
                text : "Dokumen berhasil diedit"
            })
            onSuccess(`edit dokumen ${data.data}`)
        }catch(err){
            Swal.fire({
                title : "Gagal",
                icon : "error",
                text : "Dokumen gagal diedit"
            })
        }
        refModal.current.close()
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
    <LayoutModal ref={refModal} width={isMobile ? '80vw' : '50vw'} height={isMobile ? "45vh" : "25vw"} closeButton={false} sxButton={{backgroundColor : "#1976d2",padding : "10px"}} iconButton={<MdEdit style={{color:'white'}}/>}>
        <h2 className='mb-3 font-bold'>EDIT DOKUMEN</h2>
        <Grid container spacing={2}>
            <Grid size={12}>
                <TextField 
                InputLabelProps={{
                    shrink: true,
                }}
                sx={sxInputField} onChange={e => setDokumen(e.target.value)} value={dokumen} fullWidth label="Dokumen" variant='outlined' />
            </Grid>
            <Grid size={12}>
                <TextField 
                InputLabelProps={{
                    shrink: true,
                }}
                sx={sxInputField} onChange={e => setNotes(e.target.value)} value={notes} fullWidth label="Notes" variant='outlined' />
            </Grid>
            
            <Grid size={12}>
                <FormControl fullWidth sx={sxInputField}>
                    <InputLabel shrink id="status" style={{color:"#b89474"}}>Status</InputLabel>
                    <Select
                        displayEmpty
                        sx={sxInputField}
                        name='status'
                        labelId="status"
                        id="status_select"
                        label="Status"
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                    >
                        <MenuItem selected={status == "Pending" ? true : false} value="Pending">Pending</MenuItem>
                        <MenuItem selected={status == "Completed" ? true : false} value="Completed">Completed</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid size={12}>
                <Button onClick={() => refModal.current?.close() } variant="contained" color="error">Batal</Button>
                <Button onClick={handleEdit} style={{marginLeft : '10px'}} variant='contained' color="success">Simpan</Button>
            </Grid>
        </Grid>
    </LayoutModal>
  )
}

export default EditDokumen
