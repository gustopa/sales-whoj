import React, { useRef, useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import { FaCirclePlus } from 'react-icons/fa6'
import { MdDelete, MdEdit } from 'react-icons/md'
import { Button, Grid2 as Grid } from '@mui/material'
import ModalHistoryData from '../Components/ModalHistoryData'
import FormStore from './components/FormStore'
import { showAlert } from '../../helper'
import Swal from 'sweetalert2'
function Store({access}) {
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
              await axios.delete(`/store/delete/${row_id}`)
              showAlert("Berhasil!","Store berhasil dihapus",'success')
              tableRef.current.refreshData()
            }catch(err){
              showAlert("Error!","Terjadi kesalahan silahkan coba lagi","error")
            }
          }
        });
        
    }
    const [columnDefs] = useState([
        {field : "row_id",headerName : "", minWidth : 150, width : 150,pinned : 'left', resizable : false, filter : false,hide : access == 'Read only' ? true : false,
            headerComponent : params => (
                <FormStore table={tableRef} endpoint="/store/tambah" title="TAMBAH" sxButton={{background:"#2e7d32",py:4}} iconButton={<FaCirclePlus className='text-white'/>} />
            ),
            cellRenderer : params => 
                (
                    <div key={params.value}>
                        <FormStore table={tableRef} alamat={params.data?.address} nama={params.data?.name} endpoint={`/store/edit/${params.value}`} title="EDIT" sxButton={{minWidth : "30px", background : "#1976d2",padding : 3}} iconButton={<MdEdit color='white'/>} />
                        <Button onClick={() => handleDelete(params?.value)} sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="error">
                            <MdDelete/>
                        </Button>
                    </div>
                ),
        },
        {field : "name",headerName : "Nama",
            cellRenderer : params => (
                <ModalHistoryData params={params}>
                    <Grid size={6}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>NAMA</label><br />
                        <span>{params.value}</span>
                    </Grid>
                    <Grid size={6}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>ALAMAT</label><br />
                        <span>{params.data?.address == "" ? "-" : params.data?.address}</span>
                    </Grid>
                </ModalHistoryData>
            )
        },
    ])
  return (
    <Layout title="Store" page="Store">
        <Table ref={tableRef} columnDefs={columnDefs} endpoint="/store/getAll"/>
    </Layout>
  )
}

export default Store
