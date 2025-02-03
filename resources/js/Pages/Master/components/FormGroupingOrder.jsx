import React, { useEffect, useMemo, useRef, useState } from 'react'
import Layout from '../../Layouts/Layout'
import { Button, Card, Grid2 as Grid } from '@mui/material'
import Input from '../../Layouts/components/Input'
import SelectOption from '../../Layouts/components/SelectOption';
import Table from '../../Components/Table';
import { encrypt, showAlert } from '../../../helper';
import { Link, useForm } from '@inertiajs/react';
import { MdDelete, MdEdit, MdSave } from 'react-icons/md';
import { FaCirclePlus } from 'react-icons/fa6';
import FormGroupingOrderDiamond from './FormGroupingOrderDiamond';
import Swal from 'sweetalert2';
import DataTable from '../../Layouts/components/Datatable';
import axios from 'axios';

function FormGroupingOrder({items,dataGroup}) {
  const [update,setUpdate] = useState("")
  const handleDelete = (line_id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then( async (result) => {
      if (result.isConfirmed) {
        try{
          const response = await axios.delete(`/grouping_order/deleteDiamond/${line_id}`)
          const responseData = await response.data
          showAlert("Berhasil!","Detail diamond berhasil dihapus",'success')
          setUpdate("delete"+responseData.message)
        }catch(err){
          showAlert("Error!","Terjadi kesalahan silahkan coba lagi","error")
        }
      }
    });
    
}
  const [columnDefs] = useState([
    {field : "row_id", headerName : "",minWidth : 110, width : 110, pinned : "left",filter : false,resizable : false,floatingFilter: false,sortable :false,
      headerComponent : params =>  (
        <FormGroupingOrderDiamond onSuccess={setUpdate} id={dataGroup?.row_id} table={tableDiamond} endpoint="/grouping_order/addDiamond" title="Tambah" sxButton={{background : "rgb(46, 125, 50)"}} iconButton={<FaCirclePlus color='white'/>}/>
        ),
      cellRenderer : params => (
        <div key={params.value}>
            <FormGroupingOrderDiamond onSuccess={setUpdate} id={dataGroup?.row_id} endpoint={`/grouping_order/editDiamond/${params.data?.line_id}`} table={tableDiamond} data={params?.data} title="Edit" sxButton={{background : "#1976d2", width: "30px", minWidth: "30px",padding : 4}} iconButton={<MdEdit color='white'/>}/>
            <Button onClick={()=>handleDelete(params.data?.line_id)} sx={{ width: "30px", minWidth: "30px",marginLeft : "5px" }} size="small" variant='contained' color="error">
                <MdDelete/>
            </Button>
        </div>
      )
    },
    {field : "grain", headerName : "Detail diamond", filter : false, floatingFilter: false,
      cellRenderer : params => (
        <div>
          <span><b>Butir : </b>{params.data?.grain}, &nbsp;&nbsp;</span>
          <span><b>Karat : </b>{params.data?.grade}, &nbsp;&nbsp;</span>
          <span><b>Tipe : </b>{params.data?.diamond_type}, &nbsp;&nbsp;</span>
          <span><b>SERT no : </b>{params.data?.no_sert}, &nbsp;&nbsp;</span>
          <span><b>Diameter : </b>{params.data?.diameter}, &nbsp;&nbsp;</span>
          <span><b>Warna : </b>{params.data?.color}, &nbsp;&nbsp;</span>
        </div>
      )
    },
  ])
  const tableDiamond = useRef(null)
  const [itemType,setItemType] = useState(dataGroup.item_id)
  const {data,setData,post} = useForm({
      name : dataGroup.name || "",
      gold_weight : dataGroup?.gold_weight || "",
  })
  
  const handleInput = (e) => {
    const {name, value} = e.target
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleButton = async mode => {
    const formData = {
      row_id : dataGroup.row_id,
      name : data.name,
      gold_weight : data.gold_weight,
      item_id : itemType,
      mode : mode
    }
    try{
      const response = await axios.post('/grouping_order/save',formData)
      showAlert("Berhasil!", `Data berhasil di${mode}`,"success")
    }catch(err){
      showAlert("Gagal!","Terjadi kesalahan silahkan coba lagi","error")
    }
  }


  const [dataDiamond,setDataDiamond] = useState([])
  const getDataDiamond = async () => {
    try{
      const response = await axios.get(`/grouping_order/getDiamondDetail/${encrypt(dataGroup.row_id)}`)
      const dataResponse = await response.data
      setDataDiamond(dataResponse.rows)
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    getDataDiamond()
  },[update])
  return (
    <Layout title="Grouping pesanan" page="Form grouping pesanan">
      <Grid container spacing={2}>
        <Grid size={{xs:12,md:4}}>
          <Card className='p-3 dark:bg-navy-800'>
            <div className='mt-3'>
              <Input value={data.name} name="name" onChange={handleInput} fullWidth label="Nama :"/>
            </div>
            <div className='mt-3'>
              <SelectOption value={itemType || ""} handleInput={setItemType} data={items} id="typeItem" label="Tipe item :"/>
            </div>
            <div className='mt-3'>
              <Input value={data.gold_weight} name="gold_weight" onChange={handleInput} type="text" fullWidth label="Berat emas :"/>
            </div>
            <div className='mt-3'>
              <Button onClick={() => handleButton("simpan")} variant='contained'><MdSave className='mr-1'/> Simpan</Button>
              <Button onClick={() => handleButton("submit")} variant='contained' sx={{ml:1,background : "#b89474"}}>Submit</Button>
            </div>
          </Card>
        </Grid>
        <Grid size={{xs:12,md:8}}>
          <DataTable pagination={false} refTable={tableDiamond} columns={columnDefs} data={dataDiamond}/>
          {/* <Table key={dataGroup.row_id} rowHeight={80} ref={tableDiamond} endpoint={`/grouping_order/getDiamondDetail/${encrypt(dataGroup.row_id)}`} suppressFiltersToolPanel={true} columnDefs={columnDefs}/> */}
        </Grid>
      </Grid>
    </Layout>
  )
}

export default FormGroupingOrder
