import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { getErrorMsg, serverUrlAPI } from '../Utils/info';
import { axiosInstance } from '../Utils/axioInstance';
import CustomLoader from '../UI_Components/CustomLoader';


function BookAppointment() {

    
    const location = useLocation()
    const consult_type = location.state?.title;
    console.log(consult_type)

    // ?. is your safety net.
    // It avoids crashes when optional data might not be there.
    //If location.state is undefined (which can happen if you visit the page directly), it will not throw an error — it just returns undefined

    //without ?
    // if  location.state was undefined, it would crash with:
    //❌ Cannot read properties of undefined (reading 'title')[error]

    const bookFunction = async (val) =>{
      console.log(val)
        const res = await axiosInstance.post(`${serverUrlAPI}consultancy/book`,val)
        return res.data
    }

    const queryClient = useQueryClient();
    const user = queryClient.getQueryData('userProfile');
    if (localStorage.getItem('token') && !user) {
        return <CustomLoader/>;
      }
      
    const {user_id,name} = user ?? {};


    const bookMutation = useMutation({
        mutationKey:'bookAppointment',
        mutationFn:bookFunction,
        onSuccess:(data)=>{
            toast.success(data.status)
            setFormData({
                age: "",
                height: 0,
                weight: 0,
                date:"",
                consult_type:consult_type,
                userId:user_id
            })

        },
        onError:(error)=>{
            toast.error(getErrorMsg(error))
        }
    })


  const [formData, setFormData] = useState({
    age: "",
    height: 0,
    weight: 0,
    date:"",
    consult_type:consult_type,
    userId:user_id
    
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if(name==='phone'){
        const phoneNo = value.replace(/\D/g,"");
        setFormData({...formData,[name]:phoneNo});
    }else{
    setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className='w-full h-screen max-w-[1800px] mx-auto relative bg-center bg-cover'
    style={{backgroundImage:"url('Image/BookAppointment.jpg')"}}
    >
        
      <div className='h-auto w-[330px] md:w-[550px] shadow-2xl absolute right-5 md:right-10 top-[120px] bg-white text-black p-6 rounded-xl'>
        <h1 className='text-center font-bold'>Book Appointment</h1>

        <form className='h-[400px] w-full flex flex-col items-center gap-4 text-black overflow-y-auto scrollbar-hidden'
        onSubmit={(e)=>{
            e.preventDefault()
            const token = localStorage.getItem('token');
            if(token){
              bookMutation.mutate(formData);
            }else{
              navigate('/signIn');
        }
        }}
        >

          <input type='text' 
          name='name' value={name} 
          readOnly  
          className='p-1 md:p-2 w-[95%] md:w-[80%] rounded border-b-1 border-eliteBlack' placeholder='Name' 
          required
          />

          
          
          <input type='number' 
          name='age' value={formData.age} onChange={handleChange} 
          className='p-1 md:p-2 w-[95%] md:w-[80%] rounded border-b-1 border-eliteBlack' placeholder='Age' 
          min='10'
          required/>

          <input type='number'
           name='height' value={formData.height} onChange={handleChange} 
          className='p-1 md:p-2 w-[95%] md:w-[80%] rounded border-b-1 border-eliteBlack' placeholder='height in cm' 
          min='0'
          required/>

          <input type='number' 
          name='weight' value={formData.weight} onChange={handleChange} 
          className='p-1 md:p-2 w-[95%] md:w-[80%] rounded border-b-1 border-eliteBlack' placeholder='weight in kg' 
          min='0'
          required/>

          <input type='date'
          name='date'
          value={formData.date}
          min={new Date().toISOString().split('T')[0]}
          onChange={handleChange}
          required
          className='p-1 md:p-2 w-[95%] md:w-[80%] rounded border-b-1 border-eliteBlack'
          />

          <select
            name='consult_type'
            value={formData.consult_type}
            onChange={handleChange}
            className='p-1 md:p-2 w-[95%] md:w-[80%] rounded border-b-1 border-eliteBlack outline-none'
            required
          >
                <option value={consult_type}>{consult_type}</option>
          </select>

            <button type='submit' className='bg-eliteGold p-2 px-6 text-white hover:shadow-[0px_0px_10px_black] rounded-xl 
            mt-2 md:mt-3 mb-1 cursor-pointer'>
                Book
            </button>


        </form>
      </div>
    </div>
  );
}

export default BookAppointment;
