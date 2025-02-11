import React, { useRef, useState } from 'react'
import LayoutModal from '../../Layouts/components/LayoutModal'
import Input from '../../Layouts/components/Input'
import { Button, Card, InputAdornment, TextField } from '@mui/material'
import { useIsMobile } from '../../../hooks/IsMobile'
import axios from 'axios'
import ModalProduct from '../../Components/ModalProduct'
import ModalPayment from '../../Components/ModalPayment'
import { useSnapshot } from 'valtio'
import state from '../../../store/store'
import { usePage } from '@inertiajs/react'
import { getNow, showAlert } from '../../../helper'
function FormItem({
    title,
    sxButton,
    iconButton,
    endpoint,
    data,
    customer_id,
    row_id,
    size,
    onSuccess
  }) {
    const snap = useSnapshot(state)
    const isMobile = useIsMobile()
    const modalTambah = useRef(null)
    const {session} = usePage().props
    const [item,setItem] = useState(data?.inventory_id || 0)
    const [plu, setPlu] = useState(data?.inventory_id_txt || "")
    const [idInvoice,setIdInvoice] = useState(data?.payment_id || 0)
    const [invoice,setInvoice] = useState(data?.payment_id_txt || "")
    const [sertifikat1,setSertifikat1] = useState(data?.sertificate_1 || "")
    const [sertifikat2,setSertifikat2] = useState(data?.sertificate_2 || "")
    const [photo,setPhoto] = useState("")
    const [preview,setPreview] = useState(data?.photo != null ? `${snap.base_url}/storage/uploaded/${data?.photo}` : null)
    const handleFileChange = e => {
      const file = e.target.files[0]
      if (file) {
          setPhoto(file);
          setPreview(URL.createObjectURL(file));
      }
    }
    const handleSubmit = async () => {
      const formData = {
        data : {
          row_id : row_id,
          company_id : session.company_id,
          inventory_id : item,
          payment_id : idInvoice,
          sertificate_1 : sertifikat1,
          sertificate_2 : sertifikat2,
          is_deleted : 0,
          created_date : getNow(),
          created_by : session.username,
          modified_date : getNow(),
          modified_by : session.username
        },
        file : photo,
      }
      console.log(formData)      
      try{
        const response = await axios.post(endpoint,formData,{
          headers : {
            "Content-Type" : "multipart/form-data"
          }
        })
        const responseData = await response.data
        onSuccess(responseData)
        showAlert("Berhasil!",`Item berhasil di${title.toLowerCase()}`,'success')
      }catch(err){
        console.log(err)
        showAlert('Gagal!',"Terjadi kesalahan silahkan coba lagi","error")
      }finally{
        modalTambah.current?.close()
      }
      
    }
    
  return (
    <LayoutModal size={size} ref={modalTambah} height='auto' closeButton={false} width={ isMobile ? "80%" : "30%"} sxButton={sxButton} iconButton={iconButton}>
        <h2 className='text-1xl font-bold mb-4 text-center'>{title} BARANG</h2>
        <div className='mt-3'>
          <Input value={plu} label="PLU" fullWidth
              InputProps={{
              endAdornment: (
                  <InputAdornment position="end">
                      <ModalProduct setIdItem={setItem} setPlu={setPlu}/>
                  </InputAdornment>
              ),
                  readOnly : true
              }}
              InputLabelProps={{
                  shrink: true,
              }}
          />
        </div>
        <div className='mt-3'>
          <Input value={invoice} label="Invoice" fullWidth
              InputProps={{
              endAdornment: (
                  <InputAdornment position="end">
                      <ModalPayment id_customer={customer_id} setInvoice={setInvoice} setIdInvoice={setIdInvoice}/>
                  </InputAdornment>
              ),
                  readOnly : true
              }}
              InputLabelProps={{
                  shrink: true,
              }}
          />
        </div>
        <div className='mt-3'>
          <Input value={sertifikat1} fullWidth onChange={e => setSertifikat1(e.target.value)} label="Sertifikat 1" />
        </div>
        <div className='mt-3'>
          <Input value={sertifikat2} fullWidth onChange={e => setSertifikat2(e.target.value)} label="Sertifikat 2" />
        </div>
        <div className='mt-3'>
          <Input fullWidth onChange={handleFileChange} type="file" label="Foto" />
          {preview != null && preview != "" && 
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

export default FormItem
