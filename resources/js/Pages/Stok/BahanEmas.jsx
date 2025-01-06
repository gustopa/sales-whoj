import React from 'react'
import Layout from '../Layouts/Layout'
import { Grid2 as Grid, TextField } from '@mui/material'
import Card from '$/components/card'
import DataTable from 'react-data-table-component'
function BahanEmas(props) {
    const columns = [
        {
            name : "Nama",
            selector : row => row.name,
            sortable : true
        },
        {
            name : "Berat",
            selector : row => row.last_weight,
            sortable :true
        }
    ]

    const customStyles = {
        headCells : {
            style : {
                fontWeight : "bolder",
                fontSize : "18px"
            }
        }
    }
  return (
    <Layout page="Bahan Emas" title="Bahan Emas">
        <Grid container spacing={2}>
            <Grid columns={12}>
                <Card extra="p-5">
                    <h1>Total Berat</h1>
                    <p>{props.total_berat}</p>
                </Card>
            </Grid>
        </Grid>
        <TextField className='mt-4' />
        <Card extra="mt-3" style={{width:"80%"}}>
            <DataTable columns={columns} data={props.list_material_gold} customStyles={customStyles} />
        </Card>


    </Layout>
  )
}

export default BahanEmas