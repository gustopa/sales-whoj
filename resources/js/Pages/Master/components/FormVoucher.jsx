import React, { useRef, useState } from 'react'
import LayoutModal from '../../Layouts/components/LayoutModal'
import { Button, CircularProgress, Grid2 as Grid } from '@mui/material'
import Input from '../../Layouts/components/Input'
import { useIsMobile } from '../../../hooks/IsMobile' 
import axios from 'axios'
import { encrypt, formatNumber, showAlert, unformatNumber } from '../../../helper'
function generateUniqueCode(amount, lastGeneratedCode) {
    // const response = await axios.get(`/voucher/getLastCode/${code}`)
    // const data = await response.data
    
    // Divide the input amount by 1000 and format as 6 digits
    const formattedAmount = String(Math.floor(amount / 1000)).padStart(7, '0');
    
    // Extract the last increment from the last generated code
    const lastIncrement = parseInt(lastGeneratedCode.split('-')[2], 10);

    // Generate the next increment
    const nextIncrement = (lastIncrement + 1).toString().padStart(7, '0');

    // Create the unique code
    const uniqueCode = `WGC-${formattedAmount}-${nextIncrement}`;

    return uniqueCode;
}

function FormVoucher({tableRef, sxButton, iconButton, size, label,data, mode}) {
    const modalRef = useRef(null)
    const isMobile = useIsMobile()
    const [amount,setAmount] = useState(data == undefined ? 0 : data.amount)
    const [displayAmount, setDisplayAmount] = useState(data === undefined ? "" : formatNumber(parseInt(data.amount)))
    const [codeVocher, setCodeVoucher] = useState(data === undefined ? "WGC-" : data.unique_code)
    const [loadingButton, setLoadingButton] = useState(false) 
    const cache = useRef({});

    const handleChange = async (e) => {
        const value = e.target.value;
        const sanitizedValue = value.replace(/[^0-9,]/g, '');
        const rawValue = unformatNumber(sanitizedValue);
        
        setAmount(Number(rawValue));
        setDisplayAmount(formatNumber(rawValue));
        const val = parseInt(Number(rawValue), 10);
        const prefix = `WGC-${String(Math.floor(val / 1000)).padStart(7, '0')}`;
        
        // if (cache.current[prefix]) {
        //     setCodeVoucher(generateUniqueCode(val, cache.current[prefix]));
        // } else {
            try {
                const response = await axios.get(`/voucher/getLastCode/${prefix}`);
                const lastCode = response.data.unique_code || `${prefix}-0000000`;
                cache.current[prefix] = lastCode;
                setCodeVoucher(generateUniqueCode(val, lastCode));
            } catch (error) {
                showAlert("Error","Terjadi kesalahan saat generate code","error")
            }
        // }
    };

    const handleSubmit = async () => {

        if(parseInt(data?.amount) == amount){
            showAlert("Warning","Nothing to change!","warning")
            return false
        }

        if(amount == 0 || amount == "" || amount == null || amount < 1000000){
            const msg = amount == 0 ? "Masukan nilai yang valid"  : "Nilai minimal 1,000,000"
            showAlert("Warning!",msg,"warning")
            return false
        }
        
        setLoadingButton(true)
        try {
            const endpoint = mode == "tambah" ? "/voucher/add" : `/voucher/edit/${encrypt(data?.row_id)}`
            await axios.post(endpoint,{amount : amount, unique_code : codeVocher})
            tableRef.current?.refreshData()
            showAlert("Berhasil",`Voucher berhasil ${mode == "tambah" ? "dibuat" : "diedit"}`,'success')
            if(mode == "tambah") {setDisplayAmount(""); setCodeVoucher("WGC-"); setAmount(0)}
            modalRef.current?.close()
        }catch(err){
            showAlert("Gagal","Terjadi kesalahan silahkan coba lagi","error")
        }finally{
            setLoadingButton(false)
        }
    }
  return (
    <LayoutModal size={size} ref={modalRef} closeButton={false} height='auto' width={isMobile ? "80%" : "30%"} sxButton={sxButton} iconButton={iconButton}>
        <h2 className='text-1xl mb-4'>{label}</h2>
        <Grid className='mt-3' container spacing={2}>
            <Grid size={12}>
                <Input fullWidth label="Amount" type="text" value={displayAmount} onChange={handleChange} />
            </Grid>
            <Grid size={12}>
                <Input inputProps={{readOnly : true}} fullWidth value={codeVocher} label="Kode voucher" />
            </Grid>
            <Grid size={12}>
                <Button variant='contained' onClick={handleSubmit}>{loadingButton ? <CircularProgress style={{width:'25px',height:'25px'}} color='white'/> : "Submit" }</Button>
            </Grid>
        </Grid>
    </LayoutModal>
  )
}

export default FormVoucher
