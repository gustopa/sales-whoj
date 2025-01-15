import React, { useEffect, useRef, useState } from 'react'
import LayoutModal from '../Layouts/components/LayoutModal'
import { FaFolderOpen } from "react-icons/fa";
import { usePage } from '@inertiajs/react';
import DataTable from '../Layouts/components/Datatable';
import { Button } from '@mui/material';

const ButtonSelect = ({setCustomer,setIdCustomer,params,refModal, setDataInvoice,setIdInvoice}) => {
    const handleClick = () => {
        const customer = params.data
        setCustomer(customer.name)
        setIdCustomer(customer.row_id)
        setDataInvoice("")
        setIdInvoice("")
        refModal.current.close()
    }
    return (
        <Button onClick={handleClick}>SELECT</Button>
    )
}

function ModalCustomer({setCustomer,setIdCustomer, setDataInvoice,setIdInvoice}) {
    const refModal = useRef()
    const customer = usePage().props.customer.original
    const [columnDefs,setColumnDefs] = useState([
        {field : "row_id", headerName: "", 
            cellRenderer : params => (
                <ButtonSelect setDataInvoice={setDataInvoice} setIdInvoice={setIdInvoice} refModal={refModal} setCustomer={setCustomer} setIdCustomer={setIdCustomer} params={params}/>
            )
        },
        {field : "name", headerName: "Name"},
        {field : "customer_no", headerName: "Customer No"},
        {field : "hp_bo", headerName: "HP", width : 342},
    ]);
    
  return (
    <LayoutModal ref={refModal} height='77%' sxButton={{background : "#b89474",width : "100%"}} iconButton={<FaFolderOpen style={{color: "white"}}/>}>
        <DataTable columns={columnDefs} data={customer}/>
    </LayoutModal>
  )
}

export default ModalCustomer
