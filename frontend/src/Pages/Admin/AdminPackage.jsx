import Header from '../../Components/Admin/Header'
import AsideBar from '../../Components/Admin/AsideBar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';


function AdminPackage() {

  const [packages, setPackages] = useState([]);

  useEffect(() => {
    // Fetch packages from the backend API
    axios.get('http://127.0.0.1:8000/api/admin_side/packages/')
      .then(response => {
        setPackages(response.data);
      })
      .catch(error => {
        console.error('Error fetching packages:', error);
      });
  }, []);
    
  return (
    
    <div >
      <Header />
     
      <div className="flex">
        <AsideBar />
        <div className='m-3'>
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Packages
            </h2>
          </div>
          <div className="mt-2 flex lg:ml-4 lg:mt-0">
            <span className="sm:ml-3">
            <Link
                to="/admin/add-package"
                className="inline-flex items-center cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add New Package
            </Link>
            </span>
          </div>
        </div>
        <div className="bg-white">
          <div className="mt-5">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {packages.map((product) => (
              <Link key={product.id} to={`/admin/packages/edit/${product.id}`} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={product.image_url}
                    alt={product.package_name}
                    className="h-[256px] w-[256px] object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.package_name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
              </Link>
            ))}
          </div>
          </div>
        </div>
        </div>         
      </div>  
    </div>

  )
}

export default AdminPackage