import React, { useRef, useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import { Link } from '@inertiajs/react'
import { FaCirclePlus } from 'react-icons/fa6'
import { MdDelete, MdDone, MdEdit } from 'react-icons/md'
import { Button, Grid2 as Grid } from '@mui/material'
import ModalHistoryData from '../Components/ModalHistoryData'
import FormLabourPrice from './components/FormLabourPrice'
import Swal from 'sweetalert2'
import { showAlert } from '../../helper'
function LabourPrice({access}) {
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
              await axios.delete(`/labour_price/delete/${row_id}`)
              showAlert("Berhasil!","Harga labour berhasil dihapus",'success')
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
                <FormLabourPrice table={tableRef} endpoint="/labour_price/tambah" title="TAMBAH" sxButton={{background:"#2e7d32",py:4}} iconButton={<FaCirclePlus className='text-white'/>} />
            ),
            cellRenderer : params => 
                (
                    <div key={params.value}>
                        <FormLabourPrice table={tableRef} nama={params.data?.name} harga={params.data?.amount} endpoint={`/labour_price/edit/${params.value}`} title="EDIT" sxButton={{minWidth : "30px", background : "#1976d2",padding : 3}} iconButton={<MdEdit color='white'/>} />
                        <Button onClick={() => handleDelete(params.value)} sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="error">
                            <MdDelete/>
                        </Button>
                    </div>
                ),
        },
        {field : "name",headerName : "Item",
            cellRenderer : params => (
                <ModalHistoryData params={params}>
                    <Grid size={12}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>NAMA</label><br />
                        <span>{params.value}</span>
                    </Grid>
                </ModalHistoryData>
            )
        },
        {field : 'amount', headerName : "Harga", cellRenderer : params => "$"+Intl.NumberFormat('en-US').format(params.value)}
    ])
  return (
    <Layout title="Harga labour" page="Harga labour">
        <Table ref={tableRef} columnDefs={columnDefs} endpoint="/labour_price/getAll"/>
    </Layout>
  )
}

export default LabourPrice
