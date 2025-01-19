import React, { useRef, useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import ModalViewCustomer from '../Customer/ModalViewCustomer';
import { Button, Chip } from '@mui/material';
import FormShipping from './FormShipping';
import { FaCirclePlus } from 'react-icons/fa6';
import { MdDelete, MdEdit } from 'react-icons/md';
import ModalInvoice from '../Components/ModalInvoice';
import Swal from 'sweetalert2';
function Shipping({access}) {
    const tableRef = useRef(null)
    const handleDelete = (id) => {
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
                const response = await axios.delete(`/shipping/delete/${id}`)
                const data = await response.data
                
                Swal.fire({
                    title : "Berhasil",
                    icon : "success",
                    text : "Data berhasil dihapus"
                })
                tableRef.current?.refreshData()
            }catch(err){
                Swal.fire({
                    title : "gagal",
                    icon : "success",
                    text : "Data gagal dihapus"
                })
            }
        }
      })
    }
    
    const [columnDefs,setColumnDefs] = useState([
        {field : "row_id",headerName : "", filter: false,resizable: false, pinned : "left", sortable: false, hide : access == "Read only" ? true : false,
            headerComponent : params => <FormShipping tableRef={tableRef} action="tambah" bgColor="#b89474" iconButton={<FaCirclePlus className='text-white'/>}/>,
            cellRenderer : params => 
            {
                return (
                    <div key={params.value}>
                        <FormShipping 
                            size="small"
                            tableRef={tableRef}
                            action="edit"
                            id={params.value} 
                            resi={params.data?.no_resi == null ? "" : params.data?.no_resi} 
                            customer={params.data?.customer_id_txt == null ? "" : params.data?.customer_id_txt} 
                            invoiceID={params.data?.payment_id} 
                            invoice={params.data?.payment_id_txt == null ? "" : params.data?.payment_id_txt} 
                            tanggal={params.data?.shipping_date == null ? "" : params.data?.shipping_date} 
                            customerID={params.data?.customer_id} 
                            bgColor="#1976d2" 
                            iconButton={<MdEdit className='text-white' />}
                        />
                        <Button onClick={() => handleDelete(params.value)} style={{marginLeft : "10px"}} variant="contained" color="error"><MdDelete/></Button>
                    </div>
                )
            }
        },
        {field : "no_resi", headerName : "No resi"},
        {field : "customer_id_txt", headerName : "Pelanggan",
            cellRenderer : params => <ModalViewCustomer params={params} id_customer={params.data?.customer_id} />
            
        },
        {field : "payment_id_txt", headerName : "Invoice", 
            cellRenderer : params => (
                <ModalInvoice params={params} row_id={params.data?.payment_id} />
            )
        },
        {field : "shipping_date", headerName : "Tanggal"},
        {field : "status", headerName : "Status",
            cellRenderer : params => (
                <Chip label={params.value} color="success" variant="filled"/>
            )
        },
        
    ])
  return (
    <Layout title="Pengiriman" page="Shipping">
        <Table ref={tableRef} columnDefs={columnDefs} endpoint="/shipping/getAll"/>
    </Layout>
  )
}

export default Shipping
