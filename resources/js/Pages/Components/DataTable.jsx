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

const gridDiv = document.querySelector("#myGrid");


const DataTable = () => {
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
    { field: "estimated_price", headerName: "Harga Perkiraan" },
    { field: "status", headerName: "Status", 
        cellRenderer :  (params) => {
            return (
                <div className="dark:text-white">
                    <Chip className="dark:text-white" label={params.value} variant="filled" />
                </div>
            )
        }
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
    };
  }, []);
  const localeText = {
    page : "",
    pageSizeSelectorLabel : ""
  }

  const getDataRequestOrder = async () =>{
    try{
        const response = await axios.post('/request_order/getAll')
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
    <div className={`${snap.theme == 'dark' ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'}`} style={{ height: 500 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50]}
        localeText={localeText}
      />
    </div>
  );
};

export default DataTable