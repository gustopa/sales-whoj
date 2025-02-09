import React, { useRef, useState } from 'react'
import LayoutModal from '../../Layouts/components/LayoutModal'
import Input from '../../Layouts/components/Input'
import { Button, Card } from '@mui/material'
import { useIsMobile } from '../../../hooks/IsMobile'
import axios from 'axios'
import { formatNumber, getTodayDate, sanitizedNumber, showAlert, unformatNumber } from '../../../helper'
import { useSnapshot } from 'valtio'
import state from '../../../store/store'
function FormDownPayment({title,sxButton,iconButton,endpoint,dataTanggal,table,bukti_dp,dataAmount, data_dp,row_id,onSuccess,setDocNo}) {
    const isMobile = useIsMobile()
    const modalTambah = useRef(null)
    const snap = useSnapshot(state)
    const [tanggal,setTanggal] = useState(dataTanggal || getTodayDate())
    const [buktiDp, setBuktiDp] = useState(null)
    const [preview,setPreview] = useState(bukti_dp != null ? `${snap.base_url}/storage/uploaded/${bukti_dp}` : null)
    const [amount,setAmount] = useState(dataAmount || 0)
    const [displayAmount,setDisplayAmount] = useState(dataAmount ? formatNumber(Number(dataAmount)) : "0")
    const [dpKe,setDpKe] = useState(data_dp || "")

    const handleAmount = e => {
        const value = sanitizedNumber(e.target.value)
        const rawValue = unformatNumber(value)
        setAmount(rawValue)
        setDisplayAmount(formatNumber(Number(rawValue)))
    }
    
    const handleFileChange = e => {
        const file = e.target.files[0]
        if (file) {
            setBuktiDp(file);
            setPreview(URL.createObjectURL(file)); // Buat URL blob untuk preview
        }

    }
    
    const handleSubmit = async () => {
        if(tanggal == null || tanggal == ""){
            return showAlert("Warning!","Tanggal tidak boleh kosong",'warning')
        }
        const formData = {
            row_id : row_id,
            tanggal : tanggal,
            amount : amount,
            dp_ke : dpKe,
            bukti_dp : buktiDp
        }
        
        try{
            const response = await axios.post(endpoint,formData,{
                headers : {
                    "Content-Type" : "multipart/form-data"
                }
            })
            const responseData = await response.data
            showAlert("Berhasil!",`DP berhasil di${title.toLowerCase()}`, "success")
            onSuccess(responseData.timestamp)
            setDocNo(responseData.doc_no)
        }catch(err){
            showAlert("Error!","Terjadi kesalahan silahkan coba lagi","error")
        }finally{
            modalTambah.current?.close()
        }
    }
    
  return (
    <LayoutModal ref={modalTambah} height='auto' closeButton={false} width={ isMobile ? "80%" : "30%"} sxButton={sxButton} iconButton={iconButton}>
        <h2 className='text-1xl font-bold mb-4 text-center'>{title} DP</h2>
        <Input fullWidth type="date" value={tanggal} onChange={e => setTanggal(e.target.value)} label="Tanggal" />
        <div className='mt-3'>
            <Input value={displayAmount} onChange={handleAmount} fullWidth label="Uang Muka"/>
        </div>
        <div className='mt-3'>
            <Input type="text" value={dpKe} onChange={e => setDpKe(e.target.value)} fullWidth label="DP Ke"/>
        </div>
        <div className='mt-3'>
            <Input inputProps={{ accept: "image/*" }} fullWidth onChange={handleFileChange} type="file" label="Bukti DP"/>
            {preview != null && 
                <Card className='dark:bg-navy-800 mt-2' style={{maxHeight : 300}}>
                    <img src={preview} alt="" />
                </Card>
            }
        </div>
        <div className='mt-3'>
            <Button onClick={() => modalTambah.current?.close()} sx={{mr:1}} variant="contained" color="error">BATAL</Button>
            <Button onClick={handleSubmit} variant="contained" color="success">SUBMIT</Button>
        </div>
    </LayoutModal>
  )
}

export default FormDownPayment
