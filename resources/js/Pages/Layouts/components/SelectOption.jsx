import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../../../store/store'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

function SelectOption({label,value,handleInput,id,data}) {
    const snap = useSnapshot(state)
    const sxInputField = {
        "& .MuiFormLable-root" : {
          color : "#b89474 !important"
        },
        "& .MuiInputLabel-outlined": {
          color: "#b89474",
        },
        '& .MuiInputBase-input': {
          color: '#b89474', 
        },
        '& .MuiOutlinedInput-root': {
          color: "#b89474",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#b89474",
            borderWidth: "1px",
          },
          '& fieldset': {
            borderColor: '#b89474', 
          },
          '&:hover fieldset': {
            borderColor: '#b89474', 
          },
          '&.Mui-focused fieldset': {
            borderColor: '#b89474', 
          },
          '& .MuiInputBase-input': {
            color: snap.theme == "dark" ? "white" : "black", 
          },
          '& .MuiInputBase-input::placeholder': {
            color: '#b89474', 
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#b89474 !important', 
            },
            '&:hover fieldset': {
              borderColor: '#b89474', 
            },
            '&.Mui-focused fieldset': {
              borderColor: '#b89474', 
            },
          },
          
        },
      }
  return (
    <FormControl fullWidth sx={sxInputField}>
        <InputLabel shrink id={id} style={{color:"#b89474"}}>{label}</InputLabel>
        <Select
            displayEmpty
            name={label}
            labelId={id}
            id={`${id}-select`}
            value={value}
            label={label.toLocaleUpperCase()}
            onChange={e => handleInput(e.target.value)}
        >
                <MenuItem key={0} value={0}> </MenuItem>
            {data.map(a => 
                <MenuItem key={a.row_id} value={a.row_id}>{a.name}</MenuItem>
            )}
        </Select>
    </FormControl>
  )
}

export default SelectOption
