import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useSnapshot } from "valtio";
import state from "../../../store/store";
import { useMemo, useRef } from "react";
ModuleRegistry.registerModules([AllCommunityModule]);

const DataTable = ({
  data,
  columns, 
  loading,
  refTable,
  pagination=true,
  domLayout="autoHeight",
  height=undefined,
  filter=true
},props) => {
  const defaultColDef = useMemo(() => {
    return {
      filter: filter ? "agTextColumnFilter" : false,
      floatingFilter: filter,
      headerClass : "header-table",
      flex : 1,
      minWidth : 200,
    };
  }, []);
    const localeText = {
        page : "",
        pageSizeSelectorLabel : "",
        noRowsToShow: "Tidak ada data untuk ditampilkan",
    }
    const snap = useSnapshot(state)
  return (
    <div className={`${snap.theme == 'dark' ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'}`} style={{border:'none', width: '100%',height : height }}>
      <AgGridReact
        ref={refTable}
        rowData={data}
        {...props}
        
        loading={loading}
        key={columns.length}
        gridOptions={{suppressHorizontalScroll : false}}
        columnDefs={columns}
        defaultColDef={defaultColDef}
        pagination={pagination}
        paginationPageSize={10}
        domLayout={domLayout}
        className="agGridTable"
        paginationPageSizeSelector={[10, 25, 50]}
        localeText={localeText}
      />
    </div>
  );
};

export default DataTable