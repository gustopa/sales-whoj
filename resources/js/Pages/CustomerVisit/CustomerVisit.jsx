import React, { useEffect, useRef, useState } from 'react'
import Layout from '../Layouts/Layout'
import DataTable from '../Layouts/components/Datatable'
import axios from 'axios'
import { Button } from '@mui/material'
import { MdDelete, MdEdit } from 'react-icons/md'
import LayoutModal from '../Layouts/components/LayoutModal'
import { FaCirclePlus } from 'react-icons/fa6'
import ModalViewCustomer from '../Customer/ModalViewCustomer'
import Swal from 'sweetalert2'
import FormCustomerVisit from './FormCustomerVisit'
import ModalProduct from '../Components/ModalProduct'
import { useIsMobile } from '../../hooks/IsMobile'
function CustomerVisit({access}) {
    console.log(access);
  
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
    const refModalTambah = useRef()
    const refModalEdit = useRef()
    const [columnDefs, setColumnDefs] = useState([
        {field : "row_id", headerName : "" ,
            headerComponent : props => (
                <LayoutModal ref={refModalTambah} closeButton={false} variant="contained" sxButton={{backgroundColor : "#b89474"}} iconButton={<FaCirclePlus/>}>
                    <FormCustomerVisit onSuccess={setUpdate} action="tambah" refModal={refModalTambah}/>
                </LayoutModal>
              ),
            cellRenderer : params => (
                <>
                    <LayoutModal closeButton={false} ref={refModalEdit} variant="contained" iconButton={<MdEdit/>}>
                        <FormCustomerVisit onSuccess={setUpdate} lineId={params.data.row_id} action="edit" itemID={params.data.inventory_id} customerID={params.data.customer_id} customer={params.data.customer_id_txt} barang={params.data.item_id_txt} tanggal_visit={params.data.trans_date} notes={params.data.notes} data={params.data} refModal={refModalEdit} />
                    </LayoutModal>
                    <Button onClick={() => handleDelete(params.value)} style={{marginLeft: "10px"}} variant="contained" color="error">
                        <MdDelete/>
                    </Button>
                </>
            ),
            hide : access == "Read only" ? true : false
        },
        {field : "customer_id_txt", headerName : "Pelanggan",
            cellRenderer : params => <ModalViewCustomer params={params} id_customer={params.data.customer_id} />
        },
        {field : "inventory_id_txt", headerName : "PLU"},
        {field : "item_id_txt", headerName : "Item"},
        {field : "trans_date", headerName : "Tanggal"},
        {field : "notes", headerName : "Notes",autoHeight : true, wrapText : true, flex : useIsMobile() ? undefined : 1},
    ])
    const [rowData, setRowData] = useState([])
    
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
