import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import { Link } from '@inertiajs/react'
import { FaCirclePlus } from 'react-icons/fa6'
import { Button } from '@mui/material'
import { MdDelete, MdDone, MdEdit } from 'react-icons/md'
import {formatDate} from '../../helper'
import ModalMiscellaneous from './components/ModalMiscellaneous'
function Miscellaneous({access}) {
    const [rowHeight,setRowHeight] = useState(45)
    const [columnDefs] = useState([
        {field : "row_id",headerName : "",width : 150,resizable : false, filter : false, hide : access == "Read only" ? true : false,pinned : "left",
            headerComponent : params => (
                <Link className='flex justify-center' href='/miscellaneous/create' method="post" style={{background: "#b89474",padding : "10px",borderRadius : "10px",width : "80%",textAlign : "center"}}>
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
        {field : "nama",headerName : "Nama",
            cellRenderer : params => <ModalMiscellaneous params={params}/>
        },
        {field : "item",headerName : "Item",},
        {field : "foto",headerName : "Photo",
            cellRenderer : params => (
                <img onLoad={() => setRowHeight(150)} src={`https://system-mahakarya.com/assets/uploaded/${params.value}`} />
            )
        },
        {field : "keterangan",headerName : "Keterangan",},
        {field : "trans_date",headerName : "Tanggal",cellRenderer : params => formatDate(params.value)},
        {field : "location_id_txt",headerName : "Lokasi",},
        {field : "store_id_txt",headerName : "Store",},
    ])
  return (
    <Layout title="Miscellaneous" page="Miscellaneous">
        <Table columnDefs={columnDefs} rowHeight={rowHeight} height="80vh" domLayout='normal' endpoint="/miscellaneous/getAll" />
    </Layout>
  )
}

export default Miscellaneous
