import React, { useEffect, useState } from 'react'
import Layout from '../Layouts/Layout'
import DataTable from '../Layouts/components/Datatable'
import axios from 'axios'
import { Button } from '@mui/material'
import { MdDelete, MdEdit } from 'react-icons/md'
import LayoutModal from '../Layouts/components/LayoutModal'
import { FaCirclePlus } from 'react-icons/fa6'
import ModalViewCustomer from '../Customer/ModalViewCustomer'
import Swal from 'sweetalert2'
function CustomerVisit() {
    const [update,setUpdate] = useState("")
    const handleDelete = id => {
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
            const response = await axios.delete(`/customer_visit/delete/${id}`)
            const data = await response.data
            Swal.fire({
                title : "Berhasil",
                icon : "success",
                text : "Data berhasil dihapus"
            })
            setUpdate(`delete ${data.data}`)
          }catch(err){
            Swal.fire({
                title : "Gagal",
                icon : "error",
                text : "Data gagal dihapus"
            })
          }
        }
      })
    }
    const [columnDefs, setColumnDefs] = useState([
        {field : "row_id", headerName : "" ,
            headerComponent : props => (
                <LayoutModal variant="contained" sxButton={{backgroundColor : "#b89474"}} iconButton={<FaCirclePlus/>}>
                    {/* <LayoutModal width="90vw" iconButton="Tes"/> */}
                </LayoutModal>
              ),
            cellRenderer : params => (
                <>
                    <LayoutModal variant="contained" iconButton={<MdEdit/>}/>
                    <Button onClick={() => handleDelete(params.value)} style={{marginLeft: "10px"}} variant="contained" color="error">
                        <MdDelete/>
                    </Button>
                </>
            )
        },
        {field : "customer_id_txt", headerName : "Pelanggan",
            cellRenderer : params => <ModalViewCustomer params={params} id_customer={params.data.customer_id} />
        },
        {field : "inventory_id_txt", headerName : "PLU"},
        {field : "item_id_txt", headerName : "Item"},
        {field : "trans_date", headerName : "Tanggal"},
        {field : "notes", headerName : "Notes"},
    ])
    const [rowData, setRowData] = useState([])
    console.log(rowData);
    
    const getDataCustomerVisit = async () => {
        const response = await axios.post('/customer_visit/getDataList')
        const data = await response.data
        setRowData(data)
    }
    useEffect(()=>{
        getDataCustomerVisit()
    },[update])
  return (
    <Layout title="Kunjungan Pelanggan" page="Kunjungan Pelanggan">
        <DataTable columns={columnDefs} data={rowData}/>
    </Layout>
  )
}

export default CustomerVisit
