import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets_frontend/assets.js'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'

function Navbar() {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const {utoken,setUtoken,userData}=useContext(AppContext)
  const [showDropdown, setShowDropdown] = useState(false)

  const handleLogin = () => {
    navigate('/login')
  }

  const logout=()=>{
    setUtoken(false)
    localStorage.removeItem('utoken')
  }

  return (
    <div className="flex items-center sticky top-0 z-10 bg-white justify-between text-sm py-4 px-4 md:px-10 border-b border-b-gray-200 ">
      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        className="w-52 cursor-pointer"
        src={assets.logo}
        alt=""
      />

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-10 font-medium">
        <NavLink to="/">
          <li className="py-1">Home</li>
        </NavLink>
        <NavLink to="/doctor">
          <li className="py-1">All Doctors</li>
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">Contact</li>
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">About</li>
        </NavLink>
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {utoken && userData ? (
          <div onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-2 cursor-pointer group z-10 relative">
            <img className="w-8 rounded-full" src={userData.image?userData.image:assets.profile_pic} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className={`absolute top-10 right-0 text-base font-medium text-gray-600 z-10 ${showDropdown ? 'block' : 'hidden'}`}>
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 shadow-lg">
                <p
                  onClick={() => navigate('/profile')}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate('/my-appointments')}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={logout}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-red-500 cursor-pointer text-white font-light px-8 py-3 rounded-full hidden md:block"
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Button */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt="Menu"
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          showMenu ? 'fixed  w-full' : 'w-0 h-0'
        } md:hidden right-0 top-0 bottom-0 z-50 overflow-hidden bg-white transition-all`}
      >
        <div className="flex justify-between items-center px-5 py-6 border-b">
          <img className="w-36" src={assets.logo} alt="" />
          <img
            onClick={() => setShowMenu(false)}
            className="w-7 cursor-pointer"
            src={assets.cross_icon}
            alt="Close"
          />
        </div>
        <ul className="flex flex-col gap-6 p-6 font-medium">
          <NavLink to="/" onClick={() => setShowMenu(false)}>
          <p className='px-4 py-2 rounded inline-block'> Home</p>
          </NavLink>
          <NavLink to="/doctor" onClick={() => setShowMenu(false)}>
            <p className='px-4 py-2 rounded inline-block'>All Doctors</p>
          </NavLink>
          <NavLink to="/about" onClick={() => setShowMenu(false)}>
          <p className='px-4 py-2 rounded inline-block'>  About</p>
          </NavLink>
          <NavLink to="/contact" onClick={() => setShowMenu(false)}>
           <p className='px-4 py-2 rounded inline-block'>Contact</p>
          </NavLink>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
