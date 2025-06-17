import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Order } from './Cart';
import Stepper from './Stepper';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";
import { ErrorMessage, Form, Formik } from 'formik';
import { LuAsterisk } from "react-icons/lu";
import { addressValidation } from '../Form/FormValidation';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getErrorMsg, serverUrlAPI } from '../Utils/info';
import { axiosInstance } from '../Utils/axioInstance';

function AddAddress() {
    const location = useLocation();
    const [addressDetails,setAddressDetails] = useState({});
    const [newAddress,setNewAddress] = useState(false);
    const{orderSummary,ProductsDetails,source} = location.state || {};
    const currentPage = "Address"

    console.log(ProductsDetails)

    const addAddressFunction = async (val) =>{
        const response =  await axiosInstance.post(`${serverUrlAPI}cart/addAddress`,val)
        return response.data;
    }

    const fetchAddress = async ()=>{
        const response = await axiosInstance.get(`${serverUrlAPI}cart/addressDetails`)
        console.log(response.data)
        return response.data.address;
    }
    const {data,refetch} = useQuery({
        queryKey:['address'],
        queryFn:fetchAddress,
        staleTime:Infinity,
        refetchOnWindowFocus:false

    })

    //Add New Address
    const addAddressMutation = useMutation({
        mutationKey:['addAddress'],
        mutationFn:addAddressFunction,
        onSuccess:(data)=>{
            toast.success(data.status)
            refetch();
            setNewAddress(false)
        },
        onError:(error)=>{
            toast.error(getErrorMsg(error))
        }
    })

    const handleSelect = (val)=>{
        setAddressDetails(val);
    }
    
     //remove Adddress 
  const removeAddress = async (id) => {
    console.log("inside fetch "+id)
      const response = await axiosInstance.delete(`${serverUrlAPI}cart/removeAddress?id=${id}`)
      return response.data;
  }
  
  const addressRemoveMutation = useMutation({
    mutationKey : ['deleteAddress'],
    mutationFn: removeAddress,
    onSuccess:()=>{
      refetch();
    },
    onError : (error) => {
      toast.error(getErrorMsg(error))
    }
  })

  const handleAddressRemove = (val) =>{
    console.log(val)
    addressRemoveMutation.mutate(val)
  }

  return (
    <div  className={`max-w-screen h-screen lg:max-w-[1800px] overflow-x-hidden overflow-y-auto scrollbar-hidden  scroll-smooth 
    flex flex-col items-center
    md:flex-row md:items-center relative  ${newAddress ? "w-full bg-black/75 md:bg-black/0":""}`}>


    {/* order Summary */}
    <section className='hidden md:flex flex-col w-[30%] h-[500px]  py-10 px-5 absolute top-30 left-15 '>
        <Order orderSummary={orderSummary} ProductsDetails={ProductsDetails} addressDetails={addressDetails} source={source}/>
    </section>



    <section className='h-auto md:h-screen  w-[95%] md:w-[65%]  flex flex-col items-center   md:overflow-y-auto scrollbar-hidden  absolute right-0
    gap-5 '>
      {/* stepper */}
      <div  className='w-[95%] mt-[170px] md:mt-30'>
        <Stepper  Page={currentPage} className="mx-auto"/>
      </div>

    <div className='h-[200px] md:h-[330px] w-[80%] flex flex-col items-center gap-2 overflow-y-auto scrollbar-hidden '>

    {data && data?.map((item,idx)=>(
        <AddressCard addressDetails={item} selectFn={handleSelect} selectedAddressId={addressDetails.addressId} removeFn={handleAddressRemove} key={idx}/>
    ))
      
}

      
    </div>

    {/* order Summary */}
    <section className={`md:hidden  w-[95%] md:w-[30%] h-[500px]  py-5 px-5 md:absolute md:bottom-0 mt-15
       `}>
        <Order orderSummary={orderSummary} ProductsDetails={ProductsDetails} source={source}/>
    </section>
      


      
    </section>

    {/* //add Address */}
    <section className='absolute  bottom-35 ml-5 md:bottom-15 md:right-48 h-[40px] md:h-[50px] w-[60%] md:w-[41%] border-2 border-dotted border-gray-400 place-content-center cursor-pointer'
    onClick={()=>{setNewAddress(true)}}>
        <span className='text-center text-gray-700 flex justify-center'><FiPlus className='text-2xl mr-1'/> Add New Address</span>
    </section>

    {
        newAddress && (
            <section className='min-h-[100vh] md:h-screen w-screen md:bg-black/75 z-100 place-content-center'
            onClick={()=>{setNewAddress(false)}}
            >
                <div className='pb-20 md:pb-0 md:h-[88%] w-[90%] md:w-[28%] mx-auto bg-white rounded-lg p-5 relative'
                onClick={(e)=>{
                    e.stopPropagation();
                }}>
                    <h1 className='text-eliteGray font-bold'>Add New Address</h1>
                    <TiDelete className='absolute right-5 top-5 text-3xl cursor-pointer'
                    onClick={()=>{
                        setNewAddress(false)
                    }}
                    />

                    <Formik
                    initialValues={{name:"",email:"",phone:"",address:"",pincode:"",town:"",district:"",state:"KARNATAKA",addresstype: "home"}}
                    validationSchema={addressValidation}
                    onSubmit={(val)=>{
                        addAddressMutation.mutate(val)
                    }}
                    >
                        {
                            ({handleBlur,
                            handleChange,
                            values,
                            dirty
                            })=>(
                                <Form className='h-full w-full flex flex-col gap-3 mt-5 '>

                                    <div>
                                        <span className='flex flex-row items-center'>
                                            <LuAsterisk className='text-red-700 text-xs'/>
                                            <ErrorMessage
                                                name='name'
                                                component={'p'}
                                                className='text-[0.7rem] text-red-500 '
                                            />
                                        </span>
                                        <input
                                        className='p-3 w-full bg-gray-100 rounded-md  !text-black'
                                        type='text'
                                        name='name'
                                        value={values.name}
                                        placeholder='Enter Full Name'
                                        onChange={handleChange}
                                        />

                                       
                                    </div>

                                    <div>
                                         <span className='flex flex-row items-center'>
                                            <LuAsterisk className='text-red-700 text-xs'/>
                                            <ErrorMessage
                                                name='email'
                                                component={'p'}
                                                className='text-[0.7rem] text-red-500 '
                                            />
                                        </span>
                                        <input
                                        className='p-3 w-full bg-gray-100 rounded-md !text-black' 
                                        type='email'
                                        name='email'
                                        value={values.email}
                                        placeholder='Enter EmailId'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                         <span className='flex flex-row items-center'>
                                            <LuAsterisk className='text-red-700 text-xs'/>
                                            <ErrorMessage
                                                name='phone'
                                                component={'p'}
                                                className='text-[0.7rem] text-red-500 '
                                            />
                                        </span>
                                        <input
                                        className='p-3 w-full bg-gray-100 rounded-md !text-black'
                                        type='text'
                                        name='phone'
                                        value={values.phone}
                                        placeholder='Enter Phone No'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                         <span className='flex flex-row items-center'>
                                            <LuAsterisk className='text-red-700 text-xs'/>
                                            <ErrorMessage
                                                name='address'
                                                component={'p'}
                                                className='text-[0.7rem] text-red-500 '
                                            />
                                        </span>
                                        <input
                                        className='p-3 w-full bg-gray-100 rounded-md !text-black'
                                        type='text'
                                        name='address'
                                        value={values.address}
                                        placeholder='Address ( House No, Building , Street....)'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        />
                                    </div>

                                    <section className='w-full flex flex-row gap-5'>
                                    <div >
                                         <span className='flex flex-row items-center'>
                                            <LuAsterisk className='text-red-700 text-xs'/>
                                            <ErrorMessage
                                                name='town'
                                                component={'p'}
                                                className='text-[0.7rem] text-red-500 '
                                            />
                                        </span>
                                        <input
                                        className='p-3 w-full  bg-gray-100 rounded-md !text-black'
                                        type='text'
                                        name='town'
                                        value={values.town}
                                        placeholder='Locality/Town'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        />
                                    </div>

                                    <div >
                                         <span className='flex flex-row items-center'>
                                            <LuAsterisk className='text-red-700 text-xs'/>
                                            <ErrorMessage
                                                name='pincode'
                                                component={'p'}
                                                className='text-[0.7rem] text-red-500 '
                                            />
                                        </span>
                                        <input
                                        className='p-3 w-full bg-gray-100 rounded-md !text-black'
                                        type='text'
                                        name='pincode'
                                        value={values.pincode}
                                        placeholder='pincode'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        />
                                    </div>

                                    </section>

                                    <section className='w-full flex flex-row gap-5'>
                                    <div >
                                         <span className='flex flex-row items-center'>
                                            <LuAsterisk className='text-red-700 text-xs'/>
                                            <ErrorMessage
                                                name='district'
                                                component={'p'}
                                                className='text-[0.7rem] text-red-500 '
                                            />
                                        </span>
                                        <input
                                        className='p-3 w-full  bg-gray-100 rounded-md !text-black'
                                        type='text'
                                        name='district'
                                        value={values.district}
                                        placeholder='City/District'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <input
                                        className='p-3 w-full bg-gray-100 rounded-md mt-4'
                                        type='text'
                                        name='state'
                                        value={values.state}
                                        placeholder='State'
                                        readOnly
                                        />
                                    </div>

                                    

                                    </section>

                                    <div className='flex flex-row gap-5  w-full justify-center'>
                                        <h1 className='font-bold text-sm'>Address Type</h1>
                                        <label className='flex items-center gap-1'>
                                         <input type='radio'name='addresstype' value='home' checked={values.addresstype === 'home'} onChange={handleChange}/>
                                            Home
                                        </label>

                                        <label className='flex items-center gap-1'>
                                        <input type='radio' name='addresstype' value='work' checked={values.addresstype === 'work'} onChange={handleChange}/>
                                            Work
                                        </label>
                                    </div>

                                    <button type='submit'
                                     className={`w-[70%] p-2 bg-eliteGray text-white absolute bottom-4 left-15 hover:bg-gray-700  
                                        ${dirty ? "cursor-pointer":"bg-gray-700 cursor-not-allowed"}`}>
                                        Save Address
                                    </button>

                                </Form>
                            )
                        }

                    </Formik>
                </div>
            </section>
        )
    }



        
    </div>
  )
}

