import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay,  Navigation } from 'swiper/modules';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { Footer } from '../User/Home';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../Utils/axioInstance';
import { serverUrlAPI } from '../Utils/info';
import ContentLoader from '../UI_Components/ContentLoader';
import { calculateDiscount } from './Category';
import { useNavigate } from 'react-router-dom';

function StoreHome() {

const fetchTopSeller = async () =>{
  const response = await axiosInstance(`${serverUrlAPI}product/topSeller`);
  console.log(response.data)
  return response.data;

}

const {data,isFetching}  =  useQuery({
    queryKey:['topSeller'],
    queryFn:fetchTopSeller,
    staleTime:Infinity,
    refetchOnWindowFocus:false
  })


  return (
    <div className='max-w-screen h-screen lg:max-w-[1800px] overflow-x-hidden overflow-auto scrollbar-hidden m-0 scroll-smooth'>


      {/* Hero Section */}
      <section className='relative w-full h-full'>
        

        <div className='w-full h-full  relative'>
          <Swiper
          modules={[Autoplay]}
          autoplay={{delay: "2500", disableOnInteraction: false}}
          loop={true}
          slidesPerView={1}
          speed={1100}
          className='h-screen overflow-hidden'
          >
            <SwiperSlide><img src='/Image/StoreImg1.png' className='w-full h-full' alt="Store promotion 1" /></SwiperSlide>
            <SwiperSlide><img src='/Image/StoreImg2.png' className='w-full h-full' alt="Store promotion 2" /></SwiperSlide>
            <SwiperSlide><img src='/Image/StoreImg3.png' className='w-full h-full' alt="Store promotion 3" /></SwiperSlide>
          </Swiper>
          
        </div>
    
        <div className='absolute bottom-0 w-full h-[25px] lg:h-[55px] z-[3] bg-gradient-to-b from-[#D1D5DB] to-[#E5E7EB] border-0'
        style={{
          clipPath: "ellipse(53% 100% at 50% 100%)",
          boxShadow: "inset 0 3px 0 rgb(31, 41, 55)"
        }}
        >
      </div>
      </section>




      <div className='flex md:flex h-auto w-[full] bg-gray-200 flex-col pt-20 pb-20'>
          <h1 className='text-3xl ml-[50px] md:ml-[130px] text-eliteGold uppercase border-l-4 border-eliteGray pl-4 font-semibold'>Top Seller</h1>
        

          <div className='h-auto w-[80%] md:w-[85%]  bg-transparent  mx-auto  flex justify-center relative'>
            <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: '.custom-next',
              prevEl: '.custom-prev'
            }}
            spaceBetween={25}
            slidesPerView={4}
            breakpoints={{
              0: {
                slidesPerView: 1, //mobile (0px and up)
              },
              640: {
                slidesPerView: 2, //tablets
              },
              1024: {
                slidesPerView: 4, //desktops
              },
            }}
            className=' !pr-10 '
            >
          {
            isFetching && <ContentLoader/>
          }
          {data?.map((item, idx) => (
          <SwiperSlide key={idx}>
            <TopSellerCard product={item}/>
          </SwiperSlide>
          ))}
            
            
      </Swiper>


            {/* Custom Arrows */}
          <div className="custom-prev absolute left-0 top-1/2   z-10 transform -translate-y-1/2 -translate-x-6
           rounded-full cursor-pointer text-eliteGray hover:text-eliteGold  text-3xl">
              <MdArrowBackIos/>
          </div>
           <div className="custom-next absolute top-1/2 right-0 z-10 transform -translate-y-1/2 -translate-x-[-25px] 
            rounded-full cursor-pointer text-eliteGray hover:text-eliteGold text-3xl">
              <MdArrowForwardIos/>
          </div>

        </div>

    </div>

    {/* Footer */}
    <section className='h-[1000px] md:h-[500px] w-full bg-eliteGray' >
        <Footer/>
    </section>



      


      
   </div>
  )
}

export default StoreHome


function TopSellerCard({product}){
  const {image,name,price,discount,description} = product;
  const navigate = useNavigate();
  return(
    <div className=' h-[375px] w-full my-15 mx-4 relative overflow-hidden
      hover:scale-110 transition-all ease-in-out duration-500 
      cursor-pointer bg-center bg-cover shadow-xl bg-white px-10'
      onClick={()=>{
      navigate("/store/product",{ state: product })
    }}>
        <div className='h-[225px] w-[200px]  mx-auto my-6'>
          <img src={image} className='h-full w-full mx-auto'></img>
        </div>
        <h1 className='truncate text-eliteGray font-bold'>{name}</h1>
        <p className='text-gray-600 text-xs truncate'>{description}</p>
        <div className='flex mt-2'>
          <h1 className=' text-eliteGray font-bold'>₹ {calculateDiscount(price,discount)}</h1>
          <p className='text-[12px] mt-[5px]  text-gray-600 ml-2'><strike>₹ {price}</strike></p>
          <p className='text-[12px] text-eliteGold mt-[5px] ml-1'><b>{discount}%</b></p>
        </div>
            
    </div>
  )
}
