import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import DataTable from '../Layouts/components/Datatable'
import ModalHistoryData from '../Components/ModalHistoryData'
import { Button, Chip, Grid2 as Grid } from '@mui/material'
import { MdEdit } from 'react-icons/md'
function Company({access,data}) {
    const [columnDefs] = useState([
        {field : 'row_id', headerName : "", pinned : "left", minWidth : 80, width : 80, filter : false, resizable : false, hide : access == "Read only" ? true : false,
            cellRenderer : params => (
                <Button sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="primary">
                    <MdEdit/>
                </Button>
            )
        },
        {field : "name", headerName : "Entitas", width : 250, minWidth : 250,
            cellRenderer : params => (
                <ModalHistoryData params={params}>
                    <Grid size={{xs : 6, md : 4}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>ENTITAS</label><br />
                        <span>{params.value}</span>
                    </Grid>
                    <Grid size={{xs : 6, md : 4}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>ALAMAT</label><br />
                        <span>{params.data.address}</span>
                    </Grid>
                    <Grid size={{xs : 6, md : 4}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>TELEPON</label><br />
                        <span>{params.data.phone}</span>
                    </Grid>
                    <Grid size={{xs : 6, md : 4}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>EMAIL</label><br />
                        <span>{params.data.email == "" ? "-" : params.data.email}</span>
                    </Grid>
                    <Grid size={{xs : 6, md : 4}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>NAMA KONTAK</label><br />
                        <span>{params.data.pic == "" ? "-" : params.data.pic}</span>
                    </Grid>
                    <Grid size={{xs : 6, md : 4}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>LOGO</label><br />
                        <span>{params.data.file_logo == "" ? "-" : params.data.file_logo}</span>
                    </Grid>
                    <Grid size={{xs : 6, md : 4}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>AKTIF</label><br />
                        <Chip label={params.data.is_active == 1 ? "YES" : "NO"} color={params.data.is_active == 1 ? "success" : "error"}/>
                    </Grid>
                </ModalHistoryData>
            )
        },
        {field : "phone", headerName : "Telepon", cellRenderer : params => params.value == "" ? "-" : params.value},
        {field : "email", headerName : "Email", cellRenderer : params => params.value == "" ? "-" : params.value},
        {field : "pic", headerName : "Nama kontak", cellRenderer : params => params.value == "" ? "-" : params.value},
        {field : "is_active", headerName : "Aktif", cellRenderer : params => <Chip color={params.value ? "success" : "error"} label={params.value ? "YES" : "NO" } />, width : 100, minWidth : 100},
    ])
  return (
    <Layout title="Entitas" page="Entitas">
        <DataTable columns={columnDefs} data={data}/>
    </Layout>
  )
}

export default Company
