import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import { Link } from '@inertiajs/react'
import { FaCirclePlus } from 'react-icons/fa6'
import { Button } from '@mui/material'
import { MdDelete, MdDone, MdEdit } from 'react-icons/md'
import {formatDate, showAlert} from '../../helper'
import ModalMiscellaneous from './components/ModalMiscellaneous'
import FormMiscellaneous from './components/FormMiscellaneous'
import Swal from 'sweetalert2'
function Miscellaneous({access}) {
    const [rowHeight,setRowHeight] = useState(45)
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
                    await axios.delete(`/miscellaneous/delete/${row_id}`)
                    setTableKey(prev => prev +1)
                    showAlert("Berhasil","Miscellaneous berhasil dihapus","success")
                }catch(err){
                    console.log(err)
                    showAlert('Error',"Terjadi kesalahan silahkan coba lagi","error")
                }
            }
        })
    }
    const [columnDefs] = useState([
        {field : "row_id",headerName : "",width : 110, minWidth : 110,resizable : false, filter : false, hide : access == "Read only" ? true : false,pinned : "left",
            headerComponent : params => (
                <FormMiscellaneous onSuccess={setTableKey} title="TAMBAH" sxButton={{background : "#2e7d32"}} iconButton={<FaCirclePlus color='white'/>} />
            ),
            cellRenderer : params => 
                (
                    <div key={params.value}>
                        <FormMiscellaneous onSuccess={setTableKey} data={params.data} title="EDIT" sxButton={{minWidth : "30px",background : "#1976D2",padding : 4}} iconButton={<MdEdit color='white'/>}/>
                        <Button onClick={() => handleDelete(params.value)} sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="error">
                            <MdDelete/>
                        </Button>
                    </div>
                ),
        },
        {field : "nama",headerName : "Nama",
            cellRenderer : params => params.value == null ? "-" : <ModalMiscellaneous params={params}/>
        },
        {field : "item",headerName : "Item",cellRenderer : params => params.value == null ? "-" : params.value},
        {field : "keterangan",headerName : "Keterangan", cellRenderer : params => params.value == null || params.value == "" ? "-" : params.value},
        {field : "trans_date",headerName : "Tanggal",cellRenderer : params => params.value == null ? "-" : formatDate(params.value)},
        {field : "location_id_txt",headerName : "Lokasi", cellRenderer : params => params.value == null ? "-" : params.value},
        {field : "store_id_txt",headerName : "Store",cellRenderer : params => params.value == null ? "-" : params.value},
        {field : "foto",headerName : "Photo",
            cellRenderer : params => (
                <img key={params.value} onLoad={() => setRowHeight(150)} src={`https://system-mahakarya.com/assets/uploaded/${params.value}`} />
            )
        },
    ])
  return (
    <Layout title="Miscellaneous" page="Miscellaneous">
        <Table key={tableKey} columnDefs={columnDefs} rowHeight={rowHeight} height="80vh" domLayout='normal' endpoint="/miscellaneous/getAll" />
    </Layout>
  )
}

export default Miscellaneous
