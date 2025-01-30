import React, { useRef } from 'react'
import LayoutModal from '../../Layouts/components/LayoutModal'
import { useIsMobile } from '../../../hooks/IsMobile';
import {Grid2 as Grid} from '@mui/material';
import { formatDate } from '../../../helper';
function ModalRefund({params}) {
    const isMobile =  useIsMobile()
    const refModal = useRef(null)
    const refundData = params.data
  return (
    <LayoutModal ref={refModal} iconButton={params.value} width={isMobile ? '80%' : '50%'} sxButton={{color : "#b89474", textDecoration : "underline"}}>
        <Grid container spacing={2}>
            <Grid size={{xs:6,md:4}}>
                <label className='text-[#999]' style={{fontSize:'10px'}}>REFUND NO</label><br />
                <span>{refundData?.doc_no}</span>
            </Grid>
            <Grid size={{xs:6,md:4}}>
                <label className='text-[#999]' style={{fontSize:'10px'}}>TANGGAL</label><br />
                <span>{formatDate(refundData?.trans_date)}</span>
            </Grid>
            <Grid size={{xs:6,md:4}}>
                <label className='text-[#999]' style={{fontSize:'10px'}}>TIPE PENGEMBALIAN</label><br />
                <span>{refundData?.type_refund == "" ? "-" : refundData?.type_refund }</span>
            </Grid>
            <Grid size={{xs:6,md:4}}>
                <label className='text-[#999]' style={{fontSize:'10px'}}>SALES</label><br />
                <span>{refundData?.sales_id_txt == null ? "-" : refundData?.sales_id_txt }</span>
            </Grid>
            <Grid size={{xs:6,md:4}}>
                <label className='text-[#999]' style={{fontSize:'10px'}}>STORE</label><br />
                <span>{refundData?.store_id_txt == null ? "-" : refundData?.store_id_txt }</span>
            </Grid>
            <Grid size={{xs:6,md:4}}>
                <label className='text-[#999]' style={{fontSize:'10px'}}>CUSTOMER</label><br />
                <span>{refundData?.customer_id_txt == null ? "-" : refundData?.customer_id_txt }</span>
            </Grid>
            <Grid size={{xs:6,md:4}}>
                <label className='text-[#999]' style={{fontSize:'10px'}}>INVOICE NO</label><br />
                <span>{refundData?.payment_id_txt == null ? "-" : refundData?.payment_id_txt }</span>
            </Grid>
            <Grid size={{xs:6,md:4}}>
                <label className='text-[#999]' style={{fontSize:'10px'}}>NOMINAL INVOICE</label><br />
                <span>{refundData?.amount_invoice == null ? "-" : Intl.NumberFormat('en-US').format(refundData?.amount_invoice) }</span>
            </Grid>
            <Grid size={{xs:6,md:4}}>
                <label className='text-[#999]' style={{fontSize:'10px'}}>POTONGAN</label><br />
                <span>{refundData?.potongan == null ? "-" : refundData?.potongan+"%" }</span>
            </Grid>
            <Grid size={{xs:6,md:4}}>
                <label className='text-[#999]' style={{fontSize:'10px'}}>REFUND</label><br />
                <span>{refundData?.amount_refund == null ? "-" : Intl.NumberFormat('en-US').format(refundData?.amount_refund) }</span>
            </Grid>
            <Grid size={{xs:6,md:4}}>
                <label className='text-[#999]' style={{fontSize:'10px'}}>ALASAN</label><br />
                <span>{refundData?.txt == null ? "-" : refundData?.txt }</span>
            </Grid>

            <Grid size={12}>
                <h2 className='my-3 font-bold dark:text-[#b89474]'>RIWAYAT DATA</h2>
                <Grid container spacing={2}>
                    <Grid size={{md : 3, xs: 6}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>CREATED DATE</label><br />
                        <span>{refundData?.created_date == "" ? "-" : formatDate(refundData?.created_date)}</span>
                    </Grid>
                    <Grid size={{md : 3, xs: 6}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>CREATED BY</label><br />
                        <span>{refundData?.created_by == "" ? "-" : refundData?.created_by}</span>
                    </Grid>
                    <Grid size={{md : 3, xs: 6}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>MODIFIED DATE</label><br />
                        <span>{refundData?.modified_date == "" ? "-" : formatDate(refundData?.modified_date)}</span>
                    </Grid>
                    <Grid size={{md : 3, xs: 6}}>
                        <label className='text-[#999]' style={{fontSize:'10px'}}>MODIFIED BY</label><br />
                        <span>{refundData?.modified_by == "" ? "-" : refundData?.modified_by}</span>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    </LayoutModal>
  )
}

export default ModalRefund
