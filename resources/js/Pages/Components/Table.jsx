import React, { useImperativeHandle, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import { useSnapshot } from 'valtio';
import state from '../../store/store';
import { themeBalham } from 'ag-grid-community';
const Table = ({
    endpoint,
    columnDefs,
    rowHeight=40,
    ref,
    domLayout="autoHeight",
    height,
    pagination=true
}) => {
    const gridRef = useRef(null);
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
            const response = await axios.get(endpoint, { params: request });
            params.successCallback(response.data.rows, response.data.lastRow);
            gridRef.current.api.setGridOption("loading",false);
            
            if (gridRef.current?.api.getDisplayedRowCount() === 0) {
                gridRef.current.api.showNoRowsOverlay();
            } else {
                gridRef.current.api.hideOverlay();
            }
            
        } catch (error) {
            params.failCallback();
            gridRef.current.api.setGridOption("loading",false);
        }
    };

    const defaultColDef = useMemo(() => {
        return {
            filter: "agTextColumnFilter",
            floatingFilter: true,
            flex : 1,
            minWidth : 170,
            filterParams: {
                maxNumConditions : 1
            },
        };
      }, []);

      const localeText = {
        page : "",
        pageSizeSelectorLabel : "",
      }
      const NoRowsOverlay = () => <h1>Data tidak tersedia</h1>;

    const refreshData = () => {
        if (gridRef.current) {
            gridRef.current.api.refreshInfiniteCache();
        }
    };

    
    
    useImperativeHandle(ref,()=>{
        return {refreshData : refreshData}
    })
    
    return (

        <div className={`${snap.theme == 'dark' ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'}`} style={{border:'none', height : height != undefined ? height : undefined }}>
            <AgGridReact
            ref={gridRef}
            rowModelType="infinite"
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            cacheBlockSize={10}
            domLayout={domLayout}
            pagination={pagination}
            paginationPageSize={10}
            rowHeight={rowHeight}
            paginationPageSizeSelector={[10,20,50]}
            localeText={localeText}
            datasource={{
                getRows: fetchServerData,
            }}
            // theme={themeBalham}
            overlayNoRowsTemplate={<NoRowsOverlay />}
            onGridReady={(e) => {
                const inputs = document.querySelectorAll('.ag-input-field-input')
                inputs.forEach((input) => {
                    input.setAttribute('placeholder', 'Search...');
                  });
                
            }}
            />
      </div>
    );
};

export default Table;
