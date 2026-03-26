import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

function Banner() {

    const navigate=useNavigate()

  return (
    <div className='flex flex-col md:flex-row items-center justify-between bg-blue-500 px-5 md:px-10 py-10 lg:px-20 gap-10 my-20 md:mx-10 rounded'>
      {/**--left side */}
      <div className='flex-1 py-8 sm:py-10 md:py-16 lg:text-5xl font-semibold text-white'>
        <div className='text-xl sm:text-2xl lg:text-3xl font-semibold text-white flex flex-col gap-3 mb-6'>
            <p>Book Appointment</p>
            <p className='mt-4'>With 100+ Trusted Doctors</p>
        </div>
        <button  onClick={()=>{navigate('/login');scrollTo(0,0)}} className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full'>Create account</button>
      </div>

      {/**--right side */}
      <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
        <img className='w-full  border-0 right-0' src={assets.appointment_img} alt="" />
      </div>
    </div>
  )
}

export default Banner
