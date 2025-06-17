import React, { useState } from 'react'
import { FcSalesPerformance } from "react-icons/fc";
import { FaOpencart } from "react-icons/fa6";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { PiUsersThree } from "react-icons/pi";
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../Utils/axioInstance';
import { serverUrlAPI } from '../Utils/info';
import { useNavigate } from 'react-router-dom';


function AdminDashBoard() {

  const navigate = useNavigate();
  const fetchDashData = async () =>{
    const response = await axiosInstance(`${serverUrlAPI}admin/getDashData`)
    console.log(response.data);
    return response.data;
  }

  const {data:dashData,isFetching}= useQuery({
    queryKey:['DashData'],
    queryFn:fetchDashData,
    staleTime:Infinity,
    refetchOnWindowFocus:false,
  })


  const data = [
    {
      label:"Today's Sales",
      value:dashData?.todaySales,
      icon:<FaOpencart/>
    },
    {
      label:"Total Sales",
      value:dashData?.totalSales,
      icon:<FcSalesPerformance/>
    },{
      label:"queries",
      value:dashData?.queryCount,
      icon:<MdOutlineQuestionAnswer/>
    },{
      label:"Total Membership User's",
      value:dashData?.totalMemberships,
      icon:<PiUsersThree/>
    }

  ]
  return (
    <div className=' h-screen w-full md:py-5 flex flex-col  md:gap-5 overflow-hidden'>

      <div className='w-[95%] mx-auto h-[300px] md:h-[200px]  mt-5 flex flex-row flex-wrap items-center md:px-2 md:gap-10 gap-2 overflow-hidden'>
        {data?.map((data,idx)=>(
        <div key={idx} className='h-[100px] md:h-[125px] w-[45%] md:w-[22%] rounded-lg bg-white px-5 shadow-2xl
        hover:bg-eliteGray hover:text-white cursor-pointer' 
        onClick={()=>{
          if(data.label === "queries"){
            navigate('/admin/queries')
          }else if(data.label === "Total Membership User's"){
            navigate("/admin/memberships")
          }
        }}>
          <div className='h-full flex flex-row items-center  relative '>

            <div className='flex flex-col items-center'>
              <h1 className='text-2xl text-left'>{data.value}</h1>
              <p className='font-bold text-xs text-gray-500 '>{data.label}</p>
            </div>

            <h1 className='hidden md:flex text-3xl text-gray-500 absolute right-3'>{data.icon}</h1>

          </div>
        </div>
        ))
      }
      </div>

      <div className='h-[500px] md:h-[510px] w-full flex flex-row gap-4 items-center overflow-hidden'>
        <div className='h-[95%] md:h-[95%] w-[95%] md:w-[65%] shadow-2xl rounded-lg relative px-4 over text-xs md:text-[13px] overflow-scroll md:overflow-hidden ' >
          <h1 className='absolute top-4 left-4 font-bold text-eliteGold md:text-lg'>Top Seller</h1>

          
          <table className='w-full  mt-10 md:mt-15  relative '>
            <thead>
            <tr className='text-[14px]'>
              <th className="text-left p-3">Product</th>
              <th className="text-center p-3">Price</th>
              <th className="text-center p-3">Total Sale</th>
              <th className="text-center p-3">Rating</th>
              <th className="text-right p-3">Stock</th>
            </tr>
          </thead>

          <tbody>
            {dashData?.products?.map((product,idx)=>(
            <tr key={idx} className='hover:bg-eliteGray hover:text-white cursor-pointer'>
              <td className='text-left p-2'>{product.name}</td>
               <td className='text-center p-2'>{product.price}</td>
              <td className='text-center p-2'>{product.buyCounts}</td>
              <td className='text-center p-2'>{product.rating}</td>
              <td className='text-right p-2'>{product.available === 1 ? "Available" : "Unavailable"}</td>
            </tr>
            ))
            }
          </tbody>

          </table>
        </div>

        <div className=' hidden md:flex h-[95%] w-[30%] shadow-2xl rounded-lg relative px-4 '>
          <h1 className='absolute top-4 left-4 font-bold text-eliteGold'>Recent Membership Buyers</h1>
          <button className='absolute top-4 right-4 rounded-md px-2 py-1 bg-eliteGray text-white text-xs hover:shadow-[0px_0px_10px_black] cursor-pointer' 
          onClick={()=>{
            navigate("/admin/memberships")
          }}>View All</button>
          <div className='w-full flex flex-col items-center mt-15 text-md' >
              
              {dashData?.MemberShipBuyers?.map((item,idx)=>(
              <div key={idx} className='w-full  flex flex-row items-center  justify-between p-2 border-b-1 border-gray-400 text-md relative'>
                <div className='h-[40px] w-[40px] place-content-center rounded-full bg-eliteGray'>
                  <img src='/Image/logo3.png' className='h-[30px] w-[30px] mx-auto'></img>
                </div>
                <h1 className='absolute left-15 w-[60%] truncate'>{item.userName}</h1>
                <h1>{item.memberShipType === "" ? "Elite" : `Elite ${item.memberShipType}`}</h1>
              </div>
              
              ))}
          </div>
  
        </div>

      </div>
    </div>
  )
}

export default AdminDashBoard