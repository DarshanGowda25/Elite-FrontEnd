import { ErrorMessage, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { UserLoginValidation } from '../Form/FormValidation'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { getErrorMsg, serverUrl, serverUrlAPI } from '../Utils/info'
import axios from 'axios'
import Loader from '../UI_Components/Loader'
import { Eye, EyeOff } from 'lucide-react'


function UserLogin() {
  const location = useLocation();
  const navigate = useNavigate();

    const [showPassword,setShowPassword] = useState(false);
  
  
    const handlePassworModeChange =()=>{
      setShowPassword((prev)=>!prev)
    } 


  const UserSignIn = async(val) =>{
    const response = await axios.post(`${serverUrl}auth/userLogin`,val);
    return response.data;
  }

  

  const signInMutation = useMutation({
    mutationKey:['User-SignIn'],
    mutationFn:UserSignIn,
    onSuccess:(data)=>{
      localStorage.removeItem('token');
      const{token,role} = data;
      console.log(role)
      localStorage.setItem("token",token)
      setTimeout(()=>{
        if(role === "ADMIN"){
          navigate('/admin')
        }else{
        navigate('/')
        }
      },500);
    },
    onError:(error)=>{
      
      toast.error(getErrorMsg(error))
    }
  });

  


  return (
    <section className='w-full h-screen max-w-[1800px] mx-auto bg-cover bg-center  z-1 ' style={{ backgroundImage: "url('/Image/login.jpg')" }}>
      <article className='w-full h-screen flex justify-center items-center ' 
 >
        
        {/* Left Container - for small and large screens */}
        <div className="flex h-[60%] lg:h-[70%] w-[90%]  lg:w-[40%] flex-col items-center justify-center  border-l sm:border-eliteGold rounded-lg  lg:border-r-0 lg:rounded-r-none shadow-[-1px_0_10px_rgba(212,175,55,0.7)] relative
         backdrop-blur-sm"
        style={{
          background: 'linear-gradient(80deg, rgba(18, 18, 18, 0.863) 20%, rgba(0, 0, 0, 0.173) 90%)',

        }}>
          
          {/* Back to Elite - Only on small screens */}
          <article className="absolute top-[30px] w-full h-fit flex lg:hidden justify-center items-center">
            <span className="text-3xl text-eliteGold">Back To Elite</span>
          </article>
          



          <Formik
          initialValues={{email:"",password:""}}
          validationSchema={UserLoginValidation}
          onSubmit={(val)=>{
            signInMutation.mutate(val);
          }}
          >

          
            {({
                handleBlur,
                handleChange,
                values,
                isValid
            })=>(
                <Form className='white-autofill'>
                   <h2 className="text-2xl text-center text-eliteGold mb-5 mt-10">LOG IN</h2>
                   
                  <div className='w-full flex flex-col justify-center items-center mt-5'>
                    <input
                    className='text-[white] border border-gray-300 rounded-lg p-2 w-[220px] sm:w-[400px] text-[0.9rem] placeholder:text-[0.9rem]'
                    type='text'
                    name='email'
                    placeholder='email'
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

                  <div className='w-full flex flex-col justify-center items-center mt-5'>
                    <input
                    className='text-[white] border border-gray-300 rounded-lg p-2 w-[220px] sm:w-[400px] text-[0.9rem] placeholder:text-[0.9rem] bg-transparent
                    focus:outline-none focus:bg-transparent autofill:bg-transparent'
                    type={showPassword?"text":"password"}
                    name='password'
                    placeholder='password'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    
                    />

                    {
                      !showPassword ?  <Eye className="relative text-gray-300 bottom-[25px] left-[180px] w-4 h-4 cursor-pointer" onClick={handlePassworModeChange} /> :  <EyeOff className="relative  text-gray-300 bottom-[25px] left-[180px] w-4 h-4 cursor-pointer" onClick={handlePassworModeChange} />
                    }
                    
                    <ErrorMessage
                    name='password'
                    className='text-[0.7rem] text-red-500 mt-1'
                    component={'p'}
                    />
                    

                  </div>


                  <div className='w-full flex  flex-col justify-center items-center mt-6'>
                  <Link to="/forgotPassword">
                    <p className="text-sm text-eliteGold underline-offset-4 hover:underline hover:text-white transition-all duration-200 sm:relative  sm:right-[140px]">
                      Forgot password!
                    </p>
                  </Link>
                    <button
                    type='submit'
                    className='bg-eliteGold p-2 hover:p-2 w-[220px] sm:w-[400px] text-black rounded-xl text-[0.9rem] mt-2 border-1 border-eliteGold cursor-pointer
                     hover:bg-transparent hover:text-eliteGold   hover:border-eliteGold hover:shadow-[0_0_12px_rgba(212,175,55,0.5)] transition-all duration-200'
                   
                    >
                      Login {signInMutation.isPending && <Loader/>}

                    </button>

                    
                    <p className={`text-sm text-eliteGold underline-offset-4   sm:relative  sm:left-[100px]
                      ${location.pathname === '/adminLogin' ? "hidden" : "flex"}`}>
                      Don't have account? <Link to="/signUp"><b className='hover:underline hover:text-white transition-all duration-200'> SignUp</b></Link> 
                    </p>
                  
                   
                  </div>

                </Form>
            )}
          </Formik>

        </div>

        {/* Right Container - visible only on large screens */}

        <div className='hidden lg:flex h-[70%] min-w-[26%] rounded-r-lg flex-col items-center justify-center bg-[rgb(26,26,26)] relative'>
          <article className='w-[150px] h-[150px] flex justify-center absolute top-[30px]'>
            <img src="/Image/logo.png" className='h-full w-full'/>
          </article>
          <h1 className='text-eliteGold font-mono text-4xl font-semibold'>Welcome Back</h1>
          <h1 className='text-eliteGold font-mono text-4xl font-semibold'>To Elite</h1>
          <h1 className='text-white font-mono text-xl font-medium'>Time To Crush Those Goals!</h1>
        </div>

      </article>
    </section>
  )
}

export default UserLogin
