import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

function Contact() {
 const navigate=useNavigate()

  return (
    <div className='mx-10'>
      <div className='text-center text-2xl pt-2 text-gray-500 mt-10'>
        <p>Contact <span className='text-gray-700 font-semibold'>Us</span></p>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center gap-2 items-start'>
          <p className='font-semibold text-lg text-gray-600'>Our Office</p>
          <p className='text-gray-500'>2767,block-A,faridabad</p>
          <p className='text-gray-500'>Haryana, India</p>
            <br />
          <p className='text-gray-500'>Phone: +91 123 456 7890</p>
            <br />
          <p className='text-gray-500'>Email: contact@doctorappointment.com</p>
          <p className='text-gray-500'>learn more about our team and job opening</p>
          <button onClick={()=>navigate('/contactform')} className='border border-black rounded-full text-gray-900 cursor-pointer mt-10 px-8 py-4 hover:bg-black hover:text-white transition-all duration-600'>Get in Touch</button>
        </div>
      </div>
    </div>
  )
}

export default Contact
