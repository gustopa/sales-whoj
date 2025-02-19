import React, { useState } from 'react'
import LayoutModal from '../../Layouts/components/LayoutModal'
import { useIsMobile } from '../../../hooks/IsMobile'
import { Button, CircularProgress, FormControl, Grid2 as Grid, InputLabel, MenuItem, Select } from '@mui/material'
import Input from '../../Layouts/components/Input'
import { usePage } from '@inertiajs/react'
import { useSnapshot } from 'valtio'
import state from '../../../store/store'
import { getNow, showAlert } from '../../../helper'
import axios from 'axios'
function FormMiscellaneous({iconButton,sxButton,title,data,onSuccess}) {
    const isMobile = useIsMobile()
    const {stores,locations,session} = usePage().props
    const snap = useSnapshot(state)

    const [nama,setNama] = useState(data?.nama || "")
    const [item,setItem] = useState(data?.item || '') 
    const [keterangan,setKeterangan] = useState(data?.keterangan || "")
    const [tanggal,setTanggal] = useState(data?.trans_date?.split(" ")[0] || "")
    const [location,setLocation] = useState(data?.location_id || 0)
    const [store,setStore] = useState(data?.store_id || 0)
    const [foto,setFoto] = useState(data?.foto || "")
    const [preview,setPreview] = useState(data?.foto != null ? `${snap.base_url}/storage/uploaded/${data?.foto}` : null)
    const [loading,setLoading] = useState(false)

    const handleSubmit = async () => {
        if(nama == "") return showAlert("Warning","Nama harus diisi","warning")
        setLoading(true)
        const formData = {
            file : foto,
            data  : {
                company_id : session.company_id,
                nama : nama,
                item : item,
                keterangan : keterangan,
                trans_date : tanggal,
                location_id : location,
                store_id : store,
                is_submitted : 1,
                is_deleted : 0,
                created_date : getNow(),
                created_by : session.username,
                modified_date : getNow(),
                modified_by : session.username
            }
        }
        if(title == "EDIT"){
            delete formData.data.company_id
            delete formData.data.created_date
            delete formData.data.created_by
            delete formData.data.is_deleted
        }
        const endpoint = title == "TAMBAH" ? "/miscellaneous/tambah" : `/miscellaneous/edit/${data.row_id}`
        try{
            await axios.post(endpoint,formData,{
                headers : {
                    "Content-Type" : "multipart/form-data"
                }
            })
            onSuccess(prev => prev +1)
            showAlert("Berhasil!",`Data berhasil di${title.toLowerCase()}`,'success')
        }catch(err){
            console.log(err)
            showAlert("Error","Terjadi kesalahan silahkan coba lagi","error")
        }finally{
            setLoading(false)
        }
    }
  return (
    <LayoutModal height='auto' width={isMobile ? "80%" : "40%"} iconButton={iconButton} sxButton={sxButton}>
        <h2 className='font-bold dark:text-white text-1xl text-center my-1'>{title} MISCELLANEOUS</h2>
        <Grid container spacing={2}>
            <Grid size={12}>
                <Input onChange={e => setNama(e.target.value)} value={nama} label="Nama :" fullWidth/>
            </Grid>
            <Grid size={12}>
                <Input onChange={e => setItem(e.target.value)} value={item} label="Item :" fullWidth/>
            </Grid>
            <Grid size={12}>
                <Input value={keterangan} onChange={e => setKeterangan(e.target.value)} label="Keterangan :" fullWidth/>
            </Grid>
            <Grid size={12}>
                <Input value={tanggal} onChange={e => setTanggal(e.target.value)} type="date" label="Tanggal :" fullWidth/>
            </Grid>
            <Grid size={12}>
                <FormControl fullWidth>
                    <InputLabel shrink id="location"><span className='text-whoj'>Lokasi :</span></InputLabel>
                    <Select
                        size='small'
                        displayEmpty
                        name='location'
                        labelId="location"
                        id="location-select"
                        value={location}
                        label="Lokasi :"
                        onChange={e => setLocation(e.target.value)}
                    >
                            <MenuItem value={0}><span className='p-3'></span></MenuItem>
                        {locations.map(a => 
                            <MenuItem key={a.row_id} value={a.row_id}>{a.name}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </Grid>
            <Grid size={12}>
                <FormControl fullWidth>
                    <InputLabel shrink id="store"><span className='text-whoj'>Store :</span></InputLabel>
                    <Select
                        size='small'
                        displayEmpty
                        name='store'
                        labelId="store"
                        id="store-select"
                        value={store}
                        label="Store :"
                        onChange={e => setStore(e.target.value)}
                    >
                            <MenuItem value={0}><span className='p-3'></span></MenuItem>
                        {stores.map(a => 
                            <MenuItem key={a.row_id} value={a.row_id}>{a.name}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </Grid>
            <Grid size={12}>
                <Input onChange={e => {
                    const file = e.target.files[0]
                    if(file){
                        setPreview(URL.createObjectURL(file));
                        setFoto(file)
                    }
                }} type="file" label="Foto :" fullWidth />
                {preview != null && 
                    <div className='w-25'>
                        <img src={preview} alt="" />
                    </div>
                }
            </Grid>
            <Grid size={12}>
                <Button onClick={handleSubmit} disabled={loading} variant='contained'>
                    {loading ? <CircularProgress style={{width:'25px',height:'25px',color:'white'}}/> : "Submit"}
                </Button>
            </Grid>
        </Grid>
    </LayoutModal>
  )
}

export default FormMiscellaneous
