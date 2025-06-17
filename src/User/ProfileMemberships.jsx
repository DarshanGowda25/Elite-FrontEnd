import { useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { axiosInstance } from '../Utils/axioInstance';
import { serverUrlAPI } from '../Utils/info';

function ProfileMemberships() {

  const queryClient = useQueryClient();

  const fetchMemberships = async () =>{
    const response = await axiosInstance.get(`${serverUrlAPI}membership/getMemberships`)
    console.log(response.data)
    return  response.data;
  }


  const{data,isLoading}  = useQuery({
    queryKey:['memberships'],
    queryFn:fetchMemberships,
    staleTime:Infinity,
    refetchOnWindowFocus:false,
    enabled:!queryClient.getQueryData('memberships')

  })



  return (
    <div className="h-full w-full px-2 md:px-15 overflow-y-auto overflow-x-hidden scrollbar-hidden">

      {
        data && data.length > 0 ?
        (
          data.map((item , idx)=>(
            <Card key={idx} item={item}/>
          ))

        ):(
          <div className="text-gray-500 mt-100 mx-auto">No memberships found.</div>
        )
      }

    </div>

  )
}

export default ProfileMemberships


function Card({item}){
  const {type,price,payment_status,center,start_date,end_Date} = item


  return(

    <div className='h-auto w-[99%] md:w-[50%] border-b-1 border-black  mt-15 flex relative'>
        <img src='/Image/MemberShips.jpg' className='h-[130px] w-[110px] mb-2'></img>
        <div className=' ml-4 md:ml-6'>
          <h1 className='text-xl'>Elite <b className='text-eliteGold'>{type}</b></h1>
          <h1 className='mt-2 '>&#8377; {price}</h1>
          <h1 className='text-sm'>Prefered Center :</h1>
          <h1 className='text-xs text-eliteGold font-bold' >{center}</h1>
        </div>
        <h1 className={`absolute top-2 right-2 md:right-10 text-xs text-red-600`}>
          Expires on : <b>{end_Date}</b> </h1>
        <h1 className={`absolute right-2 md:right-8 bottom-2 md:bottom-5 p-2 border-2 text-white ${payment_status==="pending" ? "bg-red-400" : "bg-green-400"} 
        rounded-2xl px-2 text-xs md:text-sm capitalize`}>
          payment : {payment_status}</h1>

    </div>


  )
}