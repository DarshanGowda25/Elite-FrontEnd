import { QueryClient, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Logout({ onClose, onConfirm }) {

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.removeItem('token');
        queryClient.clear()
        toast.success('Logged out')
        onConfirm;
        setTimeout(()=>{
            navigate('/')
        },600)
    }
  return (
    <div>
    <section
      className='h-screen w-full fixed z-[999] top-0 left-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center'
      onClick={onClose}
    >
      <div
        className='max-w-[400px] h-auto flex flex-col bg-white rounded-2xl'
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className='mx-auto text-black mt-10 text-xl'>Confirm Logout?</h1>
        <div className='w-full flex m-10 gap-10'>
          <button
            className='p-2 w-[100px] bg-red-400 text-white rounded-lg cursor-pointer hover:shadow-[0px_0px_10px_black]'
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className='p-2 w-[100px] bg-eliteGold text-white rounded-lg cursor-pointer hover:shadow-[0px_0px_10px_black]'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </section>
    </div>
  )
}

export default Logout