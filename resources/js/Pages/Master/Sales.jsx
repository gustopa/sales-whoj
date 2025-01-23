import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import { Link } from '@inertiajs/react'
import { FaCirclePlus } from 'react-icons/fa6'
import { MdDelete, MdDone, MdEdit } from 'react-icons/md'
import { Button, Chip, Grid2 as Grid } from '@mui/material'
import ModalHistoryData from '../Components/ModalHistoryData'
function Sales({access}) {
    const [columnDefs] = useState([
        {field : "row_id",headerName : "", minWidth : 150, width : 150,pinned : 'left', resizable : false, filter : false,hide : access == 'Read only' ? true : false,
            headerComponent : params => (
                <Link className='flex justify-center' method="post" style={{background: "#b89474",padding : "10px",borderRadius : "10px",width : "80%",textAlign : "center"}}>
                    <FaCirclePlus className='text-white'/>
                </Link>
            ),
            cellRenderer : params => 
                (
                    <div key={params.value}>
                        <Link>
                            <Button sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="primary">
                                <MdEdit/>
                            </Button>
                        </Link>
                        <Button sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="error">
                            <MdDelete/>
                        </Button>
                        <Button size="small" style={{cursor : "default"}}>
                            <MdDone style={{color : params.data?.is_submitted == 0 ? '#bbb' : '#059c1b',fontWeight : "bold"}}/>
                        </Button>
                    </div>
                ),
        },
        {field : "name", headerName : "Nama",
            cellRenderer : params => (
                <ModalHistoryData params={params}>
                    <Grid size={{xs: 6, md: 4}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>PERAN</label><br />
                        <span>{params.data?.role_id_txt}</span>
                    </Grid>
                    <Grid size={{xs: 6, md: 4}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>STORE</label><br />
                        <span>{params.data?.store_id_txt}</span>
                    </Grid>
                    <Grid size={{xs: 6, md: 4}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>NAMA</label><br />
                        <span>{params.data?.name}</span>
                    </Grid>
                    <Grid size={{xs: 6, md: 4}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>EMAIL</label><br />
                        <span>{params.data?.email}</span>
                    </Grid>
                    <Grid size={{xs: 6, md: 4}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>USER ID</label><br />
                        <span>{params.data?.user_id == null ? "-" : params.data?.user_id}</span>
                    </Grid>
                    <Grid size={{xs: 6, md: 4}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>KATA KUNCI</label><br />
                        <span>****</span>
                    </Grid>
                    <Grid size={{xs: 6, md: 4}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>AKTIF</label><br />
                        <Chip label={params.data?.is_active != 1 ? "NO" : "YES"} color={params.data?.is_active != 1 ? "error" : "success"}/>
                    </Grid>
                </ModalHistoryData>
            )
        },
        {field : "email", headerName : "Email"},
        {field : "is_active", headerName : "Aktif",
            cellRenderer : params => <Chip label={params.data?.is_active != 1 ? "NO" : "YES"} color={params.data?.is_active != 1 ? "error" : "success"}/>
        },
    ])
  return (
    <Layout title="Sales" page="Sales">
        <Table columnDefs={columnDefs} endpoint="/sales/getAll"/>
    </Layout>
  )
}

export default Sales
