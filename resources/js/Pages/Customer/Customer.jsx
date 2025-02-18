import React,{useEffect, useRef, useState} from 'react'
import Layout from '../Layouts/Layout'
import DataTable from '../Layouts/components/Datatable';
import axios from 'axios';
import { usePage } from '@inertiajs/react';
import { Button } from '@mui/material';
import { FaUserPlus, FaUserEdit } from "react-icons/fa";
import {Link} from '@inertiajs/react';
import { MdDeleteForever } from "react-icons/md";
import { formatDate } from '../../helper';
import ModalViewCustomer from './ModalViewCustomer';
import Swal from 'sweetalert2';
import { MdDone } from "react-icons/md";
import { encrypt } from '../../helper';
import Table from '../Components/Table';
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
          refTable.current.refreshData()
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
    { field : 'row_id', headerName : "", filter: false,resizable: false, sortable: false, minWidth : 100, width : 100, pinned : "left",
      hide : menu_access != "Full control",
      headerComponent : props => (
        <Link href='/customer/create'>
          <Button style={{background : '#2e7d32'}}>
            <FaUserPlus style={{color:'white'}}/>
          </Button>
        </Link>
      ),
      cellRenderer : params => {
        if(params.value && params.data){
          return (
            <>
              <Link href={`/customer/form/${encrypt(params.value ? params.value : "")}`}>
                <Button size='small' variant='contained' color="primary" style={{borderColor: '#0084ff'}}>
                  <FaUserEdit style={{color : 'white'}}/>
                </Button>
              </Link>
              {/* <span className='ml-3'>
                <Button onClick={() => handleDelete(params.value,params.data)} variant='contained' color="error" style={{borderColor : '#fa625e'}}>
                  <MdDeleteForever style={{color: 'white'}}/>
                </Button>
              </span> */}
            </>
          )
        }
        }
        
    },
    { field: "customer_no", headerName: "Pelanggan No", minWidth : 150, width : 150, flex : false,
        cellRenderer : params => {
            return <ModalViewCustomer params={params} id_customer={params.data?.row_id}/>
        }
    },
    { field: "name", headerName: "Nama", filter : true,
      filterParams : {
        filterPlaceholder : "Search nama..."
      },
      cellRenderer : params => {
        return params.value != null && params.value != "" ? params.value : "-"
      }
    },
    { field: "hp_bo", headerName: "Hp no",
      cellRenderer : params => {
        return params.value != null && params.value != "" ? params.value : "-"
      }
    },
    { field: "address", headerName: "Alamat",width: 350,minWidth : 200, wrapText : false, cellStyle : {lineHeight : "1.3"}, editable : true, cellEditor: "agDateCellEditor",cellEditorPopup: true,
      cellRenderer : params => {
        return params.value != null && params.value != "" ? params.value : "-"
      }
    },
    { field: "pi_no", headerName: "ID Member PI", hide : true },
    { field: "birth_date", headerName: "Tgl Lahir", width : 120, minWidth : 120, flex : false, filter : "agDateColumnFilter",
      cellRenderer : params => {
        return params.value != "0000-00-00" && params.value != null ? formatDate(params.value) : "-"
      }
    },
    { field: "visit_date", headerName: "Tanggal datang",editable : true, filter : "agDateColumnFilter", cellEditor: "agDateCellEditor",flex : false, width : 150, minWidth : 150,
      cellRenderer : params => {
        return params.value != "0000-00-00" && params.value ? formatDate(params.value) : "-"
      }
    },
  ]);

  const refTable = useRef(null)
  return (
    <Layout title="Pelanggan" page="Pelanggan">
      <Table ref={refTable} columnDefs={column} endpoint="/customer/getAllCustomer" />
    </Layout>
  )
}

export default Customer
