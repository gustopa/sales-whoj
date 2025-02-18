import React, { useState } from 'react'
import LayoutModal from '../../Layouts/components/LayoutModal'
import Input from '../../Layouts/components/Input'
import { useIsMobile } from '../../../hooks/IsMobile'
import { Button, Grid2 as Grid } from '@mui/material'
import { formatNumber, getNow, sanitizedNumber, showAlert, unformatNumber } from '../../../helper'
import { usePage } from '@inertiajs/react'
import axios from 'axios'
function FormDiamondPricing({iconButton,sxButton,data,title,onSuccess}) {
    const isMobile = useIsMobile()
    const {session} = usePage().props
    const [bentuk,setBentuk] = useState(data?.diamond_type || "")
    const [fromSize,setFromSize] = useState(data?.size_from || "")
    const [toSize,setToSize] = useState(data?.size_to || "")
    const [harga,setHarga] = useState(data?.price || 0)
    const [displayHarga,setDisplayHarga] = useState(formatNumber(Number(data?.price)) || 0)
    const handleSubmit = async () => {
        const formData = {
            data : {
                company_id : session.company_id,
                diamond_shape_id : 0,
                diamond_type : bentuk,
                size_from : fromSize,
                size_to : toSize,
                price : harga,
                is_submitted : 1,
                is_deleted : 0,
                created_date : getNow(),
                created_by : session.username,
                modified_date : getNow(),
                modified_by : session.username
            }
        }
        if(title == 'EDIT'){
            delete formData.data.created_date
            delete formData.data.created_by
            delete formData.data.company_id
        }
        const endpoint = title == "TAMBAH" ? "/diamond_pricing/tambah" : `diamond_pricing/edit/${data.row_id}`
        try{
            const response = await axios.post(endpoint,formData)
            onSuccess(prev => prev + 1)
            showAlert("Berhasil",`Data berhasil di${title.toLowerCase()}`,'success')
        }catch(err){
            console.log(err)
            showAlert("Error","Terjadi kesalahan silahkan coba lagi","error")
        }
        
        
    }
  return (
    <LayoutModal height='auto' width={isMobile ? "80%" : "60%"} sxButton={sxButton} iconButton={iconButton}>
        <h2 className='font-bold text-1xl dark:text-white my-2'>{title} MATRIKS HARGA</h2>
        <Grid container spacing={2}>
            <Grid size={{xs:12, md:6}}>
                <Input fullWidth value={bentuk} onChange={e => setBentuk(e.target.value)} label="Bentuk"/>
            </Grid>
            <Grid size={{xs:12, md:6}}>
                <Input fullWidth value={fromSize} onChange={e => setFromSize(e.target.value)} label="Dari ukuran"/>
            </Grid>
            <Grid size={{xs:12, md:6}}>
                <Input fullWidth value={toSize} onChange={e => setToSize(e.target.value)} label="Sampai Ukuran"/>
            </Grid>
            <Grid size={{xs:12, md:6}}>
                <Input fullWidth value={displayHarga} onChange={e => {
                    const value = sanitizedNumber(e.target.value)
                    const rawValue = unformatNumber(value)
                    setHarga(rawValue)
                    setDisplayHarga(formatNumber(Number(rawValue)))
                }} label="Harga"/>
            </Grid>
            <Grid size={12}>
                <Button variant='contained' onClick={handleSubmit}>Submit</Button>
            </Grid>
        </Grid>
    </LayoutModal>
  )
}

export default FormDiamondPricing
