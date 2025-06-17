import { Minus, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { MdOutlineDeleteOutline } from "react-icons/md";
import Stepper from './Stepper';
import { FaBoxOpen } from "react-icons/fa";
import { RiInformation2Line } from "react-icons/ri";
import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../Utils/axioInstance';
import { getErrorMsg, serverUrl, serverUrlAPI } from '../Utils/info';
import { calculateDiscount } from './Category';
import toast from 'react-hot-toast';
import { func } from 'prop-types';
import ContentLoader from '../UI_Components/ContentLoader';
import { useLocation, useNavigate } from 'react-router-dom';

function Cart() {
  
 
  const currentPage = "Cart";
  const source = "cart";

  //fetch Cart Data
  const fetchCartDetails = async () =>{
    const response = await axiosInstance.get(`${serverUrlAPI}cart/cartDetails`)
    console.log(response.data.cart)
    return response.data.cart
  }

const { data, refetch, isLoading } = useQuery({
  queryKey: ['cart'],
  queryFn: fetchCartDetails,
  staleTime: Infinity,
  refetchOnWindowFocus: false,
});

  //remove product from cart
  const removeProduct = async (id) => {
    console.log("inside fetch "+id)
      const response = await axiosInstance.delete(`${serverUrlAPI}cart/remove?id=${id}`)
      return response.data;
  }
  
  const productRemoveMutation = useMutation({
    mutationKey : ['deleteProduct'],
    mutationFn: removeProduct,
    onSuccess:()=>{
      refetch();
    },
    onError : (error) => {
      toast.error(getErrorMsg(error))
    }
  })

  const handleProductRemove = (val) =>{
    console.log(val)
    productRemoveMutation.mutate(val)
  }

//filtering data for cart
  const [orderSummary,setOrderSummary] = useState({
      price:0,
      discountAmount:0,
      convenienceFee:29,
      totalAmount:0,
      totalItems:0
  })

  const [ProductsDetails, setCartProductDetails] = useState([]);

useEffect(() => {
  if (!data) return;

  const productsData = data?.map((data) => {  
  const{image,name,price,discount} = data?.product
        return {
          cartId: data?.cartId,
          productId:data?.product?.productId,
          name : name,
          quantity: 1,
          price: price,
          discount:discount ,
          image:image,

        };
      });

  setCartProductDetails(productsData);
}, [data]);



//order Summmary(total calculations)
useEffect(()=>{
  const price = ProductsDetails?.reduce((result, product) => {
    return result + (product.price * product.quantity);
  }, 0);

  const totalAmount = ProductsDetails?.reduce((result, product) => {
    const { price, discount,quantity } = product;
    return result + (calculateDiscount(price, discount)*quantity);
  }, 0);


  setOrderSummary((prev) => ({
  ...prev,
  price: price,
  totalAmount: totalAmount + prev.convenienceFee,
  discountAmount: price - totalAmount,
  totalItems: data?.length ?? 0
}));
},[ProductsDetails])

//quantityChange
const handleQuantity = (data) =>{
  const updatedDetails = ProductsDetails.map((product)=>{
    if(product?.cartId=== data?.cartId){
      return {...product, quantity : data.quantity};
    }else{
      return product;
    }
  });
  setCartProductDetails(updatedDetails);
}



  return (
  <div  className='max-w-screen h-screen lg:max-w-[1800px] overflow-x-hidden overflow-y-auto scrollbar-hidden  scroll-smooth flex flex-col md:flex-row items-center '>


    <section className='h-auto md:h-screen  w-[95%] md:w-[65%]  flex flex-col items-center  gap-10 md:overflow-y-auto scrollbar-hidden pb-10'>

      {
        isLoading && <div><ContentLoader/></div>
      }
      {/* stepper */}
      <div  className='w-[95%] mt-[170px] md:mt-30'>
        <Stepper  Page={currentPage} className="mx-auto"/>
      </div>

    {/* //products */}
    {ProductsDetails.length === 0 && (
      <div><img src='/Image/CartEmpty.png' className='h-[300px] w-[400px]'></img></div>
    )}

    {ProductsDetails.map((product, idx) => (
      <CartCard
        key={idx}
        ProductData={product}
        removeFn={handleProductRemove}
        quantityFn={handleQuantity}
      />
    ))}
  
    </section>


    {/* order Summary */}
    <section className='w-[95%] md:w-[30%] h-[500px]  py-10 px-5 md:fixed md:top-30 md:right-15'>
      <Order orderSummary={orderSummary} ProductsDetails={ProductsDetails} source={source}/>
    </section>


  </div>
  )
}

export default Cart


function CartCard({ProductData,removeFn,quantityFn}){
  
  const{cartId,image,name,price,discount} = ProductData
  const [quantity, setQuantity] = useState(ProductData.quantity || 1);
  
  
  useEffect(()=>{
    quantityFn({
      cartId:cartId,
      quantity:quantity
    })

  },[quantity])
 
 
  
  return(
        <div className=' w-[96%] md:w-[70%] bg-white flex relative shadow-[0_0_40px_rgba(75,85,99,0.2)]'>

        <button className='absolute right-5 top-8 cursor-pointer'
        onClick={()=>{removeFn(cartId)}}
        ><MdOutlineDeleteOutline className='h-full w-full text-2xl'/></button>

        <div className='p-4 md:p-7'>
          <img src={image} className=' h-[125px] w-[100px]'></img>
        </div>

        <div className='flex flex-col py-8 gap-4'>
          <h1 className='md:text-2xl'>{name}</h1>

          <div className='flex gap-2 items-center'>
            <p className='font-semibold md:text-lg'>₹{calculateDiscount(price,discount)}</p>
            <p className='text-sm text-gray-600 font-semibold'><strike>₹{price}</strike></p>
            <b className='text-eliteGold text-xs'>( {discount}% )</b>
          </div>

          <span className="w-[70px] md:w-[90px] flex items-center justify-center gap-1 md:p-1 shadow-[0px_0px_2px_black]">
          <Minus size={15} className="cursor-pointer" 
            onClick={()=>{
            setQuantity((prev)=>{
              if(prev==1){
                
                return 1;
              }
              else{
                return prev-1;
              }
            })
          }}
          />
          <input
            type="text"
            value={quantity}
            readOnly
            className="w-[25px]  md:w-[35px] h-[20px] text-center text-sm  m-0 border-x-1   border-gray-300"
          />
          <Plus size={15} className="cursor-pointer"
          onClick={()=>{
            setQuantity((prev)=>(
              prev+1
            ))
          }} />
          </span>

        </div>

      </div>
  )
}


export function Order({orderSummary,ProductsDetails,addressDetails,source}){
   const[Convenience,setConvenience] = useState(false);
   const{price,discountAmount,totalAmount,totalItems,convenienceFee} = orderSummary
   const navigate = useNavigate();
   const location = useLocation();
  
  return(
    <>
    <span className='flex items-center gap-2'>
        <h1 className='font-bold text-2xl text-eliteGray flex items-center gap-2'> <FaBoxOpen className='mt-1'/> Order Summary</h1>
        <h1 className='mt-2 text-eliteGold font-bold'>({totalItems} items)</h1>
      </span>

      <div className='w-full mt-10 flex flex-col'>

        <div className='flex items-center justify-between p-2'>
          <p className='text-eliteGray font-semibold'>Price </p>
          <p>₹{price}</p>
        </div>

        <div className='flex items-center justify-between p-2'>
          <p className='text-eliteGray font-semibold'>Discount Amount </p>
          <p className='text-green-700 font-bold'>-₹{discountAmount}</p>
        </div>

        <div className='flex items-center justify-between p-2'>
          <p className='text-eliteGray font-semibold flex items-center'>Convenience Fee <b><RiInformation2Line className='text-eliteGold mt-1 ml-1 text-lg cursor-pointer'
           onMouseOver={()=>{setConvenience(true) }} onMouseLeave={()=>{setConvenience(false) }}/></b> </p>
          <p className={`mr-20 px-3 py-[6px] bg-eliteGray text-white rounded-md text-[8px] uppercase
            ${Convenience ? "flex" : "hidden"}`}
            >Delivery Fee + Platform Fee</p>
          <p>₹{convenienceFee}</p>
        </div>

        <div className='h-[1px] w-full bg-eliteGray mt-2'></div>

         <div className='flex items-center justify-between p-2'>
          <p className='text-eliteGray font-semibold flex items-center'>Total Amount</p>
          
          <p className='font-semibold'>₹{totalAmount}</p>
        </div>

      </div>
      <button className={`p-3 w-full bg-eliteGray text-white mt-10 hover:bg-gray-700
        ${totalItems === 0 || location.pathname === "/store/addAddress" && Object.keys(addressDetails || {}  ).length  === 0 ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
        ${location.pathname === "/store/payment"? "hidden": " "}
        `} 
        disabled={totalItems === 0 || location.pathname === "/store/addAddress" && Object.keys(addressDetails || {} ).length === 0}


          onClick={() => {
            if(location.pathname === "/store/cart" ){
            navigate("/store/addAddress", {
              state: {
              source:source,
              orderSummary: orderSummary,
              ProductsDetails: ProductsDetails,
          },
        });
      }else if(location.pathname === "/store/addAddress"){
            navigate("/store/payment", {
              state: {
              source:source,
              orderSummary: orderSummary,
              ProductsDetails: ProductsDetails,
              addressDetails: addressDetails
          },
        });
      }
        }}
        
        >
          {
            location.pathname === "/store/cart" ? (<p>checkout</p>) : 
            (<p>Proceed to pay</p>) 
          }
          
    
      </button>
    </>
  )
}
