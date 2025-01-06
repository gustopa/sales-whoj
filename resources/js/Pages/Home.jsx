import React from 'react'
import Layout from './Layouts/Layout'
import Card from '$/components/card'
import { Grid2 as Grid,Box  } from '@mui/material'
import { usePage } from '@inertiajs/react'
import logo from '.././../assets/logo2.jpg'
import MiniCalendar from '$/components/calendar/MiniCalendar'
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
                  <h1 className='md:text-2xl text-[18px] dark:text-white text-black'>Selamat Datang, {name}</h1>
                  <p className='md:text-1xl text-[15px]'>{formattedDate}</p>
                  <p className='md:text-1xl text-[15px]'>User ID : {session.user_id}</p>
                  <p className='md:text-1xl text-[15px]'>Email : {email}</p>
                </div>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid>
          <MiniCalendar/>
        </Grid>
      </Grid>

    </Layout>
  )
}

export default Home