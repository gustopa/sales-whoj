import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import { Link } from '@inertiajs/react'
import { FaCirclePlus } from 'react-icons/fa6'
import { Button } from '@mui/material'
import { MdDelete, MdEdit } from 'react-icons/md'
import ModalPriceCalculation from './components/ModalPriceCalculation'
function PriceCalculation({access}) {
    const [columnDefs] = useState([
        {field : "row_id", headerName : "",filter : false,resizable : false,pinned : "left", minWidth : 120, width : 120, hide : access == "Read only" ? true : false, 
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
                    </div>
                ),
        },
        {field : "name", headerName : "Nama", flex : 1, minWidth : 150,
            cellRenderer : params => <ModalPriceCalculation params={params}/>
        },
        {field : "item_id_txt", headerName : "Item", flex : 1, minWidth : 150},
        {field : "sell_price", headerName : "Harga jual(IDR)", flex : 1, minWidth : 150,
            cellRenderer : params => Intl.NumberFormat('id-ID').format(params.value)
        },
    ])
  return (
    <Layout title="Kalkulasi harga" page="Kalkulasi harga">
        <Table columnDefs={columnDefs} endpoint="/inventory_price_calculation/getAll"/>
    </Layout>
  )
}

export default PriceCalculation
