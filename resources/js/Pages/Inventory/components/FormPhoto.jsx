import React, { useState } from 'react'
import LayoutModal from '../../Layouts/components/LayoutModal'
import { useIsMobile } from '../../../hooks/IsMobile'
import Input from '../../Layouts/components/Input'
import { Button, Card, CircularProgress } from '@mui/material'
import { getNow, showAlert } from '../../../helper'
import axios from 'axios'
import { usePage } from '@inertiajs/react'
import { useSnapshot } from 'valtio'
import state from '../../../store/store'
function FormPhoto({iconButton,sxButton,data,title,onSuccess}) {
    const isMobile = useIsMobile()
    const {session} = usePage().props
    const snap = useSnapshot(state)
    const [foto,setFoto] = useState()
    const [catatan,setCatatan] = useState(data?.notes || "")
    const [preview,setPreview] = useState(data?.photo != null ? `${snap.base_url}/storage/uploaded/${data?.photo}` : null)
    const [loading,setLoading] = useState(false)
    const handleSubmit = async () => {
        setLoading(true)
        const formData = {
            file : foto,
            data : {
                company_id : session.company_id,
                notes : catatan,
                is_submitted : 1,
                is_deleted : 0,
                created_date : getNow(),
                created_by : session.username,
                modified_date : getNow(),
                modified_by : session.username
            }
        }
        const endpoint = title == "TAMBAH" ? "/photo_inventory/tambah" : `photo_inventory/edit/${data.row_id}`
        if(title == "EDIT"){
            delete formData.data.company_id
            delete formData.data.created_date
            delete formData.data.created_by
        }
        try{
            const response = await axios.post(endpoint,formData,{
                headers : {
                    "Content-Type" : "multipart/form-data"
                }
            })
            onSuccess(prev => prev +1)
            showAlert("Berhasil",`Foto berhasil di${title.toLowerCase()}`,'success')

        }catch(err){
            console.log(err)
            showAlert("Error","Terjadi kesalahan silahkan coba lagi","error")
        }finally{
            setLoading(false)
        }
    }
  return (
    <LayoutModal height='auto' width={isMobile ? "80%" : "40%"} iconButton={iconButton} sxButton={sxButton}>
        <div className='mt-2'>
            <h2 className='font-bold text-1xl dark:text-white'> {title} FOTO</h2>
            <div className='my-2'>
                <Input onChange={e => {
                    const file = e.target.files[0]
                    if(file){
                        setPreview(URL.createObjectURL(file));
                        setFoto(file)
                    }
                }} fullWidth label="Foto :" type="file" />
                {preview != null &&
                    <Card className='w-40 dark:bg-navy-800'>
                        <img src={preview} alt="" />
                    </Card>
                }
            </div>
            <div className='my-4'>
                <Input value={catatan} onChange={e => setCatatan(e.target.value)} fullWidth label="Catatan :" />
            </div>
            <div>
                <Button disabled={loading} onClick={handleSubmit} variant='contained'>
                    {loading ? <CircularProgress style={{width:'25px',height:'25px',color:'white'}}/> : "Simpan"}
                </Button>
            </div>
        </div>
    </LayoutModal>
  )
}

export default FormPhoto
