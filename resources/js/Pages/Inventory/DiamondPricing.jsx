import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import { Link } from '@inertiajs/react'
import { Button } from '@mui/material'
import { MdDelete, MdEdit } from 'react-icons/md'
import { FaCirclePlus } from 'react-icons/fa6'
function DiamondPricing({access}) {
    const [columnDefs] = useState([
        {field : "row_id",headerName : "", filter : false, resizable : false,sortable : false,pinned : "left", width : 110, minWidth : 110, hide : access == "Read only" ? true : false,
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
                    </div>
                ),
        },
        {field : "diamond_type",headerName : "Bentuk", flex : 1, minWidth : 150},
        {field : "size_from",headerName : "Dari ukuran", flex : 1, minWidth : 150},
        {field : "size_to",headerName : "Sampai ukuran", flex : 1, minWidth : 150},
        {field : "price",headerName : "Harga (USD)",cellRenderer : params => Intl.NumberFormat('en-US').format(params.value), flex : 1, minWidth : 150},
    ])
  return (
    <Layout title="Harga" page="Harga">
        <Table columnDefs={columnDefs} endpoint="/diamond_pricing/getAll" />
    </Layout>
  )
}

export default DiamondPricing
