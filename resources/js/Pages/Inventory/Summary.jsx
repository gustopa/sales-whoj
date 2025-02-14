import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import { Button, Card, Grid2 as Grid } from '@mui/material'
import DataTable from '../Layouts/components/Datatable'
function Summary({store_list,status_list,item_list}) {
  console.log(item_list);

  const [columnStore] = useState([
    {field : 'name',headerName : "Lokasi",filter : false,},
    {field : 'total',headerName : "Total",filter : false,},
    {field : 'name', headerName : '',filter : false,
      cellRenderer : params => (
        <>
          <Button variant='outlined' className='dark:text-white' size='small' sx={{ml:1}}>Print PLU</Button>
          <Button variant='outlined' className='dark:text-white' size='small' sx={{ml:1}}>Download</Button>
        </>
      )
    }
  ])

  const [columnStatus] = useState([
    {field : 'name',headerName : "Status",filter : false, flex : false, minWidth : 130,width : 130,},
    {field : 'total',headerName : "Total",filter : false, flex : false, minWidth : 130,width : 130},
    {field : 'name', headerName : '',filter : false,
      cellRenderer : params => (
        <>
          <Button variant="outlined" className='dark:text-white' size='small' sx={{ml:1}}>Print PLU</Button>
          <Button variant='outlined' className='dark:text-white' size='small' sx={{ml:1}}>Download PLU</Button>
          <Button variant='outlined' className='dark:text-white' size='small' sx={{ml:1}}>Download PLU Diamond</Button>
        </>
      )
    }
  ])

  const [columnItem] = useState([
    {field : 'name',headerName : "Item",filter : true,},
    {field : 'total',headerName : "Total",filter : false,},
    {field : 'name', headerName : '',filter : false,
      cellRenderer : params => (
        <>
          <Button variant='outlined' className='dark:text-white' size='small'>Download</Button>
        </>
      )
    }
  ])
  
  return (
    <Layout title="Summary" page="Summary inventory">
      <Grid container spacing={2}>

        <Grid size={12}>
          <Card className='p-3 dark:bg-navy-800'>
            <h2 className='font-bold ml-4 text-1xl dark:text-white'>Summary by Location</h2>
            <DataTable data={store_list} columns={columnStore} pagination={false}/>
          </Card>
        </Grid>
        <Grid size={12}>
          <Card className='p-3 dark:bg-navy-800'>
            <h2 className='font-bold ml-4 text-1xl dark:text-white'>Summary by Status</h2>
            <DataTable data={status_list} columns={columnStatus} pagination={false}/>
          </Card>
        </Grid>
        <Grid size={12}>
          <Card className='p-3 dark:bg-navy-800'>
            <h2 className='font-bold ml-4 text-1xl dark:text-white'>Summary by Item</h2>
            <DataTable data={item_list} columns={columnItem} pagination={false}/>
          </Card>
        </Grid>

      </Grid>
    </Layout>
  )
}

export default Summary
