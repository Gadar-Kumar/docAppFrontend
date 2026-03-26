import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

function About() {
  return (
    <div className='px-10 md:px-20 lg:px-32 mt-10'>
      <div className='text-center text-2xl pt-2 text-gray-500'>
        <p >About <span className='text-gray-700 font-medium'>Us</span></p>
      </div>

      <div className='my-10 mt-7 flex flex-col md:flex-row gap-12'>
        <img className='w-full max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm  text-gray-600'>
          <p>we believe that healthcare should be simple, accessible, and reliable. Our platform is designed to help patients find the right doctors, schedule appointments with ease, and access trusted healthcare professionals from the comfort of their homes</p>
          <p>Our team is dedicated to providing the best possible experience for our users, and we are constantly working to improve our platform and expand our network of healthcare providers.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>To make healthcare accessible to everyone, everywhere.</p>
        </div>
      </div>
      <div className='text-xl my-4 '>
        <p>Why <span className='text-gray-700 font-semibold'>Choose Us?</span></p>
      </div>
      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border mx-2 my-2 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-500 hover:text-white transition-all duration-300 cursor-pointer'>
          <b>Efficiency</b>
          <p>Our platform streamlines the appointment process, reducing wait times and improving overall patient satisfaction.</p>
        </div>
        <div className='border mb-2 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-500 hover:text-white transition-all duration-300 cursor-pointer'>
          <b>Accessibility</b>
          <p>We provide access to a wide range of healthcare professionals, ensuring that patients can find the right care when they need it.</p>
        </div>
        <div className='border mx-2 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-500 hover:text-white transition-all duration-300 cursor-pointer'>
          <b>Quality</b>
          <p>We prioritize quality in all aspects of our service, from the healthcare professionals we partner with to the user experience on our platform.</p>
        </div>
      </div>
    </div>
  )
}

export default About
