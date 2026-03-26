import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';
import RelatedDoc from '../components/RelatedDoc';
import { toast } from 'react-toastify';
import axios from 'axios';

function Appointments() {
  const { docId } = useParams();
  const { doctors, currancy, backendURL, utoken, getDoctorData } = useContext(AppContext)
  const [docInfo, setDocInfo] = useState([]);
  console.log("docId", docId);

  const fetchDocInfo = async () => {
    const docInfos = doctors.find(doc => doc._id == docId);
    setDocInfo(docInfos)
    console.log("docInfo", docInfos);
  }

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId])

  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const navigate = useNavigate()

  const getAvailSlot = async () => {
    setDocSlot([]);
    // getting current date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      // getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // setting hours

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
        currentDate.setSeconds(0)
      }
      else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0)
      }
      let timeSlots = [];

      while (currentDate <= endTime) {
        let formettedTime = currentDate.toLocaleTimeString({ hour: '2-digit', minute: '2-digit' });

        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = day + "_" + month + "_" + year

        const slotTime = formettedTime

        
        const bookedSlots = docInfo?.slots_booked?.[slotDate] || [];
        const isSlotAvailable = !bookedSlots.includes(slotTime);

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formettedTime,
          });
        }


        //increment time by 30 mins
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }
      setDocSlot(prev => [...prev, timeSlots])
    }

  }



  useEffect(() => {
    getAvailSlot();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlot);

  }, [docSlot])

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']


  const bookAppointment = async () => {
    if (!utoken) {
      toast.warn('login to book appointment')
      return navigate('/login')
    }

    try {
      const date = docSlot[slotIndex][0].datetime

      let day = date.getDate()
      let month = date.getMonth() + 1; // 1 for jan , 2 for fev

      let year = date.getFullYear()

      const slotDate = day + "_" + month + '_' + year
      // console.log(slotDate);


      const { data } = await axios.post(backendURL + '/api/user/book-appointment', { docId, slotDate, slotTime }, {
        headers: { utoken }
      })
      if (data.success) {
        toast.success(data.message)
        getDoctorData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }


  return docInfo && (
    <div className='mx-10'>
      {/* Doctor Information */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-blue-400 w-full sm:w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          {/* Doctor Details */}
          <p className='flex items-center text-2xl gap-2 font-medium text-gray-900'>{docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="" /></p>
          <div className='flex items-center gap-2 text-sm text-gray-600 mt-1'>
            <p >{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full cursor-pointer hover:bg-gray-300'>{docInfo.experience}</button>
          </div>
          {/* About Doctor */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" />
            </p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>
          <p className='text-gray-700 font-medium  mt-4'>
            Appointment fee: <span>{currancy}-{docInfo.fees}</span>
          </p>
        </div>
      </div>
      {/* Booking Section */}
      <div className='sm:ml-72 sm:pl-4 font-medium text-gray-700'>
        <p>Booking slot</p>
        <div className='flex gap-3 items-center mt-4 w-full overflow-x-scroll '>
          {docSlot.length && docSlot.map((slotDay, index) => (
            <div
              onClick={() => { setSlotIndex(index) }}
              className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-blue-500 text-white' : 'border border-gray-300'}`} key={index}>
              <p>{slotDay[0] && daysOfWeek[slotDay[0].datetime.getDay()]}</p>
              <p>{slotDay[0] && slotDay[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>
        <div className='flex items-center gap-3 mt-4 w-full overflow-x-scroll pb-4'>
          {docSlot.length && docSlot[slotIndex].map((item, index) => (
            <p
              onClick={() => setSlotTime(item.time)}
              className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-blue-500 text-white' : 'border border-gray-300'}`}
              key={index}>{item.time.toLowerCase()}</p>
          ))}
        </div>
        <button onClick={bookAppointment} className='bg-blue-500 text-white py-2 px-10 rounded-full font-light'>Book an appointment</button>
      </div>
      {/* Related Doctors */}
      <RelatedDoc docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}


export default Appointments;
