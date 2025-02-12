import React, { useRef, useState } from 'react'
import LayoutModal from '../../Layouts/components/LayoutModal'
import Input from '../../Layouts/components/Input'
import { Button } from '@mui/material'
import { useIsMobile } from '../../../hooks/IsMobile'
import axios from 'axios'
import { showAlert } from '../../../helper'
function FormExrate({title,sxButton,iconButton,data,endpoint,table}) {
    const isMobile = useIsMobile()
    const modalTambah = useRef(null)
    const [rateBeli,setRateBeli] = useState(parseInt(data.rate_beli) || 0)
    const [rateJual, setRateJual] = useState(parseInt(data.rate_jual) || 0)
    const [profitMargin, setProfitMargin] = useState(parseInt(data.profit_margin) || 0)
    const [goldPrice, setGoldPrice] = useState(parseInt(data.gold_price) || 0 )
    const handleSubmit = async () => {
        if(rateBeli <= 0 || rateBeli == "" ) return showAlert("Warning!","Rate beli tidak boleh kosong",'warning')
        if(rateJual <= 0 || rateJual == "" ) return showAlert("Warning!","Rate jual tidak boleh kosong",'warning')
        if(profitMargin <= 0 || profitMargin == "" ) return showAlert("Warning!","Profit margin tidak boleh kosong",'warning')
        if(goldPrice <= 0 || goldPrice == "" ) return showAlert("Warning!","Harga emas tidak boleh kosong",'warning')
        try{
            await axios.post(endpoint,{
                data : {
                    rate_beli : rateBeli, 
                    rate_jual : rateJual,
                    profit_margin : profitMargin,
                    gold_price : goldPrice,
                }
            })
            showAlert("Berhasil!",`Exrate berhasil di${title.toLowerCase()}`, "success")
            table.current?.refreshData()
        }catch(err){
            showAlert("Error!","Terjadi kesalahan silahkan coba lagi","error")
        }finally{
            modalTambah.current?.close()
        }
    }
  return (
    <LayoutModal ref={modalTambah} height='auto' closeButton={false} width={ isMobile ? "80%" : "30%"} sxButton={sxButton} iconButton={iconButton}>
        <h2 className='text-1xl font-bold mb-4 text-center'>{title} RATE</h2>
            <Input value={rateBeli} onChange={e => setRateBeli(e.target.value)} fullWidth label="Rate Beli (IDR)"/>
        <div className='mt-4'>
            <Input value={rateJual} onChange={e => setRateJual(e.target.value)} fullWidth label="Rate Jual (IDR)"/>
        </div>
        <div className='mt-4'>
            <Input value={profitMargin} onChange={e => setProfitMargin(e.target.value)} fullWidth label="Profit Margin"/>
        </div>
        <div className='mt-4'>
            <Input value={goldPrice} onChange={e => setGoldPrice(e.target.value)} fullWidth label="Harga Emas"/>
        </div>
        <div className='mt-3'>
            <Button onClick={() => modalTambah.current?.close()} sx={{mr:1}} variant="contained" color="error">BATAL</Button>
            <Button onClick={handleSubmit} variant="contained" color="success">SUBMIT</Button>
        </div>
    </LayoutModal>
  )
}

export default FormExrate
