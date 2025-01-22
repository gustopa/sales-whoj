import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import { Link } from '@inertiajs/react'
import { FaCirclePlus } from 'react-icons/fa6'
import { Button } from '@mui/material'
import { MdDelete, MdDone, MdEdit } from 'react-icons/md'
function Photo({access}) {
    const [columnDefs] = useState([
        {field : "row_id",headerName : "",width : 150,resizable : false, filter : false, hide : access == "Read only" ? true : false,pinned : "left",
            headerComponent : params => (
                <Link className='flex justify-center' href='/refund/create' method="post" style={{background: "#b89474",padding : "10px",borderRadius : "10px",width : "80%",textAlign : "center"}}>
                    <FaCirclePlus className='text-white'/>
                </Link>
            ),
            cellRenderer : params => 
                (
                    <div key={params.value}>
                        {params.data?.status != "PAID" && 
                            <Link>
                                <Button sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="primary">
                                    <MdEdit/>
                                </Button>
                            </Link>
                        }
                        <Button sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="error">
                            <MdDelete/>
                        </Button>
                        <Button size="small" style={{cursor : "default"}}>
                            <MdDone style={{color : params.data?.is_submitted == 0 ? '#bbb' : '#059c1b',fontWeight : "bold"}}/>
                        </Button>
                    </div>
                ),
        },
        {field : "photo",headerName : "File photo",
            cellRenderer : params => (
                <img src={`https://system-mahakarya.com/assets/uploaded/${params.value}`} />
            )
        },
        {field : "notes",headerName : "Catatan",flex : 1, minWidth : 320,},
    ])
  return (
    <Layout title="Foto" page="Foto">
        <Table columnDefs={columnDefs} domLayout='normal' height="80vh" endpoint="/photo_inventory/getAll" rowHeight={160} />
    </Layout>
  )
}

export default Photo
