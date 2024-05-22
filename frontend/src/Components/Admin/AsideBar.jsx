import { Link } from "react-router-dom";

function AsideBar() {
  return (
    <div className="bg-emerald-400  text-black w-1/5 p-4 min-h-screen">
      <ul className="space-y-2">
        <li className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          <Link
            to="/admin/dashboard"
            className="cursor-pointer hover:text-gray-300"
          >
            Dashboard
          </Link>
        </li>
        <li className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          <Link
            to="/admin/packages"
            className="cursor-pointer hover:text-gray-300"
          >
            Packages
          </Link>
        </li>
        <li className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          <Link
            to="/admin/destinations"
            className="cursor-pointer hover:text-gray-300"
          >
            Destinations
          </Link>
        </li>
        <li className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          <Link
            to="/admin/hotel-booking"
            className="cursor-pointer hover:text-gray-300"
          >
            Hotel Booking
          </Link>
        </li>
        <li className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          <Link
            to="/admin/package-booking"
            className="cursor-pointer hover:text-gray-300"
          >
            Package Booking
          </Link>
        </li>
        <li className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          <Link
            to="/admin/users"
            className="cursor-pointer hover:text-gray-300"
          >
            Users
          </Link>
        </li>       
        <li className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          <Link
            to="/admin/admin_chat"
            className="cursor-pointer hover:text-gray-300"
          >
            Chat
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default AsideBar;