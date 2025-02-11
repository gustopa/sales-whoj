import React, { useRef, useState } from 'react'
import LayoutModal from '../Layouts/components/LayoutModal'
import { FaFolderOpen } from "react-icons/fa";
import { Button } from '@mui/material';
import Table from './Table'
import { useIsMobile } from '../../hooks/IsMobile'

const ButtonSelect = ({setItem,setIdItem,params,refModal,setPrice,setSellPrice,setPlu}) => {
    const handleClick = () => {
        const item = params.data
        if(setPrice) setPrice(item.sell_price)
        setIdItem(item.row_id)
        if(setItem) setItem(item.item_id_txt)
        if(setPlu) setPlu(item.identity_code)
        if(setSellPrice) setSellPrice(item.sell_price)
        refModal.current.close()
    }
    return (
        <Button onClick={handleClick}>SELECT</Button>
    )
}
function ModalProduct({setItem,setIdItem,store_id,setPrice, setSellPrice,setPlu}) {
    const endpoint = store_id == null ? "/inventory/getAll" : `/inventory/getByStore/${store_id}`
    const refModal = useRef()
    const isMobile = useIsMobile()
    const [rowHeight, setRowHeight] = useState(45)
    const [columnDefs] = useState([
        { field: 'row_id', headerName : "", sortable: false, filter: false, minWidth : 110,width : 110, flex :false,
            cellRenderer : params => (
                <ButtonSelect setPlu={setPlu} setSellPrice={setSellPrice} setPrice={setPrice} params={params} refModal={refModal} setItem={setItem} setIdItem={setIdItem} />
            )
        },
        { field: 'identity_code', headerName : "PLU", sortable: true, filter: true,minWidth : 110,width : 110, flex :false },
        { field: 'item_id_txt',headerName : "Item", sortable: true, filter: true, flex : isMobile ? undefined : 1, },
        { field: 'photo_inventory_id_txt',headerName : "Photo", sortable: true, filter: true, wrapText : true, flex : isMobile ? undefined : 1,
            cellRenderer: params => {
                return (
                    <>
                        <img src={`https://system-mahakarya.com/assets/uploaded/${params.value}`} onLoad={() => setRowHeight(45)} width={150} alt="" />
                    </>
                )
            }
        },
    ]);
    
  return (
    <LayoutModal ref={refModal} height='77%' sxButton={{background : "#b89474",width : "100%"}} iconButton={<FaFolderOpen style={{color: "white"}}/>}>
         <Table kolomFilter={false} endpoint={endpoint} columnDefs={columnDefs} rowHeight={rowHeight}/>
    </LayoutModal>
  )
}

export default ModalProduct

