import React, { useRef, useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import { FaCirclePlus } from 'react-icons/fa6'
import { MdDelete, MdEdit } from 'react-icons/md'
import { Button } from '@mui/material'
import FormPosition from './components/FormPosition'
import Swal from 'sweetalert2'
import { showAlert } from '../../helper'
function Position({access}) {
    const tableRef = useRef(null)
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
              await axios.delete(`/position/delete/${row_id}`)
              showAlert("Berhasil!","Letak barang berhasil dihapus",'success')
              tableRef.current.refreshData()
            }catch(err){
              showAlert("Error!","Terjadi kesalahan silahkan coba lagi","error")
            }
          }
        });
        
    }
    const [columnDefs] = useState([
        {field : "row_id",headerName : "", minWidth : 110, width : 110,pinned : 'left', resizable : false, filter : false,hide : access == 'Read only' ? true : false,
            headerComponent : params => (
                <FormPosition table={tableRef} endpoint="/position/tambah" title="TAMBAH" sxButton={{background:"#2e7d32",py:4}} iconButton={<FaCirclePlus className='text-white'/>} />
            ),
            cellRenderer : params => 
                (
                    <div key={params.value}>
                        <FormPosition table={tableRef} nama={params.data?.name} endpoint={`/position/edit/${params.value}`} title="EDIT" sxButton={{minWidth : "30px", background : "#1976d2",padding : 3}} iconButton={<MdEdit color='white'/>} />
                        <Button onClick={()=>handleDelete(params.value)} sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="error">
                            <MdDelete/>
                        </Button>
                    </div>
                ),
        },
        {field : "name",headerName : "Letak barang"},
    ])
  return (
    <Layout title="Letak barang" page="Letak barang">
        <Table ref={tableRef} columnDefs={columnDefs} endpoint="/position/getAll"/>
    </Layout>
  )
}

export default Position
