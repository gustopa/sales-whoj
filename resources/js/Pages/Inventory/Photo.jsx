import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import { Link } from '@inertiajs/react'
import { FaCirclePlus } from 'react-icons/fa6'
import { Button } from '@mui/material'
import { MdDelete, MdDone, MdEdit } from 'react-icons/md'
import FormPhoto from './components/FormPhoto'
import { showAlert } from '../../helper'
import Swal from 'sweetalert2'
import axios from 'axios'
function Photo({access}) {
    const [tableKey,setTableKey] = useState(0)
    const handleDelete = row_id => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async result => {
            if(result.isConfirmed){
                try{
                    await axios.delete(`/photo_inventory/delete/${row_id}`)
                    setTableKey(prev => prev +1)
                    showAlert("Berhasil","Foto berhasil dihapus","success")
                }catch(err){
                    console.log(err)
                    showAlert('Error',"Terjadi kesalahan silahkan coba lagi","error")
                }
            }
        })
    }
    const [columnDefs] = useState([
        {field : "row_id",headerName : "",width : 110,minWidth : 110,resizable : false, filter : false, hide : access == "Read only" ? true : false,pinned : "left",
            headerComponent : params => (
                <FormPhoto onSuccess={setTableKey} title="TAMBAH" sxButton={{background : "#2e7d32"}} iconButton={<FaCirclePlus color='white'/>} />
            ),
            cellRenderer : params => 
                (
                    <div key={params.value}>
                        {params.data?.status != "PAID" && 
                            <FormPhoto onSuccess={setTableKey} title="EDIT" data={params.data} sxButton={{minWidth : "30px",background : "#1976D2",padding : 4}} iconButton={<MdEdit color='white'/>}/>
                        }
                        <Button onClick={() => handleDelete(params.value)} sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="error">
                            <MdDelete/>
                        </Button>
                    </div>
                ),
        },
        {field : "photo",headerName : "File photo", width : 150, minWidth : 150, flex : 0,
            cellRenderer : params => (
                <img src={`https://system-mahakarya.com/assets/uploaded/${params.value}`} />
            )
        },
        {field : "notes",headerName : "Catatan",flex : 1, minWidth : 320,},
    ])
  return (
    <Layout title="Foto" page="Foto">
        <Table key={tableKey} columnDefs={columnDefs} domLayout='normal' height="80vh" endpoint="/photo_inventory/getAll" rowHeight={160} />
    </Layout>
  )
}

export default Photo
