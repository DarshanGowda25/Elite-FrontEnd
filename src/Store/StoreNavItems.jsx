import { AutoComplete, ConfigProvider } from 'antd';
import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { FaOpencart } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from '../Utils/axioInstance'
import { serverUrlAPI } from '../Utils/info';
import { Spin } from 'antd';
import toast from 'react-hot-toast';


function StoreNavItems() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token')


  const [searchText, setSearchText] = useState('');
  const [debounceSearch] = useDebounce(searchText,500);

  const fetchSuggestion = async () =>{
    const response = await axiosInstance(`${serverUrlAPI}product/suggestions?filter=${debounceSearch}`) 
    return response.data

  }

  const {data:suggestions , isLoading,isFetching} = useQuery({
    queryKey:["suggestion",debounceSearch],
    queryFn:fetchSuggestion,
    staleTime:Infinity,
    enabled: debounceSearch.trim().length > 0

  })
  


  

  

  const[openCategory,setOpenCategory] = useState(false);
  return (
    <section className='fixed h-[70px] top-[80px] md:top-0 left-0 z-50 w-full m-0 '>
      <nav className='h-full w-full bg-gray-200 flex flex-row items-center justify-items-start gap-6 md:gap-70 relative '>

        <ul className='h-[40px] bg-eliteGray text-white font-bold place-content-center px-4 ml-2 md:ml-5 rounded-sm shadow-[0px_0px_6px_black]
        !cursor-pointer hover:shadow-[0px_0px_9px_black] '
        onMouseOver={()=>{setOpenCategory(true)}}
        
        >
          <li className='flex items-center cursor-pointer'> <GiHamburgerMenu className='md:mr-5'/><p className='hidden md:flex'>All Categories</p></li>
        </ul>
        
        <div className=' w-[290px] md:w-[800px] flex  items-center gap-2 md:gap-20'>
   
          <Link to="/" className='hidden md:flex font-bold text-eliteGray text-lg '>Home</Link>
    

        <ConfigProvider
        theme={{
          components:{
            Select:{
              activeBorderColor: "transparent",
              activeOutlineColor:"transparent",
              hoverBorderColor:"transparent",
              colorBorder:"transparent",
              borderRadius:"20px"
            }
          }
        }}
        >
          <AutoComplete className=' w-[80%]'
          style={{ height: '40px' }}
          placeholder="Type here"
          options={(suggestions || []).map(option => ({ value: option }))}
          notFoundContent={
            isFetching || isLoading
              ?<Spin size="small" />
              : suggestions?.length === 0 && debounceSearch !== ""
              ? "No result"
              : null
          }
          value={searchText}
          onChange={(value)=>{setSearchText(value)}}
          onSelect={(value) => {
            const query = value.trim().toLowerCase().replace(/\s+/g, '-');
            navigate(`category?category=${query}`);
          }}
          onKeyDown={(e)=>{
            if(e.key === 'Enter'){
              const query = value.trim().toLowerCase().replace(/\s+/g, '-');
            navigate(`category?category=${query}`);
            }
          }}
     
          />
        </ConfigProvider>

        <ul className='h-[40px] flex items-center gap-2 md:gap-6'>
         
          <li className='h-[38px] w-[40px] place-content-center  bg-eliteGray text-white font-bold rounded-sm shadow-[0px_0px_6px_black] cursor-pointer hover:shadow-[0px_0px_9px_black]'
          onClick={()=>{
            if(!token){
              toast.error("Please Login")
              setTimeout(() => {
                navigate('/signIn')
              }, 600);
              
            }else{
              navigate('/store/cart')
            }
          }}> 
          <FaOpencart className='h-[90%] w-[90%] p-2 mx-auto '/></li>
          <li className='px-3 py-1 h-[38px] w-[80px] place-content-center text-center bg-eliteGray text-white font-bold rounded-sm shadow-[0px_0px_6px_black] cursor-pointer hover:shadow-[0px_0px_9px_black]'
          onClick={()=>{
            if(!token){
              toast.error("Please Login")
              setTimeout(() => {
                navigate('/signIn')
              }, 600);
              
            }else{
              navigate('/store/orders')
            }
          }}>
          Orders</li>
        </ul>

        </div>

        {
            openCategory&&<section className='h-screen w-screen fixed z-[999] top-0 left-0 '
            onClick={()=>{setOpenCategory(false)}}
            >
              <div className='h-[150px] w-[335px] md:w-[450px] bg-white shadow-2xl text-eliteGray absolute top-37 md:top-18 left-2 md:left-5 cursor-pointer rounded-xl overflow-hidden 
              flex items-center justify-evenly transition-all duration-200'
              onClick={(e)=>e.stopPropagation()}
              onMouseLeave={()=>{setOpenCategory(false)}}
              >
                <Link to="category?category=wheyprotein" className='flex flex-col items-center'
                >
                  <img src='/Image/StoreCategory1.png' className='h-[50px] w-[50px] rounded-full hover:shadow-[0px_0px_5px_black]
                  transition-all duration-300'></img>
                  <p className='text-xs text-center mt-2 font-bold'>Whey Protein</p>
                  </Link> 

                <Link to="category?category=prepostworkout" className='flex flex-col items-center'>
                  <img src='/Image/StoreCategory2.png' className='h-[50px] w-[50px] rounded-full hover:shadow-[0px_0px_5px_black]
                  transition-all duration-300'></img>
                  <p className='text-xs text-center mt-2 font-bold'>Pre/Post Workout</p>
                  </Link>

                <Link to="category?category=fitfood" className=' flex flex-col items-center'>
                  <img src='/Image/StoreCategory3.png' className='h-[50px] w-[50px] rounded-full hover:shadow-[0px_0px_5px_black]
                  transition-all duration-300'></img>
                  <p className='text-xs text-center mt-2 font-bold'>Fit Food</p>
                </Link> 

              </div>
              
            </section>
        }

        
        
        

      </nav>

    </section>
  )
}

export default StoreNavItems