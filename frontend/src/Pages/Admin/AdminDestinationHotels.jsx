import Header from "../../Components/Admin/Header";
import AsideBar from "../../Components/Admin/AsideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Pagination from "../../Components/Admin/Pagination/Pagination"; 

function AdminDestinationHotels() {
  const base_url = import.meta.env.VITE_REACT_APP_BASE_URL_CONFIG;

  const { destination_id } = useParams(); // get destination ID from URL
  const [hotels, setHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2); // Items per page

  useEffect(() => {
    // Fetch hotels for the specific destination from the backend API
    axios
      .get(base_url + `/api/admin_side/destinations/${destination_id}/hotels/`)
      .then((response) => {
        setHotels(response.data);
      })
      .catch((error) => {
        console.error("Error fetching hotels:", error);
      });
  }, [base_url, destination_id]);

  // Get current hotels
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHotels = hotels.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Header />
      <div className="flex">
        <AsideBar />
        <div className="m-3">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Hotels
              </h2>
            </div>
            <div className="mt-2 flex lg:ml-4 lg:mt-0">
              <span className="sm:ml-3">
                <Link
                  to={`/admin/hotels/add-hotel/${destination_id}`}
                  className="inline-flex items-center cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add New Hotel
                </Link>
              </span>
            </div>
          </div>
          <div className="bg-white">
            <div className="mt-5">
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {currentHotels.length > 0 ? (
                  currentHotels.map((hotel) => (
                    <Link
                      key={hotel.id}
                      to={`/admin/hotel/hotel-details/${hotel.id}`}
                      className="group"
                    >
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                        <img
                          src={hotel.image_url}
                          alt={hotel.hotel_name}
                          className="h-[256px] w-[256px] object-cover object-center group-hover:opacity-75"
                        />
                      </div>
                      <h3 className="mt-4 text-sm text-gray-700">
                        {hotel.hotel_name}
                      </h3>
                      <p className="mt-1 text-lg font-medium text-gray-900">
                        {hotel.pricing}
                      </p>
                    </Link>
                  ))
                ) : (
                  <p className="text-lg text-gray-500 py-8 text-center">
                    No hotels found.
                  </p>
                )}
              </div>
            </div>
            {hotels.length > 0 && (
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={hotels.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDestinationHotels;
