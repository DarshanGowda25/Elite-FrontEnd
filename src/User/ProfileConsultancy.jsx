import { useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { axiosInstance } from '../Utils/axioInstance'
import { serverUrlAPI } from '../Utils/info'

function ProfileConsultancy() {

  const fetchConsultancies = async () =>{
    const response = await axiosInstance.get(`${serverUrlAPI}consultancy/get`)
    console.log(response.data)
    return  response.data;
  }

  const queryClient = useQueryClient()

  const{data,isLoading}  = useQuery({
    queryKey:['consultancies'],
    queryFn:fetchConsultancies,
    staleTime:Infinity,
    refetchOnWindowFocus:false,
    enabled:!queryClient.getQueryData('consultancies')

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

export default ProfileConsultancy

function Card({item}){

  const {consult_type,date} = item;
  const getImage = () =>{
    if(consult_type === "Fitness Consultancy"){
      return "/Image/Consultencies.jpeg";
    }else if(consult_type === "Physiotherapy Consultancy"){
      return "/Image/Consultencies2.jpeg"
    }else{
      return "/Image/Consultencies3.jpeg"
    }

  }
 
  
  return(

    <div className='h-auto w-[99%] md:w-[50%] border-b-1 border-black  mt-15 flex relative'>
        <img src={getImage()}
        
        className='h-[130px] w-[125px] mb-2'></img>
        <div className=' ml-4 md:ml-6'>
          <h1 className='text-xl mt-5'><b className='text-eliteGold'>{consult_type}</b></h1>
          
        </div>
        <h1 className={`absolute top-2 right-2 md:right-5 text-xs text-red-600`}>
          Appointment date : <b>{date}</b> </h1>
        

    </div>


  )
}