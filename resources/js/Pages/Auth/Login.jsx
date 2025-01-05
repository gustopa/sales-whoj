import React from 'react'
import { useState } from "react";
import logo from '../../../assets/logo.jpg'
import { TextField,Button, colors,InputAdornment,CircularProgress } from "@mui/material";
import {IconButton} from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Head,useForm } from "@inertiajs/react";
import Swal from 'sweetalert2'

const Login = ({message}) => {
  const [isLoading,setIsLoading] = useState(false)
  const {data,setData,post} = useForm({
    userid : '',
    password : ''
  })
  const handleSubmitEvent = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    post('login',{
      onSuccess : (res) => {
        setIsLoading(false)
        console.log(res);
        
        if(res.component === 'Auth/Login'){
          Swal.fire({
            title : 'Invalid user!',
            icon : 'error'
          })
        }
        
      }
    })
    
  };
  const inputField = {
    height:'50px',
    padding:'1px',
    width : '100%',
    color : '#b89474 !important'
  }

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const sxInputField = {
    '& .MuiInputBase-input': {
      color: '#b89474', 
    },
    '& .MuiOutlinedInput-root': {
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
        color: '#b89474', 
      },
      '& .MuiInputBase-input::placeholder': {
        color: '#b89474', 
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#b89474', 
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

  const labelColor = {
    style: { color: '#b89474' },
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  return (
    <>
        <Head>
            <title>Login</title>
        </Head>

        <section className="size-full overflow-y-hidden flex justify-center place-items-center border-red-800">
            <div className="h-screen"/>
            <div className="min-w-[200px] max-w-[500px] p-3 m-auto">
            <div className="flex justify-center">
                <img src={logo} className="w-[200px]" alt="" />
            </div>
            <div className="w-[300px]">
                <form onSubmit={handleSubmitEvent} className="mt-4 w-[90%]">
                <div className="form_control">
                    <TextField name="userid" onChange={handleInput} InputLabelProps={labelColor}  label="User id" sx={sxInputField} style={inputField} className="inputField"   variant="outlined"/>
                </div>
                <div className="form_control mt-5">
                    <TextField name="password" onChange={handleInput} InputLabelProps={labelColor} InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                            sx={{
                                color : '#b89474'
                            }}
                            onClick={handleClickShowPassword}
                            edge="end"
                            aria-label="toggle password visibility"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        ),
                    }} label="Password" sx={sxInputField} style={inputField} type={showPassword ? 'text' : 'password'} className="inputField" variant="outlined" />
                </div>
                <div className="flex justify-center mt-4">
                    <Button type="submit" sx={{
                    '&:hover': {
                        backgroundColor: '#b89474',  
                        color: '#fff !important',                 
                        borderColor: '#b89474',      
                    },
        }} variant="outlined" style={{borderColor : '#b89474',color : '#b89474'}}>
            { isLoading ? <CircularProgress style={{width:'25px',height:'25px'}} color="#b89474"/> : 'Login'  }
        </Button>
                </div>
                </form> 
            </div>
            </div>
        </section>
    </>
  )
}

export default Login;