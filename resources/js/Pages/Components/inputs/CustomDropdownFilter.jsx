import React, { useEffect, useState } from "react";
import { MenuItem, Select, FormControl } from "@mui/material";

const CustomDropdownFilter = (props) => {
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    props.filterChangedCallback(); // Notify AG Grid filter has changed
  }, [selectedValue]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  // AG Grid memanggil ini untuk memfilter data
  const doesFilterPass = (params) => {
    return selectedValue ? params.data.status === selectedValue : true;
  };

  // AG Grid memanggil ini untuk mendapatkan nilai filter
  const getModel = () => {
    return selectedValue ? { value: selectedValue } : null;
  };

  // AG Grid memanggil ini untuk mengatur filter
  const setModel = (model) => {
    setSelectedValue(model ? model.value : "");
  };

  return (
    <FormControl fullWidth>
      <Select value={selectedValue} onChange={handleChange} displayEmpty>
        <MenuItem value="">Semua</MenuItem>
        <MenuItem value="Active">Aktif</MenuItem>
        <MenuItem value="Inactive">Tidak Aktif</MenuItem>
      </Select>
    </FormControl>
  );
};

// Agar bisa dipakai di AG Grid
export default React.forwardRef((props, ref) => {
  useEffect(() => {
    ref.current = {
      doesFilterPass: (params) => doesFilterPass(params),
      isFilterActive: () => !!selectedValue,
      getModel: () => getModel(),
      setModel: (model) => setModel(model),
    };
  });

  return <CustomDropdownFilter {...props} />;
});
