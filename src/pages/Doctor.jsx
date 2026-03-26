import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';



function Doctor() {

  const { speciality } = useParams();
  // console.log(speciality);

  const { doctors } = useContext(AppContext)
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()


  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality])

  return (
    <div>
      <p className='text-gray-600 mx-4 '>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start  gap-5  mt-5'>
        <button onClick={() => setShowFilter(prev=>!prev)} className={`py-1 mx-2 px-3 border rounded text-sm transition-all sm:hidden ${showFilter?'bg-blue-500 text-white':''}`}>Filters</button>
        <div className={`flex flex-col m-1 gap-4 text-sm text-gray-600 ${showFilter?'flex':'hidden sm:flex'} `}>
          <p onClick={()=>speciality==='General physician'?navigate('/doctor'):navigate(`/doctor/General physician`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-stone-400 gap-3 mt-2 rounded cursor-pointer`}>General physician</p>
          <p onClick={()=>speciality==='Gynecologist'?navigate('/doctor'):navigate(`/doctor/Gynecologist`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-stone-400 gap-3 mt-2 rounded cursor-pointer`}>Gynecologist</p>
          <p onClick={()=>speciality==='Dermatologist'?navigate('/doctor'):navigate(`/doctor/Dermatologist`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-stone-400 gap-3 mt-2 rounded cursor-pointer`}>Dermatologist</p>
          <p onClick={()=>speciality==='Pediatricians'?navigate('/doctor'):navigate(`/doctor/Pediatricians`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-stone-400 gap-3 mt-2 rounded cursor-pointer`}>Pediatricians</p>
          <p onClick={()=>speciality==='Neurologist'?navigate('/doctor'):navigate(`/doctor/Neurologist`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-stone-400 gap-3 mt-2 rounded cursor-pointer`}>Neurologist</p>
          <p onClick={()=>speciality==='Cardiologist'?navigate('/doctor'):navigate('/doctor/Cardiologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-stone-400 gap-3 mt-2 rounded cursor-pointer`}>Cardiologist</p>
        </div>

        <div className='w-full grid md:grid-cols-4 grid-cols-1 gap-y-6 px-3 sm:px-0'>
          {
            filterDoc.map((item, index) => (
              <div onClick={() => navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl w-9/10 overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                <img className='bg-blue-50' src={item.image} alt="" />
                <div className='p-4'>
                  <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                    <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                    <p>Available</p>
                  </div>
                  <p className='text-gray-800 text-lg font-medium'>{item.name}</p>
                  <p className='text-gray-600 text-sm '>{item.speciality}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctor
