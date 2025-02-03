import React, { useRef, useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import { Link } from '@inertiajs/react'
import { FaCirclePlus } from 'react-icons/fa6'
import { MdDelete, MdDone, MdEdit } from 'react-icons/md'
import { Button, Chip, Grid2 as Grid } from '@mui/material'
import ModalHistoryData from '../Components/ModalHistoryData'
import FormSales from './components/FormSales'
import Swal from 'sweetalert2'
import { showAlert } from '../../helper'
function Sales({access}) {
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
              await axios.delete(`/sales/delete/${row_id}`)
              showAlert("Berhasil!","Sales berhasil dihapus",'success')
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
                <FormSales table={tableRef} endpoint="/sales/tambah" title="TAMBAH" sxButton={{background:"#b89474",py:4}} iconButton={<FaCirclePlus className='text-white'/>} />
            ),
            cellRenderer : params => 
                (
                    <div key={params.value}>
                        <FormSales active={params.data?.is_active} nama={params.data?.name} email={params.data?.email} table={tableRef} endpoint={`/sales/edit/${params.value}`} title="EDIT" sxButton={{minWidth : "30px", background : "#1976d2",padding : 3}} iconButton={<MdEdit color='white'/>} />
                        <Button onClick={() => handleDelete(params.value)} sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="error">
                            <MdDelete/>
                        </Button>
                    </div>
                ),
        },
        {field : "name", headerName : "Nama",
            cellRenderer : params => (
                <ModalHistoryData params={params}>
                    <Grid size={{xs: 6, md: 4}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>PERAN</label><br />
                        <span>{params.data?.role_id_txt}</span>
                    </Grid>
                    <Grid size={{xs: 6, md: 4}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>STORE</label><br />
                        <span>{params.data?.store_id_txt}</span>
                    </Grid>
                    <Grid size={{xs: 6, md: 4}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>NAMA</label><br />
                        <span>{params.data?.name}</span>
                    </Grid>
                    <Grid size={{xs: 6, md: 4}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>EMAIL</label><br />
                        <span>{params.data?.email}</span>
                    </Grid>
                    <Grid size={{xs: 6, md: 4}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>USER ID</label><br />
                        <span>{params.data?.user_id == null ? "-" : params.data?.user_id}</span>
                    </Grid>
                    <Grid size={{xs: 6, md: 4}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>KATA KUNCI</label><br />
                        <span>****</span>
                    </Grid>
                    <Grid size={{xs: 6, md: 4}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>AKTIF</label><br />
                        <Chip label={params.data?.is_active != 1 ? "NO" : "YES"} color={params.data?.is_active != 1 ? "error" : "success"}/>
                    </Grid>
                </ModalHistoryData>
            )
        },
        {field : "email", headerName : "Email"},
        {field : "is_active", headerName : "Aktif",
            cellRenderer : params => <Chip label={params.data?.is_active != 1 ? "NO" : "YES"} color={params.data?.is_active != 1 ? "error" : "success"}/>
        },
    ])
  return (
    <Layout title="Sales" page="Sales">
        <Table ref={tableRef} columnDefs={columnDefs} endpoint="/sales/getAll"/>
    </Layout>
  )
}

export default Sales
