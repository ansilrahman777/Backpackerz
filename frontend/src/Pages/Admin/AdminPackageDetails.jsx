import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Header from "../../Components/Admin/Header";
import AsideBar from "../../Components/Admin/AsideBar";
import "ldrs"; // import ldrs for the loader component

function AdminPackageDetails() {
  const base_url=import.meta.env.VITE_REACT_APP_BASE_URL_CONFIG

  const { id } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize loading state as true

  useEffect(() => {
    setLoading(true); // Set loading to true when the component mounts
    axios
      .get(base_url+`/api/admin_side/packages/${id}/`)
      .then((response) => {
        setPackageData(response.data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching package details:", error);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, [id]);

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

  if (!packageData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No package data available.</p>
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
                Package Details
              </h2>

              <div className="mt-10">
                <div>
                  <div className="">
                    <div className="">
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                          <input
                            readOnly
                            value={packageData.package_name}
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                          <textarea
                            readOnly
                            value={packageData.description}
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
                            value={packageData.price}
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
                            value={packageData.duration}
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
                            value={packageData.no_of_nights}
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
                            value={packageData.destination}
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Package Image
                      </label>
                      <div className="mt-2 flex justify-start rounded-lg">
                        <div>
                          <img
                            src={packageData.image_url}
                            alt={packageData.package_name}
                            className="rounded-md h-[156px] w-[156px] object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  {packageData.itinerary.map((item, index) => (
                    <div className="sm:col-span-6" key={index}>
                      <h3 className="text-base font-semibold leading-7 text-gray-900">
                        Itinerary - Day {item.day_number}
                      </h3>
                      <div className="flex space-x-4 mt-2">
                        <input
                          readOnly
                          type="text"
                          value={item.day_number}
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 sm:text-sm sm:leading-6"
                        />
                        <textarea
                          readOnly
                          value={item.description}
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 sm:text-sm sm:leading-6"
                        />
                        {item.image && (
                          <img
                            src={item.image}
                            alt={`Itinerary Day ${item.day_number}`}
                            className="h-20 w-20 object-cover"
                          />
                        )}
                      </div>
                    </div>
                  ))}

                  {packageData.inclusions.map((item, index) => (
                    <div className="sm:col-span-6" key={index}>
                      <h3 className="text-base font-semibold leading-7 text-gray-900">
                        Inclusion {index + 1}
                      </h3>
                      <div className="flex space-x-4 mt-2">
                        <input
                          readOnly
                          type="text"
                          value={item.inclusion}
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  ))}

                  {packageData.exclusions.map((item, index) => (
                    <div className="sm:col-span-6" key={index}>
                      <h3 className="text-base font-semibold leading-7 text-gray-900">
                        Exclusion {index + 1}
                      </h3>
                      <div className="flex space-x-4 mt-2">
                        <input
                          readOnly
                          type="text"
                          value={item.exclusion}
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
                    {packageData.images.map((image, index) => (
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
              </div>
            </div>
            <div className="flex gap-x-56 mt-6">
              <div className="mt-2 flex lg:ml-4 lg:mt-0">
                <span className="sm:ml-3">
                  <Link
                    to={`/admin/add-package-itinerary/${id}`}
                    state={{ packageId: id }}
                    className="inline-flex items-center cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add itinerary
                  </Link>
                </span>
              </div>
              <div className="mt-2 flex lg:ml-4 lg:mt-0">
                <span className="sm:ml-3">
                  <Link
                    to={`/admin/add-package-inclusion/${id}`}
                    state={{ packageId: id }}
                    className="inline-flex items-center cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add inclusion
                  </Link>
                </span>
              </div>
              <div className="mt-2 flex lg:ml-4 lg:mt-0">
                <span className="sm:ml-3">
                  <Link
                    to={`/admin/add-package-exclusion/${id}`}
                    state={{ packageId: id }}
                    className="inline-flex items-center cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Exclusion
                  </Link>
                </span>
              </div>
              <div className="mt-2 flex lg:ml-4 lg:mt-0">
                <span className="sm:ml-3">
                  <Link
                    to={`/admin/add-package-images/${id}`}
                    state={{ packageId: id }}
                    className="inline-flex items-center cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add images
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPackageDetails;
