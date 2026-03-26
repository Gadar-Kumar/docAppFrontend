import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



function Login() {
  const [state, setState] = useState('signup');
  const navigate=useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const {utoken , setUtoken,backendURL}=useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if(state==='signup'){
        const {data}=await axios.post(backendURL+'/api/user/register',{name,password,email})

        if(data.success){
          console.log(data.token);
          setUtoken(data.token)
          localStorage.setItem('utoken',data.token)
        }else{
          toast.error(data.message)
        }
      }else{
        const {data}=await axios.post(backendURL+'/api/user/login',{password,email})

        if(data.success){
          console.log(data.token);
          setUtoken(data.token)
          localStorage.setItem('utoken',data.token)
        }else{
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }


  useEffect(()=>{
    if(utoken){
      navigate('/')
    }
  },[utoken])

  return (
    <form onSubmit={onSubmitHandler} className='mih-h-[80vh] flex items-center'
      action="">
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='font-semibold text-2xl'>{state === 'signup' ? 'Create  Account' : 'Welcome back'}</p>
        <p>Please {state === 'signup' ? 'sign up' : 'log in'} to book appointment</p>
        {
          state === 'signup' &&
          <div className='w-full'>
            <p>Full Name</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1'
              required type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div >
        }

        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1'
            required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1'
            required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type='submit' className='bg-blue-500 cursor-pointer w-full text-white rounded px-8 py-2 mt-4'>{state === 'signup' ? 'create account' : 'Log In'}</button>
        {state === 'signup' ?
          <p className='text-xs'>Already have an account? <span onClick={() => setState('login')} className='text-blue-500 cursor-pointer'>Log In</span></p>
          :
          <p className='text-xs'>Don't have an account? <span onClick={() => setState('signup')} className='text-blue-500 cursor-pointer'>Sign Up</span></p>
        }
      </div>
    </form>
  )
}

export default Login
