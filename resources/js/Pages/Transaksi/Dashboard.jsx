import React from 'react'
import Layout from '../Layouts/Layout'

function Dashboard({permission}) {
  console.log(permission);
  
  return (
    <Layout title="Dashboard" page="Dashboard Penjualan"></Layout>
  )
}

export default Dashboard
