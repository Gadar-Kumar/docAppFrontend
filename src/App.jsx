import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import { Route, Router, Routes } from 'react-router-dom'
import Login from './pages/Login'
import About from './pages/About'
import Doctor from './pages/Doctor'
import MyProfile from './pages/MyProfile'
import Contact from './pages/Contact'
import MyAppointment from './pages/MyAppointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Appointments from './pages/Appointments'
import ContactForm from './pages/ContactForm'
import { ToastContainer} from 'react-toastify';



function App() {
  

  return (
    <>
      <div className=''>
        <ToastContainer/>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/doctor' element={<Doctor />} />
          <Route path='/profile' element={<MyProfile />} />
          <Route path='/doctor/:speciality' element={<Doctor />} />
          <Route path='/login' element={<Login />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/my-appointments' element={<MyAppointment />} />
          <Route path='/appointment/:docId' element={<Appointments />} />
          <Route path='/contactform' element={<ContactForm />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
