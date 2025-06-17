import React from 'react'

function SuccessLoader() {
  return (
    <div className='h-full w-full flex flex-col items-center justify-center bg-[#d2ffe2] '>
          <img src='/Image/Success.gif' className='h-[380px] w-[500px] '></img>
          <h1 className='font-bold text-2xl'>Order Placed Successfully</h1>
        </div>
  )
}

export default SuccessLoader