import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import { Box, Button, Card, FormControl, Grid2 as Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Input from '../Layouts/components/Input'
import { MdSave } from 'react-icons/md';
import TableDetail from './Components/TableDetail';
import TablePembayaran from './Components/TablePembayaran';
import { useSnapshot } from 'valtio';
import state from '../../store/store';
import ModalCustomer from '../Components/ModalCustomer';
function Form({data,grouping_order,stores,sales,onlineOffline}) {
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

      const [store,setStore] = useState(0)
      const [idSales,setIdSales] = useState(0)
      const [customer,setCustomer] = useState("")
      const [idCustomer,setIdCustomer] = useState(0)
      const [onOff,setOnOff] = useState("")
      
  return (
    <Layout title="Form Pesanan" page="Form Pesanan">
        <Grid container spacing={2}>

            <Grid size={{xs:12,md:6}}>
                <Card className='p-3 dark:bg-navy-800'>
                    <h2 className='font-bold dark:text-white text-1xl mb-2 text-center'>PESANAN</h2>
                    <Grid container spacing={2}>
                        <Grid size={{xs:12,md : 6}}>
                            <Input fullWidth label="Doc no : "/>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <FormControl fullWidth sx={sxInputField}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    {/* Select Box */}
                                    <FormControl sx={{ flexGrow: 1 }}>
                                    <InputLabel shrink id="grouping_order" style={{ color: "#b89474" }}>
                                        <span>Grouping Order :</span>
                                    </InputLabel>
                                    <Select
                                        displayEmpty
                                        name="grouping_order"
                                        labelId="grouping_order"
                                        id="grouping_order-select"
                                        value={0}
                                        label="Grouping Order :"
                                    >
                                        <MenuItem key={0} value={0}> </MenuItem>
                                        {grouping_order.map(a => (
                                        <MenuItem key={a.row_id} value={a.row_id}>{a.name}</MenuItem>
                                        ))}
                                    </Select>
                                    </FormControl>

                                    {/* Button di Sebelah Kanan */}
                                    <Button 
                                    variant="contained" 
                                    color="primary" 
                                    size="small" 
                                    className='text-start'
                                    >
                                    SET <br />DATA
                                    </Button>
                                </Box>
                            </FormControl>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <FormControl fullWidth sx={sxInputField}>
                                <InputLabel shrink id="store" style={{color:"#b89474"}}><span>Store :</span></InputLabel>
                                <Select
                                    displayEmpty
                                    name='store'
                                    labelId="store"
                                    id="store-select"
                                    label="Store :"
                                    value={store}
                                >
                                        <MenuItem key={0} value={0}> </MenuItem>
                                    {stores.map(a => 
                                        <MenuItem key={a.row_id} value={a.row_id}>{a.name}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <FormControl fullWidth sx={sxInputField}>
                                <InputLabel shrink id="sales" style={{color:"#b89474"}}>Sales</InputLabel>
                                <Select
                                    displayEmpty
                                    name='sales'
                                    labelId="sales"
                                    id="sales-select"
                                    value={idSales}
                                    label="Sales"
                                >
                                        <MenuItem key={0} value={0}> </MenuItem>
                                    {sales.map(a => 
                                        <MenuItem key={a.row_id} value={a.row_id}>{a.name}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <TextField variant="outlined" value={customer} sx={sxInputField} label="Pelanggan" fullWidth
                                InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <ModalCustomer setCustomer={setCustomer} setIdCustomer={setIdCustomer} />
                                    </InputAdornment>
                                ),
                                    readOnly : true
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <Input type="date" fullWidth label="Tanggal : "/>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <FormControl fullWidth sx={sxInputField}>
                                <InputLabel shrink id="onof" style={{color:"#b89474"}}>Online/Offline</InputLabel>
                                <Select
                                    displayEmpty
                                    name='onof'
                                    labelId="onof"
                                    id="onof-select"
                                    value={onOff}
                                    label="Online/Offline"
                                >
                                        <MenuItem value=""> </MenuItem>
                                    {onlineOffline.map(a => 
                                        <MenuItem key={a} value={a}>{a}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <Input fullWidth label="Status :"/>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <Input fullWidth label="Estimated Price (IDR) :"/>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <Input type="file" fullWidth label="Foto :"/>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <Button variant='contained' sx={{mb:2.5}}><MdSave className='mr-1'/> Simpan</Button>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>

            <Grid size={{xs:12,md:6}}>
                <Card className='p-3 dark:bg-navy-800'>
                <h2 className='font-bold dark:text-white text-1xl mb-2 text-center'>DI ISI OLEH SALES</h2>
                <Grid container spacing={2}>
                        <Grid size={{xs:12,md : 6}}>
                            <Input fullWidth label="Perkiraan Delivery Time :"/>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <Input fullWidth label="Tipe Item :"/>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <Input fullWidth label="Tipe Order"/>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <Input fullWidth label="Outsource/Intern : "/>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <Input fullWidth label="Pengiriman : "/>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <Input fullWidth label="Ukuran : "/>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <Input fullWidth label="Warna Emas : "/>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <Input fullWidth label="Berat Emas (Gr) : "/>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <Input fullWidth label="Customers Material : "/>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <Input fullWidth label="Custom Box : "/>
                        </Grid>
                        <Grid size={{xs:12,md : 6}}>
                            <Input fullWidth label="Deskripsi Pesanan : "/>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>

            <Grid size={{xs:12,md:6}}>
                <Card className='p-3 dark:bg-navy-800'>
                <h2 className='font-bold dark:text-white text-1xl mb-2 text-center'>DETAIL</h2>
                <Grid container spacing={2}>
                        <Grid size={12}>
                            <TableDetail row_id={data.row_id}/>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>

            <Grid size={{xs:12,md:6}}>
                <Card className='p-3 dark:bg-navy-800'>
                <h2 className='font-bold dark:text-white text-1xl mb-2 text-center'>PEMBAYARAN (DP)</h2>
                <Grid container spacing={2}>
                        <Grid size={12}>
                            <TablePembayaran row_id={data.row_id}/>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>

        </Grid>
        
    </Layout>
  )
}

export default Form
