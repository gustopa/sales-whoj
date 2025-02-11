import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import { Link } from '@inertiajs/react'
import { Button } from '@mui/material'
import { MdDelete, MdEdit } from 'react-icons/md'
import { FaCirclePlus } from 'react-icons/fa6'
import { encrypt, formatDate, showAlert } from '../../helper'
import ModalTandaTerima from './components/ModalTandaTerima'
import Swal from 'sweetalert2'
function TandaTerima({access}) {
    const [timestamp,setTimestamp] = useState(0)
    const handleDelete = row_id =>{
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
                await axios.delete(`/tanda_terima/delete/${row_id}`)
                showAlert("Berhasil!","Tanda terima berhasil dihapus",'success')
                setTimestamp(prev => prev + 1)
              }catch(err){
                showAlert("Error!","Terjadi kesalahan silahkan coba lagi","error")
              }
            }
          });
    }
    const [columnDef] = useState([
        {field : "row_id", headerName: "",filter : false, resizable : false, width : 100,minWidth : 100,pinned : "left", hide : access == "Read only" ? true : false,
            headerComponent : params => (
                <Link className='flex justify-center' href='/tanda_terima/create' method="post" style={{background: "#2e7d32",padding : "10px",borderRadius : "10px",width : "100%",textAlign : "center"}}>
                    <FaCirclePlus className='text-white'/>
                </Link>
            ),
            cellRenderer : params => 
                (
                    params.value && (
                        <div key={params.value}>
                            {params.data?.status != "PAID" && 
                                <Link href={`/tanda_terima/form/${encrypt(params.value)}`}>
                                    <Button sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="primary">
                                        <MdEdit/>
                                    </Button>
                                </Link>
                            }
                            <Button onClick={() => handleDelete(params.value)} sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="error">
                                <MdDelete/>
                            </Button>
                        </div>

                    )
                ),
        },
        {field : "doc_no", headerName: "Doc No", flex : false, minWidth : 120, width : 120,
            cellRenderer : params => <ModalTandaTerima params={params}/>
        },
        {field : "trans_date", headerName: "Tanggal", flex : false, minWidth : 120, width : 120, filter : 'agDateColumnFilter', cellRenderer : params => params.value == "0000-00-00" ? "-" : formatDate(params.value)},
        {field : "customer_id_txt", headerName: "Pelanggan", flex : 1, minWidth : 150, maxWidth : 200},
    ])
  return (
    <Layout title="Tanda Terima" page="Tanda Terima">
        <Table key={timestamp} columnDefs={columnDef} endpoint="/tanda_terima/getAll"/>
    </Layout>
  )
}

export default TandaTerima
