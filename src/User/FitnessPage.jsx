
import React from 'react'
import { SiTicktick } from "react-icons/si";
import { IoWalletOutline } from "react-icons/io5";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { MdArrowBackIos, MdDescription } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { Footer } from './Home';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


function FitnessPage({pageDetails}) {
  const location = useLocation()
  const navigate = useNavigate()
  

  const handleClick = (months) =>{
    navigate('/fitness/buy',{
      state:[pageDetails, { selectedMonths: months }]
    });
  }


  const cards = [
    {
      title:"Yoga",
      description : "Flexibility - Mindful transitions",
      Image:"/Image/FitnessCard5.jpeg"
    },
    {
      title:"Strength",
      description : "Agility - Endurance",
      Image:"/Image/FitnessCard6.png"
    },
    {
      title:"Run",
      description : "Outdoor - Airobic Run",
      Image:"/Image/FitnessCard9.png"
    },
    {
      title:"Core ",
      description : "core Strength - Fat Burn",
      Image:"/Image/FitnessCard10.jpeg"
    },
    {
      title:"Dancing",
      description : "cardio - Airobic",
      Image:"/Image/FitnessCard7.jpg"
    },
    {
      title:"Boxing",
      description : "Endurance - Skill",
      Image:"/Image/FitnessCard8.jpeg"
    }
  ]

  const getTextColor = () => {
    if(location.pathname === '/fitness/elitePlus'){
      return 'text-eliteGold';
    }
    else {
      return 'text-gray-400'
    }
    }

  const getBorederColor = ()=>{
    if(location.pathname === '/fitness/elitePlus'){
      return 'border-eliteGold';
    }
    else {
      return 'border-gray-900'
    }

  }
  
  
  return (
    <div className='max-w-screen h-screen lg:max-w-[1800px] bg-eliteBlack overflow-x-hidden overflow-auto scrollbar-hidden scroll-smooth'>

        {/* //details and price */}
        <div className='h-screen w-full bg-cover bg-center pt-[120px]  flex relative' style={{backgroundImage:"url('/Image/BG.jpg')"}}>

            <div className='w-[95%] md:w-[50%] h-auto mt-10 mb-10 pl-4 md:px-10 md:pl-30 flex flex-col gap-3 relative'>

                <h1 className={`text-5xl font-bold 
                 ${getTextColor()} 
                 `}>Elite</h1>
                <h1 className='text-white relative left-[100px] bottom-[33px]'>{pageDetails[0].type}</h1>

                <h1 className='flex items-center text-md md:text-2xl text-white font-semibold'><SiTicktick className='mr-5 md:mr-10 text-xl text-eliteGold' /> 
                {pageDetails[0].p1} </h1>
                <h1 className='flex items-center text-md md:text-2xl text-white font-semibold'><SiTicktick className='mr-5 md:mr-10 text-xl text-eliteGold' /> 
                {pageDetails[0].p2}</h1>
                <h1 className='flex items-center text-md md:text-2xl text-white font-semibold'><SiTicktick className='mr-5 md:mr-10 text-xl text-eliteGold' /> 
                {pageDetails[0].p3}</h1>
                <h1 className='flex items-center text-md md:text-2xl text-white font-semibold'><SiTicktick className='mr-5 md:mr-10 text-xl text-eliteGold' /> 
                {pageDetails[0].p4}</h1>
                <h1 className='flex items-center text-xl md:text-2xl text-white font-semibold mt-5'>Starting at &#8377; {pageDetails[0].price} / Month* + Taxes & Fees</h1>
               
                <a href='#buy' > <button className='p-2 w-[150px] bg-eliteGold text-white gap-4 hover:gap-6 flex items-center justify-center cursor-pointer
                transition-all duration-500 text-xl'>Buy <IoWalletOutline className='mt-1'/></button></a>
                <h1 className='text-gray-400 text-xs'>*Effective Monthly Pricing including Extension, if any</h1>

               


            </div>



           <img src={pageDetails[0].Image} className='hidden md:block w-[48%] h-[75%] mt-10'>
           </img>

           <div className='absolute bottom-0 h-[50px] w-full bg-gradient-to-b from-[#262626] to-[#141414] border-t-2  border-t-eliteGold'
           style={{
            clipPath:"ellipse(53% 100% at 50% 100%)",
           }}>

            </div>

        </div>


        {/* //Features */}
        <div className='h-auto w-full bg-[#141414] flex flex-col pt-20 pb-20'>
          <h1 className='text-3xl text-gray-400 font-semibold uppercase text-center'>Features</h1>
          <div className='w-[100px] h-[2px] mx-auto bg-eliteGold mt-1'></div>

          <div className='h-auto w-[70%] flex flex-wrap mx-auto mt-10 gap-4 justify-center uppercase 
          '>
              <div className={`h-[300px] w-[450px]  rounded-xl border-1 ${getBorederColor()} backdrop-brightness-200 bg-cover bg-center overflow-hidden`} 
              style={{backgroundImage:"url('/Image/BG.jpg')"}}>
                <div className='absolute inset-0 bg-black/30 z-1'></div>
                <img src='/Image/FitnessCard3.png' className='h-[100px] w-[100px] mx-auto mt-3'></img>
                <h1 className={`text-4xl font-bold text-center ${getTextColor()} relative z-2`}>Unlimited access to</h1>
                <h1 className={`text-6xl font-bold text-center ${getTextColor()} mt-2 relative z-2`}>{pageDetails[0].feature0}+</h1>
                <h1 className='text-3xl  text-white text-center  mt-5 relative z-2'>{pageDetails[0].feature1}</h1>

              </div>

              <div className={`h-[300px] w-[450px]  rounded-xl border-1 ${getBorederColor()} backdrop-brightness-200 bg-cover bg-center overflow-hidden`}
              style={{backgroundImage:"url('/Image/FitnessCard4.jpg')"}}>
                <div className='absolute inset-0 bg-black/75 z-1'></div>
                <h1 className={`text-4xl font-bold text-center ${getTextColor()} mt-25 relative z-2`}>At Home</h1>
                <h1 className='text-3xl  text-white text-center  mt-5 relative z-2'>{pageDetails[0].feature2}</h1>

              </div>

              <div className={`h-[300px] w-[450px]  rounded-xl border-1 ${getBorederColor()} bg-cover bg-center relative overflow-hidden`}
              style={{backgroundImage:"url('/Image/FitnessCard1.jpg')"
              }}>
                <div className='absolute inset-0 bg-black/60 z-1'></div>
                <h1 className={`text-4xl font-bold text-center ${getTextColor()} mt-30 relative z-2`}>{pageDetails[0].feature3} </h1>
                <h1 className='text-2xl font-bold text-center text-white mt-5 relative z-2'>{pageDetails[0].feature4}</h1>

              </div>

              <div className={`h-[300px] w-[450px]  rounded-xl border-1 ${getBorederColor()} backdrop-brightness-200 bg-cover bg-center overflow-hidden`}
              style={{backgroundImage:"url('/Image/BG.jpg')"}}
             >
                <div className='absolute inset-0 bg-black/30 z-1'></div>
                <img src='/Image/FitnessCard2.png' className='h-[160px] w-[210px] mx-auto relative z-2'></img>
                <h1 className='text-3xl  text-center text-white relative z-2'>Smart </h1>
                <h1 className={`text-4xl font-bold text-center ${getTextColor()}  mt-5 relative z-2`}>Work Out Plans</h1>

              </div>
          </div>
          

        </div>


        {/* //At center Classes */}
      <div className='hidden md:flex h-auto w-[full] bg-[#141414] flex-col pt-20 pb-20'>
          <h1 className='text-2xl text-center text-white uppercase'>At-Center</h1>
          <h1 className='text-center uppercase text-3xl md:text-4xl font-semibold text-white  mx-auto'>Trainer led group classes</h1>

          <div className='h-auto w-[80%] px-10  mx-auto  flex justify-center relative'>
            <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: '.custom-next',
              prevEl: '.custom-prev'
            }}
            spaceBetween={25}
            slidesPerView={4}
            className=' !pr-10'
            >
            {cards.map((item,idx)=>(
                <SwiperSlide key={idx}>
                  <AtCenterCard item={item}/>
                </SwiperSlide>
              )) 
            }
            </Swiper>


            {/* Custom Arrows */}
          <div className="custom-prev absolute left-0 top-1/2   z-10 transform -translate-y-1/2 -translate-x-15
           rounded-full cursor-pointer text-white hover:text-eliteGold  text-3xl">
              <MdArrowBackIos/>
          </div>
           <div className="custom-next absolute top-1/2 right-0 z-10 transform -translate-y-1/2 -translate-x-[-60px] 
            rounded-full cursor-pointer text-white hover:text-eliteGold text-3xl">
              <MdArrowForwardIos/>
          </div>

        </div>

    </div>

    {/* //purchase card */}
        <section id="buy" className='h-auto w-[full] bg-[#141414] flex flex-wrap px-3 justify-center gap-5 pt-30 pb-30 relative'>
          <h1 className='absolute top-[10px] w-full text-center  text-4xl text-white '>Join Us Now</h1>
          <div className='absolute top-[55px] left-[695px] h-[2px] w-[150px]  bg-eliteGold '></div>
          {
          pageDetails[1].purchaseDetails.map((details,idx)=>(
            <PurchaseCard key={idx} details={details} onClick={handleClick}/>
          ))
          
          }
      </section>

        
    {/* Footer */}
      <section className='h-[1000px] md:h-[500px] w-full bg-cover bg-center' style={{ backgroundImage: "url('/Image/FooterBG.jpg')" }}>
          <Footer/>
      </section>
        
    </div>
  )
}

