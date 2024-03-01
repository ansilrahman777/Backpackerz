import { Link } from 'react-router-dom'; 
import register_bg from './../assets/Images/register_bg.jpg';
import register_form_bg from './../assets/Images/register_form_bg.jpg';
import { FaUser } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";

import Header from '../Components/User/Header/Header';

const RegisterPage = () => {
  

  return (
    <>
      <div className='min-h-screen bg-cover' style={{ backgroundImage: `url(${register_bg})` }}>
      <Header/>
        <div className='container mx-auto mt-10'>
          <div className="flex flex-col md:flex-row w-10/12 md:w-8/12 bg-sky-950 bg-opacity-90 mx-auto rounded-md overflow-hidden shadow-lg">
            <div className="w-full md:w-3/4 flex flex-col items-center justify-center py-16 px-12">
              <FaUser className="h-8 w-8 mr-2 text-white" />
              <p className='font-medium text-white'>Signup to Register</p>
           
              <form className="px-8 pt-4 pb-8">
                <div className="mb-2">
                  <input
                    type='text'
                    placeholder=' First Name'
                    name='first_name'
                    className="appearance-none border rounded-full w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-2">
                  <input
                    type='text'
                    placeholder=' Last Name'
                    name='last_name'
                    className="appearance-none border rounded-full w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-2">
                  <input
                    type='email'
                    placeholder=' Email'
                    name='email'
                    className="appearance-none border rounded-full w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-2">
                  <input
                    type='tel'
                    placeholder=' Mobile'
                    name='mobile'
                    className="appearance-none border rounded-full w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-2">
                  <input
                    type='password'
                    placeholder="Password"
                    name="password"
                    className="appearance-none border rounded-full w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-2">
                  <input
                    type='password'
                    placeholder="Confirm Password"
                    name="re_password"
                    className="appearance-none border rounded-full w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="bg-teal-800 hover:bg-teal-700 text-white font-bold py-1 px-2 rounded-full w-full focus:outline-none focus:shadow-outline"
                  >
                    SIGN UP
                  </button>
                </div>
                <div className="flex items-center justify-center mt-2">
                  <hr className="border-t border-gray-300 w-full" />
                  <span className="px-3 text-white text-xs">OR</span>
                  <hr className="border-t border-gray-300 w-full" />
                </div>
                <div className="relative mt-2">
                  <input
                    type="text"
                    id="signin_with_google"
                    className="appearance-none border rounded-full w-full py-1 px-2 pl-8 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <span className="absolute ml-10 inset-y-0 left-0 flex items-center">
                    <FcGoogle className="text-gray-400 mr-1" />
                    <span className="text-black">Sign In with Google</span>
                  </span>
                </div>
                <div className="flex items-center justify-center mt-4">
                  <div className="text-center">
                    <p className="text-white">Already Have a account?</p>
                    <p>
                      <Link to="/login" className="text-blue-500 hover:text-blue-700">
                        Login Here
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center p-12 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${register_form_bg})` }}>
              <div className="mt-11 mb-auto">  
                  <h2 className='text-white text-4xl font-bold ' style={{ fontFamily: 'cursive' }}>SIGNUP</h2>
                  <p className='text-white' style={{ fontFamily: 'cursive' }}>Are you planning a quick getaway? then you are at theright door.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterPage;
