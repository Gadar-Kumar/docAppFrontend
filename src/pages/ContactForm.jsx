import React, { useState } from 'react'



function ContactForm() {

    const [formData, setFormData] = useState({
        name:'',
        email:'',
        message:''
    })

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(formData);
    }

  return (
   <form onSubmit={handleSubmit} 
   className='max-w-md mx-auto border border-gray-400 rounded-md p-6' action="">
    <div className='w-11/12 mx-auto flex flex-col gap-1'>
        <div className='flex items-center w-full gap-1 mx-4'>
            <label htmlFor="name">Name</label>
        </div>
        <input type="text"
         required
         value={formData.name}
         onChange={(e)=>setFormData({...formData, name: e.target.value})}
         id="name"
         placeholder='Name'
         className='border border-gray-400 rounded-md px-4 py-2 w-full mb-4' />
        <div className='mx-4'>
            <label htmlFor="email">Email</label>
        </div>
        <input type="email"
        value={formData.email}
        onChange={(e)=>setFormData({...formData,email:e.target.value})}
         id="email" 
         required
         placeholder='Email'
         className='border border-gray-400 rounded-md px-4 py-2 w-full mb-4' />
        <div className='mx-4'>
            <label htmlFor="message">Message</label>
        </div>
        <textarea id="message" 
        value={formData.message}
        onChange={(e)=>setFormData({...formData, message: e.target.value})}
        placeholder='Message' className='border border-gray-400 rounded-md px-4 py-2 w-full mb-4' rows='4'></textarea>
        <button  type='submit' className='border border-black rounded-full text-gray-900 cursor-pointer mt-10 px-8 py-4 hover:bg-black hover:text-white transition-all duration-600'>Send Message</button>
    </div>
   </form>
  )
}

export default ContactForm
