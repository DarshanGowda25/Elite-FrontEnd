import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import Loader from '../UI_Components/Loader';
import { getErrorMsg, serverUrl } from '../Utils/info';
import toast from 'react-hot-toast';
import axios from 'axios';
import { TiTick } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {

    const navigate = useNavigate();

    const[email,setEmail]= useState("");
    const[otp,setOTP]= useState("");
    const[token,setToken] = useState();
    const[newPassword,setNewPassword] = useState("");

    const getOTPFn = async()=>{
        const response = await axios.post(`${serverUrl}auth/forgotPassword`,{
            email,
        })
    return response.data;
    }

    const verfyOTPFn = async()=>{
        const response = await axios.post(`${serverUrl}auth/verifyOtp`,{
            email,
            otp
        });
    return response.data;
    }

    const restPasswordFn = async()=>{
        const response = await axios.post(`${serverUrl}auth/newPassword`,{
            email,
            token,
            newPassword
        });
    return response.data;

    }

    const restPassword = useMutation({
        mutationKey:["restPassword"],
        mutationFn: restPasswordFn,
        onSuccess:(data)=>{
            toast.success(data);
            setTimeout(() => {
                navigate("/signIn")
            }, 1500);
        },
        onError:(error)=>{
            toast.error(getErrorMsg(error))
        }

    })


    const optVerification = useMutation({
        mutationKey:["optVerification"],
        mutationFn: verfyOTPFn,
        onSuccess:(data)=>{
            setToken(data.Token)
        },
        onError:(error)=>{
            toast.error(getErrorMsg(error))
        }

    })

    const getOTP = useMutation({
        mutationKey:["getOTP"],
        mutationFn: getOTPFn,
        onSuccess:(data)=>{
            toast.success(data)
        },
        onError:(error)=>{
            toast.error(getErrorMsg(error))
        }

    })

  return (
    <section className='w-full h-screen max-w-[1800px] mx-auto bg-cover bg-center flex justify-center items-center z-1 ' style={{ backgroundImage: "url('/Image/login.jpg')" }}>
      
         <div className="flex h-[60%] lg:h-[70%] w-[90%]  lg:w-[40%] flex-col items-center justify-center 
        rounded-lg  shadow-[-1px_0_10px_rgba(212,175,55,0.7)] relative backdrop-blur-sm backdrop-brightness-60"
       >
        <form className='h-full w-full flex flex-col items-center py-10 white-autofill'
        onSubmit={(e)=>{
            e.preventDefault();
            restPassword.mutate();
        }}>
            <h1 className='text-2xl text-eliteGold md:mb-15 mb-10'>Reset Password</h1>


            <label className='text-lg text-eliteGold mb-5'>Enter Your Registered Email</label>
            <input type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={
                (e)=>{
                    if(e.key === "Enter"){
                        e.preventDefault();
                        getOTP.mutate();
                    }
                }
            }
            className='md:w-[40%] w-[70%] bg-transparent outline-none border-b-1 border-gray-600 text-white'
            required
            />

            <div className='md:w-[40%] w-[70% flex items-center justify-start md:gap-5 gap-3 relative'>
            <input type='text'
            name='otp'
            value={otp}
            onChange={(e)=>setOTP(e.target.value)}
            className='md:w-[26%] w-[26%] bg-transparent outline-none border-b-1 border-gray-600 text-white mt-6'
            />
            {
                token && (
                    <TiTick className='text-green-800 text-3xl mt-4'/>
                )
            }
            <button className={`w-[40%] flex justify-evenly items-center p-1 rounded-md mt-5 cursor-pointer absolute right-0 
            ${token ? "bg-eliteGold text-white" : "bg-transparent border-1 border-eliteGold text-eliteGold "}`}
            onClick={(e) => {
                e.preventDefault(); 
                optVerification.mutate();
            }}>
                {token ? "Verified":"Verify OTP"}{optVerification.isPending && <Loader/>}
            </button>
            </div>
            <div className='md:w-[40%] w-[70%] flex items-center justify-evenly gap-5 relative'>
                <p className='text-eliteGold flex items-center gap-2 hover:text-amber-300 cursor-pointer absolute left-0 top-1'
                onClick={
                    (e)=>{
                        e.preventDefault();
                        setOTP("")
                        setToken(null)
                        getOTP.mutate();
                    }
                }>
                    resend OTP {getOTP.isPending && <Loader />}</p>

            </div>


            {token && (
                <div className='mt-5 md:w-[40%] w-[70%]'>
                <input
                    type='password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder='Enter New Password'
                    className='w-full bg-transparent outline-none border-b-1 border-gray-600 text-white mt-8'
                />

                <button type='submit' className='w-full mt-4 flex justify-center items-center bg-transparent border-1 border-eliteGold text-eliteGold p-2  rounded-md cursor-pointer'>
                    Rest Password {restPassword.isPending && <Loader/>}
                </button>
            </div>
            )}

            

             
        </form>
       </div>

        
    </section>
  )
}

export default ForgotPassword