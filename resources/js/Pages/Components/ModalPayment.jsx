import React, { useEffect, useRef, useState } from 'react'
import DataTable from '../Layouts/components/Datatable'
import LayoutModal from '../Layouts/components/LayoutModal'
import { useIsMobile } from '../../hooks/IsMobile'
import axios from 'axios'
import { FaFolderOpen } from 'react-icons/fa'
import { Button } from '@mui/material'

function ModalPayment({id_customer,setIdInvoice,setInvoice,setAmount}) {
    const isMobile = useIsMobile()
    const [columnDefs] = useState([
        {field : "row_id",headerName : "", pinned : "left", flex :false, minWidth : 120, width : 120,resizable : false, filter : false,
            cellRenderer : params => (
                <Button onClick={() => {
                    setIdInvoice(params.value)
                    setInvoice(params.data.doc_no)
                    if(setAmount) setAmount(params.data.amount)
                    refModal.current?.close()
                }}>SELECT</Button>
            )
        },
        {field : "doc_no",headerName : "Invoice no",flex :false, minWidth : 120, width : 120,},
        {field : "customer_id_txt",headerName : "Customer"},
        {field : "identity_code",headerName : "PLU",flex :false, minWidth : 120, width : 120,},
        {field : "inventory_id_txt",headerName : "Item"},
        {field : "amount",headerName : "Amount", cellRenderer : params => Intl.NumberFormat("en-US").format(params.value)}
    ])
    const [rows,setRows] = useState([]);
    const getPaymentList = async () => {
        if(id_customer != ""){
            const response = await axios.get(`/payment/getByCustomer/${id_customer}`)
            const response_data = await response.data
            setRows(response_data.data)
        }
    }
    useEffect(()=>{
        getPaymentList()
    },[id_customer])

    const refModal = useRef(null)
  return (
    <LayoutModal height='auto' ref={refModal} iconButton={<FaFolderOpen className='text-white'/>} sxButton={{background : "#b89474",width : "100%"}}>
        <DataTable pagination={false} data={rows} columns={columnDefs}/>
    </LayoutModal>
  )
}

export default ModalPayment
