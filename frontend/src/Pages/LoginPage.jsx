import register_bg from './../assets/Images/register_bg.jpg';
import login_form_bg from './../assets/Images/login_form_bg.jpg';
import { FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Components/User/Header/Header';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from '../Components/Spinner';



const LoginPage = () => {

  const navigate = useNavigate()

  const [error, setError] = useState("")
  const [isLoading,setIsLoading] = useState(false)

  const [loginData, setLoginData] = useState({
    email:"",
    password:"",
  })

  const handleOnChange = (e) => {
    setLoginData({...loginData,[e.target.name]:e.target.value})
  
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const {email,password}=loginData
    if(!email || !password) {
      setError("Email and Password are requied")
    }else{
      setIsLoading(true)
      const res = await axios.post("http://127.0.0.1:8000/api/login/",loginData)
      const response = res.data
      console.log(response)
      setIsLoading(false)
      const user={
        "email":response.email,
        "name":response.full_name
      }
      if (res.status === 200){
        localStorage.setItem("user",JSON.stringify(user))
        localStorage.setItem("access",JSON.stringify(response.access_token))
        localStorage.setItem("refresh",JSON.stringify(response.refresh_token))
        navigate('/')
        toast.success("loging successfull")
      }


    }
  }

  return (
    <>
      <div className='min-h-screen bg-cover' style={{ backgroundImage: `url(${register_bg})` }}>
      <Header/>
        <div className='container mx-auto mt-10'>
          <div className="flex flex-col md:flex-row w-10/12  md:w-8/12 bg-sky-300 bg-opacity-70 mx-auto rounded-md overflow-hidden shadow-lg">
            <div className="w-full md:w-1/2 flex flex-col justify-center p-12 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${login_form_bg})` }}>
              <div className="mt-11 mb-auto">  
                  <h2 className='text-white text-4xl font-bold ' style={{ fontFamily: 'cursive' }}>LOGIN</h2>
                  <p className='text-white' style={{ fontFamily: 'cursive' }}>Are you planning a quick getaway? then you are at theright door.</p>
              </div>
            </div>
            <div className="w-full md:w-3/4 flex flex-col items-center justify-center py-16 px-12">
              <FaUser className="h-8 w-8 mr-2 text-white mt-14" />
              <p className='font-medium text-white'>User Login </p>
              <form className="px-8 pt-4 pb-8" onSubmit={handleOnSubmit}>
                  {isLoading && <Spinner /> }
                <div className="mb-2">
                  <input
                    type='email'
                    placeholder=' Email'
                    name='email'
                    value={loginData.email}
                    onChange={handleOnChange}
                    className="appearance-none border rounded-full w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-2">
                  {/* <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                    Password
                  </label> */}
                  <input
                    type='password'
                    placeholder=' Password'
                    name='password'
                    value={loginData.password}
                    onChange={handleOnChange}
                    className="appearance-none border rounded-full w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="bg-teal-800 hover:bg-teal-700 text-white font-bold py-1 px-2 rounded-full w-full focus:outline-none focus:shadow-outline"
                  >
                    LOGIN
                  </button>
                </div>
                <div className="flex items-center justify-center mt-4">
                  <div className="text-center">
                    <p>
                      <Link to="/register" className="text-white text-sm hover:text-blue-700">
                        forgot password
                      </Link>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center mt-4">
                  <div className="text-center">
                    <p className="text-white">Do not have an account Yet?</p>
                    <p>
                      <Link to="/register" className="text-white hover:text-blue-700">
                        Signup Here
                      </Link>
                    </p>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage