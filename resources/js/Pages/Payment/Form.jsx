import React from 'react'
import Layout from '../Layouts/Layout'
import { Card, FormControl, Grid2 as Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useSnapshot } from 'valtio'
import state from '../../store/store'
import { useForm } from '@inertiajs/react'
import ModalProduct from '../Components/ModalProduct'
function Form({stores,payment,sales}) {
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

      const {data,setData,post} = useForm({
        invoice_no : payment.doc_no,
        tanggal : payment.trans_date,
        store : payment.store_id,
        sales : payment.sales_id
      })

      const handleInput = (e) => {
        const {name, value} = e.target
        setData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
  return (
    <Layout title="Form Pembayaran" page="Form Pembayaran">
        <Grid container spacing={2}>
            <Grid size={4}>
                <Card className='p-4 dark:bg-navy-800'>
                    <div>
                        <TextField 
                        InputLabelProps={{ shrink: true, }}
                        slotProps={{
                            input: {
                            readOnly: true,
                            }, 
                        }}
                        onChange={handleInput}
                        name='invoice_no' value={data.invoice_no} sx={sxInputField} fullWidth variant="outlined" label="Invoice No"/>
                    </div>
                    <div className='mt-5'>
                        <TextField InputLabelProps={{ shrink: true, }} value={data.tanggal} onClick={handleInput} name='tanggal' type='date' sx={sxInputField} fullWidth variant="outlined" label="Tanggal"/>
                    </div>
                    <div className='mt-5'>
                        <FormControl fullWidth sx={sxInputField}>
                            <InputLabel shrink id="store" style={{color:"#b89474"}}>Store</InputLabel>
                            <Select
                                displayEmpty
                                name='store'
                                labelId="store"
                                id="store-select"
                                value={data.store}
                                label="Store"
                                onChange={handleInput}
                            >
                                {stores.map(a => 
                                    <MenuItem key={a.row_id} value={a.row_id}>{a.name}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </div>
                    <div className='mt-5'>
                        <FormControl fullWidth sx={sxInputField}>
                            <InputLabel shrink id="sales" style={{color:"#b89474"}}>Sales</InputLabel>
                            <Select
                                displayEmpty
                                name='sales'
                                labelId="sales"
                                id="sales-select"
                                value={data.sales}
                                label="Sales"
                                onChange={handleInput}
                            >
                                {sales.map(a => 
                                    <MenuItem key={a.row_id} value={a.row_id}>{a.name}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </div>
                </Card>
            </Grid>
            <Grid size={8}>
                <Card className='p-4 dark:bg-navy-800'>
                    <Grid container spacing={2}>
                        <Grid size={{xs :12, md:4}}>
                            <TextField variant="outlined" sx={sxInputField} label="Barang" fullWidth
                                InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <ModalProduct />
                                    </InputAdornment>
                                ),
                                    readOnly : true
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid size={{xs :12, md:4}}>
                            <TextField 
                                InputLabelProps={{ shrink: true, }}
                                slotProps={{
                                    input: {
                                    readOnly: true,
                                    }, 
                                }}
                                onChange={handleInput}
                                name='harga' sx={sxInputField} fullWidth variant="outlined" label="Harga Barang"/>
                        </Grid>
                        <Grid size={{xs :12, md:3}}>

                        </Grid>
                        <Grid size={{xs :12, md:3}}>

                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    </Layout>
  )
}

export default Form
