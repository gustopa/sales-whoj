import React, { useImperativeHandle, useMemo, useRef, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import { useSnapshot } from 'valtio';
import state from '../../store/store';
import { FormControlLabel, Checkbox, Paper, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { MdExpand } from 'react-icons/md';
const Table = ({
    endpoint,
    columnDefs,
    rowHeight = 40,
    ref,
    domLayout = "autoHeight",
    height,
    pagination = true,
    statusFilter = false,
    kolomFilter = true,
    floatingFilter = true,
    minWidth = 170,
    filter = "agTextColumnFilter"
}, props) => {
    const gridRef = useRef(null);
    const snap = useSnapshot(state);
    const [updatedColumnDefs, setUpdatedColumnDefs] = useState(columnDefs);
    const [filterStatus, setFilterStatus] = useState("All");

    const fetchServerData = async (params) => {
        const request = {
            startRow: params.startRow,
            endRow: params.endRow,
            sortModel: params.sortModel,
            filterModel: { ...params.filterModel, status: filterStatus !== "All" ? { filterType: "text", type: "equals", filter: filterStatus } : undefined },
        };

        gridRef.current.api.showLoadingOverlay();
        try {
            const response = await axios.get(endpoint, { params: request });
            params.successCallback(response.data.rows, response.data.lastRow);
            gridRef.current.api.hideOverlay();
        } catch (error) {
            params.failCallback();
            gridRef.current.api.hideOverlay();
        }
    };

    const defaultColDef = useMemo(() => ({
        filter: filter,
        floatingFilter: floatingFilter,
        flex: 1,
        minWidth: minWidth,
        filterParams: { maxNumConditions: 1 },
    }), []);

    const localeText = {
        page: "",
        pageSizeSelectorLabel: "",
    };

    const NoRowsOverlay = () => <h1>Data tidak tersedia</h1>;

    const refreshData = () => {
        if (gridRef.current) {
            gridRef.current.api.refreshInfiniteCache();
        }
    };

    const removeAllFilters = () => {
        if (gridRef.current) {
            gridRef.current.api.setFilterModel(null);
        }
    };

    useImperativeHandle(ref, () => ({
        refreshData,
        removeAllFilters
    }));

    const handleColumnToggle = (field) => {
        const newColumnDefs = updatedColumnDefs.map(col =>
            col.field === field ? { ...col, hide: !col.hide } : col
        );
        setUpdatedColumnDefs(newColumnDefs);
        // if (gridRef.current) {
        //     gridRef.current.api?.setColumnDefs(newColumnDefs);
        // }
    };

    const handleFilterChange = (status) => {
        setFilterStatus(status);
        if (gridRef.current) {
            gridRef.current.api.setFilterModel({ status: status !== "All" ? { filterType: "text", type: "equals", filter: status } : undefined });
        }
    };

    return (
        <div>
            {statusFilter &&
                <div style={{ display: "flex", gap: "10px", marginBottom: "10px", padding: "10px", borderRadius: "8px", background: "#1a1e2d", color: "#fff" }}>
                    {["All", "SOLD", "READY"].map(status => (
                        <button
                            key={status}
                            onClick={() => handleFilterChange(status)}
                            style={{
                                padding: "8px 16px",
                                borderRadius: "6px",
                                background: filterStatus === status ? "#fff" : "transparent",
                                color: filterStatus === status ? "#000" : "#fff",
                                border: "none",
                                cursor: "pointer"
                            }}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            }

            {/* Toolbox untuk memilih kolom */}
            {kolomFilter && 
                <Accordion className="dark:bg-[#181d1f] dark:text-white" sx={{ marginBottom: "10px" }}>
                <AccordionSummary expandIcon={<MdExpand />}>
                    <Typography variant="subtitle1">Pilih Kolom</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Paper sx={{ padding: "10px", backgroundColor: "inherit", boxShadow: "none" }}>
                        {columnDefs
                            .filter(col => col.headerName && col.headerName.trim() !== "")
                            .map(col => (
                                <FormControlLabel
                                    key={col.field}
                                    control={
                                        <Checkbox
                                            checked={!updatedColumnDefs.find(c => c.field === col.field)?.hide}
                                            onChange={() => handleColumnToggle(col.field)}
                                        />
                                    }
                                    label={col.headerName}
                                />
                            ))}
                    </Paper>
                </AccordionDetails>
            </Accordion>
            }


            {/* AG Grid */}
            <div className={`${snap.theme === 'dark' ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'}`} style={{ border: 'none', height: height || undefined }}>
                <AgGridReact
                    {...props}
                    ref={gridRef}
                    rowModelType="infinite"
                    columnDefs={updatedColumnDefs}
                    defaultColDef={defaultColDef}
                    cacheBlockSize={10}
                    domLayout={domLayout}
                    rowHeight={rowHeight}
                    pagination={pagination}
                    getRowStyle={(params) => {
                        return { fontSize : '13px' };
                    }}
                    getRowClass={(params) => {
                        return `${params.node.rowIndex % 2 === 0 ? 'bg-[#f0f0f0] dark:bg-[#181d1f]' : 'bg-white dark:bg-[#222628]'}`;
                    }}
                    paginationPageSize={10}
                    paginationPageSizeSelector={[10, 20, 50]}
                    localeText={localeText}
                    datasource={{ getRows: fetchServerData }}
                    overlayNoRowsTemplate={<NoRowsOverlay />}
                    onGridReady={(e) => {
                        gridRef.current = e
                        // e.api.setColumnDefs(updatedColumnDefs);
                        const inputs = document.querySelectorAll('.ag-input-field-input');
                        inputs.forEach((input) => input.setAttribute('placeholder', 'Search...'));
                    }}
                />
            </div>
        </div>
    );
};

export default Table;