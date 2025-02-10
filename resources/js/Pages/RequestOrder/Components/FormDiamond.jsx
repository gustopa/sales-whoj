import React, { useRef, useState } from 'react'
import LayoutModal from '../../Layouts/components/LayoutModal'
import Input from '../../Layouts/components/Input'
import { Button, Card } from '@mui/material'
import { useIsMobile } from '../../../hooks/IsMobile'
import axios from 'axios'
import { formatNumber, getTodayDate, sanitizedNumber, showAlert, unformatNumber } from '../../../helper'
function FormDiamond({
    title,
    sxButton,
    iconButton,
    endpoint,
    dataButir,dataKarat,dataTipe, dataSert,dataDiameter,dataWarna,row_id,mode,
    onSuccess,setDocNo}) {
    const isMobile = useIsMobile()
    const modalTambah = useRef(null)
    const [butir,setButir] = useState(dataButir || 0)
    const [karat, setKarat] = useState(dataKarat || "")
    const [tipe,setTipe] = useState(dataTipe || "")
    const [sert,setSert] = useState(dataSert || "")
    const [diameter,setDiameter] = useState(dataDiameter || "")
    const [warna,setWarna] = useState(dataWarna || "")
    
    const handleSubmit = async () => {
        const formData = {
            row_id : row_id,
            grain : butir,
            grade : karat,
            diamond_type : tipe,
            no_sert : sert,
            diameter : diameter,
            color : warna
        }
        
        try{
            const response = await axios.post(endpoint,formData)
            const responseData = await response.data
            showAlert("Berhasil!",`Diamond berhasil di${title.toLowerCase()}`, "success")
            onSuccess(responseData.timestamp)
            if(setDocNo) setDocNo(responseData.doc_no)
        }catch(err){
            console.log(err);
            
            showAlert("Error!","Terjadi kesalahan silahkan coba lagi","error")
        }finally{
            modalTambah.current?.close()
        }
    }
    
  return (
    <LayoutModal ref={modalTambah} height='auto' closeButton={false} width={ isMobile ? "80%" : "30%"} sxButton={sxButton} iconButton={iconButton}>
        <h2 className='text-1xl font-bold mb-4 text-center'>{title} DIAMOND</h2>
            <Input fullWidth type="number" value={butir} onChange={e => setButir(e.target.value)} label="Butir" />
        <div className='mt-3'>
            <Input value={karat} onChange={e => setKarat(e.target.value)} fullWidth label="Karat"/>
        </div>
        <div className='mt-3'>
            <Input type="text" value={tipe} onChange={e => setTipe(e.target.value)} fullWidth label="Tipe"/>
        </div>
        <div className='mt-3'>
            <Input fullWidth value={sert} onChange={e => setSert(e.target.value)} type="text" label="SERT No"/>
        </div>
        <div className='mt-3'>
            <Input fullWidth value={diameter} onChange={e => setDiameter(e.target.value)} type="text" label="Diameter"/>
        </div>
        <div className='mt-3'>
            <Input fullWidth value={warna}  onChange={e => setWarna(e.target.value)} type="text" label="Warna"/>
        </div>
        <div className='mt-3'>
            <Button onClick={() => modalTambah.current?.close()} sx={{mr:1}} variant="contained" color="error">BATAL</Button>
            <Button onClick={handleSubmit} variant="contained" color="success">SUBMIT</Button>
        </div>
    </LayoutModal>
  )
}

export default FormDiamond
