import React,{useEffect, useState} from 'react'
import Layout from '../Layouts/Layout'
import DataTable from '../Layouts/components/Datatable';
import axios from 'axios';
import { usePage } from '@inertiajs/react';
import { Button } from '@mui/material';
import { FaUserPlus, FaUserEdit } from "react-icons/fa";
import {Link} from '@inertiajs/react';
import { MdDeleteForever } from "react-icons/md";
import md5 from 'md5'
import { formatDate } from '../../helper';
import ModalViewCustomer from './ModalViewCustomer';
import Swal from 'sweetalert2';
import { encrypt } from '../../helper';
function Customer({permission}) {
  const menu_access = usePage().props.permission.menu_access;
  const handleDelete = (row_id,data) => {
    Swal.fire({
      title: "Are you sure?",
      text : `Delete customer  ${data.name != null || data.name == "" ? data.name : ""}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then( async (result) => {
      if (result.isConfirmed) {
        try{
          const responnse = await axios.delete(`/customer/delete/${row_id}`)
          Swal.fire({
            title: "Deleted!",
            icon: "success"
          });
          getData()
        }catch(err){
          Swal.fire({
            title: "Something wrong!",
            text: "Try again later.",
            icon: "error"
          });
        }
      }
    });
    
  }

  const [column, setColumn] = useState([
    { field : 'row_id', headerName : "", filter: false,resizable: false, sortable: false,
      hide : menu_access != "Full control",
      headerComponent : props => (
        <Link href='/customer/create'>
          <Button style={{background : '#b89474'}}>
            <FaUserPlus style={{color:'white'}}/>
          </Button>
        </Link>
      ),
      cellRenderer : params => {
        
        return (
          <>
            <Link href={`/customer/form/${encrypt(params.value)}`}>
              <Button variant='outlined' style={{borderColor: '#0084ff'}}>
                <FaUserEdit style={{color : '#0084ff'}}/>
              </Button>
            </Link>
            <span className='ml-3'>
              <Button onClick={() => handleDelete(params.value,params.data)} variant='outlined' style={{borderColor : '#fa625e'}}>
                <MdDeleteForever style={{color: '#fa625e'}}/>
              </Button>
            </span>
          </>
        )
      }
    },
    { field: "customer_no", headerName: "Pelanggan No", 
        cellRenderer : params => {
            return <ModalViewCustomer params={params} />
        }
    },
    { field: "name", headerName: "Nama", filter : true,
      filterParams : {
        filterPlaceholder : "Search nama..."
      } 
    },
    { field: "hp_bo", headerName: "Hp no" },
    { field: "address", width : 350, headerName: "Alamat",autoHeight : true, wrapText : true, cellStyle : {lineHeight : "1.3"},
      cellRenderer : params => {
        return params.value != null && params.value != "" ? params.value : "-"
      }
    },
    { field: "pi_no", headerName: "ID Member PI" },
    { field: "birth_date", headerName: "Tgl Lahir",
      // filter : 'agDateColumnFilter',
      cellRenderer : params => {
        return params.value != "0000-00-00" && params.value != null ? formatDate(params.value) : "-"
      }
    },
    { field: "visit_date", headerName: "Tanggal datang",
      cellRenderer : params => {
        return params.value != "0000-00-00" && params.value ? formatDate(params.value) : "-"
      }
    },
  ]);

  const [rowData, setRowData] = useState([])
  
  const getData = async () => {
    const response = await axios.post('/customer/getAllCustomer')
    const data = await response.data
    setRowData(data)
  }
  
  useEffect(()=>{
    getData()
  },[])
  
  return (
    <Layout title="Pelanggan" page="Pelanggan">
      <DataTable height="100%" columns={column} data={rowData} />
    </Layout>
  )
}

export default Customer
