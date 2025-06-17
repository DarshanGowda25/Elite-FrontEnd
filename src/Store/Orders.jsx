import React, { useEffect, useState } from 'react'
import { FaBoxOpen } from "react-icons/fa";
import ReactStars from 'react-stars';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../Utils/axioInstance';
import { getErrorMsg, serverUrlAPI } from '../Utils/info';
import ContentLoader from '../UI_Components/ContentLoader';
import { calculateDiscount } from './Category';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Orders() {
    
    const location = useLocation()
    // const [rating, setRating] = useState({});

    const fetchOrders = async () =>{
        const response = await axiosInstance.get(`${serverUrlAPI}orders/getOrders`);
        console.log(response.data)
        return response.data;
    }

    const {data,isFetching} = useQuery({
        queryKey : ['ordersData'],
        queryFn : fetchOrders,
        staleTime:Infinity,
        refetchOnWindowFocus:false
    })

    const orders = data?.orders || [];

  return (
    <div className={`h-screen w-full  overflow-y-auto scrollbar-hidden
        ${location.pathname === "/profile/profileOrders" ? "pt-0 " : "pt-[70px]"}
    `}>
        {
            isFetching && <ContentLoader/>
        }
        <h1 className='mt-20 ml-80 text-xl font-bold'>All Orders</h1>
        <div className='h-auto w-[95%] md:w-[60%]  bg-gray-100 mx-auto flex flex-col items-center py-10 gap-5 mb-15'>

        { orders?.map((item,idx)=>(
            <OrderCard key={idx} item={item} />
        ))
            
        }
        </div>
        

    </div>
  )
}

export default Orders


function OrderCard({item}){
    
    const{product,quantity,orderDate,paymentMode,orderStatus} = item
    const{image,name,price,discount,description,productId} = product
    const date = orderDate.toString().split('T')
    const [rating, setRating] = useState(item?.rating || 0);
    const [hasSubmitted, setHasSubmitted] = useState(item?.rating > 0);
    const queryClient = useQueryClient();
 
    const navigate = useNavigate();


    const submitRating = async ({newRating,productId})=>{
        const response = await axiosInstance.patch(`${serverUrlAPI}orders/rating`,{
            rating:newRating,
            productId:productId
        })
        return response.data
    }

    const ratingMutation = useMutation({
        mutationKey:['rating'],
        mutationFn:submitRating,
        onSuccess:(data)=>{
           
            toast.success(data.status);
            queryClient.invalidateQueries(['ordersData']); 
            
        },
        onError:(error)=>{
            toast.error(getErrorMsg(error))
             setHasSubmitted(false)
            
        }
    })

    const handleRating = (newRating) => {
         setRating(newRating); 
        setHasSubmitted(true);

        ratingMutation.mutate({ newRating, productId });
    };
    return(
            <div className='h-[285px] w-[98%] md:w-[90%] bg-white flex flex-col items-center pb-10'>
                <div className='w-full flex flex-row items-center '>
                    <div className='h-[40px] w-[40px] bg-eliteGray rounded-full m-5 place-content-center'>
                        <FaBoxOpen className='text-white mx-auto text-2xl'/>
                    </div>
                    <div className='flex flex-col tems-center'>
                    <h1 className='text-green-800 font-bold'>{orderStatus}</h1>
                    <h1 className='font-bold text-gray-600 text-xs'>order date : {date[0]}</h1>
                    </div>
                </div>
                <div className='h-[175px] w-[95%] md:w-[90%] bg-gray-100 relative cursor-pointer'
                onClick={()=>{
                    navigate("/store/product",{ state: product })
                }
                }>
                    <div className='absolute top-3 md:top-6 right-3 p-1 px-2 md:p-2 rounded-2xl bg-eliteGray'>
                        <h1 className='font-bold  text-[10px] text-white'>Payment Mode : {paymentMode}</h1>
                    </div>
                    <div className='flex flex-row border-b-3 border-white'>
                    <div className='h-[80px] md:h-[100px] w-[60px] md:w-[80px] bg-gray-200 m-5 mx-3 rounded-lg overflow-hidden'>
                        <img src={image} className='h-full w-full'>
                        </img>   
                    </div>
                    <div>
                        <h1 className='text-black mt-9 md:text-lg text-md'>{name}</h1>
                        <h1 className='text-gray-700 text-xs font-bold mt-1'>{description}</h1>
                        <h1 className='text-xs text-gray-700 font-bold'>Q : {quantity}</h1>
                    </div>
                    </div>
                    <div className='ml-5 relative flex flex-row items-center'
                    onClick={(e)=>{
                        e.stopPropagation()
                    }}>
                        <ReactStars
                        count={5}
                        value={rating}
                        size={22}
                        color2={'#D4AF37'}
                        edit={!hasSubmitted && orderStatus === "Delivered"}
                        onChange={(newRating) => {
                            if (!hasSubmitted) {
                            
                            handleRating(newRating);
                            } else {
                            toast.error("Rating already submitted");
                            }
                        }}
                        />                      
                        <h1 className='absolute right-2 font-bold'>Price : {calculateDiscount(price,discount)*quantity}</h1>
                        
                    </div>

                </div>

            </div>
    )
}
