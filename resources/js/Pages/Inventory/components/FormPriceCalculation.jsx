import React, { useState } from 'react'
import Layout from '../../Layouts/Layout'
import { Button, Card, FormControl, Grid2 as Grid, InputLabel, MenuItem, Select } from '@mui/material'
import Input from '../../Layouts/components/Input'
import { formatNumber } from '../../../helper';
import TablePriceCalculationDiamond from './TablePriceCalculationDiamond';
function FormPriceCalculation({sources,labour_price_list,data}) {
    console.log(data);
    
    const [nama,setNama] = useState(data.nama || "")
    const [markup,setMarkup] = useState(data.profit_margin || "")
    const [beratEmas,setBeratEmas] = useState(data.gold_weight || "")
    const [source,setSource] = useState(data.item_source || "")
    const [productionCost,setProductionCost] = useState(parseFloat(data.production_cost) || "")
    const [labourPrice,setLabourPrice] = useState(data.labout_price_id || "")
    const [sellPrice,setSellPrice] = useState(data.sell_price || "")
    const [displaySellPrice,setDisplaySellPrice] = useState(formatNumber(Number(data.sell_price)) || 0)
  return (
    <Layout title="Inventory | Calculation" page="Form Kalkulasi Harga">
        <Card className='p-3'>
            <Grid container spacing={2}>
                <Grid size={{xs:12,md:6}}>
                    <Input fullWidth label="Nama :" value={nama} onChange={e => setNama(e.target.value)}/>
                </Grid>
                <Grid size={{xs:12,md:6}}>
                    <Input fullWidth label="Markup(%) :" value={markup} onChange={e => setMarkup(e.target.value)}/>
                </Grid>
                <Grid size={{xs:12,md:6}}>
                    <Input fullWidth label="Berat Emas(Gr) :" value={beratEmas} onChange={e => setBeratEmas(e.target.value)}/>
                </Grid>
                <Grid size={{xs:12,md:6}}>
                    <FormControl fullWidth>
                        <InputLabel shrink id="source"><span className='text-whoj'>Source :</span></InputLabel>
                        <Select
                            size='small'
                            displayEmpty
                            name='source'
                            labelId="source"
                            id="source-select"
                            value={source}
                            label="Source :"
                            onChange={e => setSource(e.target.value)}
                        >
                                <MenuItem value=""><span className='p-3'></span></MenuItem>
                            {sources.map(a => 
                                <MenuItem key={a} value={a}>{a}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={{xs:12,md:6}}>
                    <Input fullWidth label="Production Cost(Gr) :" value={productionCost} onChange={e => setProductionCost(e.target.value)}/>
                </Grid>
                <Grid size={{xs:12,md:6}}>
                    <FormControl fullWidth>
                        <InputLabel shrink id="labour"><span className='text-whoj'>Biaya Lainnya :</span></InputLabel>
                        <Select
                            size='small'
                            displayEmpty
                            name='labour'
                            labelId="labour"
                            id="labour-select"
                            value={labourPrice}
                            label="Biaya Lainnya :"
                            onChange={e => setLabourPrice(e.target.value)}
                        >
                                <MenuItem value=""><span className='p-3'></span></MenuItem>
                            {labour_price_list.map(a => 
                                <MenuItem key={a.row_id} value={a.row_id}>{a.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={{xs:12,md:6}}>
                    <Input fullWidth label="Harga Jual(IDR) :" value={displaySellPrice} inputProps={{readOnly : true}}/>
                </Grid>
                <Grid size={{xs:12,md:6}}>
                    <Button variant='contained'>Calculate Price</Button>
                </Grid>
            </Grid>
        </Card>
        <Card className='p-3 dark:bg-navy-800 mt-2'>
            <h2 className='font-bold dark:text-white ml-3 text-1xl'>Diamond</h2>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <TablePriceCalculationDiamond row_id={data.row_id}/>
                </Grid>
            </Grid>
        </Card>
    </Layout>
  )
}

export default FormPriceCalculation
