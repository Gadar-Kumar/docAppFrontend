import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets.js';
import axios from 'axios';
import { toast } from 'react-toastify';

function MyProfile() {
  // const [userData,setUserData]=React.useState({
  //   name:'Gadar Kumar',
  //  image:assets.profile_pic,
  //  email:'gadar.kumar@example.com',
  //  phone:'+91 123 456 7890',
  //  address:{
  //   line1:'2767,block-A,faridabad',
  //   line2:'Haryana, India'
  //  },
  //  gender:'Male',
  //   dob:'01-01-1990'
  // })

  const {userData,setUserData,utoken,backendURL,}=useContext(AppContext)

  const [isEdit,setIsEdit]=React.useState(false);
  const [image,setImage]=useState(false)

  const updateUserProfileData=async()=>{
    try {
      const formData=new FormData()

      formData.append('name',userData.name)
      formData.append('phone',userData.phone)
      formData.append('address',JSON.stringify(userData.address))
      formData.append('gender',userData.gender)
      formData.append('dob',userData.dob)
      image && formData.append('image',image)


      const {data}=await axios.post(backendURL+'/api/user/update-profile',formData,{
        headers:{utoken}
      })

      if(data.success){
        toast.success(data.message)
        // calling loaduserProfileData fn to reupload it
        setIsEdit(false)
        setImage(false)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

  // using userData as data is fetching from backend and it will take time
  return userData && (
    <div className='mx-10 flex flex-col gap-2 text-sm max-w-lg'>
      {
        isEdit ?
        <label htmlFor="image">
          <div className='inline-block relative cursor-pointer'>
            <img className='w-36 rounded opacity-75' src={image ?URL.createObjectURL(image):userData.image} alt="" />
            <img  className='w-10 absolute bottom-12 right-12' src={image ?' ':assets.upload_icon} alt="" />
          </div>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden/>
        </label>
        : <img className='w-36 rounded' src={userData.image} alt="" />
      }
     

      {
        isEdit?
        <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4 ' type="text"  value={userData.name} onChange={(e) => setUserData({...userData, name:e.target.value})} />:
        <p className='text-3xl font-medium text-neutral-800 mt-4'>{userData.name}</p>
      }
      <hr className='bg-zinc-400 h-[1px] border-none' />

      <div >
        <p className='text-neutral-400 underline mt-3'>Contact Information</p>
     <div className='grid grid-cols-1 gap--y-2 text-neutral-700'>
      <p>Email: {userData.email}</p>
        {isEdit?
        <input type="text" value={userData.phone} onChange={(e) => setUserData({...userData, phone:e.target.value})} />:
        <p>Phone: {userData.phone}</p>}

        <p className='font-medium'>Address: {isEdit? <><input type="text" value={userData.address.line1} onChange={(e) => setUserData({...userData, address:{...userData.address, line1:e.target.value}})} />
        <input type="text" value={userData.address.line2} onChange={(e) => setUserData({...userData, address:{...userData.address, line2:e.target.value}})} /></>:
        <span className='font-medium'>{userData.address.line1}, {userData.address.line2}</span>}</p>

        <p>Gender:{isEdit? <><select value={userData.gender} onChange={(e) => setUserData({...userData, gender:e.target.value})} id="">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select></>:<span>{userData.gender}</span>}</p>
        <p>DOB: {isEdit? <><input type="date" value={userData.dob}  onChange={(e) => setUserData({...userData, dob:e.target.value})} /></>:
        <span>{userData.dob}</span>}</p>

        <div className='mt-4'>
          {isEdit?
            <button className='bg-blue-500 text-white   py-2 px-10 rounded' onClick={updateUserProfileData}>Save Information</button>:
            <button className='bg-blue-500 text-white py-2 px-10 rounded' onClick={() => setIsEdit(true)}>Edit</button>
          }
      </div>
        </div>
         </div>
    </div>
  )
}

export default MyProfile
