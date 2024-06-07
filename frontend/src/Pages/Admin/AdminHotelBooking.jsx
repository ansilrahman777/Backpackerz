import React, { useState, useEffect } from "react";
import Header from "../../Components/Admin/Header";
import AsideBar from "../../Components/Admin/AsideBar";
import Pagination from "../../Components/Admin/Pagination/Pagination";

function AdminHotelBooking() {
  const base_url = import.meta.env.VITE_REACT_APP_BASE_URL_CONFIG;

  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [dropdownId, setDropdownId] = useState(null);

  useEffect(() => {
    fetch(base_url + "/api/admin_side/hotel-bookings/")
      .then((response) => response.json())
      .then((data) => setBookings(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  const token = localStorage.getItem("access");

  const updateBookingStatus = (id, newStatus) => {
    fetch(base_url + `/api/admin_side/hotel-bookings/${id}/update-status/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setBookings((prevBookings) =>
            prevBookings.map((booking) =>
              booking.id === id
                ? { ...booking, booking_status: newStatus }
                : booking
            )
          );
        }
      })
      .catch((error) => console.error("Error updating status:", error));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = bookings.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleDropdown = (id) => {
    if (dropdownId === id) {
      setDropdownId(null);
    } else {
      setDropdownId(id);
    }
  };
  const getStatusStyle = (status) => {
    switch (status) {
      case "Upcoming":
        return "inline-flex items-center px-3 mt-5 py-1 rounded-full gap-x-2  text-yellow-500 bg-emerald-100/60 dark:bg-gray-800";
      case "Ongoing":
        return "inline-flex items-center px-3 mt-5 py-1 rounded-full gap-x-2  text-yellow-500 bg-emerald-100/60 dark:bg-gray-800";
      case "Completed":
        return "inline-flex items-center px-3 mt-5 py-1 rounded-full gap-x-2  text-emerald-500 bg-emerald-100/60 dark:bg-gray-800";
      case "Cancelled":
        return "inline-flex items-center px-3 mt-5 py-1 rounded-full gap-x-2  text-red-500 bg-emerald-100/60 dark:bg-gray-800";
      case "Cancelled by Admin":
        return "inline-flex items-center px-3 mt-5 py-1 rounded-full gap-x-2  text-red-500 bg-emerald-100/60 dark:bg-gray-800";
      default:
        return "inline-flex items-center px-3 mt-5 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800";
    }
  };

  return (
    <div>
      <Header />
      <div className="flex">
        <AsideBar />
        <section className="container m-4">
          <div className="flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Booking ID
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Date
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Status
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Customer
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Hotel Name
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Rooms
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Amount
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {currentBookings.map((booking) => (
                        <tr key={booking.id}>
                          <td className="px-4 py-4 text-xs font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                            {booking.booking_number}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {new Date(booking.start_date).toLocaleDateString()}
                          </td>
                          <td
                            className={`${getStatusStyle(
                              booking.booking_status
                            )}`}
                          >
                            <div className="">
                              <h2 className="text-sm font-normal">
                                {booking.booking_status}
                              </h2>
                            </div>
                          </td>{" "}
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            <div className="flex items-center gap-x-2">
                              <img
                                className="object-cover w-8 h-8 rounded-full"
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                                alt=""
                              />
                              <div>
                                <h2 className="text-sm font-medium text-gray-800 dark:text-white">
                                  {booking.full_name}
                                </h2>
                                <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                                  {booking.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {booking.hotel_name}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {booking.no_of_room}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {booking.total}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            <div className="relative inline-block text-left">
                              <button
                                id={`dropdownDefaultButton-${booking.id}`}
                                data-dropdown-toggle={`dropdown-${booking.id}`}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                type="button"
                                onClick={() => toggleDropdown(booking.id)}
                              >
                                Action
                                <svg
                                  className="w-2.5 h-2.5 ms-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 10 6"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 4 4 4-4"
                                  />
                                </svg>
                              </button>
                              {dropdownId === booking.id && (
                                <div
                                  id={`dropdown-${booking.id}`}
                                  className="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5 focus:outline-none z-10 dark:bg-gray-700"
                                  role="menu"
                                  aria-orientation="vertical"
                                  aria-labelledby={`dropdownDefaultButton-${booking.id}`}
                                >
                                  <div className="py-1" role="none">
                                    <button
                                      className="block px-4 py-2 text-sm text-white  hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                                      onClick={() =>
                                        updateBookingStatus(
                                          booking.id,
                                          "Completed"
                                        )
                                      }
                                    >
                                      Complete
                                    </button>
                                    <button
                                      className="block px-4 py-2 text-sm  text-white  hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                                      onClick={() =>
                                        updateBookingStatus(
                                          booking.id,
                                          "Cancelled by Admin"
                                        )
                                      }
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            {bookings.length > 0 && (
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={bookings.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminHotelBooking;
