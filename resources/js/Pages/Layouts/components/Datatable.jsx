import React, {useMemo} from "react";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useSnapshot } from "valtio";
import state from "../../../store/store";
ModuleRegistry.registerModules([AllCommunityModule]);

const DataTable = ({data,columns}) => {
    const localeText = {
        page : "",
        pageSizeSelectorLabel : ""
    }
    const snap = useSnapshot(state)
  return (
    <div className={`${snap.theme == 'dark' ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'}`} style={{border:'none' }}>
      <AgGridReact
        rowData={data}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={10}
        domLayout="autoHeight"
        paginationPageSizeSelector={[10, 25, 50]}
        localeText={localeText}
      />
    </div>
  );
};

export default DataTable