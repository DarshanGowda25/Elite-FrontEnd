import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { axiosInstance } from '../Utils/axioInstance'
import { getErrorMsg, serverUrlAPI } from '../Utils/info'
import toast from 'react-hot-toast'

function Queries() {

  const QueryClient = useQueryClient();
  
  const fetchQuery = async () =>{
    const response = await axiosInstance.get(`${serverUrlAPI}contact/getAll`)
    console.log(response.data)
    return response.data;
  }
  
 const {data,isFetching} = useQuery({
    queryKey:["Queries"],
    queryFn:fetchQuery,
    staleTime:Infinity,
    refetchOnWindowFocus:false
  });

  const updateFunction = async(val)=>{
    console.log(val)
    const response = await axiosInstance.patch(`${serverUrlAPI}contact/update`,val)
    return response.data;
  }

   const updateMutation = useMutation({
    mutationKey:["updateStatus"],
    mutationFn:updateFunction,
    onSuccess:()=>{
      QueryClient.invalidateQueries(["Queries"])
    },
    onError:(error)=>{
      toast.error(getErrorMsg(error))
    }
  })

  return (
<div className='h-screen w-full flex flex-col items-center py-8 overflow-y-auto scrollbar-hidden'>
  <h1 className='font-bold text-2xl uppercase'>Queries</h1>

  <div className='h-[95%] w-[96%]  overflow-y-scroll scrollbar-hidden'>

    <div className="overflow-x-auto w-full">
      <table className='mt-5 min-w-full mx-auto'>
        <thead>
          <tr className='bg-eliteGray text-white h-[60px] text-xs md:text-sm'>
            <th className='text-left md:pl-4'>Name</th>
            <th className='text-left'>Email</th>
            <th className='text-left'>Phone</th>
            <th className='text-left'>Message</th>
            <th className='text-center md:pr-4'>Status</th>
            <th className='text-center md:pr-4'></th>
          </tr>
        </thead>

        <tbody>
          {data?.map((item, index) => (
            <tr key={index} className='odd:bg-gray-100 even:bg-white hover:bg-gray-200 text-[10px] md:text-xs h-[50px]'>
              <td className='text-left md:pl-4 md:py-2'>{item.name}</td>
              <td className='text-left'>{item.email}</td>
              <td className='text-left'>{item.phone}</td>
              <td className='text-left'>{item.message}</td>
              <td className={`text-left font-bold
                ${item.status === "unanswered" ? " text-red-800" : " text-green-800"}`}>
                {item.status}</td>

              <td className='text-center md:pr-4'>
                <span className={`py-2 px-4 rounded  font-bold text-sm cursor-pointer
                ${item.status === "unanswered" ? "bg-green-800 text-white" : "hidden"}`}
                onClick={() => {
                  updateMutation.mutate({
                    id: item.contact_id,
                    status: "Answered"
                  });
                }}>
                {item.status === "unanswered" ? "Answer" : "Answered"}
                </span>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  </div>
</div>
  )
}

export default Queries