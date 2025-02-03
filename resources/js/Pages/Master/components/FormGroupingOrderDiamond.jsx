import React, { useRef, useState } from 'react'
import LayoutModal from '../../Layouts/components/LayoutModal'
import Input from '../../Layouts/components/Input'
import { Button } from '@mui/material'
import { useIsMobile } from '../../../hooks/IsMobile'
import axios from 'axios'
import { showAlert } from '../../../helper'
import {Grid2 as Grid} from '@mui/material'
function FormGroupingOrderDiamond({title,sxButton,iconButton,endpoint,table,data,id,onSuccess}) {

    const isMobile = useIsMobile()
    const modalTambah = useRef(null)
    const [formData, setFormData] = useState({
        row_id : id,
        butir : data?.grain || "",
        karat : data?.grade || "",
        tipe : data?.diamond_type || "",
        sert_no : data?.no_sert || "",
        diameter : data?.diameter || "",
        warna : data?.color || "",
    })
    const handleSubmit = async () => {
        try{
            const response = await axios.post(endpoint,formData)
            const responseData = await response.data
            showAlert("Berhasil!",`Detail diamond berhasil di${title.toLowerCase()}`, "success")
            onSuccess(`${title}, ${responseData.message}`)
        }catch(err){
            showAlert("Error!","Terjadi kesalahan silahkan coba lagi","error")
        }finally{
            modalTambah.current?.close()
        }
    }
    const handleInput = e => {
        const {name,value} = e.target
        setFormData(prev => ({...prev,[name]: value,}))
    }
  return (
    <LayoutModal ref={modalTambah} height='auto' closeButton={false} width={ isMobile ? "80%" : "40%"} sxButton={sxButton} iconButton={iconButton}>
        <h2 className='text-1xl font-bold mb-4 text-center'>{title} Detail Diamond</h2>
        <Grid container spacing={2}>
            <Grid size={{sx:12,md:6}}>
                <Input value={formData?.butir} fullWidth onChange={handleInput} name="butir" label="Butir"/>
            </Grid>
            <Grid size={{sx:12,md:6}}>
                <Input value={formData?.karat} fullWidth onChange={handleInput} name="karat" label="Karat"/>
            </Grid>
            <Grid size={{sx:12,md:6}}>
                <Input value={formData?.tipe} fullWidth onChange={handleInput} name="tipe" label="Tipe"/>
            </Grid>
            <Grid size={{sx:12,md:6}}>
                <Input value={formData?.sert_no} fullWidth onChange={handleInput} name="sert_no" label="SERT no"/>
            </Grid>
            <Grid size={{sx:12,md:6}}>
                <Input value={formData?.diameter} fullWidth onChange={handleInput} name="diameter" label="Diameter"/>
            </Grid>
            <Grid size={{sx:12,md:6}}>
                <Input value={formData?.warna} fullWidth onChange={handleInput} name="warna" label="Warna"/>
            </Grid>

        </Grid>
        <div className='mt-3'>
            <Button onClick={() => modalTambah.current?.close()} sx={{mr:1}} variant="contained" color="error">BATAL</Button>
            <Button onClick={handleSubmit} variant="contained" color="success">SUBMIT</Button>
        </div>
    </LayoutModal>
  )
}

export default FormGroupingOrderDiamond
