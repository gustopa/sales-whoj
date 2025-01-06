import React from 'react'
import Layout from '../Layouts/Layout'
import { Grid2 as Grid, TextField } from '@mui/material'
import Card from '$/components/card'
import DataTable from 'react-data-table-component'
import { FiSearch } from "react-icons/fi";

function BahanEmas(props) {
    const listData = props.list_material_gold
    const [filterText, setFilterText] = React.useState('');
    const filteredItems = listData.filter(
		item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
	);
    console.log(filteredItems);
    
    const columns = [
        {
            name : "Nama",
            selector : row => row.name,
            sortable : true
        },
        {
            name : "Berat",
            selector : row => row.last_weight,
            sortable :true
        }
    ]

    const customStyles = {
        headCells : {
            style : {
                fontWeight : "bolder",
                fontSize : "18px"
            }
        }
    }

    const handleInput = (e)=>{
        setFilterText(e.target.value)
        
    }
  return (
    <Layout page="Bahan Emas" title="Bahan Emas">
        <Grid container spacing={2}>
            <Grid columns={12}>
                <Card extra="p-5">
                    <h1>Total Berat</h1>
                    <p>{props.total_berat}</p>
                </Card>
            </Grid>
        </Grid>
        <div className="relative w-[300px] mt-[8px] flex h-[61px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none  md:flex-grow-0 md:gap-1 xl:gap-2">
            <div className="flex w-full h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-[#b89474] ">
                <p className="pl-3 pr-2 text-xl">
                    <FiSearch className="h-4 w-4 text-[#b89474]" />
                </p>
                <input
                onChange={handleInput}
                type="text"
                placeholder="Search..."
                className="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium outline-none placeholder:!text-[#b89474] dark:bg-navy-900 text-[#b89474] dark:placeholder:!text-[#b89474]"
                />
            </div>
        </div>
        {/* <TextField onChange={handleInput} className='mt-4' /> */}
        <Card extra="mt-3" style={{width:"80%"}}>
            <DataTable columns={columns} data={filteredItems} customStyles={customStyles} />
        </Card>


    </Layout>
  )
}

export default BahanEmas