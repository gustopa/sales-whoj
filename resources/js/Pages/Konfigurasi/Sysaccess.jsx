import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import { Link } from '@inertiajs/react'
import { FaCirclePlus } from 'react-icons/fa6'
import { MdDelete, MdDone, MdEdit } from 'react-icons/md'
import { Button, Card, Grid2 as Grid } from '@mui/material'
import ModalHistoryData from '../Components/ModalHistoryData'
import DataTable from '../Layouts/components/Datatable'
import { encrypt } from '../../helper'
function Sysaccess({access}) {
    const [columnDefs] = useState([
        {field : "row_id",headerName : "", minWidth : 110, width : 110,pinned : 'left', resizable : false, filter : false,hide : access == 'Read only' ? true : false,
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
        {field : "name",headerName : "Nama",
            cellRenderer : params => {
                const [dataAccess, setDataAccess] = useState([])
                let id
                if(params.data){
                    id = encrypt(params.data?.row_id)
                }
                console.log(dataAccess);
                const [column] = useState([
                    {field : "menu_id_txt",headerName : "Menu"},
                    {field : "menu_access",headerName : "Akses"}
                ])
                
                return (
                    <ModalHistoryData height="80%" params={params} makeRequest={true} setData={setDataAccess} endpoint={`/sysaccess/getListAccess/${id}`}>
                        <Grid size={6}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>PERAN</label><br />
                            <span>{params.data?.role_id_txt}</span>
                        </Grid>
                        <Grid size={6}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>NAMA</label><br />
                            <span>{params.value}</span>
                        </Grid>
                        <Grid size={12}>
                            <h2 className='text-1xl font-bold dark:text-white'>MENU</h2>
                            <DataTable columns={column} data={dataAccess} pagination={false} />
                        </Grid>
                    </ModalHistoryData>
                )
            }
        },
        {field : "role_id_txt",headerName : "Peran"}
    ])
  return (
    <Layout title="Role" page="Peran akun">
        <Table columnDefs={columnDefs} endpoint="/sysaccess/getAll"/>
    </Layout>
  )
}

export default Sysaccess
