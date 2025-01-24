import React, { useRef, useState } from 'react'
import LayoutModal from '../../../Layouts/components/LayoutModal'
import { Button, Grid2 as Grid } from '@mui/material'
import Input from '../../../Layouts/components/Input'
import { FaCirclePlus } from 'react-icons/fa6'
import { useIsMobile } from '../../../../hooks/IsMobile'
import axios from 'axios'

function generateUniqueCode(amount, lastGeneratedCode) {
    // const response = await axios.get(`/voucher/getLastCode/${code}`)
    // const data = await response.data
    
    // Divide the input amount by 1000 and format as 6 digits
    const formattedAmount = String(Math.floor(amount / 1000)).padStart(6, '0');
    
    // Extract the last increment from the last generated code
    const lastIncrement = parseInt(lastGeneratedCode.split('-')[2], 10);

    // Generate the next increment
    const nextIncrement = (lastIncrement + 1).toString().padStart(7, '0');

    // Create the unique code
    const uniqueCode = `WGC-${formattedAmount}-${nextIncrement}`;

    return uniqueCode;
}

function ModalTambahVoucher() {
    const modalRef = useRef(null)
    const isMobile = useIsMobile()
    const [amount,setAmount] = useState(0)
    const [codeVocher, setCodeVoucher] = useState("WGC-")
    const handleChange = (e) => {
        if (e.target.value !== "") {
            const value = parseInt(e.target.value, 10);
            const prefix = `WGC-${String(Math.floor(value / 1000)).padStart(6, '0')}`;
            axios.get(`/voucher/getLastCode/${prefix}`).then(response => {
                // console.log(Object.keys(response.data).length);
                let lastGeneratedCode
                if(Object.keys(response.data).length == 0){
                    lastGeneratedCode = `${prefix}-0000000`;
                }else{
                    lastGeneratedCode = response.data.unique_code
                }
                const code = generateUniqueCode(value, lastGeneratedCode);
                setCodeVoucher(code);
            })
        }
        setAmount(e.target.value);
    };

    const getLastCode = async (prefix) => {
        const response = await axios.get(`/voucher/getLastCode/${code}`)
        const data = await response.data
    }
  return (
    <LayoutModal ref={modalRef} closeButton={false} height='auto' width={isMobile ? "80%" : "50%"} sxButton={{background : "#b89474"}} iconButton={<FaCirclePlus color='white'/>}>
        <Grid className='mt-3' container spacing={2}>
            <Grid size={6}>
                <Input fullWidth label="Amount" type="number" value={amount} onChange={handleChange} />
            </Grid>
            <Grid size={6}>
                <Input disabled fullWidth value={codeVocher} label="Kode voucher" />
            </Grid>
            <Grid size={6}>
                <Button variant='contained'>Submit</Button>
            </Grid>
        </Grid>
    </LayoutModal>
  )
}

export default ModalTambahVoucher
