import React, { useState, useEffect } from 'react';
// import { IFilterParams } from 'ag-grid-community';

const CustomDropdownFilter = (props) => {
    const [selectedValue, setSelectedValue] = useState('');
    const { filterChangedCallback, api, column, values } = props;

    useEffect(() => {
        // Inisialisasi filter dengan nilai yang sudah ada
        if (props.model) {
            setSelectedValue(props.model.value || '');
        }
    }, [props.model]);

    const onFilterChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);

        // Memanggil callback untuk memberitahu AG Grid bahwa filter sudah berubah
        filterChangedCallback();

        // Memasukkan filter ke grid
        api.setQuickFilter(value);
    };

    const doesFilterPass = (params) => {
        // Cek apakah data yang ada sesuai dengan nilai filter yang dipilih
        if (!selectedValue) return true; // Jika tidak ada filter, tampilkan semua data
        return params.data[column.field] === selectedValue;
    };

    const getModel = () => {
        return selectedValue ? { value: selectedValue } : null;
    };

    return (
        <div>
            <select value={selectedValue} onChange={onFilterChange}>
                <option value="">Select {column.headerName}</option>
                {values.map((value, index) => (
                    <option key={index} value={value}>
                        {value}
                    </option>
                ))}
            </select>
        </div>
    );
};

CustomDropdownFilter.defaultProps = {
    values: [], // Nilai default kosong jika tidak diberikan
};

export default CustomDropdownFilter;
