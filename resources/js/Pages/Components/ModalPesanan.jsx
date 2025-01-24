import React, { useRef, useState } from 'react'
import LayoutModal from '../Layouts/components/LayoutModal'
import { FaFolderOpen } from "react-icons/fa";
import { Button } from '@mui/material';
import Table from './Table'
import { useIsMobile } from '../../hooks/IsMobile'
import { encrypt } from '../../helper';

const ButtonSelect = ({onSelect,data, refModal}) => {
    const handleClick = () => {
        onSelect(data?.down_payment)
        refModal.current.close()
    }
    return (
        <Button onClick={handleClick}>SELECT</Button>
    )
}

function ModalPesanan({id,onSelect}) {
    const refModal = useRef()
    const isMobile = useIsMobile()
    const [columnDefs] = useState([
        { field: 'row_id', headerName : "", sortable: false, resizable : false, filter: false, pinned : "left", width : 120, minWidth : 120,
            cellRenderer : params => (
                <ButtonSelect refModal={refModal} onSelect={onSelect} data={params.data} />
            )
        },
        { field: 'customer_id_txt', headerName : "Customer", sortable: true, filter: true },
        { field: 'name',headerName : "Order"},
        { field: 'down_payment',headerName : "Amount", cellRenderer : params => Intl.NumberFormat('id-ID').format(params.value)},
    ]);
    
  return (
    <LayoutModal ref={refModal} height='77%' sxButton={{background : "#b89474",width : "100%"}} iconButton={<FaFolderOpen style={{color: "white"}}/>}>
         <Table endpoint={`/request_order/getByCustomer/${encrypt(id)}`} columnDefs={columnDefs}/>
    </LayoutModal>
  )
}

export default ModalPesanan

