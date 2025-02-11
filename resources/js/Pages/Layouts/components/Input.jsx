import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../../../store/store'
import { TextField } from '@mui/material'


function Input(props) {
const snap = useSnapshot(state)
const sxInputField = {
  // backgroundColor: "white",
  boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.2)", // Shadow halus
  borderRadius: "5px",
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
    <TextField InputLabelProps={{ shrink: true, }} sx={sxInputField} {...props} />
  )
}

export default Input
