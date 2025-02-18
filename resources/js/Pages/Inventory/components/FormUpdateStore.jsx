import React, { useState } from 'react'
import LayoutModal from '../../Layouts/components/LayoutModal'
import { useIsMobile } from '../../../hooks/IsMobile'
import { usePage } from '@inertiajs/react'
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { getNow, showAlert } from '../../../helper'
import axios from 'axios'

function FormUpdateStore({iconButton,data,onSuccess}) {
    const isMobile = useIsMobile()
    const {stores,locations,session} = usePage().props
    const [store,setStore] = useState(data.store_id)
    const [location,setLocation] = useState(data.location_id)
    const [loading,setLoading] = useState(false)
    const handleSubmit = async () => {
        setLoading(true)
        const formData = {
            data : {
                store_id : store,
                location_id : location,
                modified_date : getNow(),
                modified_by : session.username
            }
        }
        try{
            const response = await axios.post(`/inventory/updateStore/${data.row_id}`,formData)
            const responseData = await response.data
            onSuccess(prev => prev + 1)
            showAlert('Berhasil','Store berhasil diupdate','success');
        }catch(err){
            console.log(err)
            showAlert('Gagal!','Terjadi kesalahan silahkan coba lagi','error')
        }finally{
            setLoading(false)
        }
    }
  return (
    <LayoutModal height='auto' width={isMobile ? "80%" : "30%"} sxButton={{ marginLeft : "5px", minWidth: "30px", padding : 4,background : "#b89474"}} iconButton={iconButton} >
        <div className='mt-2'>
            <h2 className='font-bold mb-2 text-1xl text-center'>FORM EDIT STORE</h2>
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
                        <MenuItem key={0} value={0}><span className='p-3'></span></MenuItem>
                    {stores.map(a => 
                        <MenuItem key={a.row_id} value={a.row_id}>{a.name}</MenuItem>
                    )}
                </Select>
            </FormControl>
            <FormControl fullWidth sx={{mt:2}}>
                <InputLabel shrink id="store"><span className='text-whoj'>Location :</span></InputLabel>
                <Select
                    size='small'
                    displayEmpty
                    name='location'
                    labelId="location"
                    id="location-select"
                    value={location}
                    label="Location :"
                    onChange={e => setLocation(e.target.value)}
                >
                        <MenuItem key={0} value={0}><span className='p-3'></span></MenuItem>
                    {locations.map(a => 
                        <MenuItem key={a.row_id} value={a.row_id}>{a.name}</MenuItem>
                    )}
                </Select>
            </FormControl>
            <div className='mt-2'>
                <Button disabled={loading} onClick={handleSubmit} variant='contained'>
                    {loading ? <CircularProgress style={{width:'25px',height:'25px',color:'white'}}/> : "Simpan"}
                </Button>
            </div>
        </div>
    </LayoutModal>
  )
}

export default FormUpdateStore
