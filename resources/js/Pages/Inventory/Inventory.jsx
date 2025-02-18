import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import { Button, Card, CardActionArea, CardContent, Chip, Grid2 as Grid } from '@mui/material';
import Table from '../Components/Table'
import {MdDelete, MdEdit,MdFileUpload} from 'react-icons/md'
import { FaPrint,FaBuilding } from "react-icons/fa";
import { Link } from '@inertiajs/react';
import { FaCirclePlus } from 'react-icons/fa6';
import ModalInventory from './components/ModalInventory';
import { encrypt, formatDate, showAlert } from '../../helper';
import FormUpdateStore from './components/FormUpdateStore';
import FormUploadSertifikat from './components/FormUploadSertifikat';
import Swal from 'sweetalert2';

function Inventory({totalInventoryList,access}) {
    const [tableKey,setTableKey] = useState(0)
    const handleDelete = (row_id) => {
        Swal.fire({
          title: "Are you sure?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes"
        }).then( async (result) => {
          if (result.isConfirmed) {
            try{
              await axios.delete(`/inventory/delete/${row_id}`)
              showAlert("Berhasil!","Barang berhasil dihapus",'success')
              setTableKey(prev => prev + 1)
            }catch(err){
              showAlert("Error!","Terjadi kesalahan silahkan coba lagi","error")
            }
          }
        });
        
    }
    const [columnDef] = useState([
        {field : "row_id",headerName : "", width : access == "Full control" ? 211 : 80,pinned : "left", filter : false, resizable : false, minWidth : access == "Read only" ? 80 : undefined,
            headerComponent : params => (
                <>
                    {access == "Full control" &&
                        <Link key={params.value} className='flex justify-center' href='/inventory/create' method="post" style={{background: "#2e7d32",padding : "10px",borderRadius : "10px",width : "80%",textAlign : "center"}}>
                            <FaCirclePlus className='text-white'/>
                        </Link>
                    }
                </>
            ),
            cellRenderer : params => (
                params.value && (

                    <div key={params.value}>
                        {access == "Full control" &&
                            <Link href={`/inventory/form/${encrypt(params.value)}`}>
                                <Button sx={{ width: "30px", marginLeft : "5px", minWidth: "30px",  }} size='small' color="primary" variant="contained">
                                    <MdEdit/>
                                </Button>
                            </Link>
                        }
                        {access == "Full control" &&
                            <Button onClick={() => handleDelete(params.value)} sx={{ width: "30px", marginLeft : "5px", minWidth: "30px",  }} size='small' variant='contained' color='error'>
                                <MdDelete/>
                            </Button>
                        }
                        <a href={`/inventory/barcode/${params.value}`} target='__blank'>
                            <Button sx={{ width: "30px", marginLeft : "5px", minWidth: "30px",  }} size='small' variant='contained' color="inherit">
                                <FaPrint style={{color: "black"}}/>
                            </Button>
                        </a>
                        {access == "Full control" &&
                            <FormUploadSertifikat row_id={params.value} iconButton={<MdFileUpload color='white'/>}/>
                        }
                        {access == "Full control" &&
                            <FormUpdateStore onSuccess={setTableKey} data={params?.data} iconButton={<FaBuilding color='white'/>} />
                        }
                    </div>
                )
            )
        },
        {field : "identity_code",headerName : "PLU", minWidth : 120, width : 120, flex : false,
            cellRenderer : params => <ModalInventory params={params}/>
        },
        {field : "created_date",headerName : "Tgl dibuat", hide : true, cellRenderer : params => formatDate(params.value), filter : 'agDateColumnFilter' },
        {field : "item_id_txt",headerName : "Item"},
        {field : "model_id_txt",headerName : "Model"},
        {field : "store_id_txt",headerName : "Store"},
        {field : "location_id_txt",headerName : "Letak", cellRenderer : params => params.value == null ? "-" : params.value},
        {field : "sell_price",headerName : "Harga jual", cellRenderer : params => Intl.NumberFormat("id-ID").format(params.value), filter : 'agNumberColumnFilter', flex : false,minWidth : 130, width : 130},
        {field : "status",headerName : "Status", cellRenderer : params => <Chip size='small' label={params.value} color={params.value == "READY" ? "success" : "error" }/>},
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
                <Table key={tableKey} statusFilter={true} columnDefs={columnDef} endpoint="/inventory/getAll" />
            </Grid>
        </Grid>
    </Layout>
  )
}

export default Inventory
