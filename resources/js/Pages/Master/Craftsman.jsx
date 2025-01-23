import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import { Link } from '@inertiajs/react'
import { FaCirclePlus } from 'react-icons/fa6'
import { MdDelete, MdDone, MdEdit } from 'react-icons/md'
import { Button, Grid2 as Grid } from '@mui/material'
import ModalHistoryData from '../Components/ModalHistoryData'
function Craftsman({access}) {
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
        {field : "name",headerName : "Nama",
            cellRenderer : params => (
                <ModalHistoryData params={params}>
                    <Grid size={6}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>NAMA</label><br />
                        <span>{params.value}</span>
                    </Grid>
                    <Grid size={6}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>RATE</label><br />
                        <span>{Intl.NumberFormat('id-ID').format(params.data?.rate_hour)}</span>
                    </Grid>
                </ModalHistoryData>
            )
        },
        {field : 'rate_hour', headerName : "Rate", cellRenderer : params => Intl.NumberFormat('id-ID').format(params.value)}
    ])
  return (
    <Layout title="Pengrajin" page="Pengrajin">
        <Table columnDefs={columnDefs} endpoint="/craftsman/getAll"/>
    </Layout>
  )
}

export default Craftsman
