import React from 'react'
import StoreNavItems from '../Store/StoreNavItems'
import { Outlet } from 'react-router-dom'

function Store() {
  return (
    <div className='w-full  mx-auto'>
  
    <StoreNavItems/>
   
    <Outlet/>
  

</div>
  )
}

export default Store