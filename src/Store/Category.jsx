import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { FiFilter } from "react-icons/fi";
import { MdPlaylistRemove } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import { IoStar } from "react-icons/io5";
import { QueryClient, QueryClientProvider, useInfiniteQuery } from '@tanstack/react-query';
import { Infinity } from 'lucide-react';
import { axiosInstance } from '../Utils/axioInstance'
import { serverUrl } from '../Utils/info';
import Error from '../UI_Components/Error';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ClipLoader } from "react-spinners";
import ContentLoader from '../UI_Components/ContentLoader';



export default function Category() {

  const PAGE_LIMIT = 10;

  const CATEGORY_FILTER = [
    { label: "Whey Protien", key: "wheyprotein" },
    { label: "Pre/Post Workouts", key: "prepostworkout" },
    { label: "Fit Foods", key: "fitfoods" },
   
  ];

  const RATING_FILTER = [
    { label: "5 Star", key: 5 },
    { label: "4 Star & Above", key: 4 },
    { label: "3 Star & Above", key: 3 },
  ];

  const PRICE_FILTER = [
    { label: "₹200- ₹400", key: "200-400" },
    { label: "₹400 - ₹900", key: "400-900" },
    { label: "₹900 - ₹1500", key: "900-1500" },
    { label: "₹1500 & Above", key: "1500-infinity" },
  ];

  const[openMobileFilter ,setMobileFilter] = useState(false)

  
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
 

  const handleFilter = (data) => {

    const params = new URLSearchParams(searchParams.toString());
    //URLSearchParams is a built-in JavaScript class that makes it easy to read, modify, and build URL query strings
    //eg:params = new URLSearchParams("category=wheyprotein&price=500-1000")
    if (params.get(data.type) === String(data.value)) {
      params.delete(data.type);
    } else {
      params.set(data.type, data.value);
    }
    //now params = category=wheyprotein&price=500-1000&rating=4
    // If "rating" already existed, it would replace its value.
  
    navigate("?" + params.toString());
    setMobileFilter(false); // close mobile filter after selection
  };


  const fetchProducts =async ({pageParam=1}) =>{
  
    
    const response = await axiosInstance.get(serverUrl+'api/product/getAll',{
      params:{
        page: pageParam,
        limit:PAGE_LIMIT,
        category:searchParams.get('category'),
        price:searchParams.get('price'),
        rating:searchParams.get('rating')
      },
    });
    console.log(response.data)
    const data = {...response.data,prevParam:pageParam};
    console.log('Fetching page:', pageParam);
    console.log('Response data:', response.data);

    return data;

  }

  const{
    data : productData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading : productDataLoading,
  
   } = useInfiniteQuery({
    queryKey:["products",
      searchParams.get('category'),
      searchParams.get('price'),
      searchParams.get('rating')
    ],
    queryFn:fetchProducts,
    staleTime:Infinity,
    getNextPageParam: (lastPage) => {
      const prevPage = lastPage.prevParam;
      if (prevPage === lastPage.totalPages) {
        return undefined;
      }
      return prevPage + 1;
    },
    refetchOnWindowFocus: false,
   });

  const productContent = productData?.pages?.reduce((result, page) => {
    return [...result, ...page?.content];
  }, []);



  
  
  return (

    <div  className='max-w-screen h-screen lg:max-w-[1800px] overflow-x-hidden overflow-y-auto scrollbar-hidden  scroll-smooth flex '>

      <span className={` fixed top-40 left-6 flex z-5 ${openMobileFilter?"hidden":"flex md:hidden"} `}
      >Filter <FaFilter className='mt-[6px] ml-2   text-eliteGray'
      onClick={() => setMobileFilter(true)}
      /></span>

      <div className={`w-[175px] md:w-[20%] h-[600px] flex flex-col px-3  md:px-15 font-semibold !overflow-hidden fixed
      top-29 md:top-[70px]  left-0 z-20 shadow-2xl md:shadow-none bg-white
      ${openMobileFilter?"flex":"hidden md:flex"}
      `}>

           
            <span className='md:hidden absolute top-10 right-0  p-2'>
            <MdPlaylistRemove className='text-2xl' onClick={() => setMobileFilter(false)} /></span>

          <div className='flex'>
            <h1 className='mt-[80px] flex ml-10 md:ml-2  '>Filter <FiFilter className='mt-[6px] ml-2 '/></h1>
            <h1 className='mt-[100px] md:mt-[85px] flex  md:ml-10 text-xs  text-white p-1 px-2
             bg-eliteGray rounded-2xl cursor-pointer hover:shadow-[0px_0px_10px_black]
            '
            onClick={() => {
              navigate(window.location.pathname); // removes all query params
              setCategorySelect(false); // reset toggle state if needed
            }}>Clear All</h1>
          </div>

            {/* category filter */}
            <div className='h-auto w-[150px] md:w-[200px] py-4 border-b-1 border-gray-300 mt-0 md:mt-5'>
              <h1>Category</h1>
              <div className='w-full mt-6 text-[8px] flex flex-wrap gap-1 md:gap-2 '>
              {CATEGORY_FILTER.map((category,idx)=>(
                <span key={idx} className={`inline-block text-[10px] p-1 px-2  shadow-md rounded-4xl cursor-pointer
                 ${searchParams.get('category')=== category.key ? "bg-eliteGray text-white":"bg-white text-black"} `}
                onClick={()=>{

                  const data = {
                    type:"category",
                    value:category.key
                  }
                  handleFilter(data);
                }
              }
                >{category.label}</span>
              ))}
              </div>
            </div>

            {/* price filter */}
            <div className='h-auto w-[200px] py-4 border-b-1 border-gray-300'>
              <h1>Price</h1>
              <div className='w-full mt-6 text-[10px]  flex flex-wrap gap-1 md:gap-2 '>
              {PRICE_FILTER.map((price,idx)=>(
                <span key={idx} className={`inline-block text-[10px] p-1 px-2  shadow-md rounded-4xl cursor-pointer
                 ${searchParams.get('price')===price.key ? "bg-eliteGray text-white":"bg-white text-black"}`}
                onClick={()=>{
                  const data = {
                    type:"price",
                    value:price.key
                  }
                  handleFilter(data);
                }}
                >{price.label}</span>
              ))}
              </div>
            </div>

            {/* Rating filter */}
            <div className='h-auto w-[200px] py-3'>
              <h1>Rating</h1>
              <div className='w-full mt-6 text-[10px]  flex flex-wrap gap-1 md:gap-2 '>
              {RATING_FILTER.map((rating,idx)=>(
                <span key={idx} className={`inline-block text-[10px] p-1 px-2 shadow-md rounded-4xl cursor-pointer
                  ${searchParams.get('rating') === String(rating.key) ? "bg-eliteGray text-white":"bg-white text-black"}`}
                onClick={()=>{
                  const data = {
                    type:"rating",
                    value:rating.key
                  }
                  handleFilter(data);
                }}
                >{rating.label}</span>
              ))}
              </div>
            </div>



      </div>


      {/* //display products */}
      <section id="scrollableDiv" className='relative  w-full h-full pl-10 md:pl-[310px] pt-[150px] md:pt-[70px] overflow-y-scroll scrollbar-hidden'>
        {productDataLoading && <ContentLoader/>}
        {productContent?.length === 0 ? (<Error />) 
        : (
          <InfiniteScroll
          dataLength = {
            productContent?.length ? productContent?.length : 0
          }
          next={fetchNextPage}
          hasMore={hasNextPage}
          scrollableTarget="scrollableDiv"
          >
             <div  className=' relative h-auto w-[99%]  flex flex-wrap gap-11 px-2 my-15 '>
            {
              productContent?.map((product,idx)=>(
                <ProductCards key={idx} product={product} className=""/>
              ))
            }
            </div>
            {isFetchingNextPage && (
              <article className="w-full flex justify-center items-center py-6 flex-col">
                <ClipLoader size={50}  />
                <p className="text-[0.8rem] text-gray-500 mt-2">Loading</p>
              </article>
              )}
              {!hasNextPage && productContent?.length > 0 && (
                <article className="w-full flex  justify-center items-center p-5 text-[0.8rem] text-gray-500">
                  No more Data
                </article>
              )}

          </InfiniteScroll>
          )}
      </section>



      
    </div>
  );
}


