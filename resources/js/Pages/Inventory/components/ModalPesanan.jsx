import React, { useRef, useState } from 'react'
import LayoutModal from '../../Layouts/components/LayoutModal'
import { FaFolderOpen } from 'react-icons/fa'
import Table from '../../Components/Table'
import { Button } from '@mui/material'

function ModalPesanan({setPesanan,setPesananName}) {
    const modal = useRef(null)
    const handleSelect = data => {
        setPesanan(data?.row_id)
        setPesananName(data?.customer_id_txt)
        modal.current?.close()
    }
    const [columnDefs] = useState([
        {field : "row_id",headerName : "", flex : false,minWidth : 120, width : 120, filter : false, resizable : false,pinned : 'left',
            cellRenderer : params => <Button onClick={()=>handleSelect(params.data)}>SELECT</Button>
        },
        {field : "customer_id_txt",headerName : "Customer", filter : false, flex : false, minWidth : 150, width : 150,},
        {field : "name",headerName : "Order",},
        {field : "down_payment",headerName : "Amount", cellRenderer : params => Intl.NumberFormat("en-US").format(params.value)},
    ])
  return (
    <LayoutModal ref={modal} height='auto' sxButton={{background : "#b89474"}} iconButton={<FaFolderOpen color='white'/>}>
        <Table key="pesanan" endpoint="/inventory/getPesanan" statusFilter={false} columnDefs={columnDefs}/>
    </LayoutModal>
  )
}

export default ModalPesanan
