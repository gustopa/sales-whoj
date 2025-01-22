import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import Table from '../Components/Table'
import ModalInventory from './components/ModalInventory'
import { Box, Chip, TableCell, TableHead, TableRow,Table as TableMUI, Card } from '@mui/material'
function InventoryList() {
    const [columnDefs] = useState([
        {field : "identity_code",headerName : "PLU", width : 110,
            cellRenderer : params => <ModalInventory params={params}/>
        },
        {field : "item_type_id_txt",headerName : "Item",
            cellRenderer : params => (
                <>
                    <h2><b>Item : </b>{params.data?.item_id_txt}</h2>
                    <h2><b>Tipe : </b>{params.data?.item_type_id_txt}</h2>
                    <h2><b>Model : </b>{params.data?.model_id_txt}</h2>
                </>
            )
        },
        {field : "store_id_txt",headerName : "Store"},
        {field : "location_id_txt",headerName : "Letak", width : 190},
        {field : "item_source",headerName : "Source",
            cellRenderer : params => (
                <>
                    <h2><b>Source : </b>{params.value}</h2>
                    <h2><b>Kode supplier : </b>{params.data?.kode_supplier}</h2>
                </>
            )
        },
        {field : "status",headerName : "Status", width : 110,
            cellRenderer : params => (
                <Chip label={params.value} color={params.value == "SOLD" ? "error" : "success"} />
            )
        },
        {field : "row_id",headerName : "Detail", width : 400, filter : false,
            cellRenderer : params => (
                <Card className='dark:bg-navy-800 mt-3'>
                    <TableMUI sx={{width : "300px"}}>
                        <TableHead>
                            <TableRow>
                                <TableCell className='dark:text-white'><b>Biaya Lainnya : </b></TableCell>
                                <TableCell className='dark:text-white'>{params.data?.other_expense}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className='dark:text-white'><b>Harga emas/gr (USD) : </b></TableCell>
                                <TableCell className='dark:text-white'>
                                    {params.data?.gold_weight == null ? 0 : params.data?.gold_weight} gr * {parseFloat(params.data?.gold_price).toFixed(2)} <br /> 
                                    = {(parseFloat(params.data?.gold_weight == null ? 0 : params.data?.gold_weight) * parseFloat(params.data?.gold_price).toFixed(2)).toFixed(2)}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className='dark:text-white'><b>HPP (USD) : </b></TableCell>
                                <TableCell className='dark:text-white'>{Intl.NumberFormat('en-US').format(params.data?.basic_price_usd)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className='dark:text-white'><b>HPP (IDR) : </b></TableCell>
                                <TableCell className='dark:text-white'>
                                    Rate jual (IDR) : {Intl.NumberFormat('id-ID').format(params.data?.sold_rate)} <br />
                                    HPP : {Intl.NumberFormat('id-ID').format(params.data?.basic_price_usd * params.data?.sold_rate)}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className='dark:text-white'><b>Margin (IDR) : </b></TableCell>
                                <TableCell colSpan={2} className='dark:text-white'>
                                    Margin (%) : {params.data?.profit_margin} <br />
                                    Margin : {Intl.NumberFormat('id-ID').format((params.data?.basic_price_usd * params.data?.sold_rate) * (params.data?.profit_margin / 100))}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className='dark:text-white'><b>Harga Kalkulasi : </b></TableCell>
                                <TableCell colSpan={2} className='dark:text-white'>{Intl.NumberFormat('id-ID').format(params.data?.calc_price)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className='dark:text-white'><b>Harga Jual : </b></TableCell>
                                <TableCell colSpan={2} className='dark:text-white'>{Intl.NumberFormat('id-ID').format(params.data?.sell_price)}</TableCell>
                            </TableRow>
                        </TableHead>
                    </TableMUI>
                </Card>
            )
        },
    ])
  return (
    <Layout title="Barang" page="Barang">
        <Table domLayout='normal' height="75vh" columnDefs={columnDefs} endpoint="/inventory/getAll"  rowHeight={500}/>
    </Layout>
  )
}

export default InventoryList
