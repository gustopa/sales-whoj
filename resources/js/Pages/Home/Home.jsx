import React, { useRef, useState } from 'react'
import Layout from '../Layouts/Layout'
import { Chip, Grid2 as Grid } from '@mui/material'
import logo from '../../../assets/logo2.jpg'
import Card from '$/components/card'
import Table from '../Components/Table'
import ModalComponent from '../Components/Modal'
import {formatDate} from '../../helper'
function Home({session}) {
    const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric'};
    const now = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(now);
    const refTable = useRef(null)
    const [columnDefs, setColumnDefs] = useState([
        { field: "doc_no", headerName: "Doc No", 
            cellRenderer : params => params.data ? <ModalComponent params={params} /> : "", minWidth : 120,width : 120,
        },
        { field: "customer_id_txt", headerName: "Customer", cellRenderer : params => params.value == "" || params.value == null ? "-" : params.value },
        { field: "trans_date", headerName: "Tanggal", cellRenderer : params => formatDate(params.value), filter : 'agDateColumnFilter', minWidth : 120, width : 120 },
        { field: "estimated_date", headerName: "Perkiraan Delivery", cellRenderer : params => params.value == "0000-00-00" ? "-" : formatDate(params.value), filter : 'agDateColumnFilter' },
        { field: "item_id_txt", headerName: "Tipe Item", cellRenderer : params => params.value == null || params.value  == "" ? "-" : params.value },
        { field: "name", headerName: "Nama Item", cellRenderer : params => params.value == "" || params.value == null ? "-" : params.value},
        { field: "estimated_price", headerName: "Harga Perkiraan",
          cellRenderer : (params) => `Rp.${Intl.NumberFormat('id-ID').format(params.value)}`
        },
        { field: "status", headerName: "Status", minWidth : 120, width : 120,
            cellRenderer :  (params) => {
                return (
                    <div className="dark:text-white">
                        <Chip size='small' className={`dark:text-white`} color={params.value == "ON GOING" ? 'warning' : 'primary'} label={params.value} variant="filled" />
                    </div>
                )
            }
        },
      ]);
  return (
    <Layout title="Dashboard" page="Dashboard">
        {/* <Grid container spacing={2}>
         <Grid xs={12} md={4}>
          <Card extra="p-5">
            <Grid container spacing={2}>
              <Grid sm={12} justifyContent="center" sx={{display:'flex'}}>
                <img width={128} src={logo} style={{borderRadius: "10px"}} />
              </Grid>
              <Grid>
                <div>
                  <h1 className='md:text-2xl text-[18px] dark:text-white text-black'>{session.username}</h1>
                  <p className='md:text-1xl text-[15px]'>{formattedDate}</p>
                  <p className='md:text-1xl text-[15px]'>Role : {session.role_name}</p>
                  <p className='md:text-1xl text-[15px]'>Email : {session.email}</p>
                  <p className='md:text-1xl text-[15px]'>{session.session_id}</p>
                </div>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid> */}

      <Grid container spacing={2} className="mt-4">
        <Grid size={12}>
            <Card extra="p-3">
                <h2 className='text-bold ml-2 mb-2 text-2xl'>PESANAN - CUSTOM</h2>
                <Table ref={refTable} columnDefs={columnDefs} endpoint="/request_order/getAll/CUSTOM"/>
            </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} className="mt-4">
        <Grid size={12}>
            <Card extra="p-3">
                <h2 className='text-bold ml-2 mb-2 text-2xl'>PESANAN - REPARASI</h2>
                <Table ref={refTable} columnDefs={columnDefs} endpoint="/request_order/getAll/REPARASI"/>
            </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Home
