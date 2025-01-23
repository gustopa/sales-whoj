import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import { Link } from '@inertiajs/react'
import { FaCirclePlus } from 'react-icons/fa6'
import { MdDelete, MdDone, MdEdit } from 'react-icons/md'
import { Button, Grid2 as Grid } from '@mui/material'
import ModalHistoryData from '../Components/ModalHistoryData'
function City({access}) {
    
    const [columnDefs] = useState([
        {field : "row_id",headerName : "", minWidth : 150, width : 150,pinned : 'left', resizable : false, filter : false, hide : access == 'Read only' ? true : false,
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
        {field : "city_name",headerName : "City",
            cellRenderer : params => (
                <ModalHistoryData params={params}>
                    <Grid size={6}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>PROVINCE</label><br />
                        <span>{params.data?.province_name}</span>
                    </Grid>
                    <Grid size={6}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>KOTA</label><br />
                        <span>{params.value}</span>
                    </Grid>
                </ModalHistoryData>
            )
        },
        {field : "province_name", headerName : "Province"}
    ])
  return (
    <Layout title="Kota" page="Kota">
        <Table columnDefs={columnDefs} endpoint="/city/getAll"/>
    </Layout>
  )
}

export default City
