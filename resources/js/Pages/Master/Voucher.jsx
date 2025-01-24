import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import { Button, Grid2 as Grid } from '@mui/material'
import { MdDelete, MdEdit } from 'react-icons/md'
import ModalTambahVoucher from './components/voucher/ModalTambahVoucher'
function Voucher() {
    const [columnDefs] = useState([
        {field : "row_id",headerName : "", filter : false,minWidth : 120, width : 120, pinned : "left", resizable : false,
            headerComponent : params => <ModalTambahVoucher/>,
            cellRenderer : params => 
                (
                    <div key={params.value}>
                        <Button sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="primary">
                            <MdEdit/>
                        </Button>
                        <Button sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="error">
                            <MdDelete/>
                        </Button>
                    </div>
                ),
        },
        {field : "unique_code",headerName : "Kode voucher"},
        {field : "amount",headerName : "Total"},
        {field : "is_used",headerName : "Status"},
        {field : "date_used",headerName : "Tanggal dipakai"},
    ])
  return (
    <Layout title="Voucher" page="Voucher">
        <Table columnDefs={columnDefs} endpoint="/voucher/getAll" />
    </Layout>
  )
}

export default Voucher