export default FitnessPage


export function AtCenterCard({item}){
  return(

  <div className='bg-white h-[375px] w-full my-15  mx-5 relative overflow-hidden
    hover:scale-110  hover:shadow-eliteGold transition-all ease-in-out duration-500 cursor-pointer bg-center bg-cover'
    style={{
      backgroundImage:`url(${item.Image})`
    }}>
    <div className='absolute inset-0 bg-black/55'></div>
    <h1 className='w-full text-center font-bold text-4xl text-white absolute top-1/2 z-10'>{item.title}</h1>
    <h1 className='w-full text-center text-xl text-gray-500 absolute top-60 z-10'>{item.description}</h1>
  </div>
    
  )
}


export function PurchaseCard({details,onClick}){
  const {months,price,discountPrice,monthlyCost,p1,p2,p3,p4,p5,p6} = details
  return(

    <div className='h-[460px] w-[400px] rounded-xl  bg-center bg-cover relative overflow-hidden'
        style={{
          backgroundImage:"url('/Image/BG.jpg')",
        }}>
          <div className='absolute inset-0 backdrop-blur-sm bg-white/5 hover:bg-white/1 transition-all duration-300 cursor-pointer z-4'></div>
          
          <h1 className={`absolute text-5xl font-bold z-10 ml-10 mt-10
            ${location.pathname==='/fitness/elitePlus'?'text-eliteGold':'text-gray-400'}
            `}>{months}</h1>
          <h1 className={`absolute font-semibold text-xl uppercase z-10 ml-7 mt-22
          ${location.pathname==='/fitness/elitePlus'?'text-eliteGold':'text-gray-400'}
            `}>Months</h1>
          <h1 className={`absolute text-xl font-semibold z-10 text-eliteGold ml-40 mt-9
          ${location.pathname==='/fitness/elitePlus'?'text-eliteGold':'text-gray-500'}
            `}><strike>{price}</strike></h1>
          <h1 className={`absolute text-4xl font-semibold z-10 text-eliteGold ml-40 mt-15
          ${location.pathname==='/fitness/elitePlus'?'text-eliteGold':'text-gray-500'}
            `}>&#8377; {discountPrice}</h1>
          <h1 className='absolute text-xs font-semibold z-10 text-gray-400 ml-72 mt-20'>+ inclding tax</h1>
          <h1 className='absolute text-sm font-semibold z-10 text-gray-400 ml-40 mt-25'>{monthlyCost}</h1>
          
          <div className=' absolute w-[90%] top-[140px] z-10 h-[1px] bg-gray-400 ml-5'></div>
         

          <h1 className='absolute text-white px-4 mt-40 z-10'>+{p1}</h1>
          <h1 className='absolute text-white px-4 mt-50 z-10'>+{p2}</h1>
          <h1 className='absolute text-white px-4 mt-60 z-10'>+{p2}</h1>
          <h1 className='absolute text-white px-4 mt-70 z-10'>+{p4}</h1>
          <h1 className='absolute text-white px-4 mt-80 z-10'>+{p5}</h1>
          <h1 className='absolute text-white px-4 mt-90 z-10'>+{p6}</h1>

          <button className=' absolute bottom-4 z-10 left-35 p-2 w-[100px] bg-eliteGold text-white gap-4 hover:gap-6 flex items-center justify-center cursor-pointer
                transition-all duration-500 mt-2 mx-auto rounded-md'
           onClick={()=>onClick(months)}     >Buy <IoWalletOutline className='mt-1'/></button>
          
          
    

        </div>

    

  )
}