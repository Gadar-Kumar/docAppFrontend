import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

function TopDoctor() {
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center gap-4 text-gray-900 md:mx-10 mt-10 overflow-hidden">
      <h1 className="text-3xl font-medium">Top Doctors To Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum sunt corporis quos sit sequi
      </p>

      {/* Responsive Grid */}
      <div className="w-full max-w-screen-xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 px-3 sm:px-0">
        {doctors.slice(0, 12).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`)
              scrollTo(0, 0)
            }}
            className="border border-blue-200 rounded-xl w-full overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500"
            key={index}
          >
            <img className="bg-blue-50 w-full h-48 object-cover" src={item.image} alt={item.name} />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-green-500">
                <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                <p>Available</p>
              </div>
              <p className="text-gray-800 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      {/* More Button */}
      <button
        onClick={() => {
          navigate('/doctor')
          scrollTo(0, 0)
        }}
        className="bg-blue-50 cursor-pointer text-gray-600 px-12 py-3 rounded-full mt-10"
      >
        More
      </button>
    </div>
  )
}

export default TopDoctor
