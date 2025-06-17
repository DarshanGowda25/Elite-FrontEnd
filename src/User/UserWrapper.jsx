import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../Utils/axioInstance'
import { serverUrlAPI } from '../Utils/info'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import CustomLoader from '../UI_Components/CustomLoader'

function UserWrapper() {

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const fetchUserDetails = async () => {

    const response = await axiosInstance.get(`${serverUrlAPI}user/profile`)
    sessionStorage.setItem('user',JSON.stringify(response.data));
    console.log(response.data)
    return response.data;
  } 

  const {data,isLoading,refetch} = useQuery({
    queryKey : 'userProfile',
    queryFn:fetchUserDetails,
    staleTime:Infinity,
    refetchOnWindowFocus:false,
    enabled:(localStorage.getItem('token') ? true : false)

  })

  if(isLoading){

    return <CustomLoader/>
  }

  return (
<div className='w-full max-w-[1800px] mx-auto'>
  
    <NavBar/>
    <Outlet />

</div>

  )
}

export default UserWrapper