export function ProductCards({product}){
  const location = useLocation();
  const navigate = useNavigate();
  const {name,rating,price,discount,description,image,available} = product
  return(
    <div  className={`h-[325px]  bg-white shadow-2xl cursor-pointer px-[30px] box-border overflow-hidden relative
      ${location.pathname === "/admin/products" ? "w-[250px]" : "w-[260px]"}`}
    onClick={()=>{
      if(location.pathname === "/admin/products"){
        navigate("#",{ state: product })
      }else{
        navigate("/store/product",{ state: product })
      }
      
    }}>
    <div className='flex flex-col justify-center relative'>
      <img src={image} className='h-[180px] w-[200px] object-contain mt-5' 
        alt='Product'/>
     
    </div>
    <span className='absolute bottom-26 right-0 flex  px-2 bg-[#1f293792] text-white'>
      {rating}<IoStar className='mt-1 ml-1 text-eliteGold'/></span>
    <h1 className='mt-6 truncate text-eliteGray font-bold'>{name}</h1>
    <p className='text-gray-600 text-xs truncate'>{description}</p>
    <div className='flex mt-2'>
      <h1 className=' text-eliteGray font-bold'>₹ {calculateDiscount(price,discount)}</h1>
      <p className='text-[12px] mt-[5px]  text-gray-600 ml-2'><strike>₹ {price}</strike></p>
      <p className='text-[12px] text-eliteGold mt-[5px] ml-1'><b>{discount}%</b></p>
      {location.pathname === "/admin/products" && (
      <p className={`absolute bottom-1 right-1 px-2 py-1 rounded-2xl font-bold text-[10px]
        ${available === 1 ? " bg-green-800 text-white ":"bg-red-800 text-white"}
      `}>{available === 1 ? "Available ":"Unavailable"}</p>)
    }
    </div>
  </div> 
  )
}


export function calculateDiscount(price, discount) {
  return Math.round(price - (price * discount) / 100);
}
