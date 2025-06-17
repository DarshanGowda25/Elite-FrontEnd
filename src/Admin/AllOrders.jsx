import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { axiosInstance } from '../Utils/axioInstance'
import { serverUrlAPI } from '../Utils/info'

function AllOrders() {
  
  const QueryClient = useQueryClient();

  const fetchAllOrders = async () =>{
    const response = await axiosInstance.get(`${serverUrlAPI}orders/getAllOrders`)
    console.log(response.data);
    return response.data;
  } 

  const {data,isFetching} = useQuery({
    queryKey : ['getAllOrders'],
    queryFn:fetchAllOrders,
    staleTime:Infinity,
    refetchOnWindowFocus:false
  })

   const updateFunction = async(val)=>{
    console.log(val)
    const response = await axiosInstance.patch(`${serverUrlAPI}orders/update`,val)
    return response.data;
  }

   const updateMutation = useMutation({
    mutationKey:["updateStatus"],
    mutationFn:updateFunction,
    onSuccess:()=>{
      QueryClient.invalidateQueries(["getAllOrders"])
    },
    onError:(error)=>{
      toast.error(getErrorMsg(error))
    }
  })

 return (
<div className='h-screen w-full flex flex-col items-center py-8 overflow-y-auto scrollbar-hidden'>
  <h1 className='font-bold text-2xl uppercase text-eliteGray'>Orders</h1>

  <div className='h-[95%] w-[96%]  overflow-y-scroll scrollbar-hidden'>

    <div className="overflow-x-auto w-full">
      <table className='mt-5 min-w-full mx-auto'>
        <thead>
          <tr className='bg-eliteGray text-white h-[60px] text-sm'>
            <th className='text-left md:pl-4'>Product Name</th>
            <th className='text-left p-2'>Q<p className='text-[8px]'>(quantity)</p></th>
            <th className='text-left p-2'>Final Price<p className='text-[10px]'>(price*quantiry)</p></th>
            <th className='text-left p-2'>Order Date</th>
            <th className='text-left p-2'>Payment Mode</th>
            <th className='text-left p-2'>Shipping Address</th>
            <th className='text-center md:pr-4'>Order Status</th>
          </tr>
        </thead>

        <tbody>
          {data?.orders?.map((item, index) => (
            <tr key={item.orderId} className='odd:bg-gray-100 even:bg-white hover:bg-gray-200 text-xs h-[50px]'>
              <td className='text-left md:pl-4 md:py-2'>{item.productName}</td>
              <td className='text-left p-2'>{item.quantity}</td>
              <td className='text-left p-2'>
                <p className='text-[10px]'>{item.price}*{item.quantity}</p>=<b>{item.price*item.quantity}</b></td>
              <td className='text-left p-2'>{item.orderDate}</td>
              <td className='text-left p-2'>{item.paymentMode}</td>
              <td className='text-left p-2 text-[10px]'>
                <p>{item.address.name}</p>
                <p>{item.address.phone}</p>
                <b>{item.address.address}</b>
              </td>

              <td className='text-center md:pr-4'>
                <span className={`py-2 px-4 rounded  font-bold text-[10px] cursor-pointer
                ${["Pending","Transit","Out-For-Delivery"].includes(item.orderStatus) ? "bg-green-800 text-white" : "text-green-800"}`}
                 onClick={() => {
                  if (item.orderStatus === "Pending") {
                    updateMutation.mutate({ id: item.orderId, status: "Transit" });
                  } else if (item.orderStatus === "Transit") {
                    updateMutation.mutate({ id: item.orderId, status: "Out-For-Delivery" });
                  } else if (item.orderStatus === "Out-For-Delivery") {
                    updateMutation.mutate({ id: item.orderId, status: "Delivered" });
                  }
                }}>
                {item.orderStatus === "Pending" && "Transit" }
                {item.orderStatus === "Transit" && "Out-For-Delivery" }
                {item.orderStatus === "Out-For-Delivery" && "Delivered"}
                {item.orderStatus === "Delivered" && "Delivered"}
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

export default AllOrders