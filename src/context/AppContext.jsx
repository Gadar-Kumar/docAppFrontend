import { createContext, useEffect, useState } from "react";
// import { doctors } from "../assets/assets_frontend/assets";
import axios from 'axios'
import { toast } from "react-toastify";



export const AppContext=createContext()

const AppContextProvider=({children})=>{
  
    const currencySymbol='₹';
    const currancy='₹';
    const backendURL=import.meta.env.VITE_BACKEND_URL
    const [doctors,setDoctors]=useState([])
    const [utoken,setUtoken]=useState(localStorage.getItem('utoken')?localStorage.getItem('utoken'):false)
    const [userData,setUserData]=useState(false)

    const getDoctorData=async()=>{
        try {
            const {data}=await axios.get(backendURL+'/api/doctor/list')

            if(data.success){
                console.log(data.doctors);
                setDoctors(data.doctors)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const loadUserProfileData=async()=>{
        try {
            const {data}=await axios.get(backendURL+'/api/user/profile',{headers:{utoken}})

            if(data.success){
                setUserData(data.userData)
            }else{
                toast.error(error.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getDoctorData()
    },[])

    useEffect(()=>{
        if(utoken){
            loadUserProfileData()
        }else{
            setUserData(false)
        }
    },[utoken])

    const value={
        doctors,
        getDoctorData,
        currancy,
        currencySymbol,
        utoken,
        setUtoken,
        backendURL,
        userData,
        setUserData,
        loadUserProfileData,
    }

    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
export default AppContextProvider;

    

