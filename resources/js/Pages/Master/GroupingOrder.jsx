import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import { Link } from '@inertiajs/react'
import { FaCirclePlus } from 'react-icons/fa6'
import { MdDelete, MdDone, MdEdit } from 'react-icons/md'
import { Button, Grid2 as Grid } from '@mui/material'
import ModalHistoryData from '../Components/ModalHistoryData'
import { encrypt } from '../../helper'
import DataTable from '../Layouts/components/Datatable'
function GroupingOrder({access}) {
    const [columnDefs] = useState([
        {field : "row_id",headerName : "", minWidth : 150, width : 150,pinned : 'left', resizable : false, filter : false,hide : access == 'Read only' ? true : false,
            headerComponent : params => (
                <Link className='flex justify-center' href='/refund/create' method="post" style={{background: "#b89474",padding : "10px",borderRadius : "10px",width : "80%",textAlign : "center"}}>
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
            cellRenderer : params => {
                const [dataDiamond,setDataDiamond] = useState([])
                let id = 0
                if(params.data){
                    id = encrypt(params.data?.row_id)
                }
                const [columnDefs] = useState([
                    {field : 'grain', headerName : 'Butir', minWidth : 100, width : 100,},
                    {field : 'grade', headerName : 'Karat', cellRenderer : params => Intl.NumberFormat('en-US').format(params.value), minWidth : 100, width : 100,},
                    {field : 'diamond_type', headerName : 'Tipe', minWidth : 100, width : 100,},
                    {field : 'no_sert', headerName : 'SERT no', minWidth : 100, width : 100,},
                    {field : 'diameter', headerName : 'Diameter', minWidth : 100, width : 100,},
                    {field : 'color', headerName : 'Warna', minWidth : 100, width : 100,},
                ])
                return (
                    <ModalHistoryData params={params} setData={setDataDiamond} makeRequest={true} endpoint={`/grouping_order/getDetailDiamond/${id}`}>
                        <Grid size={{xs : 6, md : 4}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>NAMA</label><br />
                            <span>{params.value}</span>
                        </Grid>
                        <Grid size={{xs : 6, md : 4}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>TIPE ITEM</label><br />
                            <span>{params.data?.item_id_txt}</span>
                        </Grid>
                        <Grid size={{xs : 6, md : 4}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>BERAT EMAS</label><br />
                            <span>{params.data?.gold_weight}</span>
                        </Grid>
                        <Grid size={12}>
                            <h2 className='text-1xl font-bold my-2'>DIAMOND</h2>
                            <DataTable columns={columnDefs} data={dataDiamond} pagination={false}/>
                        </Grid>
                    </ModalHistoryData>
                )
            }
        },
        {field : "item_id_txt", headerName : "Item"},
        {field : "gold_weight", headerName : "Berat emas"}
    ])
  return (
    <Layout title="Grouping pesanan" page="Grouping pesanan">
        <Table columnDefs={columnDefs} endpoint="/grouping_order/getAll"/>
    </Layout>
  )
}

export default GroupingOrder
