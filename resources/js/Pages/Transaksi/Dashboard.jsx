import React from 'react'
import Layout from '../Layouts/Layout'
import InputField from '../../template/components/fields/InputField';
import { Card } from '@mui/material';
import {Input} from '@headlessui/react'
function Dashboard({permission}) {
  console.log(permission);
  
  return (
    <Layout title="Dashboard" page="Dashboard Penjualan">
      <Card className='p-3 dark:bg-navy-800'>
        <Input name='fullname'/>
      </Card>
    </Layout>
  )
}

export default Dashboard
