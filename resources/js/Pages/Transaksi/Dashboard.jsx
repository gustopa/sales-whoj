import React from 'react'
import Layout from '../Layouts/Layout'
import InputField from '../../template/components/fields/InputField';
import { Card } from '@mui/material';
import { BootstrapTextField } from '../Components/inputs/TextInput';
function Dashboard({permission}) {
  console.log(permission);
  
  return (
    <Layout title="Dashboard" page="Dashboard Penjualan">
      <Card className='p-3 dark:bg-navy-800'>
        <InputField
            variant="auth"
            extra="mb-3"
            label="Invoice no"
            placeholder="Email"
            id="email"
            type="text"
          />
      </Card>
    </Layout>
  )
}

export default Dashboard
