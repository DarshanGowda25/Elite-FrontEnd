import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import { LuUser } from "react-icons/lu";
import { getErrorMsg, serverUrl, serverUrlAPI } from '../Utils/info';
import toast from 'react-hot-toast';
import { axiosInstance } from '../Utils/axioInstance';
import CustomLoader from '../UI_Components/CustomLoader';




function UserProfile() {
  const queryClient = useQueryClient()
  

  const user = queryClient.getQueryData('userProfile');

  const refectProfile = async () => {
 
   await queryClient.refetchQueries('userProfile');
    
    
  };
  
  if (!user) return <CustomLoader/>;

  const { user_id, name, email, phone, DOB, gender } = user;

const[formData,setFormData] = useState({
    user_id:user_id,
    name:name,
    email:email,
    phone:phone,
    DOB:DOB,
    gender:gender
  })

 


const updateFunction = async (val) =>{

  const response = await axiosInstance.patch(`${serverUrlAPI}user/update`,val)
  return response.data;
}



const updateMutation = useMutation({
  mutationKey:['profileUpdate'],
  mutationFn:updateFunction,
  onSuccess: async (data) => {
    await refectProfile();
  
    toast.success(data.status);
  },
  onError:(error)=>{
    toast.error(getErrorMsg(error))
  }
})


  

  const handleChange = (e) =>{

    const name = e.target.name;
    const value = e.target.value;

    setFormData({...formData,[name]:value})

    
  }

  const isDataUnchanged = Object.keys(formData).every(
    (key) => formData[key] === user[key]
  );
    
  return(
    <div className='h-full w-full z-20 overflow-x-hidden overflow-y-auto scrollbar-hidden'>

      <div className='w-[150px] h-[150px]  bg-white flex items-center mx-auto md:mt-[60px] rounded-full'>
        <LuUser className='text-8xl mx-auto'/>
      </div>
      
      <div className='w-full h-[70%] relative px-8 md:px-25 '>
        <h1 className='absolute text-2xl uppercase  mt-10 font-semibold'>Profile</h1>

      <form className='h-auto w-[500px] md:w-[1000px] absolute top-[100px] flex flex-wrap  gap-x-40 gap-y-5'
      onSubmit={(e) => {
        e.preventDefault(); // prevent default form submit behavior
        updateMutation.mutate(formData);
      }}>

        <div className='w-[300px] md:w-[400px] flex flex-col justify-center'>
          
          <label className='text-xs text-gray-700 uppercase'>Name</label>
          <input type='text' className='outline-none border-b-1 border-gray-600 p-1' placeholder='Enter Your name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          />
        </div>

        <div className='w-[300px] md:w-[400px] flex flex-col'>
          <label className='text-xs text-gray-700 uppercase'>Phone</label>
          <input type='text' className='outline-none border-b-1 border-gray-600 p-1' placeholder='Enter your phone'
          name='phone'
          value={formData.phone}
          onChange={handleChange}
          />
        </div>

        <div className='w-[300px] md:w-[400px] flex flex-col'>
          <label className='text-xs text-gray-700 uppercase'>Email</label>
          <input type='text' className='outline-none border-b-1 border-gray-600 p-1 cursor-not-allowed' placeholder='Enter your email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          readOnly
          />
        </div>

        <div className='w-[300px] md:w-[400px] flex flex-col'>
          <label className='text-xs text-gray-700 uppercase'>Gender</label>
          <input
          type='text'
          name='gender'
          value={formData.gender}
          readOnly
          className='outline-none border-b-1 border-gray-600 p-1 cursor-not-allowed'/>
        
        </div>

        <div className='w-[300px] md:w-[400px] flex flex-col'>
        <label className='text-xs text-gray-700 uppercase'>Date</label>
          < input
          type='text'
          name='DOB'
          value={formData.DOB}
          onChange={handleChange}
          className='outline-none border-b-1 border-gray-600 p-1 cursor-not-allowed'
          />
        </div>
        
        <input type='hidden'  name='user_id' value={formData.user_id} />


        <button type='submit' disabled={isDataUnchanged}
        className={`bg-eliteGold mt-5 ml-20 mb-20 md:ml-50 p-3 w-[150px] rounded-2xl text-white hover:shadow-2xl
        ${isDataUnchanged ? "cursor-not-allowed" : "cursor-pointer hover:shadow-xl"}
        `}
      >
  Save
</button>


      </form>

      </div>

    </div>
  )
}

export default UserProfile