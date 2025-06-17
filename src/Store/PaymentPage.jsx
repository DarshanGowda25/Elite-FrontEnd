import React, { useState } from 'react'
import { Order } from './Cart'
import Stepper from './Stepper'
import { useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getErrorMsg, serverUrlAPI } from '../Utils/info';
import axios from 'axios';
import { axiosInstance } from '../Utils/axioInstance';
import SuccessLoader from '../UI_Components/SuccessLoader';

function PaymentPage() {
   const location = useLocation();
   const navigate = useNavigate();
   const queryClient = useQueryClient();
   const [paymentMode,setpaymentMode] = useState(""); 
   const [showSuccessLoader, setShowSuccessLoader] = useState(false);
   const{orderSummary,ProductsDetails,addressDetails,source} = location.state || {};
   const {addressType,name,phone,address,town,pincode,district,state,addressId} = addressDetails
  const currentPage = "Payment"

  console.log(ProductsDetails)
  const OrderProduct = async() =>{
    const response = await axiosInstance.post(`${serverUrlAPI}orders/order`,{
      paymentMode,
      source:source,
      addressId: addressId,
      cartProductDetails: ProductsDetails.map(product => ({
      productId: product.productId,  
      quantity: product.quantity
  }))

    }
    )
    return response.data;
  }
  const orderProductMutation =  useMutation({
    mutationKey : ['orderProduct'],
    mutationFn:OrderProduct,
    onSuccess:(data)=>{
      queryClient.invalidateQueries(['cart'])
      setShowSuccessLoader(true); 
      toast.success(data.status)
      
    },
    onError:(error)=>{
      toast.error(getErrorMsg(error))
    }
  })

  

  return (
    <div  className={`max-w-screen h-screen lg:max-w-[1800px] overflow-x-hidden overflow-y-auto scrollbar-hidden  scroll-smooth 
        flex flex-col items-center
        md:flex-row md:items-center relative `}>

      
        {showSuccessLoader && 
        <div className='h-full w-full bg-white z-49 place-content-center'>
        <SuccessLoader />  
        
      </div>
}
    
    
        {/* order Summary */}
        <section className='hidden md:flex flex-col w-[30%] h-[500px]  py-10 px-5 absolute top-30 left-15 '>
            <Order orderSummary={orderSummary}/>
        </section>
    
        <section className='h-auto md:h-screen  w-[95%] md:w-[65%]  flex flex-col items-center   md:overflow-y-auto scrollbar-hidden  absolute right-0
        gap-5 '>
          {/* stepper */}
          <div  className='w-[95%] mt-[170px] md:mt-30'>
            <Stepper  Page={currentPage} className="mx-auto"/>
          </div>

          {/* address */}
          <h1 className='font-bold uppercase text-sm relative top-6 right-25 md:top-6 md:right-75'>Shipping Address</h1>
          <div className='w-[95%] md:w-[75%] p-4 text-sm rounded-md shadow-[0_0_20px_rgba(75,85,99,0.3)] mt-4 mb-2 relative cursor-pointer'>
            <h1 className='font-bold uppercase text-xs'>{addressType}</h1>
              <div className='flex text-gray-600 gap-5 mt-2'>
                <p>{name}</p>
                <p>{phone}</p>
              </div>
            <p className='text-gray-600'>{address},</p>
            <p className='text-gray-600'>{town}</p>
            <div className='flex text-gray-600'>
              <p className='uppercase'>{district}</p>
              <p className='ml-2'>-{pincode}</p>
            </div>
          </div>

          <h1 className='w-[75%] text-left ml-3 uppercase font-bold text-sm'>Payment Mode</h1>
          <div className='w-[75%] flex flex-row gap-2 border-b-1 border-gray-400 pb-5'>
            <span className='px-6 py-3 bg-gray-300 place-content-center cursor-not-allowed'>Razor pay</span>
            <span className={`px-6 py-3 place-content-center cursor-pointer
            ${paymentMode === "COD" ? "bg-gray-700 text-white" : "bg-gray-300"}`}
            onClick={()=>{
              if(paymentMode === ""){
              setpaymentMode("COD")
            }else{
              setpaymentMode("");
            }
          }
        }
            >COD</span>
          </div>
        
        <div className='w-full md:w-[75%] flex flex-row gap-3 justify-center'>
          <button className='w-[35%] text-sm bg-gray-300 text-black p-2 md:p-3 cursor-pointer'
          onClick={()=>{
            navigate("/store")
          }}>Cancel </button>
          <button className={`w-[35%] text-sm text-white p-2 md:p-3 
          ${paymentMode === "" ? "bg-gray-700 cursor-not-allowed":"cursor-pointer  bg-eliteGray"}`}
          onClick={()=>{
            orderProductMutation.mutate();
          }}
          disabled={paymentMode === ""}
          >Confirm Order</button>
        </div>
    
        {/* order Summary */}
        <section className={`md:hidden  w-[95%] md:w-[30%] h-[500px]  py-5 px-5 md:absolute md:bottom-0 mt-15
           `}>
            <Order orderSummary={orderSummary} />
        </section>
          
    
    
          
        </section>
    </div>
  )
}

export default PaymentPage