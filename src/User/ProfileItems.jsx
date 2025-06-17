import React, { useState } from 'react'
import { LuUser } from "react-icons/lu";
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiHeartPulseLine } from "react-icons/ri";
import { MdCardMembership } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlinePlaylistRemove } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { tuple } from 'yup';
import toast from 'react-hot-toast';
import { TbLockPassword } from "react-icons/tb";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import CustomLoader from '../UI_Components/CustomLoader';




function ProfileItems() {
    const [openModel,setModel] = useState(true);
    const [logoutModel,setLogoutModel] = useState(false);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // const user = queryClient.getQueryData('userProfile');//if used does name in this page does not get updated on updating profile name

    const { data: user, isLoading } = useQuery({
        queryKey: 'userProfile',
        enabled: !!localStorage.getItem('token'),
      });

    //Instead of using queryClient.getQueryData, switch to useQuery in ProfileItems. 
    // This will make React Query re-render the component automatically when the userProfile is refetched after update.
    //queryClient.getQueryData() is a sync call that doesn't subscribe to updates.

    //useQuery() subscribes to the query and automatically re-renders when the data changes 
    // (e.g. after queryClient.invalidateQueries(['userProfile']) or queryClient.refetchQueries('userProfile'); ).



    if(isLoading || !user) return <CustomLoader/>
    const {name} = user

    const handleLogout = () =>{
        localStorage.removeItem('token');
        queryClient.clear()
        toast.success('Logged out')
        setLogoutModel(false);
        setTimeout(()=>{
            navigate('/')
        },600)
    }






return (
    <div className='h-screen w-auto  flex relative overflow-hidden'>

        <div className='absolute mt-[100px] ml-5 text-2xl cursor-pointer z-10 md:hidden'>
        <IoSettings  onClick={()=>setModel(true)}/>
        </div>
        
        <div className={`absolute h-screen  max-w-[55%] md:min-w-[25%] md:max-w-[25%] bg-white  shadow-xl !z-10 flex flex-col pt-[80px] px-5 md:px-0 md:relative
            ${openModel?'flex':'hidden md:flex'}`}>
        <MdOutlinePlaylistRemove className={`text-2xl absolute right-2 mt-2 md:hidden`} onClick={()=>setModel(false)}/> 

        
            <div className='w-full flex  md:px-10 h-[220px] md:h-[150px] items-center hover:shadow-md border-b-2 border-gray-100'>
                <LuUser  className='hidden md:flex text-black text-3xl ml-2 md:text-6xl '/>
                <div className='flex flex-col'>
                <LuUser  className='md:hidden text-black text-3xl ml-15 md:text-6xl '/>
                    <h1 className='ml-2 md:ml-5 text-lg  md:text-xl'>{name}</h1>
                    <Link to=''>
                    <h1 className=' ml-2 md:ml-5 text-xs text-eliteGold cursor-pointer hover:text-amber-300 uppercase font-bold'>view profile</h1>
                    </Link>
                </div>
            </div>
            <ul className='w-full md:pl-6 mt-10 '>

                <NavLink to='profileOrders' className={({isActive})=>`${isActive?'text-eliteGold border-r-4 border-eliteGold':'text-black border-0 hover:text-gray-600'}
                w-full p-4 flex relative items-center `}>
                    Orders <AiOutlineShoppingCart className='absolute right-4 text-xl'/>
                </NavLink>

                <NavLink to='profileConsultancy' className={({isActive})=>`${isActive?'text-eliteGold border-r-4 border-eliteGold':'text-black border-0 hover:text-gray-600'}
                w-full p-4 flex relative items-center`}>
                    Consultancy <RiHeartPulseLine className='absolute right-4 text-xl'/>
                </NavLink>

                <NavLink to='profileMembership' className={({isActive})=>`${isActive?'text-eliteGold border-r-4 border-eliteGold':'text-black border-0 hover:text-gray-600'}
                w-full p-4 flex relative items-center `}>
                    Membership <MdCardMembership className='absolute right-4 text-xl'/>
                </NavLink>

                <NavLink to='passwordRest' className={({isActive})=>`${isActive?'text-eliteGold border-r-4 border-eliteGold':'text-black border-0 hover:text-gray-600'}
                w-full p-4 flex relative items-center `}>
                    Rest Password <TbLockPassword  className='absolute right-4 text-xl'/>
                </NavLink>

                <NavLink to='' className={`${logoutModel?'text-eliteGold border-r-4 border-eliteGold':'text-black border-0 hover:text-gray-600'}
                w-full p-4 flex relative items-center `} onClick={()=>setLogoutModel(true)}>
                    Logout <HiOutlineLogout  className='absolute right-4 text-xl'/>
                </NavLink>
               
             
            </ul>

        </div>

        <div className=' h-screen  w-full z-5 pt-[80px] bg-gray-50'>
            <Outlet/>

        </div>

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
                        <button className='p-2 w-[100px] bg-eliteGold text-white rounded-lg cursor-pointer hover:shadow-[0px_0px_10px_black]'
                        onClick={handleLogout}>Logout</button>

                    </div>


                </div>

            </section>
        )
        }

  
        
    </div>
  )
}

export default ProfileItems