import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import { Button, Card, Grid2 as Grid, InputAdornment, TextField } from '@mui/material'
import Input from '../Layouts/components/Input'
import ModalCustomer from '../Components/ModalCustomer'
import TableItem from './components/TableItem'
import { MdDone, MdPrint, MdSave } from 'react-icons/md'
function Form({data}) {
    const [docNo,setDocNo] = useState(data.doc_no)
    const [tanggal,setTanggal] = useState(data.trans_date)
    const [customer,setCustomer] = useState(data.customer_id_txt)
    const [idCustomer,setIdCustomer] = useState(data.customer_id)
  return (
    <Layout title="Tanda Terima | Form" page="Form Tanda Terima">
        <Grid container spacing={2}>
            <Grid size={{xs:12,md:3}}>
                <Card className='p-3 dark:bg-navy-800'>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <Input inputProps={{readOnly : true}} fullWidth value={docNo} size="small" label="Doc No"/>
                        </Grid>
                        <Grid size={12}>
                            <Input fullWidth type="date" value={tanggal} onChange={e => setTanggal(e.target.value)} size="small" label="Tanggal"/>
                        </Grid>
                        <Grid size={12}>
                            <TextField  variant="outlined" value={customer} sx={{boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.2)",borderRadius: "5px"}} size='small' label="Pelanggan" fullWidth
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
                        <Grid size={12}>
                            <Button variant='contained'><MdSave/>Simpan</Button>
                            <Button sx={{ml:1}} variant='contained'><MdDone/>Submit</Button>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>

            <Grid size={{xs:12,md:9}}>
                <Card className='p-3 dark:bg-navy-800'>
                    <Button variant='contained' sx={{mb:1,ml:2}}><MdPrint/>Print</Button>
                    <TableItem row_id={data.row_id}/>
                </Card>
            </Grid>
        </Grid>
    </Layout>
  )
}

export default Form
