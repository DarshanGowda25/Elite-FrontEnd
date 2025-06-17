import React, { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { PurchaseCard } from './FitnessPage';
import { MdOutlineLocationOn } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { AiFillTag } from "react-icons/ai";
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getErrorMsg, serverUrlAPI } from '../Utils/info';
import { axiosInstance } from '../Utils/axioInstance';
import CustomLoader from '../UI_Components/CustomLoader';




function Buy() {

   
    const location = useLocation();
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const user = queryClient.getQueryData('userProfile');
    if (localStorage.getItem('token') && !user) {
        return <CustomLoader/>;
      }
      
    const {user_id,name} = user ?? {};


    const[formData,setFormData] = useState({
        center : "",
        date:""

    })

    const receivedData = location.state || [];

    const planDetails = receivedData[0] || {};
    const selectedMonths = receivedData[1]?. selectedMonths || '';

    const details = planDetails[0]
    let purchaseDetails = {};
    if(selectedMonths === '12'){
        purchaseDetails = planDetails[1].purchaseDetails[0]
    }else if(selectedMonths === '6'){
        purchaseDetails = planDetails[1].purchaseDetails[1]
    }else{
        purchaseDetails = planDetails[1].purchaseDetails[2]
    }


    const handleChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;

        setFormData({...formData,[name]:value})
    }

    const buyFunction = async (val) =>{
        const start_date = new Date(val.date);
        const end_date =  new Date(start_date);
       
        end_date.setMonth(end_date.getMonth() + Number(purchaseDetails.months));
      
        console.log(start_date.toISOString().split('T')[0])
        console.log(end_date.toISOString().split('T')[0])

        const response = await axiosInstance.post(`${serverUrlAPI}membership/register`,{
            start_Date:start_date.toISOString().split('T')[0],
            end_Date:end_date.toISOString().split('T')[0],
            center:val.center,
            user_id:user_id,
            price:purchaseDetails.discountPrice,
            type:details.type,
            payment_status:"pending"

           


            

        });
        return response.data;
    }
    
    const buyMutation = useMutation({
        mutationKey:['buyMembership'],
        mutationFn:buyFunction,
        onSuccess:(data)=>{
            toast.success(data.status);
            formData.center=""
            formData.date=""
            setTimeout(()=>{
                navigate('/')
            },1000)
           
        },
        onError:(error)=>{
            toast.error(getErrorMsg(error));
        }

    })



    



  return (
    <div className=' h-screen w-full bg-cover bg-center flex relative'
    style={{backgroundImage:"url('/Image/BG.jpg')"}}
    >
    <div className='o'></div>
         <div className='hidden md:flex h-full w-[50%] items-center'>
            <img src={details.Image} className='h-[65%] w-[90%] mt-40 mx-auto'></img>

        </div>

        <div className='h-[75%] w-full md:w-[40%]  mt-38 px-3 md:px-10 py-15 relative'>
            <h1 className='text-white text-xl md:text-3xl font-semibold' >{purchaseDetails.months} Month Pass Elite <b className='text-eliteGold'>{details.type}</b></h1>
            <h1 className='text-eliteGold text-lg md:text-xl font-bold absolute top-16 right-10'>&#8377; {purchaseDetails.discountPrice}</h1>
            <h1 className='text-white text-xs font-bold absolute top-13 right-10'><strike>&#8377;  {purchaseDetails.price}</strike></h1>
            <h1 className='text-eliteGold text-sm font-semibold absolute top-23 right-10'>+900 tax & fee</h1>
            <div className='bg-white w-[90px] h-[1px] absolute top-30 right-10'></div>
            <h1 className='text-eliteGold  text-lg md:text-2xl font-bold absolute top-30 right-10'>
               <i className='mr-6 text-white'>Total :</i>   {parseInt(purchaseDetails.discountPrice)+900}</h1>

            <form onSubmit={(e)=>{
                e.preventDefault();
                const token = localStorage.getItem('token');
                if(token){
                    buyMutation.mutate(formData);
                }else{
                    navigate('/signIn');
                    toast.error("please Login")
                }
               
            }} 

            className='h-[130px] w-full  flex  relative mt-20 border-b-2 border-white'>
                <div className='w-[50%] h-[60%]   flex items-center relative'>
                <MdOutlineLocationOn className='text-2xl text-eliteGold' />
                <h1 className='text-xs text-gray-300 absolute top-1 left-7 font-semibold'>Prefered center:</h1>
                <select 
                name='center'
                value={formData.center}
                required
                onChange={handleChange}
                className='outline-none w-[85%] text-gray-300 font-semibold '>
                    <option className=' text-black' value="">Select Center</option>
                    <option className=' text-black' value="vijayanagra">vijayanagara</option>
                    <option className=' text-black' value="indiranagar">indiranagar</option>
                    <option className=' text-black' value="kormangla">koramangala</option>
                    <option className=' text-black' value="HSR Layout">HSR Layout</option>

                </select>
                </div>

                <div className='w-[50%] h-[60%]  flex items-center relative'>
                    <IoCalendarOutline className='text-eliteGold'/>
                    <h1 className='text-xs text-gray-300 absolute top-1 left-5 font-semibold'>Starts on</h1>
                    <h1 className='text-2xl text-eliteGold absolute right-0 pointer-events-none'><IoIosArrowDown /></h1>
                    <input
                    name='date'
                    value={formData.date}
                    min={new Date().toISOString().split('T')[0]}
                    
                    onChange={handleChange}
                     type='date' className='w-[90%] mx-auto outline-none text-gray-300 
                    [&::-webkit-calendar-picker-indicator]:opacity-0
                    ' 
                    required/>
                   
                </div>
                
                <div className='absolute left-0 bottom-6 flex flex-col md:flex-row'>
                <input type='checkbox'
                className='h-[15px] md:h-[20px] w-[15px] md:w-[20px] mr-5'
                required
                />
                <h1 className='text-eliteGold md:text-md text-xs'>Amount to be paid at particular center!</h1>
                </div>

                <button type='submit' className='absolute bottom-3 rounded-4xl text-white right-0 p-2 bg-eliteGold
                hover:shadow-[0_0_12px_rgba(212,175,55,0.5)] mb-2 cursor-pointer
                '>Get Membership</button>

            </form>

            <h1 className='text-2xl font-bold text-white mt-5 md:mt-15 mb-2'>Offer</h1>
            <h1 className='flex  text-white'><AiFillTag className='text-eliteGold text-lg mt-1 mr-2'/> {purchaseDetails.p1}</h1>
            <h1 className='flex  text-white'><AiFillTag className='text-eliteGold text-lg mt-1 mr-2'/> {purchaseDetails.p2}</h1>
            <h1 className='flex  text-white'><AiFillTag className='text-eliteGold text-lg mt-1 mr-2'/> {purchaseDetails.p3}</h1>
            <h1 className='flex  text-white'><AiFillTag className='text-eliteGold text-lg mt-1 mr-2'/> {purchaseDetails.p4}</h1>

        </div> 


    </div>
  )
}

export default Buy