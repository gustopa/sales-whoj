import React from 'react'
import LayoutModal from '../../Layouts/components/LayoutModal'
import { Grid2 as Grid } from '@mui/material'
import { formatDate } from '../../../helper';
import { useIsMobile } from '../../../hooks/IsMobile';
import FileOpenIcon from '@mui/icons-material/FileOpen';
function ModalMiscellaneous({params}) {
    const isMobile = useIsMobile()
    console.log(params.data);
    
  return (
    <LayoutModal height={isMobile ? "80%" : "50%"} sxButton={{color : "#b89474", textDecoration : "underline"}} iconButton={params.value}>
        <Grid container spacing={2}>
            <Grid size={{xs:6,md:4}}>
                <label className='text-[#999]' style={{fontSize:'10px'}}>NAMA</label><br />
                <span>{params.data?.nama}</span>
            </Grid>
            <Grid size={{xs:6,md:4}}>
                <label className='text-[#999]' style={{fontSize:'10px'}}>ITEM</label><br />
                <span>{params.data?.item}</span>
            </Grid>
            <Grid size={{xs:6,md:4}}>
                <label className='text-[#999]' style={{fontSize:'10px'}}>KETERANGAN</label><br />
                <span>{params.data?.keterangan == "" ? "-" : params.data?.keterangan}</span>
            </Grid>
            <Grid size={{xs:6,md:4}}>
                <label className='text-[#999]' style={{fontSize:'10px'}}>TANGGAL</label><br />
                <span>{params.data?.trans_date}</span>
            </Grid>
            <Grid size={{xs:6,md:4}}>
                <label className='text-[#999]' style={{fontSize:'10px'}}>LOKASI</label><br />
                <span>{params.data?.location_id_txt}</span>
            </Grid>
            <Grid size={{xs:6,md:4}}>
                <label className='text-[#999]' style={{fontSize:'10px'}}>STORE</label><br />
                <span>{params.data?.store_id_txt}</span>
            </Grid>
            <Grid size={{xs:6,md:4}}>
                <label className='text-[#999]' style={{fontSize:'10px'}}>FOTO</label><br />
                <a target='__blank' href={`https://system-mahakarya.com/assets/uploaded/${params.data?.foto}`}>
                    <FileOpenIcon/> 
                    <span className='ml-1'>
                        View File
                    </span>
                </a>
            </Grid>
            <Grid size={12}>
                <h2 className='my-3 font-bold dark:text-[#b89474]'>RIWAYAT DATA</h2>
                <Grid container spacing={2}>
                    <Grid size={{md : 3, xs: 6}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>CREATED DATE</label><br />
                        <span>{params.data?.created_date == "" ? "-" : formatDate(params.data?.created_date)}</span>
                    </Grid>
                    <Grid size={{md : 3, xs: 6}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>CREATED BY</label><br />
                        <span>{params.data?.created_by == "" ? "-" : params.data?.created_by}</span>
                    </Grid>
                    <Grid size={{md : 3, xs: 6}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>MODIFIED DATE</label><br />
                        <span>{params.data?.modified_date == "" ? "-" : formatDate(params.data?.modified_date)}</span>
                    </Grid>
                    <Grid size={{md : 3, xs: 6}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>MODIFIED BY</label><br />
                        <span>{params.data?.modified_by == "" ? "-" : params.data?.modified_by}</span>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </LayoutModal>
  )
}

export default ModalMiscellaneous
