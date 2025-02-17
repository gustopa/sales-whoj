import React, { useState } from 'react'
import Layout from '../Layouts/Layout'
import { Button, Card, CardActionArea, CardContent, FormControl, Grid2 as Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Input from '../Layouts/components/Input'
import ModalPhoto from './components/ModalPhoto'
import ModalPesanan from './components/ModalPesanan'
import TableDiamond from './components/TableDiamond'
function Form({inventory,stores,locations,positions,items,types,models,sources,status_list,labour_price}) {
    const [location,setLocation] = useState(inventory.location_id || 0)
    const [position,setPosition] = useState(inventory.position_id || 0)
    const [item,setItem] = useState(inventory.item_id || 0)
    const [type,setType] = useState(inventory.item_type_id || 0)
    const [model,setModel] = useState(inventory.model_id || 0)
    const [source,setSource] = useState(inventory.item_source || "")
    const [photo,setPhoto] = useState(inventory.photo_inventory_id)
    const [photoName,setPhotoName] = useState(inventory.photo_inventory_id_txt || "")
    const [pesanan,setPesanan] = useState(inventory.payment_order_id)
    const [pesananName,setPesananName] = useState(inventory.payment_order_id_txt || "" )
    const [supplierCode,setSupplierCode] = useState(inventory.kode_supplier || "")
    const [status,setStatus] = useState(inventory.status || "")
    const [sertifikat,setSertifikat] = useState(inventory.file_certificate)
    const [rateBeli ,setRateBeli] = useState(inventory.buy_rate || 0)
    const [rateJual,setRateJual] = useState(inventory.sold_rate || 0)
    const [markup,setMarkup] = useState(inventory.markup || 0)
    const [kadarEmas,setKadarEmas] = useState(inventory.gold_grade || 0)
    const [hargaEmas,setHargaEmas] = useState(inventory.gold_price || 0)
    const [beratEmas,setBeratEmas] = useState(inventory.gold_weight || 0)
    const [labourPrice,setLabourPrice] = useState(inventory.labour_price_id || 0)
    const [totalDiamond,setTotalDiamond] = useState(0)
    const [hargaJual,setHargaJual] = useState(inventory.harga_jual || 0)
    const [basicPriceUsd,setBasicPriceUsd] = useState(inventory.basic_price_usd || 0)
    const handleFileChange = e => {
        const formData = {
            item_type_id : type,
            item_id : item,
            model_id : model,
            payment_order_id : pesanan,
            item_source : source,
            kode_supplier : supplierCode,
            gold_weight : beratEmas,
            gold_grade : kadarEmas,
            gold_price : hargaEmas,
            photo_inventory_id : photo,
            labour_price_id : labourPrice,
            basic_price_usd : basicPriceUsd,
            sell_price : hargaJual
        }
    }
  return (
    <Layout title="Inventory | Form" page="Form Barang">
        <Grid container spacing={2}>

            <Grid size={12}>
                <Card className='p-3 dark:bg-navy-800'>
                    <Grid container spacing={2}>
                        <Grid size={{xs : 12,md:3}}>
                            <Input fullWidth inputProps={{readOnly : true}} label="PLU" value={inventory.identity_code}/>
                        </Grid>
                        <Grid size={{xs : 12,md:3}}>
                            <Input fullWidth inputProps={{readOnly : true}} label="Store" value={stores[inventory.store_id-1].name}/>
                        </Grid>
                        <Grid size={{xs:12,md:3}}>
                            <FormControl fullWidth>
                                  <InputLabel shrink id="location"><span className='text-whoj'>Letak :</span></InputLabel>
                                  <Select
                                      size='small'
                                      displayEmpty
                                      name='location'
                                      labelId="location"
                                      id="location-select"
                                      value={location}
                                      label="Letak :"
                                      onChange={e => setLocation(e.target.value)}
                                  >
                                          <MenuItem key={0} value={0}><span className='p-3'></span></MenuItem>
                                      {locations.map(a => 
                                          <MenuItem key={a.row_id} value={a.row_id}>{a.name}</MenuItem>
                                      )}
                                  </Select>
                              </FormControl>
                        </Grid>
                        <Grid size={{xs:12,md:3}}>
                            <FormControl fullWidth>
                                  <InputLabel shrink id="position"><span className='text-whoj'>Letak barang :</span></InputLabel>
                                  <Select
                                      size='small'
                                      displayEmpty
                                      name='position'
                                      labelId="position"
                                      id="position-select"
                                      value={position}
                                      label="Letak barang :"
                                      onChange={e => setPositon(e.target.value)}
                                  >
                                          <MenuItem key={0} value={0}><span className='p-3'></span></MenuItem>
                                      {positions.map(a => 
                                          <MenuItem key={a.row_id} value={a.row_id}>{a.name}</MenuItem>
                                      )}
                                  </Select>
                              </FormControl>
                        </Grid>
                        <Grid size={{xs:12,md:3}}>
                            <FormControl fullWidth>
                                  <InputLabel shrink id="tipe"><span className='text-whoj'>Tipe :</span></InputLabel>
                                  <Select
                                      size='small'
                                      displayEmpty
                                      name='tipe'
                                      labelId="tipe"
                                      id="tipe-select"
                                      value={type}
                                      label="Tipe :"
                                      onChange={e => setType(e.target.value)}
                                  >
                                          <MenuItem key={0} value={0}><span className='p-3'></span></MenuItem>
                                      {types.map(a => 
                                          <MenuItem key={a.row_id} value={a.row_id}>{a.name}</MenuItem>
                                      )}
                                  </Select>
                              </FormControl>
                        </Grid>
                        <Grid size={{xs:12,md:3}}>
                            <FormControl fullWidth>
                                  <InputLabel shrink id="item"><span className='text-whoj'>Item :</span></InputLabel>
                                  <Select
                                      size='small'
                                      displayEmpty
                                      name='item'
                                      labelId="item"
                                      id="item-select"
                                      value={item}
                                      label="Item :"
                                      onChange={e => setItem(e.target.value)}
                                  >
                                          <MenuItem key={0} value={0}><span className='p-3'></span></MenuItem>
                                      {items.map(a => 
                                          <MenuItem key={a.row_id} value={a.row_id}>{a.name}</MenuItem>
                                      )}
                                  </Select>
                              </FormControl>
                        </Grid>
                        <Grid size={{xs:12,md:3}}>
                            <FormControl fullWidth>
                                  <InputLabel shrink id="model"><span className='text-whoj'>Model :</span></InputLabel>
                                  <Select
                                      size='small'
                                      displayEmpty
                                      name='model'
                                      labelId="model"
                                      id="model-select"
                                      value={model}
                                      label="Model :"
                                      onChange={e => setModel(e.target.value)}
                                  >
                                          <MenuItem key={0} value={0}><span className='p-3'></span></MenuItem>
                                      {models.map(a => 
                                          <MenuItem key={a.row_id} value={a.row_id}>{a.name}</MenuItem>
                                      )}
                                  </Select>
                              </FormControl>
                        </Grid>
                        <Grid size={{xs:12,md:3}}>
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
                       <Grid size={{sx:12,md:3}}>
                        <TextField size='small' variant="outlined" value={photoName} label="Photo " fullWidth
                                InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <ModalPhoto setPhoto={setPhoto} setPhotoName={setPhotoName}/>
                                    </InputAdornment>
                                ),
                                    readOnly : true
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                       </Grid>
                       <Grid size={{sx:12,md:3}}>
                            <TextField size='small' variant="outlined" value={pesananName} label="Pesanan " fullWidth
                                InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <ModalPesanan setPesanan={setPesanan} setPesananName={setPesananName}/>
                                    </InputAdornment>
                                ),
                                    readOnly : true
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                       </Grid>
                       <Grid size={{sx:12,md:3}}>
                            <Input fullWidth label="Kode Supplier :" value={supplierCode} onChange={e => setSupplierCode(e.target.value)} />
                       </Grid>
                       <Grid size={{xs:12,md:3}}>
                            <FormControl fullWidth>
                                  <InputLabel shrink id="status"><span className='text-whoj'>Status :</span></InputLabel>
                                  <Select
                                      size='small'
                                      displayEmpty
                                      name='status'
                                      labelId="status"
                                      id="status-select"
                                      value={status}
                                      label="Status :"
                                      onChange={e => setStatus(e.target.value)}
                                  >
                                          <MenuItem value=""><span className='p-3'></span></MenuItem>
                                      {status_list.map(a => 
                                          <MenuItem key={a} value={a}>{a}</MenuItem>
                                      )}
                                  </Select>
                              </FormControl>
                        </Grid>
                        <Grid size={{sx:12,md:3}}>
                            <Input label="Sertifikat : " onChange={handleFileChange} type="file"/>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>

            <Grid size={12}>
                <Card className='p-3 dark:bg-navy-800'>
                    <Grid container spacing={2}>
                        <Grid size={{sx:12,md:3}}>
                            <Input fullWidth label="Rate Beli(IDR) :" onChange={e => setRateBeli(e.target.value)} value={rateBeli}/>
                        </Grid>
                        <Grid size={{sx:12,md:3}}>
                            <Input fullWidth label="Rate Jual(IDR) :" onChange={e => setRateJual(e.target.value)} value={rateJual}/>
                        </Grid>
                        <Grid size={{sx:12,md:3}}>
                            <Input fullWidth label="Markup(%) :" onChange={e => setMarkup(e.target.value)} value={markup}/>
                        </Grid>
                        <Grid size={{sx:12,md:3}}>
                            <Input fullWidth label="Kadar Emas :" onChange={e => setKadarEmas(e.target.value)} value={kadarEmas}/>
                        </Grid>
                        <Grid size={{sx:12,md:3}}>
                            <Input fullWidth label="Harga Emas/Gr (USD) :" onChange={e => setHargaEmas(e.target.value)} value={hargaEmas}/>
                        </Grid>
                        <Grid size={{sx:12,md:3}}>
                            <Input fullWidth label="Berat Emas (Gr) :" onChange={e => setBeratEmas(e.target.value)} value={beratEmas}/>
                        </Grid>
                        <Grid size={{xs:12,md:3}}>
                            <FormControl fullWidth>
                                  <InputLabel shrink id="labour-price"><span className='text-whoj'>Biaya Lainnya :</span></InputLabel>
                                  <Select
                                      size='small'
                                      displayEmpty
                                      name='labour-price'
                                      labelId="labour-price"
                                      id="labour-price-select"
                                      value={labourPrice}
                                      label="Biaya Lainnya :"
                                      onChange={e => setLabourPrice(e.target.value)}
                                  >
                                          <MenuItem value={0}><span className='p-3'></span></MenuItem>
                                      {labour_price.map(a => 
                                          <MenuItem key={a.row_id} value={a.row_id}>{a.name}</MenuItem>
                                      )}
                                  </Select>
                              </FormControl>
                        </Grid>
                        <Grid size={{xs:12,md:3}}>
                            <Input fullWidth inputProps={{readOnly : true}} value={inventory.basic_price_usd} label="HPP By System (USD)" />
                        </Grid>
                        <Grid size={{xs:12,md:3}}>
                            <Input fullWidth value={basicPriceUsd} onChange={e => setBasicPriceUsd(e.target.value)} label="HPP (USD)" />
                        </Grid>
                        <Grid size={{xs:12,md:3}}>
                            <Input inputProps={{readOnly : true}} fullWidth label="Harga Kalkulasi" />
                        </Grid>
                        <Grid size={{xs:12,md:3}}>
                            <Input fullWidth value={hargaJual} onChange={e => setHargaJual(e.target.value)} label="Harga Jual(IDR)" />
                        </Grid>

                        <Grid size={12}>
                            <h2 className='text-1xl font-bold'>Diamond</h2>
                            <TableDiamond setTotalDiamond={setTotalDiamond} row_id={inventory.row_id}/>
                            <Grid container spacing={2} sx={{mt:2}}>

                                <Grid size={{xs:12,md:3}}>
                                    <Card className='!bg-whoj'>
                                        <CardActionArea>
                                            <CardContent className='text-center !text-white'>
                                                <h1 className='font-bold text-1xl'>Total Berlian</h1>
                                                <hr className='my-2' />
                                                <span>{Intl.NumberFormat('en-US').format(totalDiamond)}</span>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid size={{xs:12,md:3}}>
                                    <Card className='!bg-whoj'>
                                        <CardActionArea>
                                            <CardContent className='text-center text-white'>
                                                <h1 className='font-bold text-1xl'>Biaya Lainnya </h1>
                                                <hr className='my-2' />
                                                <span>{inventory?.other_expense}</span>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid size={{xs:12,md:3}}>
                                    <Card className='!bg-whoj !text-white'>
                                        <CardActionArea>
                                            <CardContent className='text-center text-white'>
                                                <h1 className='font-bold text-1xl'>Harga Emas/gr (USD) </h1>
                                                <hr className='my-2' />
                                                <span>
                                                    {inventory?.gold_weight == null ? 0 : inventory?.gold_weight} gr * {parseFloat(inventory?.gold_price).toFixed(2)} = {(parseFloat(inventory?.gold_weight == null ? 0 : inventory?.gold_weight) * parseFloat(inventory?.gold_price).toFixed(2)).toFixed(2)}
                                                </span>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid size={{xs:12,md:3}}>
                                    <Card className='!bg-whoj !text-white'>
                                        <CardActionArea>
                                            <CardContent className='text-center text-white'>
                                                <h1 className='font-bold text-1xl'>HPP (USD) </h1>
                                                <hr className='my-2' />
                                                <span>{Intl.NumberFormat('en-US').format(inventory?.basic_price_usd)}</span>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid size={{xs:12,md:3}}>
                                    <Card className='!bg-whoj !text-white'>
                                        <CardActionArea>
                                            <CardContent className='text-center text-white'>
                                                <h1 className='font-bold text-1xl'>HPP (IDR) </h1>
                                                <hr className='my-2' />
                                                <span>
                                                Rate jual (IDR) : {Intl.NumberFormat('id-ID').format(inventory?.sold_rate)} <br />
                                                HPP : {Intl.NumberFormat('id-ID').format(inventory?.basic_price_usd * inventory?.sold_rate)}
                                                </span>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid size={{xs:12,md:3}}>
                                    <Card className='!bg-whoj !text-white'>
                                        <CardActionArea>
                                            <CardContent className='text-center text-white'>
                                                <h1 className='font-bold text-1xl'>Margin (IDR) </h1>
                                                <hr className='my-2' />
                                                <span>
                                                    Margin (%) : {inventory?.profit_margin} <br />
                                                    Margin : {Intl.NumberFormat('id-ID').format((inventory?.basic_price_usd * inventory?.sold_rate) * (inventory?.profit_margin / 100))}
                                                </span>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid size={{xs:12,md:3}}>
                                    <Card className='!bg-whoj !text-white'>
                                        <CardActionArea>
                                            <CardContent className='text-center text-white'>
                                                <h1 className='font-bold text-1xl'>Harga Kalkulasi </h1>
                                                <hr className='my-2' />
                                                <span>{Intl.NumberFormat('id-ID').format(inventory?.calc_price)} <br /> <br /></span>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid size={{xs:12,md:3}}>
                                    <Card className='!bg-whoj !text-white'>
                                        <CardActionArea>
                                            <CardContent className='text-center text-white'>
                                                <h1 className='font-bold text-1xl'>Harga Jual </h1>
                                                <hr className='my-2' />
                                                <span>{Intl.NumberFormat('id-ID').format(inventory?.sell_price)} <br /> <br /> </span>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid size={12}>
                            <Button variant='contained'>Calculate Price</Button>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Grid size={12}>
                <Button variant='contained'>Submit</Button>
                <Button variant='contained' sx={{ml:1}}>Print Barcode</Button>
                <Button variant='contained' sx={{ml:1}}>Print Certificate</Button>
            </Grid>
        </Grid>
    </Layout>
  )
}

export default Form
