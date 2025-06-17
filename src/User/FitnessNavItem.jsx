import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function FitnessNavItem() {
  return (
    <section className='h-[50px] w-full bg-eliteBlack fixed top-[80px] z-50 flex justify-evenly items-center text-white'>
        {/* //Without end, /fitness/elitePro would also match the /fitness route */}
        {/* The end prop makes sure the "Elite" link is only active when the path is exactly /fitness */}
        <NavLink to='' end className={({isActive})=>`${isActive ? 'text-eliteGold' : 'text-white'}`}>Elite</NavLink>
        <NavLink to='elitePro' className={({isActive})=>`${isActive ? 'text-eliteGold' : 'text-white'}`}>Elite Pro</NavLink>
        <NavLink to='elitePlus' className={({isActive})=>`${isActive ? 'text-eliteGold' : 'text-white'}`}>Elite Plus</NavLink>

  </section>
  )
}

export default FitnessNavItem