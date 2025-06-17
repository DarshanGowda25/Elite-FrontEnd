import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { axiosInstance } from '../Utils/axioInstance';
import { serverUrlAPI } from '../Utils/info';

function Memberships() {

  const QueryClient = useQueryClient();
  
  const fetchMemberShipUsers = async () =>{
    const response = await axiosInstance.get(`${serverUrlAPI}membership/getAllMemberships`)
    console.log(response.data)
    return response.data;
  }

  const {data,isFetching} = useQuery({
    queryKey:["MembershipsUsers"],
    queryFn:fetchMemberShipUsers,
    staleTime:Infinity,
    refetchOnWindowFocus:false
  });

  const updateFunction = async(val)=>{
    console.log(val)
    const response = await axiosInstance.patch(`${serverUrlAPI}membership/update`,val)
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
  <h1 className='font-bold text-2xl uppercase'>Membership Users</h1>

  <div className='h-[95%] w-[96%]  overflow-y-scroll scrollbar-hidden'>

    
    <div className="overflow-x-auto w-full">
      <table className='mt-5 min-w-full mx-auto'>
        <thead>
          <tr className='bg-eliteGray text-white h-[60px]'>
            <th className='text-left md:pl-4'>User Name</th>
            <th className='text-left'>MemberShip Type</th>
            <th className='text-left'>Center</th>
            <th className='text-left'>Start Date</th>
            <th className='text-left '>End Date</th>
            <th className='text-center md:pr-4'>Payment Status</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((item, index) => (
            <tr key={index} className='odd:bg-gray-100 even:bg-white hover:bg-gray-200 text-sm h-[50px]'>
              <td className='text-left md:pl-4 md:py-2'>{item.name}</td>
              <td className='text-left'>Elite {item.membershipType}</td>
              <td className='text-left'>{item.center}</td>
              <td className='text-left'>{item.startDate}</td>
              <td className='text-left '>{item.endDate}</td>
              <td className={`text-left font-bold flex flex-row items-center justify-evenly
                ${item.paymentStatus === "pending" ? " text-red-800" : " text-green-800"}`}>
                <p className='mt-3'>{item.paymentStatus}</p>
                <span className={`py-2 px-4 rounded  font-bold text-sm cursor-pointer mt-2
                ${item.paymentStatus === "pending" ? "bg-green-800 text-white" : "hidden"}`}
                onClick={() => {
                  updateMutation.mutate({
                    id: item.id,
                    status: "payed"
                  });
                }}>
                {item.paymentStatus === "pending" ? "Pay" : "Payed"}
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

export default Memberships