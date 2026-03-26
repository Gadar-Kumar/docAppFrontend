import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

function Footer() {
  return (
    <div className='md:mx-10 px-2'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm text-gray-600'>
        {/**---left section */}
        <div>
        <img className=' mb-5 w-40' src={assets.logo} alt="" />
        <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora, labore <br /> esse optio exercitationem voluptate nam quasi in sed quae. Culpa!</p>
        </div>
      
      <div>
        {/**---middle section */}
        <p className='text-xl font-medium mb-5'>Company</p>
        <ul className='flex flex-col gap-3 text-gray-600'>
        <li>Home</li>
        <li>About us</li>
        <li>contact us</li>
        <li>Privacy Policy</li>
        </ul>
      </div>
      <div>
        {/**---right section */}
        <p className='text-xl font-medium mb-5'>Get in Touch</p>
        <ul className='flex flex-col gap-3 text-gray-600'>
            <li>+91 88834 76839</li>
            <li>info@doctorappointment.com</li>
        </ul>
      </div>
       </div>


      <div>
        {/**---bottom section */}
        <hr />
        <p className='py-5 text-sm flex justify-center'>copyright © 2025 Doctor Appointment. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
