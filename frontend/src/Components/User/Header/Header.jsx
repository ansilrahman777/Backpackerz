import logo from './../../../assets/Images/logo.png'
import profile from './../../../assets/Images/profile.png'
import { MdArticle  ,MdPermContactCalendar } from "react-icons/md";

import { GoHomeFill } from "react-icons/go";
import { PiTelegramLogoFill } from "react-icons/pi";
import HeaderItems from './HeaderItems';
import { IoLogOut } from "react-icons/io5";

import { Link, NavLink, useNavigate  } from 'react-router-dom';
import axiosInstance from '../../../Utils/AxiosInstance';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import axios from 'axios';


function Header() {

    const user = JSON.parse(localStorage.getItem('user'));

    const jwt_acess = JSON.parse(localStorage.getItem('access'))
     
    const refresh = JSON.parse(localStorage.getItem('refresh'))

    const navigate = useNavigate()

    useEffect(() => {
      if (jwt_acess === null && !user){
        console.log("user not found")
      }
      else{
        getSomeData()
      }     
    }, [jwt_acess,user])
    

    const handleLogOut = async () => {
        try {
            const res = await axios.post("http://127.0.0.1:8000/api/logout/", { "refresh_token": refresh })
            
            if (res.status === 200) {
                localStorage.removeItem('access')
                localStorage.removeItem('refresh')
                localStorage.removeItem('user')
                navigate('/login')
                toast.success("Logout successful")
            } else {
                // Handle unexpected status codes
                console.error("Unexpected status code:", res.status)
                toast.error("Logout failed: Unexpected status code")
            }
        } catch (error) {
            // Handle network errors or exceptions
            console.error("Logout error:", error)
            toast.error("Logout failed: Network error")
        }
    }
    
    
    
    const getSomeData  = async () => {
        const res = await axiosInstance.get("logintest/")
        if (res.status === 200){
            console.log(res.data)
        }
    }
    


  
    const menu=[
        {
            name:'Home',
            icon:GoHomeFill,
            link:'/'
        },
        {
            name:'Trips',
            icon:PiTelegramLogoFill
        },
        {
            name:'About',
            icon:MdArticle  
        },
        {
            name:'Contact',
            icon:MdPermContactCalendar
        },

    ]
    return (
        <div className='flex p-5 items-center justify-between'>
        <div className="flex gap-10 ">
            <img src={logo} className='w-[150px] md:w-[200px] object-cover cursor-pointer mr-20' />
            <div className='hidden md:flex gap-8'>
                {menu.map((item ,index)=>(
                    <Link key={index} to={item.link} className="text-black hover:text-gray-500">{/* Wrap menu item with Link */}
                        <HeaderItems name={item.name} Icon={item.icon} />
                    </Link>
                ))}
            </div>
        </div>
        <div className="flex items-center gap-12"> {/* Flex container for profile picture */}
            <div className='md:hidden flex gap-8'>
                {menu.map((item ,index)=>(
                    <HeaderItems key={index} to={item.link} name={item.name} Icon={item.icon} />
                ))}
            </div>
           
                {user && <button className="text-white hover:text-gray-500" onClick={handleLogOut}>
                <span>Logout</span> <IoLogOut className="inline-block" />
                </button>}
            
            <NavLink to="/login" activeClassName="active"> 
                <img className='flex w-[30px] rounded-full cursor-pointer' src={profile} />
            </NavLink>
        </div>
        
    </div>
    
  )
}

export default Header