import React, { useRef, useState } from 'react'
import LayoutModal from '../../Layouts/components/LayoutModal'
import Input from '../../Layouts/components/Input'
import { Button } from '@mui/material'
import { useIsMobile } from '../../../hooks/IsMobile'
import axios from 'axios'
import { formatNumber, sanitizedNumber, showAlert, unformatNumber } from '../../../helper'
function FormLabourPrice({title,sxButton,iconButton,endpoint,nama,table,harga}) {
    const isMobile = useIsMobile()
    const modalTambah = useRef(null)
    const [data,setData] = useState(nama)
    const [dataHarga,setDataHarga] = useState(Intl.NumberFormat('en-US').format(harga == undefined ? 0 : harga))
    const handleSubmit = async () => {
        try{
            await axios.post(endpoint,{name : data, amount : unformatNumber(dataHarga)})
            showAlert("Berhasil!",`Labour price berhasil di${title.toLowerCase()}`, "success")
            table.current?.refreshData()
        }catch(err){
            showAlert("Error!","Terjadi kesalahan silahkan coba lagi","error")
        }finally{
            modalTambah.current?.close()
        }
    }
    const handleInputHarga = e => {
        const value = sanitizedNumber(e)
        const rawValue = unformatNumber(value)
        setDataHarga(formatNumber(Number(rawValue)))
    }
  return (
    <LayoutModal ref={modalTambah} height='auto' closeButton={false} width={ isMobile ? "80%" : "30%"} sxButton={sxButton} iconButton={iconButton}>
        <h2 className='text-1xl font-bold mb-4 text-center'>{title} MODEL</h2>
        <Input defaultValue={nama} onChange={e => setData(e.target.value)} fullWidth label="Item"/>
        <div className='mt-4'>
            <Input value={dataHarga} onChange={e => handleInputHarga(e.target.value)} fullWidth label="Harga"/>
        </div>
        <div className='mt-3'>
            <Button onClick={() => modalTambah.current?.close()} sx={{mr:1}} variant="contained" color="error">BATAL</Button>
            <Button onClick={handleSubmit} variant="contained" color="success">SUBMIT</Button>
        </div>
    </LayoutModal>
  )
}

export default FormLabourPrice
