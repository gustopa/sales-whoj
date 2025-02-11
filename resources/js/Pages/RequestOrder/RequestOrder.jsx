import React, { useRef, useState } from 'react'
import Layout from '../Layouts/Layout'
import { Button, Chip, Grid2 as Grid } from '@mui/material'
import Table from '../Components/Table'
import { Link } from '@inertiajs/react'
import { MdDelete, MdDone, MdEdit } from 'react-icons/md'
import { encrypt, formatDate, showAlert } from '../../helper'
import ModalComponent from '../Components/Modal'
import { FaCirclePlus } from 'react-icons/fa6'
import Swal from 'sweetalert2'
import axios from 'axios'
function statusColor(status){
    let color = ""
    switch(status){
        case "PAID" : 
            color = "success"
            break
        case "ORDER" : 
            color = "primary"
            break
        case "READY" : 
            color = "warning"
            break
        case "ON GOING" : 
            color = "info"
            break
        default : 
            color = "secondary"
    }
    return color
}


function RequestOrder({access}) {
    const handleDelete = (row_id,ref) => {
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
              await axios.delete(`/request_order/delete/${row_id}`)
              showAlert("Berhasil!","Pesanan berhasil dihapus",'success')
              ref.api.refreshInfiniteCache()
            }catch(err){
              showAlert("Error!","Terjadi kesalahan silahkan coba lagi","error")
            }
          }
        });
        
    }

    const pesananReady = (row_id,ref) => {
        Swal.fire({
            title: "PLU",
            input: "text",
            inputPlaceholder: "Masukan PLU barang",
            showCancelButton: false,
            confirmButtonColor: "success",
            confirmButtonText: "Pesanan ready",
            cancelButtonText: "Batal",
            preConfirm: (value) => {
                if (!value) {
                    Swal.showValidationMessage("PLU tidak boleh kosong!");
                    
                }
                return value;
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try{
                    const response = await axios.post(`/request_order/order_ready/${row_id}`,{PLU : result.value})
                    const responseData =  await response.data
                    if(responseData.status == 200){
                        ref.api.refreshInfiniteCache()
                        tableReady.current?.refreshData()
                    }
                    Swal.fire({
                        title : responseData.status == 200 ? "Tersimpan" : "Not found",
                        text : responseData.status == 200 ? `PLU: ${result.value}` : "PLU tidak ditemukan",
                        icon : responseData.status == 200 ? "success" : "warning"
                    });
                }catch(err){
                    console.log(err)
                    showAlert('Gagal!','terjadi kesalahan silahkan coba lagi','error')
                }
            }
        });
    };
    const [columnDef,setColumnDef] = useState([
        {field : "row_id", headerName : "", pinned : "left", resizable : false,filter : false, width : 137, minWidth : 137,hide : access == "Read only" ? true : false,
            headerComponent : params => (
                <Link className='flex justify-center' href='/request_order/create' method="post" style={{background: "#b89474",padding : "10px",borderRadius : "10px",width : "80%",textAlign : "center"}}>
                    <FaCirclePlus className='text-white'/>
                </Link>
            ),
            cellRenderer : params => 
                (
                    <div key={params.value}>
                        {params.value &&
                            <>
                                <Link href={`/request_order/form/${encrypt(params.value)}`}>
                                    <Button sx={{ width: "30px", minWidth: "30px" }} size="small" variant='contained' color="primary">
                                        <MdEdit/>
                                    </Button>
                                </Link>
                                <Button onClick={() => handleDelete(params.value,params)} sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="error">
                                    <MdDelete/>
                                </Button>
                                <Button onClick={() => pesananReady(params.value,params)} sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="success">
                                    <MdDone/>
                                </Button>
                            </>
                        }
                    </div>
                ),
            
        },
        {field : "doc_no", headerName : "Doc No", cellRenderer : params => <ModalComponent key={params.value} params={params}/>, minWidth : 120, width : 120, flex : false},
        {field : "customer_id_txt", headerName : "Pelanggan"},
        {field : "trans_date", headerName : "Tanggal", cellRenderer : params => params.value == "0000-00-00" ? "-" : formatDate(params.value), filter : 'agDateColumnFilter'},
        {field : "estimated_date", hide :true, headerName : "Perkiraan delivery time", minWidth : 190, width : 190, flex : false,cellRenderer : params => params.value == "0000-00-00" || params.value == null ? "-" : formatDate(params.data?.estimated_date), filter : 'agDateColumnFilter'},
        {field : "item_id_txt", headerName : "Tipe item", width : 125, minWidth : 125, flex : false},
        {field : "type_order", headerName : "Tipe order", minWidth : 120, width : 120, flex : false},
        {field : "outsource_intern", headerName : "Outsource", width : 120, minWidth : 120, flex : false},
        {field : "status", headerName : "Status",cellRenderer : params => <Chip size='small' color={statusColor(params.value)} label={params.value == "" ? "DRAFT" : params.value} />, width : 110, minWidth : 110, flex : false},
        {field : "last_process", headerName : "Proses"},
    ])
    const [columnPaid] = useState([
        {field : "doc_no", headerName : "Doc No", cellRenderer : params => <ModalComponent params={params}/>, minWidth : 120, width : 120, flex : false},
        {field : "customer_id_txt", headerName : "Pelanggan"},
        {field : "trans_date", headerName : "Tanggal", cellRenderer : params => params.value == "0000-00-00" ? "-" : params.value, filter : 'agDateColumnFilter'},
        {field : "estimated_date", hide :true, headerName : "Perkiraan delivery time",minWidth : 190, width : 190, flex : false,cellRenderer : params => params.value == "0000-00-00" ? "-" : params.data?.estimated_date, filter : 'agDateColumnFilter'},
        {field : "item_id_txt", headerName : "Tipe item", width : 125, minWidth : 125, flex : false},
        {field : "type_order", headerName : "Tipe order", minWidth : 120, width : 120, flex : false},
        {field : "outsource_intern", headerName : "Outsource", width : 120, minWidth : 120, flex : false},
        {field : "status", headerName : "Status",cellRenderer : params => <Chip size='small' color={statusColor(params.value)} label={params.value == "" ? "DRAFT" : params.value} />, width : 110, minWidth : 110, flex : false},
    ])
    const tableWaiting = useRef(null)
    const tableProccess = useRef(null)
    const tableReady = useRef(null)
    const tablePaid = useRef(null)
    
  return (
    <Layout title="Pesanan" page="Pesanan">
        <Grid container spacing={2}>
            <Grid size={12}>
                <h2 className='text-2xl dark:text-white font-bold mb-2'>WAITING</h2>
                <Table ref={tableWaiting} columnDefs={columnDef} endpoint="/request_order/getCustomOrder?status[]=&status[]=ORDER"/>
            </Grid>
            <Grid size={12}>
                <h2 className='text-2xl dark:text-white font-bold mb-2'>ON PROCESS</h2>
                <Table ref={tableProccess} columnDefs={columnDef} endpoint="/request_order/getCustomOrder?status[]=&status[]=ON GOING"/>
            </Grid>
            <Grid size={12}>
                <h2 className='text-2xl dark:text-white font-bold mb-2'>COMPLETED</h2>
                <Table ref={tableReady} columnDefs={columnDef} endpoint="/request_order/getCustomOrder?status[]=READY"/>
            </Grid>
            <Grid size={12}>
                <h2 className='text-2xl dark:text-white font-bold mb-2'>PAID</h2>
                <Table ref={tablePaid} columnDefs={columnPaid} endpoint="/request_order/getCustomOrder?status[]=PAID"/>
            </Grid>
        </Grid>
    </Layout>
  )
}

export default RequestOrder
