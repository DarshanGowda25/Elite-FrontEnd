
import React, { useState } from 'react'
import { Footer } from './Home';
import { Outlet, useNavigate } from 'react-router-dom';
import { TiArrowForwardOutline } from "react-icons/ti";
import toast from 'react-hot-toast';

function Consultancy() {

  const cards = [
    {
      image:"/Image/ConsultCard1.png",
      title:'Fitness Consultancy',
      p1:"+ Personalized workout plans (strength, cardio, flexibility)",
      p2:"+ Body composition analysis (fat %, muscle mass)",
      p3:"+ Progress tracking & performance assessment"

    },
    {
      image:"/Image/ConsultCard2.png",
      title:'Nutrition Consultancy',
      p1:"+ Macronutrient & calorie guidance",
      p2:"+ Diet planning (for weight loss, muscle gain, general health)",
      p3:"+ Supplements advice (protein, creatine, vitamins)"

    },
    {
      image:"/Image/ConsultCard3.png",
      title:'Physiotherapy Consultancy',
      p1:"+ Injury prevention & recovery plans",
      p2:"+ Chronic pain management (e.g. back pain, joint issues",
      p3:"+ Posture correction"

    }
  ]

 

  return (
    <div className="w-full h-screen max-w-[1800px] mx-auto relative bg-[#141414]
    overflow-x-hidden overflow-y-auto scrollbar-hidden">
        
        <img src="/Image/Consultancy.png" className="w-full h-full object-cover" 
        style={{ filter: "brightness(40%)" }} />

        <div className='absolute bottom-0 w-full h-[25px] lg:h-[50px] z-[3] bg-gradient-to-b from-[#262626] to-[#141414] border-0'
          style={{
            clipPath: "ellipse(53% 100% at 50% 100%)",
            boxShadow: "inset 0 3px 0 rgba(212, 175, 55, 0.696)"
          }}
        ></div>

        {/* consultanCard */}
        <div className='w-[95%] md:w-[95%] h-auto flex flex-wrap mx-auto mt-10 mb-10 gap-9 py-20'>
          {
            cards.map((item,idx)=>(
              <Card key={idx} item={item}/>
            ))
          }
        </div>


        {/* Footer */}
              <section className='h-[1000px] md:h-[500px] w-full bg-cover bg-center' style={{ backgroundImage: "url('/Image/FooterBG.jpg')" }}>
                  <Footer/>
              </section>

            
     
      

    </div>




  )
}

export default Consultancy


function Card({item}){
  const navigate =  useNavigate();
  const {title,p1,p2,p3,image} = item
  return(
    <div className='w-[460px] h-[350px] shadow-[0_0_10px_rgba(212,175,55,0.5)] px-10 text-gray-300 flex flex-col gap-2 cursor-pointer
    hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] relative'
    onClick={()=>{
      const token = localStorage.getItem('token');
      if(token){
      navigate('/appointment', { state: { title } });
      }else{
        navigate('/signIn');
        toast.error("Please Login")
      }
    }}>
      <img src={image} className={`${title!=="Fitness Consultancy" ? "h-[100px] w-[100px] mt-4" : "h-[80px] w-[80px] mt-8"} mx-auto `}></img>
      <h1 className='text-md uppercase text-[#ffdf78] text-center mb-6'>{title}</h1>
      <p>{p1}</p>
      <p>{p2}</p>
      <p>{p3}</p>
      <button className='absolute right-0 p-2 px-6 text-xs font-bold uppercase bg-eliteGold text-white'>Book</button>

    </div>

     

  )
}


