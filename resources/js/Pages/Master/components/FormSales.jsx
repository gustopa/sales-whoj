import React, { useRef, useState } from 'react'
import LayoutModal from '../../Layouts/components/LayoutModal'
import Input from '../../Layouts/components/Input'
import { Box, Button, Checkbox, Typography } from '@mui/material'
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useIsMobile } from '../../../hooks/IsMobile'
import axios from 'axios'
import { showAlert } from '../../../helper'
function FormSales({title,sxButton,iconButton,endpoint,nama,email,table,active}) {
    const isMobile = useIsMobile()
    const modalTambah = useRef(null)
    const [data,setData] = useState(nama)
    const [dataEmail,setDataEmail] = useState(email)
    const handleSubmit = async () => {
        try{
            await axios.post(endpoint,{name : data, email : dataEmail, is_active : checked})
            showAlert("Berhasil!",`Sales berhasil di${title.toLowerCase()}`, "success")
            table.current?.refreshData()
        }catch(err){
            showAlert("Error!","Terjadi kesalahan silahkan coba lagi","error")
        }finally{
            modalTambah.current?.close()
        }
    }
    const [checked, setChecked] = useState(active ? true : false);
    const handleChange = e => {
        setChecked(e.target.checked);
    }
  return (
    <LayoutModal ref={modalTambah} height='auto' closeButton={false} width={ isMobile ? "80%" : "30%"} sxButton={sxButton} iconButton={iconButton}>
        <h2 className='text-1xl font-bold mb-4 text-center'>{title} SALES</h2>
        <Input defaultValue={nama} onChange={e => setData(e.target.value)} fullWidth label="Nama"/>
        <div className='mt-4'>
            <Input defaultValue={email} onChange={e => setDataEmail(e.target.value)} fullWidth label="Email"/>
        </div>
        <div className='mt-4'>
        <Box display="flex" alignItems="center">
            <Checkbox
                checked={checked}
                onChange={handleChange}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleIcon color="success" />}
            />
            <Typography variant="body1" color={checked ? "green" : "gray"}>
                {checked ? "Active" : "Inactive"}
            </Typography>
            </Box>
        </div>
        <div className='mt-3'>
            <Button onClick={() => modalTambah.current?.close()} sx={{mr:1}} variant="contained" color="error">BATAL</Button>
            <Button onClick={handleSubmit} variant="contained" color="success">SUBMIT</Button>
        </div>
    </LayoutModal>
  )
}

export default FormSales
