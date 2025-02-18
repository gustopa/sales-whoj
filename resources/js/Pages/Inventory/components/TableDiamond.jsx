import React, { useEffect, useState } from 'react'
import Table from '../../Components/Table'
import DataTable from '../../Layouts/components/Datatable'
import { encrypt } from '../../../helper'
import FormDiamond from './FormDiamond'
import { FaPlusCircle } from "react-icons/fa";
import { MdDelete, MdEdit } from 'react-icons/md'
import { Button } from '@mui/material'
import { usePage } from '@inertiajs/react'

function TableDiamond({row_id,setTotalDiamond,onSuccess}) {
    const session = usePage().props.session
    const [tableKey,setTableKey] = useState(0)
    const [columnDefs] = useState([
        {field : "line_id",headerName : "", flex : false,minWidth : 130, width : 130,
            headerComponent : params => <FormDiamond updateTable={setTableKey} onSuccess={onSuccess} row_id={row_id} title="TAMBAH" sxButton={{background : "rgb(46, 125, 50)"}} iconButton={<FaPlusCircle/>} />,
            cellRenderer : params => (
                <>
                    <FormDiamond updateTable={setTableKey} onSuccess={onSuccess} row_id={row_id} title="EDIT" data={params.data} sxButton={{background : "#1976d2",minWidth : "30px",padding:4}} iconButton={<MdEdit color='white'/>} />
                    <Button color="error" size='small' sx={{minWidth : "30px",ml : 1}} variant='contained'><MdDelete color='white'/></Button>
                </>
            )
        },
        {field : "grain", headerName : "Butir"},
        {field : "grade", headerName : "Karat"},
        {field : "row_id", headerName : "Description",filter : false, autoHeight: true, wrapText: true,
            cellRenderer : params => (
                <>
                    <span><b>Tipe : </b>{params.data?.diamond_type}</span><br />
                    <span><b>SERT No : </b>{params.data?.no_sert}</span> <br />
                    <span><b>Diameter : </b>{params.data?.diameter}</span><br />
                    <span><b>Warna  : </b>{params.data?.color}</span>
                </>
            )
        },
        {field : "line_id", headerName : "Calculation",filter : false, hide : session.role_id == 1 || session.role_id == 2 ? false : true,
            cellRenderer : params => (
                <>
                    <span>{params.data?.grade} / {params.data?.grain} = {params.data?.karat_perbutir}</span><br />
                    <span>Harga/crt dari {params.data?.grade} = {Intl.NumberFormat('en-US').format(params.data?.harga_perbutir)}</span><br />
                    <span>{params.data?.grade} * {params.data?.harga_perbutir} = {Intl.NumberFormat('en-US').format(params.data?.amount)}</span>
                </>
            )
        },
        {field : "amount", headerName : "Total", cellRenderer : params => Intl.NumberFormat("en-US").format(params.value)}
    ])
    const [data,setData] = useState([])
    const getData = async () => {
        const response = await axios.get(`/inventory/getDiamond/${encrypt(row_id)}`)
        const responseData = await response.data
        setData(responseData)
        setTotalDiamond(responseData[0]?.total_diamond || 0)
    }
    
    useEffect(() => {
        getData()
    },[row_id,tableKey])
  return (
    <DataTable height="auto" domLayout='autoHeight' pagination={false} columns={columnDefs} data={data} />
  )
}

export default TableDiamond
