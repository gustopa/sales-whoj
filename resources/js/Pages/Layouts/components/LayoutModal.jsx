import React, { useImperativeHandle, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Modal } from '@mui/material'
import { useSnapshot } from 'valtio';
import state from '../../../store/store';
import { useIsMobile } from '../../../hooks/IsMobile';
function LayoutModal({iconButton,children,sxButton,closeButton=true,ref, width="70%", height="70%",variant="", size,color}) {
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
        <Button size={size} color={color} onClick={handleModal} style={sxButton} variant={variant} type="button">
            {iconButton}
        </Button>
        <Modal open={open} onClose={handleClose}>
            <Box
                className=''
                sx={{
                    position: "absolute",
                    overflowX : "hidden",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: width,
                    height : height,
                    bgcolor: "background.paper",
                    overflowY : 'auto',
                    boxShadow: 24,
                    p: 3,
                    zIndex:9,
                    background : snap.theme == 'dark' ? '#111c44' : '',
                    color : snap.theme == 'dark' ? 'white' : ''
                }}
            >
                <Button onClick={handleClose} variant="contained" sx={{position:'absolute',right:'-1%',background:'#b89474',top:'-1%',zIndex:'999', display : closeButton ? 'block' : 'none'}}>
                    <CloseIcon style={{color:'white'}}/>
                </Button>
                {children}
            </Box>
        </Modal>
    </>
  )
}

export default LayoutModal
