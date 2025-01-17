import React, { useEffect, useRef, useState } from 'react'
import LayoutModal from '../Layouts/components/LayoutModal'
import { FaFolderOpen } from "react-icons/fa";
import { Button } from '@mui/material';
import Table from './Table';

const ButtonSelect = ({setCustomer,setIdCustomer,params,refModal, setDataInvoice,setIdInvoice}) => {
    const handleClick = () => {
        const customer = params.data
        setCustomer(customer.name == null ? "" : customer.name)
        setIdCustomer(customer.row_id)
        if(setDataInvoice) setDataInvoice("")
        if(setIdInvoice) setIdInvoice("")
        refModal.current.close()
    }
    return (
        <Button onClick={handleClick}>SELECT</Button>
    )
}

function ModalCustomer({setCustomer,setIdCustomer, setDataInvoice,setIdInvoice}) {
    const refModal = useRef()
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
    const refTable = useRef(null)
    return (
        <LayoutModal ref={refModal} height='77%' sxButton={{background : "#b89474",width : "100%"}} iconButton={<FaFolderOpen style={{color: "white"}}/>}>
            <Table ref={refTable} columnDefs={columnDefs} endpoint="/customer/getAllCustomer"/>
        </LayoutModal>
    )
}

export default ModalCustomer
