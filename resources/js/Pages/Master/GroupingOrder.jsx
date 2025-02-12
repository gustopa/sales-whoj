import React, { useRef, useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import { Link } from '@inertiajs/react'
import { FaCirclePlus } from 'react-icons/fa6'
import { MdDelete, MdDone, MdEdit } from 'react-icons/md'
import { Button, Grid2 as Grid } from '@mui/material'
import ModalHistoryData from '../Components/ModalHistoryData'
import { encrypt, showAlert } from '../../helper'
import DataTable from '../Layouts/components/Datatable'
import Swal from 'sweetalert2'
function GroupingOrder({access}) {
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
              await axios.delete(`/grouping_order/delete/${row_id}`)
              showAlert("Berhasil!","Grouping pesanan berhasil dihapus",'success')
              tableRef.current.refreshData()
            }catch(err){
              showAlert("Error!","Terjadi kesalahan silahkan coba lagi","error")
            }
          }
        });
        
    }
    const [columnDefs] = useState([
        {field : "row_id",headerName : "", minWidth : 110, width : 110,pinned : 'left', resizable : false, filter : false,hide : access == 'Read only' ? true : false,
            headerComponent : params => (
                <Link key={params.value} className='flex justify-center' href='/grouping_order/create' method="post" style={{background: "#2e7d32",padding : "10px",borderRadius : "10px",width : "80%",textAlign : "center"}}>
                    <FaCirclePlus className='text-white'/>
                </Link>
            ),
            cellRenderer : params => 
                (
                    <div key={params.value}>
                        {params.value &&
                            <>
                                <Link href={`/grouping_order/form/${encrypt(params?.value)}`}>
                                    <Button sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="primary">
                                        <MdEdit/>
                                    </Button>
                                </Link>
                                <Button onClick={()=>handleDelete(params.value)} sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="error">
                                    <MdDelete/>
                                </Button>
                            </>
                        }
                    </div>
                ),
        },
        {field : "name",headerName : "Nama",
            cellRenderer : params => {
                const [dataDiamond,setDataDiamond] = useState([])
                let id = 0
                if(params.data){
                    id = encrypt(params.data?.row_id)
                }
                const [columnDefs] = useState([
                    {field : 'grain', headerName : 'Butir', minWidth : 100, width : 100,},
                    {field : 'grade', headerName : 'Karat', cellRenderer : params => Intl.NumberFormat('en-US').format(params.value), minWidth : 100, width : 100,},
                    {field : 'diamond_type', headerName : 'Tipe', minWidth : 100, width : 100,},
                    {field : 'no_sert', headerName : 'SERT no', minWidth : 100, width : 100,},
                    {field : 'diameter', headerName : 'Diameter', minWidth : 100, width : 100,},
                    {field : 'color', headerName : 'Warna', minWidth : 100, width : 100,},
                ])
                return (
                    <ModalHistoryData params={params} setData={setDataDiamond} makeRequest={true} endpoint={`/grouping_order/getDetailDiamond/${id}`}>
                        <Grid size={{xs : 6, md : 4}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>NAMA</label><br />
                            <span>{params.value}</span>
                        </Grid>
                        <Grid size={{xs : 6, md : 4}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>TIPE ITEM</label><br />
                            <span>{params.data?.item_id_txt}</span>
                        </Grid>
                        <Grid size={{xs : 6, md : 4}}>
                            <label className='text-[#999]' style={{fontSize:'10px'}}>BERAT EMAS</label><br />
                            <span>{params.data?.gold_weight}</span>
                        </Grid>
                        <Grid size={12}>
                            <h2 className='text-1xl font-bold my-2'>DIAMOND</h2>
                            <DataTable columns={columnDefs} data={dataDiamond} pagination={false}/>
                        </Grid>
                    </ModalHistoryData>
                )
            }
        },
        {field : "item_id_txt", headerName : "Item"},
        {field : "gold_weight", headerName : "Berat emas"}
    ])
  return (
    <Layout title="Grouping pesanan" page="Grouping pesanan">
        <Table ref={tableRef} columnDefs={columnDefs} endpoint="/grouping_order/getAll"/>
    </Layout>
  )
}

export default GroupingOrder
