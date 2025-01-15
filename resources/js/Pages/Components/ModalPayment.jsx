import React, { useEffect, useState } from 'react'
import DataTable from '../Layouts/components/Datatable'
import LayoutModal from '../Layouts/components/LayoutModal'
import { useIsMobile } from '../../hooks/IsMobile'
import axios from 'axios'
import { FaFolderOpen } from 'react-icons/fa'

function ModalPayment({id_customer}) {
    const isMobile = useIsMobile()
    const [columnDefs] = useState([
        {field : "row_id",headerName : ""},
        {field : "doc_no",headerName : "Invoice no", flex : isMobile ? undefined : 1},
        {field : "inventory_id_txt",headerName : "Item", flex : isMobile ? undefined : 1}
    ])
    const [rows,setRows] = useState([]);
    const getPaymentList = async () => {
        const response = await axios.get(`/payment/getByCustomer/${id_customer}`)
        const response_data = await response.data
        setRows(response_data.data)
        console.log(response_data.data);
    }
    useEffect(()=>{
        getPaymentList()
    },[id_customer])
  return (
    <LayoutModal iconButton={<FaFolderOpen className='text-white'/>} sxButton={{background : "#b89474",width : "100%"}}>
        <DataTable data={rows} columns={columnDefs}/>
    </LayoutModal>
  )
}

export default ModalPayment
