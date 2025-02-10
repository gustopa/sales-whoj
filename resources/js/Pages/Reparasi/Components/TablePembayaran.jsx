import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { FaPlus } from 'react-icons/fa6';
import { Button } from '@mui/material';
import { MdDelete, MdEdit } from 'react-icons/md';
import Swal from 'sweetalert2';
import { formatDate, showAlert } from '../../../helper';
import DataTable from '../../Layouts/components/Datatable';
import FormPaymentReparation from './FormPaymentReparation';

function TablePembayaran({row_id,setDocNo,ref}) {
    const [update,setUpdate] = useState('')
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
              const response = await axios.delete(`/reparation/deletePayment/${row_id}`)
              const responseData = await response.data
              showAlert("Berhasil!","Pembayaran berhasil dihapus",'success')
              setUpdate(responseData.timestamp)
            }catch(err){
              showAlert("Error!","Terjadi kesalahan silahkan coba lagi","error")
            }
          }
        });
        
      }
    const [columnDefs] = useState([
        {field : "line_id", headerName : "", minWidth : 110, width : 110,
            headerComponent : params => <FormPaymentReparation setDocNo={setDocNo} onSuccess={setUpdate} sxButton={{background : "#2e7d32"}} row_id={row_id} endpoint="/reparation/tambahPayment" title="TAMBAH" iconButton={<FaPlus color='white'/>}/>,
            cellRenderer : params => (
                params.data && (
                    <div key={params.value}>
                        <FormPaymentReparation data={params.data} onSuccess={setUpdate} row_id={params.data?.row_id} endpoint={`/reparation/editPayment/${params.value}`} title="EDIT" sxButton={{minWidth : "30px", background : "#1976d2",padding : 3}} iconButton={<MdEdit color='white'/>} />
                        <Button onClick={()=>handleDelete(params.value)} sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="error">
                            <MdDelete/>
                        </Button>
                    </div>
                )
            )
        },
        {field : "amount_txt", headerName : "Keterangan Biaya"},
        {field : "amount", headerName : "Biaya Reparasi", cellRenderer : params => Intl.NumberFormat("en-US").format(params.value)},
        {field : "amount_type", headerName : "Jenis Pembayaran"},
    ]);
    const [dataDp,setDataDp] = useState([])
    const getData = async () => {
      try{
        const response = await axios.get(`/reparation/getPayment/${row_id}`)
        const data = await response.data
        setDataDp(data)
      }catch(err){
        showAlert("Error!","Terjadi kesalahan silahkan coba lagi","error")
      }
    }
    
    useEffect(()=>{
      getData()
    },[row_id,update])

    useImperativeHandle(ref,()=>{
      return {
        total_dp : dataDp.length
      }
    })
    return (
        <DataTable data={dataDp} pagination={false} filter={false} columns={columnDefs}/>
        // <Table ref={tableRef} kolomFilter={false} minWidth={100} filter={false} floatingFilter={false} pagination={false} columnDefs={columnDefs} endpoint={`/request_order/getDownPayment/${row_id}`}/>
    )
}

export default TablePembayaran
