import React, { useRef, useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import { Link } from '@inertiajs/react'
import { FaCirclePlus } from 'react-icons/fa6'
import { MdDelete, MdDone, MdEdit } from 'react-icons/md'
import { Button, Grid2 as Grid } from '@mui/material'
import ModalHistoryData from '../Components/ModalHistoryData'
import FormCity from './components/FormCity'
import Swal from 'sweetalert2'
import { showAlert } from '../../helper'
function City({access}) {
    const tableRef =  useRef(null)
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
              await axios.delete(`/city/delete/${row_id}`)
              showAlert("Berhasil!","Kota berhasil dihapus",'success')
              tableRef.current.refreshData()
            }catch(err){
              showAlert("Error!","Terjadi kesalahan silahkan coba lagi","error")
            }
          }
        });
        
    }
    const [columnDefs] = useState([
        {field : "row_id",headerName : "", minWidth : 150, width : 150,pinned : 'left', resizable : false, filter : false, hide : access == 'Read only' ? true : false,
            headerComponent : params => (
                <FormCity table={tableRef} endpoint="/city/tambah" title="TAMBAH" sxButton={{background:"#b89474",py:4}} iconButton={<FaCirclePlus className='text-white'/>} />
            ),
            cellRenderer : params => 
                (
                    <div key={params.value}>
                        <FormCity table={tableRef} alamat={params.data?.city_name} nama={params.data?.province_name} endpoint={`/city/edit/${params.value}`} title="EDIT" sxButton={{minWidth : "30px", background : "#1976d2",padding : 3}} iconButton={<MdEdit color='white'/>} />
                        <Button onClick={() => handleDelete(params.value)} sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="error">
                            <MdDelete/>
                        </Button>
                    </div>
                ),
        },
        {field : "city_name",headerName : "City",
            cellRenderer : params => (
                <ModalHistoryData params={params}>
                    <Grid size={6}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>PROVINCE</label><br />
                        <span>{params.data?.province_name}</span>
                    </Grid>
                    <Grid size={6}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>KOTA</label><br />
                        <span>{params.value}</span>
                    </Grid>
                </ModalHistoryData>
            )
        },
        {field : "province_name", headerName : "Province"}
    ])
  return (
    <Layout title="Kota" page="Kota">
        <Table ref={tableRef} columnDefs={columnDefs} endpoint="/city/getAll"/>
    </Layout>
  )
}

export default City
