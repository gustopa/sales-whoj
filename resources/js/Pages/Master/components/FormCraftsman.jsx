import React, { useRef, useState } from 'react'
import LayoutModal from '../../Layouts/components/LayoutModal'
import Input from '../../Layouts/components/Input'
import { Button } from '@mui/material'
import { useIsMobile } from '../../../hooks/IsMobile'
import axios from 'axios'
import { formatNumber, sanitizedNumber, showAlert, unformatNumber } from '../../../helper'
function FormCraftsman({title,sxButton,iconButton,endpoint,nama,rate,table}) {
    const isMobile = useIsMobile()
    const modalTambah = useRef(null)
    const [data,setData] = useState(nama || "")
    const [dataRate,setDataRate] = useState(rate || 0)
    const [displayRate, setDisplayrate] = useState(formatNumber(Number(rate)) || "0")
    const handleSubmit = async () => {
        try{
            await axios.post(endpoint,{name : data,rate : dataRate})
            showAlert("Berhasil!",`Pengrajin berhasil di${title.toLowerCase()}`, "success")
            table.current?.refreshData()
        }catch(err){
            showAlert("Error!","Terjadi kesalahan silahkan coba lagi","error")
        }finally{
            modalTambah.current?.close()
        }
    }

    const handleRateChange = e => {
        const value = sanitizedNumber(e.target.value)
        const rawValue = unformatNumber(value)
        setDataRate(Number(rawValue))
        setDisplayrate(formatNumber(Number(rawValue)))
    }
  return (
    <LayoutModal ref={modalTambah} height='auto' closeButton={false} width={ isMobile ? "80%" : "30%"} sxButton={sxButton} iconButton={iconButton}>
        <h2 className='text-1xl font-bold mb-4 text-center'>{title} PENGRAJIN</h2>
        <Input value={data} onChange={e => setData(e.target.value)} fullWidth label="Nama"/>
        <div className='mt-4'>
            <Input value={displayRate} onChange={handleRateChange} fullWidth label="Rate"/>
        </div>
        <div className='mt-3'>
            <Button onClick={() => modalTambah.current?.close()} sx={{mr:1}} variant="contained" color="error">BATAL</Button>
            <Button onClick={handleSubmit} variant="contained" color="success">SUBMIT</Button>
        </div>
    </LayoutModal>
  )
}

export default FormCraftsman
