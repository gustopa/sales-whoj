import React, { useRef, useState } from 'react'
import { formatNumber, sanitizedNumber, showAlert, unformatNumber } from '../../../helper'
import LayoutModal from '../../Layouts/components/LayoutModal'
import Input from '../../Layouts/components/Input'
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useSnapshot } from 'valtio'
import state from '../../../store/store'
import { useIsMobile } from '../../../hooks/IsMobile'

function FormPaymentReparation({sxButton,iconButton,title,data,setDocNo,row_id,endpoint,onSuccess}) {
    const snap = useSnapshot(state)
    const isMobile = useIsMobile()
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
    const modal = useRef(null)
    const [keterangan,setKeterangan] = useState(data?.amount_txt || "")
    const [amount,setAmount] = useState(data?.amount || 0)
    const [displayAmount,setDisplayAmount] = useState(data?.amount != undefined ? formatNumber(Number(data?.amount)) : "0")
    const [jenis,setJenis] = useState(data?.amount_type || "")
      
    const handleAmount = e => {
        const value = sanitizedNumber(e.target.value)
        const rawValue = unformatNumber(value)
        setAmount(rawValue)
        setDisplayAmount(formatNumber(Number(rawValue)))
    }
    const handleSubmit = async () => {
        const formData = {
            row_id : row_id,
            amount_txt : keterangan,
            amount : amount,
            amount_type : jenis
        }
        try{
            const response = await axios.post(endpoint,formData)
            const responseData = await response.data
            if(setDocNo) setDocNo(responseData.doc_no)
            onSuccess(responseData.timestamp)
            showAlert("Berhasil",`Pembayaran berhasil di${title.toLowerCase()}`,'success')
            modal.current?.close()
        }catch(err){
            console.log(err);
            showAlert("Gagal!","Terjadi kesalahan silahkan coba lagi","error")
        }
        
    }
  return (
    <LayoutModal ref={modal} height='auto' closeButton={false} width={ isMobile ? "80%" : "50%"} sxButton={sxButton} iconButton={iconButton}>
        <h2 className='text-1xl font-bold mb-4 text-center'>{title} PEMBAYARAN</h2>
            <Input fullWidth value={keterangan} onChange={e => setKeterangan(e.target.value)} label="Keterangan Biaya Reparasi" />
        <div className='mt-3'>
            <Input value={displayAmount} onChange={handleAmount} fullWidth label="Total Biaya Reparasi"/>
        </div>
        <div className='mt-3'>
            <FormControl fullWidth sx={sxInputField}>
                <InputLabel shrink id="jenis" style={{color:"#b89474"}}>Jenis Pembayaran :</InputLabel>
                <Select
                    displayEmpty
                    name='jenis'
                    labelId="jenis"
                    id="jenis-select"
                    value={jenis}
                    label="Jenis Pembayaran : "
                    onChange={e => setJenis(e.target.value)}
                >
                    <MenuItem value=""><span className='py-3'></span></MenuItem>
                    <MenuItem value="Charge">Charge</MenuItem>
                    <MenuItem value="Free of Charge">Free of Charge</MenuItem>
                </Select>
            </FormControl>
        </div>
        <div className='mt-3'>
            <Button onClick={() => modal.current?.close()} sx={{mr:1}} variant="contained" color="error">BATAL</Button>
            <Button onClick={handleSubmit} variant="contained" color="success">SUBMIT</Button>
        </div>
    </LayoutModal>
  )
}

export default FormPaymentReparation
