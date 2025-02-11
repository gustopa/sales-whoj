import React, { useImperativeHandle, useMemo, useRef, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import { useSnapshot } from 'valtio';
import state from '../../store/store';
import { FormControlLabel, Checkbox, Paper, Typography, Accordion, AccordionSummary, AccordionDetails, Button, Pagination, Card } from '@mui/material';
import { IoIosArrowDown, IoIosSettings } from "react-icons/io";
import { MdPrint } from 'react-icons/md';
import {Grid2 as Grid} from '@mui/material';
// import { StatusBarModule } from 'ag-grid-enterprise'; 
// import {ModuleRegistry} from 'ag-grid-community'
// ModuleRegistry.registerModules([ StatusBarModule ]); 
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
    const [totalData,setTotaldata] = useState(0)
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
            setTotaldata(response.data.lastRow)
            gridRef.current.api.hideOverlay();
        } catch (error) {
            params.failCallback();
            gridRef.current.api.hideOverlay();
        }
    };

    const defaultColDef = useMemo(() => ({
        filter: filter,
        // floatingFilter: floatingFilter,
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
    };

    const handleFilterChange = (status) => {
        setFilterStatus(status);
        if (gridRef.current) {
            gridRef.current.api.setFilterModel({ status: status !== "All" ? { filterType: "text", type: "equals", filter: status } : undefined });
        }
    };

    const exportCSV = () => {
        
        gridRef.current.api.exportDataAsCsv();
    }
    
    // console.log(gridRef.current?.api.paginationGetRowCount());
    const currentPageRef = useRef(1);
    const [pageKey,setPageKey] = useState(0)
    const [totalPages,setTotalPages] = useState(0)
    const [totalPageSize,setTotalPageSize] = useState(10)
    const [startRow,setStartRow] = useState(0)
    const [endRow,setEndRow] = useState(10)
    const paginationRef = useRef(null)
    const handlePagination = async value => {
        await gridRef.current?.api.paginationGoToPage(value-1);
        // currentPageRef.current = value;
        
    }
    
    useEffect(()=>{
        setTotalPages(Math.ceil(totalData / totalPageSize))
    },[totalData,totalPageSize])
    return (
        <div>
            {/* Toolbox untuk memilih kolom */}
            {kolomFilter && 
                <Accordion className="dark:bg-[#181d1f] dark:text-white" sx={{ marginBottom: "10px" }}>
                <AccordionSummary expandIcon={<IoIosArrowDown className='text-[black] dark:text-white' />}>
                    <Typography variant="subtitle1">
                        <span className='flex'>
                            <IoIosSettings style={{fontSize : '25px',marginRight : '5px'}} />
                            Table Settings
                        </span>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Paper sx={{ padding: "10px", backgroundColor: "inherit", boxShadow: "none" }}>
                        {columnDefs
                            .filter(col => col.headerName && col.headerName.trim() !== "")
                            .map(col => (
                                <FormControlLabel
                                    className='text-[black] dark:text-white'
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
                    <Paper sx={{ padding: "10px", backgroundColor: "inherit", boxShadow: "none" }}>
                        <Button onClick={exportCSV} variant='contained'><MdPrint className='mr-1'/>EXPORT CSV</Button>
                    </Paper>
                    <Paper sx={{background : "none",mt:1}}>
                        {statusFilter &&
                            <div className='bg-whoj' style={{ display: "flex", gap: "10px", marginBottom: "10px", padding: "10px", borderRadius: "8px", color: "#fff" }}>
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
                    </Paper>
                    {/* Pagination Selector */}
                    <Paper sx={{ padding: "10px", backgroundColor: "inherit", boxShadow: "none" }}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                            Jumlah data per page:
                        </label>
                        <select
                            className="p-2 border rounded-md dark:bg-[#222628] dark:text-white"
                            onChange={(e) => {
                                if (gridRef.current && gridRef.current.api) {
                                    setTotalPageSize(e.target.value)
                                    gridRef.current.api.setGridOption('paginationPageSize', Number(e.target.value));
                                }
                            }}
                            defaultValue={10}
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </Paper>
                </AccordionDetails>
            </Accordion>
            }

            
            
            {/* AG Grid */}
            <div className={`${snap.theme === 'dark' ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'}`} style={{ border: 'none', height: height || undefined }}>
                <Card className='mb-2'>
                    <Grid container spacing={2} sx={{py:2}}>
                        <Grid size={{xs:12,md:6}}>
                            <Pagination key={pageKey} ref={paginationRef} color="primary"  onChange={(event,value) =>  handlePagination(value)} count={totalPages}/>
                        </Grid>
                        <Grid size={{xs:6,md:5}}>
                            <h2 className='text-end'>Total data : {Intl.NumberFormat('en-US').format(totalData)}</h2>
                        </Grid>
                    </Grid>
                </Card>
                <AgGridReact
                    {...props}
                    ref={gridRef}
                    rowModelType="infinite"
                    columnDefs={updatedColumnDefs}
                    defaultColDef={defaultColDef}
                    cacheBlockSize={10}
                    domLayout={domLayout}
                    rowHeight={rowHeight}
                    pagination={true}
                    suppressPaginationPanel={true}
                    getRowStyle={(params) => {
                        return { fontSize : '13px',borderBottom : 'none' };
                    }}
                    getRowClass={(params) => {
                        // return `${params.node.rowIndex % 2 === 0 ? 'bg-[#f0f0f0] dark:bg-[#181d1f]' : 'bg-white dark:bg-[#222628]'}`;
                        return `bg-[transparent]`;
                    }}
                    
                    paginationPageSize={10}
                    paginationPageSizeSelector={false}
                    localeText={localeText}
                    datasource={{ getRows: fetchServerData }}
                    overlayNoRowsTemplate={<NoRowsOverlay />}
                    onGridReady={(params) => {
                        params.api.addEventListener("sortChanged", () => {
                            setPageKey(prev => prev + 1)
                        });
                        // gridRef.current = e
                        // e.api.setColumnDefs(updatedColumnDefs);
                        // const inputs = document.querySelectorAll('.ag-input-field-input');
                        // inputs.forEach((input) => input.setAttribute('placeholder', 'Search...'));
                        // const btnFilter = document.querySelector('.ag-floating-filter-button')
                        // e.api.setGridOption("statusBar", {
                        //     statusPanels: [
                        //       {
                        //         statusPanel: () => , // Custom Pagination di Tool Panel
                        //         align: "left",
                        //       },
                        //     ],
                        //   });
                        
                    }}
                />
                
                
            </div>
        </div>
    );
};

export default Table;