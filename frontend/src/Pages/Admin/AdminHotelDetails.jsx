import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Header from "../../Components/Admin/Header";
import AsideBar from "../../Components/Admin/AsideBar";
import "ldrs"; // import ldrs for the loader component

function AdminHotelDetails() {
  const base_url=import.meta.env.VITE_REACT_APP_BASE_URL_CONFIG

  const { hotel_id } = useParams(); // Get hotel ID from URL
  const [hotelData, setHotelData] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize loading state as true

  useEffect(() => {
    setLoading(true); // Set loading to true when the component mounts
    axios
      .get(base_url+`/api/admin_side/hotel/${hotel_id}/`)
      .then((response) => {
        setHotelData(response.data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching hotel details:", error);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, [hotel_id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <l-infinity
          size="55"
          stroke="4"
          stroke-length="0.15"
          bg-opacity="0.1"
          speed="1.3"
          color="black"
        ></l-infinity>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (!hotelData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No hotel data available.</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="flex">
        <AsideBar />
        <div className="m-4">
          <div className="">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Hotel Details
              </h2>

              <div className="mt-10">
                <div>
                  <div className="">
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                        <input
                          readOnly
                          value={hotelData.hotel_name}
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="">
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                          <textarea
                            readOnly
                            value={hotelData.hotel_description}
                            rows="3"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                          <input
                            readOnly
                            type="text"
                            value={hotelData.pricing}
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                          <input
                            readOnly
                            type="text"
                            value={hotelData.contact_no}
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                          <input
                            readOnly
                            type="text"
                            value={hotelData.hotel_type}
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                          <input
                            readOnly
                            type="text"
                            value={hotelData.rooms}
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                          <input
                            readOnly
                            type="text"
                            value={hotelData.rating}
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                          <input
                            readOnly
                            type="text"
                            value={
                              hotelData.is_available
                                ? "Available"
                                : "Not Available"
                            }
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                          <input
                            readOnly
                            type="text"
                            value={hotelData.destination_name}
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Hotel Image
                      </label>
                      <div className="mt-2 flex justify-start rounded-lg">
                        <div>
                          <img
                            src={hotelData.image_url}
                            alt={hotelData.hotel_name}
                            className="rounded-md h-[156px] w-[156px] object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-semibold leading-7 text-gray-900">
                    Itinerary
                  </h3>
                  {hotelData.itinerary.map((item, index) => (
                    <div className="sm:col-span-6" key={index}>
                      <h4 className="text-base font-semibold leading-7 text-gray-900">
                        Day {item.day}
                      </h4>
                      <div className="flex space-x-4 mt-2">
                        <input
                          readOnly
                          type="text"
                          value={item.day}
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 sm:text-sm sm:leading-6"
                        />
                        <textarea
                          readOnly
                          value={item.description}
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 sm:text-sm sm:leading-6"
                        />
                        {item.activity && (
                          <textarea
                            readOnly
                            value={item.activity}
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 sm:text-sm sm:leading-6"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="text-base font-semibold leading-7 text-gray-900">
                    Additional Details
                  </h3>
                  {hotelData.details.map((item, index) => (
                    <div className="sm:col-span-6" key={index}>
                      <div className="flex space-x-4 mt-2">
                        <input
                          readOnly
                          type="text"
                          value={item.detail}
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="">
                  <h3 className="text-base font-semibold leading-7 text-gray-900">
                    Additional Images
                  </h3>
                  <div className="flex ">
                    {hotelData.images.map((image, index) => (
                      <div key={index} className="flex  space-x-4 m-2">
                        <img
                          src={image.image}
                          alt={`Additional Image ${index + 1}`}
                          className="flex h-40 gap-3 w-40 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* <div className="flex gap-x-56 mt-6">
                  <div className="mt-2 flex lg:ml-4 lg:mt-0">
                    <span className="sm:ml-3">
                      <Link
                        to={`/admin/add-hotel-itinerary/${hotel_id}`}
                        state={{ hotelId: hotel_id }}
                        className="inline-flex items-center cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Add Itinerary
                      </Link>
                    </span>
                  </div>
                  <div className="mt-2 flex lg:ml-4 lg:mt-0">
                    <span className="sm:ml-3">
                      <Link
                        to={`/admin/add-hotel-detail/${hotel_id}`}
                        state={{ hotelId: hotel_id }}
                        className="inline-flex items-center cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Add Detail
                      </Link>
                    </span>
                  </div>
                  <div className="mt-2 flex lg:ml-4 lg:mt-0">
                    <span className="sm:ml-3">
                      <Link
                        to={`/admin/add-hotel-images/${hotel_id}`}
                        state={{ hotelId: hotel_id }}
                        className="inline-flex items-center cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Add Images
                      </Link>
                    </span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHotelDetails;
