import React, { useImperativeHandle, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, Modal } from '@mui/material'
import { useSnapshot } from 'valtio';
import state from '../../../store/store';
import { useIsMobile } from '../../../hooks/IsMobile';
function LayoutModal({iconButton,children,sxButton,closeButton=true,ref, width="70%", height="70%",variant=""}) {
    const snap = useSnapshot(state)
    const [open,setOpen] = useState(false)
    const isMobile = useIsMobile()
    useImperativeHandle(ref, () => {
        return {close : handleClose}
    })
    const handleModal = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
  return (
    <>
        <Button onClick={handleModal} sx={sxButton} variant={variant} type="button" aria-label="search">
            {iconButton}
        </Button>
        <Modal open={open}>
            <div>
                <Button onClick={handleClose} variant="contained" sx={{position:'absolute',right:'12%',background:'#b89474',top:'13%',zIndex:'999', display : closeButton ? 'block' : 'none'}}>
                    <CloseIcon style={{color:'white'}}/>
                </Button>
                <Box
                    className='transition-all duration-300 ease-in-out'
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: width,
                        height : height,
                        bgcolor: "background.paper",
                        overflowY : 'auto',
                        boxShadow: 24,
                        p: 4,
                        zIndex:9,
                        background : snap.theme == 'dark' ? '#111c44' : '',
                        color : snap.theme == 'dark' ? 'white' : ''
                    }}
                >
                    {children}
                </Box>
            </div>
        </Modal>
    </>
  )
}

export default LayoutModal
