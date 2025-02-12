import React, { useRef, useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import { Button, Chip} from '@mui/material'
import { MdDelete } from 'react-icons/md'
import FormVoucher from './components/FormVoucher'
import { encrypt, formatDate, showAlert } from '../../helper'
import { FaCirclePlus } from 'react-icons/fa6'
import ModalHistoryData from '../Components/ModalHistoryData'
import { useIsMobile } from '../../hooks/IsMobile'
import Swal from 'sweetalert2'
function Voucher() {
    const tableRef = useRef(null)
    const handleDelete = (data) => {
        Swal.fire({
            title: "Are you sure?",
            text : `Delete voucher  ${data?.unique_code}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          }).then( async (result) => {
            if (result.isConfirmed) {
              try{
                await axios.delete(`/voucher/delete/${encrypt(data?.row_id)}`)
                showAlert("Deleted!","Voucher berhasil dihapus","success")
                tableRef.current?.refreshData()
              }catch(err){
                showAlert("Gagal","Silahkan coba lagi", "error")
              }
            }
          });

    }
    const [columnDefs] = useState([
        {field : "row_id",headerName : "", filter : false,minWidth : 120, width : 120, pinned : "left", resizable : false,
            headerComponent : params => <FormVoucher mode="tambah" label="TAMBAH VOUCHER" tableRef={tableRef} sxButton={{background : "#2e7d32"}} iconButton={<FaCirclePlus color='white'/>} />,
            cellRenderer : params => 
                (
                    <div key={params.value}>
                        <Button onClick={() => handleDelete(params?.data)} sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="error">
                            <MdDelete/>
                        </Button>
                    </div>
                ),
        },
        {field : "unique_code",headerName : "Kode voucher",
            cellRenderer : params => 
            (
                <ModalHistoryData width={useIsMobile() ? "80%" : "50%"} params={params}>
                    
                </ModalHistoryData>
            )
        },
        {field : "amount",headerName : "Amount", cellRenderer : params => Intl.NumberFormat('id-ID').format(params.value)},
        {field : "is_used",headerName : "Status",
            cellRenderer : params => <Chip color={params.value == 1 ? "error" : "success"} label={params.value == 1 ? "Not avaible" : "Avaible"}/>
        },
        {field : "date_used",headerName : "Tanggal dipakai",
            cellRenderer : params => params.value == null ? "-" : formatDate(params.value)
        },
    ])
  return (
    <Layout title="Voucher" page="Voucher">
        <Table ref={tableRef} columnDefs={columnDefs} endpoint="/voucher/getAll" />
    </Layout>
  )
}

export default Voucher
