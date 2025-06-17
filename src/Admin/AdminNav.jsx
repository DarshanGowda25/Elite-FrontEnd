import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, useNavigate } from 'react-router-dom';
import {  FaBox, FaUsers } from 'react-icons/fa';
import { LuLayoutDashboard } from "react-icons/lu";
import { TbLogout } from "react-icons/tb";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { FaOpencart } from "react-icons/fa6";
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

function AdminNav({openNav,setOpenNav}) {
  const [logoutModel,setLogoutModel] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
const navItems = [
  { to: '', label: 'Dashboard', icon: <LuLayoutDashboard /> }, 
  { to: 'products', label: 'Products', icon: <FaBox /> }, 
  { to: 'queries', label: 'Query', icon: <MdOutlineQuestionAnswer/> }, 
  { to: 'orders', label: 'Orders', icon: <FaOpencart/> }, 
  { to: 'memberships', label: 'Memberships', icon: <FaUsers /> }
  
];

const handleLogout = () =>{
        localStorage.removeItem('token');
        queryClient.clear()
        toast.success('Logged out')
        setLogoutModel(false);
        setTimeout(()=>{
            navigate('/')
        },500)
    }


  
  return (
  <section className='h-[100vh] w-full bg-gray-50 flex flex-row '>
    <nav className={`h-full  bg-eliteGray border-y-4 border-white rounded-l-2xl border-l-4  pl-2 py-4 w-full`}>
      <div className=' w-full flex flex-row items-center'>
        <img src='/Image/logo3.png' className='h-[40px] '>
        </img>
        <i className='hidden ms:flex font-bold text-eliteGold text-xl ml-2 '>Elite</i>
      </div>

    <ul className='w-full mt-10 flex flex-col gap-2 '>
  {navItems.map(({ to, label,icon }) => (
    <NavLink
      key={to} to={to} end={to === ''}
      className={({ isActive }) =>`p-4 w-full pl-5 rounded-l-4xl transition-all duration-300 
        ${isActive ? 'bg-white text-eliteGray': 'bg-eliteGray text-white hover:text-eliteGold'}`}>
      <div className='flex flex-row items-center gap-5'>
        {icon}
        <h1 className={`${openNav ? "hidden md:flex " : "hidden"} `}>{label}</h1>
      </div>
      
    </NavLink>
  ))}

  <li className={`p-4 w-full pl-5 rounded-l-4xl transition-all duration-300 cursor-pointer text-white `}
        onClick={()=>{
          setLogoutModel(true);
        }}>
    <div className='flex flex-row items-center gap-5'>
        <TbLogout />
        <h1 className={`${openNav ? "hidden md:flex " : "hidden"} `}>Logout</h1>
      </div>
  </li>
</ul>
    </nav>
    <div>
      <GiHamburgerMenu className='text-eliteGray m-2 md:m-8 text-xl cursor-pointer'
      onClick={()=>{
        setOpenNav(prev => !prev)
      }
      }/>
    </div>


    {/* //logout Module */}
    {
        logoutModel&&(
            <section className='h-screen w-full fixed z-[999] top-0 left-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center '
            onClick={()=>setLogoutModel(false)}>

                <div className='max-w-[400px] h-auto flex flex-col bg-white rounded-2xl'
                onClick={(e)=>e.stopPropagation()}>
                    <h1 className='mx-auto text-black mt-10 text-xl'>Confirm Logout?</h1>
                    <div className='w-full flex m-10 gap-10'>
                        <button className='p-2 w-[100px] bg-red-400 text-white rounded-lg cursor-pointer hover:shadow-[0px_0px_10px_black]'
                        onClick={()=>setLogoutModel(false)}>Cancel</button>
                        <button className='p-2 w-[100px] bg-eliteGray text-white rounded-lg cursor-pointer hover:shadow-[0px_0px_10px_black]'
                        onClick={handleLogout}>Logout</button>

                    </div>


                </div>

            </section>
        )
        }
  </section>
  )
}

export default AdminNav