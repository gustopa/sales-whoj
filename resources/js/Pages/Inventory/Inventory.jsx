import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import { Button, Card, CardActionArea, CardContent, Chip, Grid2 as Grid } from '@mui/material';
import Table from '../Components/Table'
import {MdDelete, MdEdit,MdFileUpload} from 'react-icons/md'
import { FaPrint,FaBuilding } from "react-icons/fa";
import { Link } from '@inertiajs/react';
import { FaCirclePlus } from 'react-icons/fa6';
import ModalInventory from './components/ModalInventory';

function Inventory({totalInventoryList}) {
    console.log(totalInventoryList);
    
    const [columnDef] = useState([
        {field : "row_id",headerName : "", width : 211,pinned : "left", filter : false, resizable : false,
            headerComponent : params => (
                <Link key={params.value} className='flex justify-center' href='/inventory/create' method="post" style={{background: "#b89474",padding : "10px",borderRadius : "10px",width : "80%",textAlign : "center"}}>
                    <FaCirclePlus className='text-white'/>
                </Link>
            ),
            cellRenderer : params => (
                <>
                    <Button sx={{ width: "30px", marginLeft : "5px", minWidth: "30px",  }} size='small' color="primary" variant="contained">
                        <MdEdit/>
                    </Button>
                    <Button sx={{ width: "30px", marginLeft : "5px", minWidth: "30px",  }} size='small' variant='contained' color='error'>
                        <MdDelete/>
                    </Button>
                    <Button sx={{ width: "30px", marginLeft : "5px", minWidth: "30px",  }} size='small' variant='contained' color="inherit">
                        <FaPrint style={{color: "black"}}/>
                    </Button>
                    <Button sx={{ width: "30px", marginLeft : "5px", minWidth: "30px",  }} size='small' variant='contained' color='secondary'>
                        <MdFileUpload/>
                    </Button>
                    <Button sx={{ width: "30px", marginLeft : "5px", minWidth: "30px",  }} size='small' variant='contained' color='success'>
                        <FaBuilding/>
                    </Button>
                </>
            )
        },
        {field : "identity_code",headerName : "PLU",
            cellRenderer : params => <ModalInventory params={params}/>
        },
        {field : "item_id_txt",headerName : "Item"},
        {field : "model_id_txt",headerName : "Model"},
        {field : "store_id_txt",headerName : "Store"},
        {field : "location_id_txt",headerName : "Letak", cellRenderer : params => params.value == null ? "-" : params.value},
        {field : "sell_price",headerName : "Harga jual (IDR)", cellRenderer : params => Intl.NumberFormat("id-ID").format(params.value)},
        {field : "status",headerName : "Status", cellRenderer : params => <Chip label={params.value} color={params.value == "READY" ? "success" : "error" }/>},
    ])
  return (
    <Layout title="Barang" page="Barang">
        <Grid container spacing={2}>
            {totalInventoryList.map(inventory => (
                <Grid size={{xs:12,md:2}} key={inventory.total}>
                    <Card className='dark:bg-navy-700'>
                        <CardActionArea>
                            <CardContent className='text-center dark:text-white'>
                                <h1>{inventory.total}</h1>
                                <span>{inventory.store_id_txt}</span>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
        <Grid container spacing={2} className="mt-5">
            <Grid size={12}>
                <Table columnDefs={columnDef} endpoint="/inventory/getAll" />
            </Grid>
        </Grid>
    </Layout>
  )
}

export default Inventory
