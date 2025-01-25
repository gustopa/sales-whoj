import React, { useEffect, useMemo, useState } from "react";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-theme-alpine.css'; 
import axios from "axios";
import { useSnapshot } from "valtio";
import state from '../../store/store'
import { Button, Chip } from "@mui/material";
import ModalComponent from "./Modal";
ModuleRegistry.registerModules([AllCommunityModule]);


const DataTable = ({tipe_order}) => {
  const [rowData, setRowData] = useState([
  ]);
  const snap = useSnapshot(state)
  
  const [columnDefs, setColumnDefs] = useState([
    { field: "doc_no", headerName: "Doc No", 
        cellRenderer : params => {
            return <ModalComponent params={params} />
        }
    },
    { field: "customer_id_txt", headerName: "Customer" },
    { field: "created_date", headerName: "Tanggal" },
    { field: "estimated_date", headerName: "Perkiraan Delivery" },
    { field: "item_id_txt", headerName: "Tipe Item" },
    { field: "name", headerName: "Nama Item", autoHeight : true, wrapText : true},
    { field: "estimated_price", headerName: "Harga Perkiraan",
      cellRenderer : (params) => `Rp.${new Intl.NumberFormat('id-ID').format(params.value)}`
    },
    { field: "status", headerName: "Status", 
        cellRenderer :  (params) => {
            return (
                <div className="dark:text-white">
                    <Chip className={`dark:text-white ${params.value == "ON GOING" ? 'bg-navy-700' : ''}`} label={params.value} variant="filled" />
                </div>
            )
        }
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
      flex : 1,
      minWidth : 150,
    };
  }, []);
  const localeText = {
    page : "",
    pageSizeSelectorLabel : ""
  }

  const getDataRequestOrder = async () =>{
    try{
        const response = await axios.post('/request_order/getAll',{tipe : tipe_order})
        const data = await response.data;
        setRowData(data.data)
        
    }catch(err){
        console.log(err);   
    }
  }
  
  useEffect(()=>{
    getDataRequestOrder();
  },[]);

  
  return (
    <div className={`${snap.theme == 'dark' ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'}`} style={{border:'none' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        domLayout="autoHeight"
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50]}
        localeText={localeText}
        
      />
    </div>
  );
};

export default DataTable