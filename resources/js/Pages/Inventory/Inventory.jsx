import React from 'react'
import Layout from '../Layouts/Layout'
import { Card, CardActionArea, CardContent, Grid2 as Grid } from '@mui/material';
function Inventory({totalInventoryList}) {
    console.log(totalInventoryList);
    
  return (
    <Layout title="Barang" page="Barang">
        <Grid container spacing={2}>
            {totalInventoryList.map(inventory => (
                <Grid size={{xs:12,md:2}} key={inventory.total}>
                    <Card className='dark:bg-navy-700'>
                        <CardActionArea>
                            <CardContent className='text-center dark:text-white'>
                                <h1>{inventory.total}</h1>
                                <span>{inventory.store_id_txt}</span>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </Layout>
  )
}

export default Inventory
