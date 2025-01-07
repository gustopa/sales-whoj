import React from 'react'
import { useState } from 'react'
import { Button,Modal,Box,TextField } from '@mui/material'
import { useSnapshot } from 'valtio'
import state from '../../../store/store'
import AddIcon from '@mui/icons-material/Add';
import { useForm } from '@inertiajs/react'

function TambahModal() {
    const [modalTambah,setModalTambah] = useState(false)
    const {data,setData,post} = useForm({
        action : 'create',
        name : ''
    })
    function OpenModalTambah(){
        setModalTambah(true)
    }
    function CloseModalTambah(){
        setModalTambah(false)
    }
    function handleTambah(){
        // console.log(data);
        post('bahan-emas/tambah',{
            onSuccess : res => {
                console.log(res);
                
            }
        })
    }
    function handleInput(e){
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            name : value
        }));
    }
    const snap = useSnapshot(state)
    const ModalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: snap.theme == 'light' ? 'background.paper' : '#111c44',
        color : snap.theme == 'light' ? 'black' : 'white' ,
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
      };
  return (
    <>
        <Button onClick={OpenModalTambah}>
            <AddIcon style={{color:'#b89474'}}/>
        </Button>
        <Modal open={modalTambah} >
            <Box sx={{ ...ModalStyle }}>
                <h2 className='text-2xl'>Tambah </h2>
                <div className='mt-2'>
                    <TextField onChange={handleInput} className='my-5 dark:text-white' id="tambah-bahan-emas" name='name' label="Nama" variant="outlined" />
                </div>
                <div className='mt-3'>
                    <Button style={{marginRight:'10px'}} variant='contained' onClick={CloseModalTambah}>Tutup</Button>
                    <Button variant='contained' onClick={handleTambah}>Simpan</Button>
                </div>
            </Box>
        </Modal>
    </>
  )
}

export default TambahModal