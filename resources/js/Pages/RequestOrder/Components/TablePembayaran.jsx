import React, { useRef, useState } from 'react'
import Table from '../../Components/Table'
import FormDownPayment from './FormDownPayment';
import { FaPlus } from 'react-icons/fa6';
import { Button } from '@mui/material';
import { MdDelete, MdEdit } from 'react-icons/md';
import Swal from 'sweetalert2';
import { showAlert } from '../../../helper';

function TablePembayaran({row_id}) {
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
              await axios.delete(`/request_order/deleteDownPayment/${row_id}`)
              showAlert("Berhasil!","Item berhasil dihapus",'success')
              tableRef.current.refreshData()
            }catch(err){
              showAlert("Error!","Terjadi kesalahan silahkan coba lagi","error")
            }
          }
        });
        
      }
    const [columnDefs] = useState([
        {field : "line_id", headerName : "",
            headerComponent : params => <FormDownPayment table={tableRef} sxButton={{background : "#b89474"}} endpoint="/request_order/tambahDownPayment" title="TAMBAH" iconButton={<FaPlus color='white'/>}/>,
            cellRenderer : params => (
                <div key={params.value}>
                    <FormDownPayment table={tableRef} nama={params.data?.name} endpoint={`/request_order/editDownPayment/${params.value}`} title="EDIT" sxButton={{minWidth : "30px", background : "#1976d2",padding : 3}} iconButton={<MdEdit color='white'/>} />
                    <Button onClick={()=>handleDelete(params.value)} sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="error">
                        <MdDelete/>
                    </Button>
                </div>
            )
        },
        {field : "dp_date", headerName : "Tanggal"},
        {field : "down_payment", headerName : "Uang Muka"},
        {field : "dp_ke", headerName : "DP Ke"},
        {field : "bukti_dp", headerName : "Bukti DP"}
    ]);
    return (
        <Table ref={tableRef} kolomFilter={false} minWidth={100} filter={false} floatingFilter={false} pagination={false} columnDefs={columnDefs} endpoint={`/request_order/getDownPayment/${row_id}`}/>
    )
}

export default TablePembayaran
