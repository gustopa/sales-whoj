import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useSnapshot } from "valtio";
import state from "../../../store/store";
import { useMemo } from "react";
ModuleRegistry.registerModules([AllCommunityModule]);

const DataTable = ({data,columns}) => {
  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
    };
  }, []);
    const localeText = {
        page : "",
        pageSizeSelectorLabel : "",
        noRowsToShow: "Tidak ada data untuk ditampilkan"
    }
    const snap = useSnapshot(state)
  return (
    <div className={`${snap.theme == 'dark' ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'}`} style={{border:'none', width: '100%' }}>
      <AgGridReact
        rowData={data}
        key={columns.length}
        gridOptions={{suppressHorizontalScroll : true}}
        columnDefs={columns}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        domLayout="autoHeight"
        className="agGridTable"
        paginationPageSizeSelector={[10, 25, 50]}
        localeText={localeText}
      />
    </div>
  );
};

export default DataTable