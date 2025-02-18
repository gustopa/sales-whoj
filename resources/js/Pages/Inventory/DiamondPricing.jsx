import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import { Link } from '@inertiajs/react'
import { Button } from '@mui/material'
import { MdDelete, MdEdit } from 'react-icons/md'
import { FaCirclePlus } from 'react-icons/fa6'
import FormDiamondPricing from './components/FormDiamondPricing'
import Swal from 'sweetalert2'
import { showAlert } from '../../helper'
function DiamondPricing({access}) {
    const [tableKey,setTableKey] = useState(0)
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
              await axios.delete(`/diamond_pricing/delete/${row_id}`)
              showAlert("Berhasil!","Matriks harga berhasil dihapus",'success')
              setTableKey(prev => prev + 1)
            }catch(err){
              showAlert("Error!","Terjadi kesalahan silahkan coba lagi","error")
            }
          }
        });
        
    }
    const [columnDefs] = useState([
        {field : "row_id",headerName : "", filter : false, resizable : false,sortable : false,pinned : "left", width : 110, minWidth : 110, hide : access == "Read only" ? true : false,
            headerComponent : params => (
                <FormDiamondPricing onSuccess={setTableKey} title="TAMBAH" sxButton={{background : "#2e7d32"}} iconButton={<FaCirclePlus color='white'/>}/>
            ),
            // #1976D2
            cellRenderer : params => 
                (
                    <div key={params.value}>
                        {params.data?.status != "PAID" && 
                            <FormDiamondPricing onSuccess={setTableKey} data={params.data} title="EDIT" sxButton={{minWidth : "30px",background : "#1976D2",padding : 4}} iconButton={<MdEdit color='white'/>} />
                        }
                        <Button onClick={() => handleDelete(params.value)} sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="error">
                            <MdDelete/>
                        </Button>
                    </div>
                ),
        },
        {field : "diamond_type",headerName : "Bentuk", flex : 1, minWidth : 150},
        {field : "size_from",headerName : "Dari ukuran", flex : 1, minWidth : 150},
        {field : "size_to",headerName : "Sampai ukuran", flex : 1, minWidth : 150},
        {field : "price",headerName : "Harga (USD)",cellRenderer : params => Intl.NumberFormat('en-US').format(params.value), flex : 1, minWidth : 150},
    ])
  return (
    <Layout title="Harga" page="Harga">
        <Table key={tableKey} columnDefs={columnDefs} endpoint="/diamond_pricing/getAll" />
    </Layout>
  )
}

export default DiamondPricing
