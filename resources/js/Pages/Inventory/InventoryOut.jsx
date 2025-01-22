import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import { Link } from '@inertiajs/react'
import { FaCirclePlus } from 'react-icons/fa6'
import { Button, Chip } from '@mui/material'
import { MdCancel, MdEdit, MdPrint } from 'react-icons/md'
import ModalInventoryOut from './components/ModalInventoryOut'
function InventoryOut({access}) {
    const [columnDefs] = useState([
        {field : "row_id",headerName : "", pinned : "left",filter : false, width : 160,minWidth : 160,resizable : false,
            headerComponent : params => (
                <>
                    {access == "Full control" &&
                        <Link className='flex justify-center' href='/refund/create' method="post" style={{background: "#b89474",padding : "10px",borderRadius : "10px",width : "80%",textAlign : "center"}}>
                            <FaCirclePlus className='text-white'/>
                        </Link>
                    }
                </>
            ),
            cellRenderer : params => 
                (
                    <div key={params.value}>
                        {params.data?.status != "RECEIVED" && params.data?.status != "SEND" && params.data?.status != "CANCELLED" && access == "Full control" && 
                            <Link>
                                <Button sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="primary">
                                    <MdEdit/>
                                </Button>
                            </Link>
                        }
                        {params.data?.status != "CANCELLED" &&
                            <Button sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="inherit">
                                <MdPrint style={{color : "black"}}/>
                            </Button>
                        }
                        {params.data?.status == "SEND" && access == "Full control" &&
                            <Button sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="error">
                                <MdCancel/>
                            </Button>
                        }
                    </div>
                ),
        },
        {field : "doc_no",headerName : "Doc no",
            cellRenderer : params => <ModalInventoryOut params={params}/>
        },
        {field : "trans_date",headerName : "Tanggal"},
        {field : "out_from_txt",headerName : "Dari"},
        {field : "in_to_txt",headerName : "Ke"},
        {field : "notes",headerName : "Catatan"},
        {field : "status",headerName : "Status",
            cellRenderer : params => {
                let color
                
                switch(params.value){
                    case "SEND" :
                        color = "success"
                        break
                    case "RECEIVED" :
                        color = "info"
                        break
                    case "CANCELLED" :
                        color = "error"
                        break
                    default :
                        color = "secondary"
                        break
                }
                return (<Chip label={params.value == "" || params.value == null ? "DRAFT" : params.value} color={color} />)
            }
        },
    ])
  return (
    <Layout title="Inventory Keluar" page="Inventory Keluar">
        <Table columnDefs={columnDefs} endpoint="/inventory_out/getAll"/>
    </Layout>
  )
}

export default InventoryOut
