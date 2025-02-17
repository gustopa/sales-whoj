import React, { useRef, useState } from 'react'
import LayoutModal from '../../Layouts/components/LayoutModal'
import { FaFolderOpen } from 'react-icons/fa'
import Table from '../../Components/Table'
import { Button } from '@mui/material'

function ModalPhoto({setPhoto,setPhotoName}) {
    const modal = useRef(null)
    const handleSelect = data => {
        setPhoto(data?.row_id)
        setPhotoName(data?.notes)
        modal.current?.close()
    }
    const [columnDefs] = useState([
        {field : "row_id",headerName : "", flex : false,minWidth : 120, width : 120, filter : false, resizable : false,pinned : 'left',
            cellRenderer : params => <Button onClick={()=>handleSelect(params.data)}>SELECT</Button>
        },
        {field : "photo",headerName : "Foto", filter : false, flex : false, minWidth : 150, width : 150,
            cellRenderer : params => <img width={100} className='mt-3' src={`https://system-mahakarya.com/assets/uploaded/${params.value}`} alt="" />
        },
        {field : "notes",headerName : "Nama Produk"},
    ])
  return (
    <LayoutModal ref={modal} height='auto' sxButton={{background : "#b89474"}} iconButton={<FaFolderOpen color='white'/>}>
        <Table rowHeight={150} endpoint="/inventory/getPhoto" statusFilter={false} columnDefs={columnDefs}/>
    </LayoutModal>
  )
}

export default ModalPhoto
