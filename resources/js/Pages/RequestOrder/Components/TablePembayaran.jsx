import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import Table from '../../Components/Table'
import FormDownPayment from './FormDownPayment';
import { FaPlus } from 'react-icons/fa6';
import { Button } from '@mui/material';
import { MdDelete, MdEdit } from 'react-icons/md';
import Swal from 'sweetalert2';
import { formatDate, showAlert } from '../../../helper';
import DataTable from '../../Layouts/components/Datatable';

function TablePembayaran({row_id,setDocNo,ref}) {
    const tableRef = useRef(null)
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
              const response = await axios.delete(`/request_order/deleteDownPayment/${row_id}`)
              const responseData = await response.data
              showAlert("Berhasil!","Item berhasil dihapus",'success')
              setUpdate(responseData)
            }catch(err){
              showAlert("Error!","Terjadi kesalahan silahkan coba lagi","error")
            }
          }
        });
        
      }
    const [columnDefs] = useState([
        {field : "line_id", headerName : "", minWidth : 110, width : 110,
            headerComponent : params => <FormDownPayment setDocNo={setDocNo} onSuccess={setUpdate} table={tableRef} sxButton={{background : "#2e7d32"}} row_id={row_id} endpoint="/request_order/tambahDownPayment" title="TAMBAH" iconButton={<FaPlus color='white'/>}/>,
            cellRenderer : params => (
                <div key={params.value}>
                    <FormDownPayment setDocNo={setDocNo} onSuccess={setUpdate} row_id={params.data?.row_id} table={tableRef} dataTanggal={params.data?.dp_date} dataAmount={params.data?.down_payment} data_dp={params.data?.dp_ke} bukti_dp={params.data?.bukti_dp} endpoint={`/request_order/editDownPayment/${params.value}`} title="EDIT" sxButton={{minWidth : "30px", background : "#1976d2",padding : 3}} iconButton={<MdEdit color='white'/>} />
                    <Button onClick={()=>handleDelete(params.value)} sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="error">
                        <MdDelete/>
                    </Button>
                </div>
            )
        },
        {field : "dp_date", headerName : "Tanggal",minWidth : 130, width : 130,cellRenderer : params => params.value == null ? "-" : formatDate(params.value)},
        {field : "down_payment", headerName : "Uang Muka", cellRenderer : params => Intl.NumberFormat("en-US").format(params.value),minWidth : 110, width : 110,},
        {field : "dp_ke", headerName : "DP Ke",minWidth : 110, width : 110,},
        {field : "bukti_dp", headerName : "Bukti DP",minWidth : 110, width : 110,}
    ]);
    const [dataDp,setDataDp] = useState([])
    const getData = async () => {
      try{
        const response = await axios.get(`/request_order/getDownPayment/${row_id}`)
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