export default AddAddress


function AddressCard({addressDetails,selectFn,selectedAddressId,removeFn}){
    const {addressType,name,phone,address,town,pincode,district,state,addressId} = addressDetails
    return(
        <div className='w-[95%] md:w-[90%] p-4 text-sm rounded-md shadow-[0_0_20px_rgba(75,85,99,0.3)] mt-4 mb-2 relative cursor-pointer'
        >
        <h1 className='font-bold uppercase text-xs'>{addressType}</h1>
        <div className='absolute top-2 right-2 flex gap-2'>
        {/* <h1 className='p-[2px] px-2 rounded-sm bg-gray-200'>Edit</h1> */}
        <button className='text-xl cursor-pointer'
        onClick={()=>{removeFn(addressId)}}><MdOutlineDeleteOutline/></button>
        </div>
        <div className='flex text-gray-600 gap-5 mt-2'>
        <p>{name}</p>
        <p>{phone}</p>
        </div>
        <p className='text-gray-600'>{address},</p>
        <p className='text-gray-600'>{town}</p>
        <div className='flex text-gray-600'>
        <p className='uppercase'>{district}</p>
        <p className='ml-2'>-{pincode}</p>

        <div className='absolute right-2 md:right-10 flex flex-row items-center'>
        <input type='checkbox' className=' h-[15px] w-[15px] cursor-pointer mr-2' 
        checked={selectedAddressId === addressId}
         onChange={(e) => {
        if (e.target.checked) {
            selectFn(addressDetails); // select: pass the object
        } else {
            selectFn({}); // deselect: pass empty object
        }
  }}/>
        <p className='font-bold'>Deliver Here</p>
        </div>
        </div>
    </div>
    )
}