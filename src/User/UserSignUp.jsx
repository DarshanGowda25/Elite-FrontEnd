import { ErrorMessage, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserLoginValidation, UserSignUpValidation } from '../Form/FormValidation'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { getErrorMsg, serverUrl, serverUrlAPI } from '../Utils/info'
import axios from 'axios'
import Loader from '../UI_Components/Loader'
import { Eye, EyeOff, User } from 'lucide-react'

function UserSignUp() {



    const navigate = useNavigate();

    const userSignUp = async(val)=>{
        const response = await axios.post(`${serverUrl}auth/userRegister`,val);
         return response.data;
    }

    const signUpMutation = useMutation({
        mutationKey:['user-signUp'],
        mutationFn:userSignUp,
        onSuccess:(data)=>{
          toast.success('Sign-up successful!');
            console.log(data.success)
            setTimeout(()=>{
                navigate('/signIn');

            },500)
        },
        onError:(error)=>{
          const msg = getErrorMsg(error)
          toast.error(msg)
          }

    })


  return (
<section className='w-full h-screen max-w-[1800px] mx-auto bg-center bg-cover' style={{ backgroundImage: "url('/Image/login.jpg')" }}>
  <article className='w-full h-full flex justify-center items-center'>

  <div className='h-[82%] w-full flex justify-center items-center mt-[80px] overflow-auto '>
    <div className='hidden xl:flex h-full min-w-[26%] flex-col items-center justify-center bg-eliteBlack rounded-l-lg relative z-10 '>
        <article className='w-[150px] h-[150px] flex justify-center absolute top-[30px]'>
            <img src="/Image/logo.png" className='h-full w-full'/>
        </article>

        <h1 className='text-eliteGold font-mono text-4xl font-semibold'>Join us</h1>
        <h1 className='text-white font-mono text-xl font-medium'>Become The Stronger You</h1>
    </div>


    <div className='h-[85%] xl:h-full w-[90%] lg:w-[40%] flex-col items-center justify-center border-l border-eliteGold lg:border-l-0 lg:border-r rounded-lg lg:rounded-l-none shadow-[4px_0_10px_rgba(212,175,55,0.7)]
 relative backdrop-blur-sm overflow-auto scrollbar-hidden '
    style={{
        background: 'linear-gradient(120deg, rgba(18, 18, 18, 0.863) 20%, rgba(0, 0, 0, 0.173) 90%)',

      }}>

         <article className="absolute top-[30px] w-full h-fit flex xl:hidden justify-center items-center ">
            <span className="text-3xl text-eliteGold ">Join Elite</span>
          </article>

          <Formik
          initialValues={{name:"",email:"",phone:"",DOB:"",gender:"",address:"",password:"",Cpassword:"", role:"user"}}
          validationSchema={UserSignUpValidation}
          onSubmit={(val)=>{
            signUpMutation.mutate(val);
          }}
          >

          {(
            {
                handleBlur,
                handleChange,
                values,
                isValid
            }
          )=>(
           <Form className='mt-25 lg:mt-0 white-autofill'>
            <h2 className='text-2xl text-eliteGold text-center mb-3 mt-5 '><b>Sign Up</b></h2>
            <div className='w-full flex flex-col items-center justify-center mt-3'>
            
            
                <input
                type='text'
                name='name'
                placeholder='Name'
                className='text-white border border-gray-300 rounded-lg p-2 w-[220px] sm:w-[400px] text-[0.9rem] placeholder:text-[0.9rem]'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                />

                <ErrorMessage
                name='name'
                className='text-[0.7rem] text-red-500 mt-1'
                component={'p'}
                />
              

            </div>

            <div className='w-full flex flex-col items-center justify-center mt-3'>
                <input
                type='email'
                name='email'
                placeholder='Email Id'
                className='text-white border border-gray-300 rounded-lg p-2 w-[220px] sm:w-[400px] text-[0.9rem] placeholder:text-[0.9rem]'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                />

                <ErrorMessage
                name='email'
                className='text-[0.7rem] text-red-500 mt-1'
                component={'p'}
                />
              

            </div>

            <div className='w-full flex flex-col items-center justify-center mt-3'>
                <input
                type='text'
                name='phone'
                placeholder='Phone no'
                className='text-white border border-gray-300 rounded-lg p-2 w-[220px] sm:w-[400px] text-[0.9rem] placeholder:text-[0.9rem]'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                />

                <ErrorMessage
                name='phone'
                className='text-[0.7rem] text-red-500 mt-1'
                component={'p'}
                />
              

            </div>

            <div className='w-full flex flex-col items-center justify-center mt-3'>
              <select
                name='gender'
                className=' border text-white border-gray-300 rounded-lg p-2 w-[220px] sm:w-[400px] text-[0.9rem] bg-transparent focus:outline-none focus:ring-1 focus:ring-eliteGold'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.gender}
              >
                <option value="" className='bg-eliteBlack text-eliteGold'>Select Gender</option>
                <option value="Male" className='bg-eliteBlack text-eliteGold'>Male</option>
                <option value="Female" className='bg-eliteBlack text-eliteGold'>Female</option>
                <option value="Other" className='bg-eliteBlack text-eliteGold'>Other</option>
                <option value="Prefer not to say" className='bg-eliteBlack text-eliteGold'>Prefer not to say</option>
              </select>

              <ErrorMessage
                name='gender'
                className='text-[0.7rem] text-red-500 mt-1'
                component={'p'}
              />
            </div>

            <div className='w-full flex flex-col items-center justify-center mt-3'>
                <input
                type='date'
                name='DOB'
                className='text-white border border-gray-300 rounded-lg p-2 w-[220px] sm:w-[400px] text-[0.9rem] placeholder:text-[0.9rem]'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.DOB}
                />

                <ErrorMessage
                name='DOB'
                className='text-[0.7rem] text-red-500 mt-1'
                component={'p'}
                />
              

            </div>

            <div className='w-full flex flex-col items-center justify-center mt-3'>
                <input
                type='text'
                name='address'
                placeholder='Address'
                className='text-white border border-gray-300 rounded-lg p-2 w-[220px] sm:w-[400px] text-[0.9rem] placeholder:text-[0.9rem]'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                />

                <ErrorMessage
                name='address'
                className='text-[0.7rem] text-red-500 mt-1'
                component={'p'}
                />
              

            </div>

            <div className='w-full flex flex-col items-center justify-center mt-3 '>

                <input
                type="password"
                name='password'
                placeholder='Password'
                className='text-white border border-gray-300 rounded-lg p-2 w-[220px] sm:w-[400px] text-[0.9rem] placeholder:text-[0.9rem]'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                />



                <ErrorMessage
                name='password'
                className='text-[0.7rem] text-red-500 mt-1'
                component={'p'}
                />
              

            </div>

            <div className='w-full flex flex-col items-center justify-center mt-3'>
                <input
                type='text'
                name='Cpassword'
                placeholder='Confirm password'
                className='text-white border border-gray-300 rounded-lg p-2 w-[220px] sm:w-[400px] text-[0.9rem] placeholder:text-[0.9rem]'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Cpassword}
                />

                {
                  (values.password!=="" && values.password === values.Cpassword) && <p className="text-[0.7rem] text-green-500">Password Matched</p>
                }

                <ErrorMessage
                name='Cpassword'
                className='text-[0.7rem] text-red-500 mt-1'
                component={'p'}
                />
              

            </div>

            <div className='w-full flex  flex-col justify-center items-center mt-6 mb-6'>
                  
                    <button
                    type='submit'
                    className='bg-eliteGold p-2 hover:p-2 w-[220px] sm:w-[400px] text-black rounded-xl text-[0.9rem] mt-2 border-1 border-eliteGold
                     hover:bg-transparent hover:text-eliteGold   hover:border-eliteGold hover:shadow-[0_0_12px_rgba(212,175,55,0.5)] transition-all duration-200'
                   
                    >
                      SignUp {signUpMutation.isPending && <Loader/>}

                    </button>

                    
                    <p className="text-sm text-eliteGold underline-offset-4   sm:relative  sm:left-[100px]">
                      Already have account? <Link to="/signIn"><b className='hover:underline hover:text-white transition-all duration-200'> SignIn</b></Link> 
                    </p>
                  
                   
               </div>






           </Form>
          )}

    </Formik>

    </div>
    </div>

  </article>
</section>

  )
}

export default UserSignUp