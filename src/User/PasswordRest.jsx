import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { getErrorMsg, serverUrlAPI } from '../Utils/info';
import axios from 'axios';
import { axiosInstance } from '../Utils/axioInstance';
import CustomLoader from '../UI_Components/CustomLoader';

function PasswordRest() {

  const queryClient = useQueryClient();

  const user = queryClient.getQueryData('userProfile');
  if (!user) return <CustomLoader/>;
  const {email} = user;

  const [formData,setFormData] = useState({
    email:email,
    oldPassword:"",
    newPassword:"",
    conPassword:""
  })

  const handleChange = (e)=>{
    const name = e.target.name;
    const value = e.target.value;

    setFormData({...formData,[name]:value});
  }

  const restFunction = async (val)=>{
    const response = await axiosInstance.patch(`${serverUrlAPI}user/reset`,val)
    return response.data;
  }

  const passwordRestMutation = useMutation({
    mutationKey:['passwordRest'],
    mutationFn:restFunction,
    onSuccess:(data)=>{
      toast.success(data.status)
      formData.oldPassword=""
      formData.newPassword=""
      formData.conPassword=""
    },
    onError:(error)=>{
      toast.error(getErrorMsg(error))
    }
  })

  return (
    <div className='h-full w-full place-content-center'>

      <div className='h-auto w-[40%] mx-auto shadow-2xl p-10'>
        <form className='h-full w-full flex flex-col items-center gap-4 pt-5'
        onSubmit={(e)=>{
          e.preventDefault()
          if(formData.newPassword!==formData.conPassword){
            toast.error('Password do not match');
            return;
          }
          passwordRestMutation.mutate(formData);
        }}>

          <input
           type='text'
           name='email'
           value={formData.email}
           readOnly
           className='p-2 w-[80%]  border-b-1 border-black cursor-not-allowed'

          />
          <input
          type='password'
          name='oldPassword'
          value={formData.oldPassword}
          onChange={handleChange}
          placeholder='Old password'
           className='p-2 w-[80%]  border-b-1 border-black'
           required
          />
          <input
          type='password'
          name='newPassword'
          value={formData.newPassword}
          onChange={handleChange}
          placeholder='New password '
           className='p-2 w-[80%]  border-b-1 border-black'
           required
          />
          <input
          type='text'
          name='conPassword'
          value={formData.conPassword}
          onChange={handleChange}
          placeholder='Confirm password'
           className='p-2 w-[80%] border-b-1 border-black'
           required
          />

          <button type='submit' className='p-2 w-[100px] bg-eliteGold hover:shadow-[0px_0px_10px_black] mt-5 rounded-md cursor-pointer'>Submit</button>


        </form>

      </div>
    </div>
  )
}

export default PasswordRest