import React from 'react'

function Stepper({Page}) {
    const steps = ["Cart","Address","Payment"];
    const currentPage = steps.indexOf(Page)+1;
    
    
  return (

    <div className='flex items-center justify-center '>

      <div className={`h-[10px] w-[10px] rounded-full bg-gray-500
       `}></div>
      {steps.map((step,idx) => {
      const isActive = currentPage === idx+1;
       const isCompleted = currentPage > idx+1;

      return(
        <div key={idx} className='h-[80px] flex items-center relative'>
          <div className={`h-1  w-[35px] md:w-[75px] bg-gray-500
          ${isCompleted ? "text-white bg-green-500 border-green-500":""}`}></div>
          <div className={`h-[30px] w-[30px]  rounded-full border-1 border-black place-content-center text-center
          ${isActive ? "text-white bg-eliteGray":""}
          ${isCompleted ? "text-white bg-green-500 border-green-500":""}
            `}>
            <p>{idx+1}</p>
          </div>
          <div className={`h-1 w-[35px] md:w-[75px] bg-gray-500
          ${isCompleted ? "text-white bg-green-500 border-green-500":""}`}></div>
          <h1 className={`absolute bottom-1  mt-2 font-bold text-sm text-eliteGold 
            ${step === "Cart" ? " left-9 md:right-19 text-right": "left-5 md:right-5 text-center "}`}>
              {step}
          </h1>
        </div>
        )
      })
      }
      <div className='h-[10px] w-[10px] rounded-full bg-gray-500'></div>

    </div>
  )
}

export default Stepper