import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

function Header() {
  return (
    <div className="flex flex-col mt-4 md:mx-10 rounded md:flex-row bg-blue-400 px-4 md:px-10 py-10 lg:px-20 overflow-hidden relative">
      {/* Left Section */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[8vw]">
        <p className="text-2xl md:text-4xl lg:text-5xl font-semibold text-white leading-snug">
          Book Appointment <br /> With Trusted Doctors
        </p>

        <div className="flex flex-col md:flex-row items-center gap-3 text-white font-light text-sm">
          <img className="w-22" src={assets.group_profiles} alt="" />
          <p>
            Lorem ipsum dolor sit <br className="hidden sm:block" /> amet consectetur adipisicing elit.
          </p>
        </div>

        <a
          href="#speciality"
          className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
        >
          Book Appointment
          <img className="w-4" src={assets.arrow_icon} alt="" />
        </a>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 relative flex justify-center items-end">
        <img
          className="w-3/4 md:w-full max-h-[500px] object-contain"
          src={assets.header_img}
          alt="Doctor"
        />
      </div>
    </div>
  )
}

export default Header
