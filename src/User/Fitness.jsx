import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import FitnessNavItem from './FitnessNavItem'

function Fitness() {
  return (
   <>

      <FitnessNavItem/>
      <Outlet/>


    </>
  )
}

export default Fitness