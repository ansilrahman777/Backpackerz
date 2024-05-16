import { NavLink } from 'react-router-dom';
import logo from './../../assets/Images/logo.png'
import { CgProfile } from "react-icons/cg";


function Header() {
  return (
    // <div className="bg-emerald-500 text-white p-4 flex justify-between items-center w-full">
    //   <div className="text-xl font-semibold">
    //   <img src={logo} className='w-[150px] md:w-[200px] object-cover cursor-pointer' />
    //   </div>
    //   <div className="flex space-x-4">
    //     <span className="cursor-pointer  hover:text-gray-300">ADMIN</span>
    //     {/* Add other navigation tabs here */}
    //   </div>
    //   <button className="bg-black hover:bg-slate-500 text-white px-4 py-2 rounded-full">
    //     <CgProfile/>
    //   </button>
    // </div>

    <div className="bg-emerald-500 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-semibold">
      <img src={logo} className='w-[150px] md:w-[200px] object-cover cursor-pointer' />
      </div>
      <div className="flex space-x-4">
        <span className="cursor-pointer hover:text-gray-300">Packages</span>
        {/* Add other navigation tabs here */}
      </div>
      <button className="bg-black hover:bg-slate-500 text-white px-4 py-2 rounded-full">
      <NavLink to="/admin/profile" className="active">
      <CgProfile/>
        </NavLink>
      </button>
    </div>

  )
}

export default Header
