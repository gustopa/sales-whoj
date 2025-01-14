import React, { useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
// import { ModuleRegistry } from "ag-grid-community";
// import { ServerSideRowModelModule } from 'ag-grid-enterprise';
import axios from 'axios';
import { useSnapshot } from 'valtio';
import state from '../../store/store';
// ModuleRegistry.registerModules([ServerSideRowModelModule]);
const ModalProduct = () => {
    const gridRef = useRef(null);
    const [columnDefs] = useState([
        { field: 'row_id', sortable: true, filter: true },
        { field: 'identity_code', sortable: true, filter: true },
        { field: 'item_id_txt', sortable: true, filter: true },
        { field: 'photo_inventory_id_txt', sortable: true, filter: true },
    ]);

    const snap = useSnapshot(state)

    const fetchServerData = async (params) => {
        const request = {
            startRow: params.startRow,
            endRow: params.endRow,
            sortModel: params.sortModel,
            filterModel: params.filterModel,
        };
        gridRef.current.api.setGridOption("loading",true);
        try {
            const response = await axios.get('/inventory/getAll', { params: request });
            params.successCallback(response.data.rows, response.data.lastRow);
            gridRef.current.api.setGridOption("loading",false);
        } catch (error) {
            params.failCallback();
            gridRef.current.api.setGridOption("loading",false);
        }
    };

    const defaultColDef = useMemo(() => {
        return {
          filter: "agTextColumnFilter",
          floatingFilter: true,
        };
      }, []);

    return (

        <div className={`${snap.theme == 'dark' ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'}`} style={{border:'none' }}>
            <AgGridReact
            ref={gridRef}
            rowModelType="infinite"
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            cacheBlockSize={25}
            domLayout="autoHeight"
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[10,20,50]}
            datasource={{
                getRows: fetchServerData,
            }}
            />
      </div>
    );
};

export default ModalProduct;
