import React, { useEffect, useState } from 'react'
import Table from '../../Components/Table'
import DataTable from '../../Layouts/components/Datatable'
import { showAlert } from '../../../helper'
import FormDiamond from './FormDiamond'
import { FaPlus } from 'react-icons/fa6'
import { MdDelete, MdEdit } from 'react-icons/md'
import { Button } from '@mui/material'
import Swal from 'sweetalert2'
function TableDetail({row_id,onSuccess}) {
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
                const response = await axios.delete(`/request_order/deleteDiamond/${row_id}`)
                const responseData = await response.data
                showAlert("Berhasil!","Diamond berhasil dihapus",'success')
                onSuccess(responseData.timestamp)
              }catch(err){
                showAlert("Error!","Terjadi kesalahan silahkan coba lagi","error")
              }
            }
          });
          
        }
    const [columnDefs] = useState([
        {field : "line_id", headerName : "",minWidth : 110, width : 110, flex : false, resizable : false, pinned : "left",
          headerComponent : params => <FormDiamond onSuccess={onSuccess} iconButton={<FaPlus color='white'/>} title="TAMBAH" sxButton={{background : "#2e7d32"}} row_id={row_id} endpoint="/request_order/tambahDiamond"/>,
          cellRenderer : params => (
            <div key={params.value}>
              <FormDiamond onSuccess={onSuccess} dataButir={params.data?.grain} dataKarat={params.data?.grade} dataTipe={params.data?.diamond_type} dataSert={params.data?.no_sert} dataDiameter={params.data?.diameter} dataWarna={params.data?.color} iconButton={<MdEdit color='white'/>} title="EDIT" sxButton={{minWidth : "30px", background : "#1976d2",padding : 3}} row_id={row_id} endpoint={`/request_order/editDiamond/${params.value}`}/>
              <Button onClick={()=>handleDelete(params.value)} sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="error">
                  <MdDelete/>
              </Button>
            </div>
          )
        },
        {field : "grain", headerName : "Butir", minWidth : 110, width : 110, flex : false},
        {field : "grade", headerName : "Karat",minWidth : 90, width : 90, flex : false},
        {field : "diamond_type", headerName : "Tipe",minWidth : 70, width : 70, flex : false},
        {field : "no_sert", headerName : "SERT No",minWidth : 100, width : 100},
        {field : "diameter", headerName : "Diameter",minWidth : 100, width : 100},
        {field : "color", headerName : "Warna"},
    ])
    const [data,setData] = useState([])
    const getData = async () => {
      try{
        const response = await axios.get(`/request_order/getDiamondDetail/${row_id}`)
        const row_data = await response.data
        setData(row_data)
      }catch(err){
        showAlert("Error!", "Terjadi kesalahan silahkan coba lagi","error")
      }
    }
    useEffect(()=>{
      getData()
    },[row_id])
  return (
    <DataTable data={data} columns={columnDefs} pagination={false} filter={false} />
  )
}

export default TableDetail
