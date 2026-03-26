import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function MyAppointment() {
  const { backendURL,utoken ,getDoctorData} = useContext(AppContext)
  const [appointments,setAppointments]=useState([])
  const months=[" ","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  const navigate=useNavigate()



  const slotDateFormate=(slotDate)=>{
    const dateArray=slotDate.split('_')
    return dateArray[0]+" "+months[Number(dateArray[1])] + " "+dateArray[2]
  }

  const getUserAppointment=async()=>{
    try {
      const {data}=await axios.get(backendURL+'/api/user/appointments',{
        headers:{utoken}
      })
      
      if(data.success){
        setAppointments(data.appointments.reverse())
        console.log(data.appointments);  
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(utoken){
      getUserAppointment()
    }
  },[utoken])

  const cancelAppointment=async(appointmentId)=>{
    try {
      // console.log(appointmentId);

      const {data}=await axios.post(backendURL+'/api/user/cancel-appointment',{appointmentId},{headers:{utoken}})
      console.log(data);
      
      if(data.success){
        console.log(data.message);
        toast.success(data.message)
        getUserAppointment()
        getDoctorData()
      }else{
        toast.error(data.message)
        console.log(data.message);
        
      }
    } catch (error) {
       console.log(error);
      toast.error(error.message)
    }
  }

  const initPay=(order)=>{
    const options={
      key:import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount:order.amount,
      currency:order.currency,
      name:'Appointment payment',
      description:'Appointment payment',
      order_id:order.id,
      receipt:order.reciept,
      handler:async(response)=>{
       
        //api call to verify payment
        try {
          const {data}=await axios.post(backendURL+'/api/user/verifyRazorpay',response,{headers:{utoken}})

          if(data.success){
            console.log(data);
            
            getUserAppointment()
            navigate('/my-appointments')
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message) 
        }
        
      }
    }
    const rzp=new window.Razorpay(options)
    rzp.open()
  }


  const appointmentRazorpay=async(appointmentId)=>{
    try {
      const {data}=await axios.post(backendURL+'/api/user/payment-razorpay',{appointmentId},{headers:{utoken}})

      if(data.success){
        console.log(data.order);
        // razorpay web integration
        initPay(data.order)
      }
    } catch (error) {
      
    }
  }

  return (
    <div className='mx-10'>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b '>My appointments</p>
      <div>
        {appointments.map((item,index)=>(
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b ' key={index}>
            <div>
              <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='font-semibold text-neutral-800'>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.docData.address.line1}</p>
               <p className='text-xs'>{item.docData.address.line2}</p>
               <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotDateFormate(item.slotDate)} | {item.slotTime}</p>
            </div>
            <div></div>

            <div className='flex flex-col gap-2 justify-end'>
              {!item.cancelled && item.payment && <button className='sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50'>Paid</button>}
              {!item.cancelled && !item.payment && <button onClick={()=>appointmentRazorpay(item._id)} className='text-sm text-stone-600 text-center sm:min-w-48 py-2 border hover:bg-blue-600 hover:text-white cursor-pointer'>Pay Online</button>}
              {!item.cancelled && <button onClick={()=>cancelAppointment(item._id)} className='text-sm text-stone-600 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white cursor-pointer'>Cancel Appointment</button>}
              {item.cancelled && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment Cancelled</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointment
