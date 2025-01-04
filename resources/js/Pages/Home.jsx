import React from 'react'
import { Link } from '@inertiajs/react'
function Home({page}) {
  return (
    <div>
      <h1 className='text-5xl'>Page : {page}</h1>
      <Link href='/login'>Login</Link>
    </div>
  )
}

export default Home