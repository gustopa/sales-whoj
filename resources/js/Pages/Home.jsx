import React from 'react'
import Layout from './Layouts/Layout'
import Card from '$/components/card'
import { Grid2 as Grid,Box  } from '@mui/material'
import { usePage } from '@inertiajs/react'
import logo from '.././../assets/logo2.jpg'
import DataTable from './Components/DataTable'
function Home() {
  const {name,email,session} = usePage().props
  
  const options = { 
    weekday: 'long',
    day: 'numeric', 
    month: 'short', 
    year: 'numeric'
  };
  const now = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(now);
  return (
    <Layout title="Dashboard" page="Home">
      <Grid container spacing={2}>
        <Grid xs={12} md={4}>
          <Card extra="p-5">
            <Grid container spacing={2}>
              <Grid sm={12} justifyContent="center" sx={{display:'flex'}}>
                <img width={128} src={logo} style={{borderRadius: "10px"}} />
              </Grid>
              <Grid>
                <div>
                  <h1 className='md:text-2xl text-[18px] dark:text-white text-black'>{session.username}</h1>
                  <p className='md:text-1xl text-[15px]'>{formattedDate}</p>
                  <p className='md:text-1xl text-[15px]'>Role : {session.role_name}</p>
                  <p className='md:text-1xl text-[15px]'>Email : {session.email}</p>
                  <p className='md:text-1xl text-[15px]'>{session.session_id}</p>
                </div>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>

      <Grid container className="mt-4">
        <Grid sx={{width:'100%',minHeight:'66vh'}}>
          <Card extra="p-4">
            <h2 className='text-bold ml-2 mb-2 text-2xl'>PESANAN - CUSTOM</h2>
            <DataTable/>
          </Card>
        </Grid>
      </Grid>

    </Layout>
  )
}

export default Home