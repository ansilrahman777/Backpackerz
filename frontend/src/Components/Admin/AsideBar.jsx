import { Link } from "react-router-dom"

function AsideBar() {
    return (
      <div className="bg-emerald-400 text-black w-1/5 p-4 h-screen">
        <ul className="space-y-2">
        <li><Link to="/admin/dashboard" className="cursor-pointer hover:text-gray-300">Dashboard</Link></li>
        <li><Link to="/admin/packages" className="cursor-pointer hover:text-gray-300">Packages</Link></li>
        <li><Link to="/admin/hotels" className="cursor-pointer hover:text-gray-300">Hotels</Link></li>
        <li><Link to="/admin/booking" className="cursor-pointer hover:text-gray-300">Booking</Link></li>
        <li><Link to="/admin/users" className="cursor-pointer hover:text-gray-300">Users</Link></li>
        <li><Link to="/admin/banner" className="cursor-pointer hover:text-gray-300">Banner</Link></li>
        <li><Link to="/admin/enquiry" className="cursor-pointer hover:text-gray-300">Enquiry</Link></li>
        </ul>
      </div>
    )
  }
  
  export default AsideBar