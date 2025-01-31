import React, { useRef, useState } from 'react'
import LayoutModal from '../../Layouts/components/LayoutModal'
import Input from '../../Layouts/components/Input'
import { Button } from '@mui/material'
import { useIsMobile } from '../../../hooks/IsMobile'
import axios from 'axios'
import { showAlert } from '../../../helper'
function FormLocation({title,sxButton,iconButton,endpoint,nama,table}) {
    const isMobile = useIsMobile()
    const modalTambah = useRef(null)
    const [data,setData] = useState(nama)
    const handleSubmit = async () => {
        try{
            await axios.post(endpoint,{name : data})
            showAlert("Berhasil!",`Lokasi berhasil di${title.toLowerCase()}`, "success")
            table.current?.refreshData()
        }catch(err){
            showAlert("Error!","Terjadi kesalahan silahkan coba lagi","error")
        }finally{
            modalTambah.current?.close()
        }
    }
  return (
    <LayoutModal ref={modalTambah} height='auto' closeButton={false} width={ isMobile ? "80%" : "30%"} sxButton={sxButton} iconButton={iconButton}>
        <h2 className='text-1xl font-bold mb-4 text-center'>{title} MODEL</h2>
        <Input defaultValue={nama} onChange={e => setData(e.target.value)} fullWidth label="Nama"/>
        <div className='mt-3'>
            <Button onClick={() => modalTambah.current?.close()} sx={{mr:1}} variant="contained" color="error">BATAL</Button>
            <Button onClick={handleSubmit} variant="contained" color="success">SUBMIT</Button>
        </div>
    </LayoutModal>
  )
}

export default FormLocation
