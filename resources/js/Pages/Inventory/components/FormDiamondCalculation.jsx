import React, { useState } from 'react'
import LayoutModal from '../../Layouts/components/LayoutModal'
import { Button, FormControl, Grid2 as Grid, InputLabel, MenuItem, Select } from '@mui/material'
import { useIsMobile } from '../../../hooks/IsMobile'
import Input from '../../Layouts/components/Input'
import { usePage } from '@inertiajs/react'
import axios from 'axios'
import { getNow, showAlert } from '../../../helper'
function FormDiamondCalculation({data,iconButton,sxButton,title,row_id,onSuccess,updateTable}) {
    const isMobile = useIsMobile()
    const session = usePage().props.session
    const [butir,setButir] = useState(data?.grain || 0)
    const [karat,setKarat] = useState(data?.grade || 0)
    const [tipe,setTipe] = useState(data?.diamond_type || "")
    const [GIA,setGIA] = useState(data?.is_gia || 0)
    const [sert,setSert] = useState(data?.no_sert || "")
    const [diameter,setDiameter] = useState(data?.diameter || "")
    const [color,setColor] = useState(data?.color || "")
    const [amount,setAmount] = useState(data?.amount || "")

    const handleSubmit = async () => {
        const formData = {
            data : {
                row_id : row_id,
                company_id : session.company_id,
                grain : butir,
                grade : karat,
                diamond_type : tipe,
                is_gia : GIA,
                no_sert : sert,
                diameter : diameter,
                color : color,
                amount : amount,
                created_date : getNow(),
                created_by : session.username,
                modified_date : getNow(),
                modified_by : session.username
            }
        }
        if(title == "EDIT"){
            delete formData.data.row_id;
            delete formData.data.company_id;
            delete formData.data.created_date;
            delete formData.data.created_by;
        }
        const endpoint = title == "TAMBAH" ? "/inventory/tambahDiamond" : `/inventory/editDiamond/${data.line_id}`
        try{
            const response = await axios.post(endpoint,formData)
            const responseData = await response.data
            onSuccess(false)
            updateTable(prev => prev + 1)
            showAlert('Berhasil',`Data berhasil di${title.toLowerCase()}`,'success')
        }catch(err){
            console.log(err)
            showAlert('Gagal!',"Terjadi kesalahan silahkan coba lagi",'error')
        }
        
    }
  return (
    <LayoutModal width={isMobile ? "80%" : "50%"} height='auto' iconButton={iconButton} sxButton={sxButton}>
        <h2 className='font-bold text-1xl mb-3'>{title} DIAMOND</h2>
        <Grid container spacing={2}>
            <Grid size={{xs:12,md:6}}>
                <Input fullWidth value={butir} onChange={e => setButir(e.target.value)} label="Butir :"/>
            </Grid>
            <Grid size={{xs:12,md:6}}>
                <Input fullWidth value={karat} onChange={e => setKarat(e.target.value)} label="Karat :"/>
            </Grid>
            <Grid size={{xs:12,md:6}}>
                <Input fullWidth value={tipe} onChange={e => setTipe(e.target.value)} label="Tipe :"/>
            </Grid>
            <Grid size={{xs:12,md:6}}>
                <FormControl fullWidth>
                    <InputLabel shrink id="gia"><span className='text-whoj'>GIA :</span></InputLabel>
                    <Select
                        size='small'
                        displayEmpty
                        name='gia'
                        labelId="gia"
                        id="gia-select"
                        value={GIA}
                        label="Gia :"
                        onChange={e => setGIA(e.target.value)}
                    >
                            <MenuItem value="0">NO</MenuItem>
                            <MenuItem value="1">YES</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid size={{xs:12,md:6}}>
                <Input value={sert} onChange={e => setSert(e.target.value)} fullWidth label="SERT No : " />
            </Grid>
            <Grid size={{xs:12,md:6}}>
                <Input value={diameter} onChange={e => setDiameter(e.target.value)} fullWidth label="Diameter :" />
            </Grid>
            <Grid size={{xs:12,md:6}}>
                <Input value={color} onChange={e => setColor(e.target.value)} fullWidth label="Warna :" />
            </Grid>
            <Grid size={{xs:12,md:6}}>
                <Input value={amount} onChange={e => setAmount(e.target.value)} fullWidth label="Amount :" />
            </Grid>
            <Grid size={12}>
                <Button onClick={handleSubmit} variant='contained'>Submit</Button>
            </Grid>
        </Grid>
    </LayoutModal>
  )
}

export default FormDiamondCalculation
