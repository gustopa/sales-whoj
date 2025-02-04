import React, { useRef, useState } from 'react'
import LayoutModal from '../../Layouts/components/LayoutModal'
import Input from '../../Layouts/components/Input'
import { Button } from '@mui/material'
import { useIsMobile } from '../../../hooks/IsMobile'
import axios from 'axios'
import { formatNumber, sanitizedNumber, showAlert, unformatNumber } from '../../../helper'
function FormDownPayment({title,sxButton,iconButton,endpoint,nama,table}) {
    const isMobile = useIsMobile()
    const modalTambah = useRef(null)
    const [data,setData] = useState(nama)
    const [amount,setAmount] = useState(0)
    const [displayAmount,setDisplayAmount] = useState("0")
    const [dpKe,setDpKe] = useState(0)
    const handleAmount = e => {
        const value = sanitizedNumber(e.target.value)
        const rawValue = unformatNumber(value)
        setAmount(rawValue)
        setDisplayAmount(formatNumber(Number(rawValue)))
    }
    const handleSubmit = async () => {
        try{
            await axios.post(endpoint,{name : data})
            showAlert("Berhasil!",`DP berhasil di${title.toLowerCase()}`, "success")
            table.current?.refreshData()
        }catch(err){
            showAlert("Error!","Terjadi kesalahan silahkan coba lagi","error")
        }finally{
            modalTambah.current?.close()
        }
    }
  return (
    <LayoutModal ref={modalTambah} height='auto' closeButton={false} width={ isMobile ? "80%" : "30%"} sxButton={sxButton} iconButton={iconButton}>
        <h2 className='text-1xl font-bold mb-4 text-center'>{title} DP</h2>
        <Input fullWidth type="date" label="Tanggal" />
        <div className='mt-3'>
            <Input value={displayAmount} onChange={handleAmount} fullWidth label="Uang Muka"/>
        </div>
        <div className='mt-3'>
            <Input type="number" onChange={e => setDpKe(e.target.value)} fullWidth label="DP Ke"/>
        </div>
        <div className='mt-3'>
            <Input fullWidth type="file" label="Bukti DP"/>
        </div>
        <div className='mt-3'>
            <Button onClick={() => modalTambah.current?.close()} sx={{mr:1}} variant="contained" color="error">BATAL</Button>
            <Button onClick={handleSubmit} variant="contained" color="success">SUBMIT</Button>
        </div>
    </LayoutModal>
  )
}

export default FormDownPayment
