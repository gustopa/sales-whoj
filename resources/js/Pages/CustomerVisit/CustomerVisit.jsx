import React, { useRef, useState } from 'react'
import Layout from '../Layouts/Layout'
import axios from 'axios'
import { Button } from '@mui/material'
import { MdDelete, MdEdit } from 'react-icons/md'
import LayoutModal from '../Layouts/components/LayoutModal'
import { FaCirclePlus } from 'react-icons/fa6'
import ModalViewCustomer from '../Customer/ModalViewCustomer'
import Swal from 'sweetalert2'
import FormCustomerVisit from './FormCustomerVisit'
import Table from '../Components/Table'
function CustomerVisit({access}) {
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
            refresh()
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
        {field : "row_id", headerName : "" , pinned : "left", filter : false,resizable: false, width : 110, minWidth : 110,
            headerComponent : props => (
                <LayoutModal ref={refModalTambah} closeButton={false} variant="contained" sxButton={{backgroundColor : "#2e7d32"}} iconButton={<FaCirclePlus/>}>
                    <FormCustomerVisit onSuccess={refresh} action="tambah" refModal={refModalTambah}/>
                </LayoutModal>
              ),
            cellRenderer : params => {
                if(params.data){
                  return (
                      <div key={params.value}>
                          <LayoutModal size="small" sxButton={{minWidth : "30px"}} closeButton={false} ref={refModalEdit} variant="contained" iconButton={<MdEdit/>}>
                              <FormCustomerVisit onSuccess={refresh} lineId={params.data?.row_id} action="edit" itemID={params.data?.inventory_id} customerID={params.data?.customer_id} customer={params.data?.customer_id_txt} barang={params.data?.item_id_txt} tanggal_visit={params.data?.trans_date} notes={params.data?.notes} data={params.data} refModal={refModalEdit} />
                          </LayoutModal>
                          <Button size='small' onClick={() => handleDelete(params.value)} sx={{ml:1, minWidth : "30px"}} variant="contained" color="error">
                              <MdDelete/>
                          </Button>
                      </div>
                  )
                }
            },
            hide : access == "Read only" ? true : false
        },
        {field : "customer_id_txt", headerName : "Pelanggan",
            cellRenderer : params => <ModalViewCustomer key={params.data?.customer_id} params={params} id_customer={params.data?.customer_id} />
        },
        {field : "inventory_id_txt", headerName : "PLU"},
        {field : "item_id_txt", headerName : "Item"},
        {field : "trans_date", headerName : "Tanggal", flex : false, minWidth : 120, width : 120, filter : "agDateColumnFilter"},
        {field : "notes", headerName : "Notes", },
    ])
    const refTable = useRef(null)
    const refresh = () => {
      refTable.current?.refreshData()
    }
  return (
    <Layout title="Kunjungan Pelanggan" page="Kunjungan Pelanggan">
        <Table ref={refTable} columnDefs={columnDefs} endpoint="/customer_visit/getDataList" />
    </Layout>
  )
}

export default CustomerVisit
