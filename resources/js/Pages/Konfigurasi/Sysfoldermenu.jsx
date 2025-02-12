import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import { Link } from '@inertiajs/react'
import { FaCirclePlus } from 'react-icons/fa6'
import { Button, Grid2 as Grid} from '@mui/material'
import { MdDelete, MdEdit } from 'react-icons/md'
import ModalHistoryData from '../Components/ModalHistoryData'
function Sysfoldermenu() {
    const [columnDefs] = useState([
        {field : "row_id", headerName : "", pinned : "left", minWidth : 110, width : 110,filter : false, resizable : false,
            headerComponent : params => (
                <Link className='flex justify-center' method="post" style={{background: "#2e7d32",padding : "10px",borderRadius : "10px",width : "80%",textAlign : "center"}}>
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
                    </div>
                ),
        },
        {field : "name", headerName : "Nama inggris",
            cellRenderer : params => (
                <ModalHistoryData params={params}>
                    <Grid size={{xs: 6, md: 3}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>NAMA INGGRIS</label><br />
                        <span>{params.data?.name}</span>
                    </Grid>
                    <Grid size={{xs: 6, md: 3}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>NAMA BAHASA</label><br />
                        <span>{params.data?.name_bahasa}</span>
                    </Grid>
                    <Grid size={{xs: 6, md: 3}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>ICON</label><br />
                        <span>{params.data?.icon}</span>
                    </Grid>
                    <Grid size={{xs: 6, md: 3}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>URUTAN</label><br />
                        <span>{params.data?.sequence}</span>
                    </Grid>
                </ModalHistoryData>
            )
        },
        {field : "name_bahasa", headerName : "Nama indonesia"},
        {field : "icon", headerName : "Icon"},
        {field : "sequence", headerName : "Urutan"}
    ])
  return (
    <Layout title="Folder menu" page="Folder menu">
        <Table columnDefs={columnDefs} endpoint="/sysfoldermenu/getAll" />
    </Layout>
  )
}

export default Sysfoldermenu
