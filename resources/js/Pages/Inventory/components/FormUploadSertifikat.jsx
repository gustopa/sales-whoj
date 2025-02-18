import React, { useState } from 'react'
import LayoutModal from '../../Layouts/components/LayoutModal'
import { useIsMobile } from '../../../hooks/IsMobile'
import Input from '../../Layouts/components/Input'
import { Button, CircularProgress } from '@mui/material'
import { showAlert } from '../../../helper'
import axios from 'axios'

function FormUploadSertifikat({iconButton,row_id}) {
    const isMobile = useIsMobile()
    const [sertifkat,setSertifikat] = useState("")
    const [loading,setLoading] = useState(false)
    const handleFileChange = e => {
        const file = e.target.files[0]
        setSertifikat(file)
    }
    const handleSubmit = async () => {
        if(sertifkat == "") return showAlert("Warning","Sertifikat tidak boleh kosong",'warning')
        setLoading(true)
        try{
            const response = await axios.post(`/inventory/uploadSertifikat/${row_id}`,{file : sertifkat},{
                headers : {
                    "Content-Type" : "multipart/form-data"
                }
            })
            const responseData = await response.data
            showAlert("Berhasil","Sertifikat berhasil disimpan","success");
        }catch(err){
            console.log(err)
            showAlert("Error",'terjadi kesalahan silahkan coba lagi','error')
        }finally{
            setLoading(false)
        }
    }
  return (
    <LayoutModal height='auto' width={isMobile ? "80%" : "30%"} iconButton={iconButton} sxButton={{ marginLeft : "5px", minWidth: "30px", padding : 4,background : "#2e7d32"}}>
        <div className='mt-1'>
            <h2 className='font-bold text-1xl dark:text-white'>FORM UPLOAD SERTIFIKAT</h2>
            <div className='mt-3'>
                <Input onChange={handleFileChange} fullWidth label="Sertifikat : " type="file"/>
            </div>
            <div className='mt-2'>
                <Button onClick={handleSubmit} disabled={loading} variant='contained'>
                    {loading ? <CircularProgress style={{width:'25px',height:'25px',color:'white'}}/> : "Simpan"}
                </Button>
            </div>
        </div>
    </LayoutModal>
  )
}

export default FormUploadSertifikat
