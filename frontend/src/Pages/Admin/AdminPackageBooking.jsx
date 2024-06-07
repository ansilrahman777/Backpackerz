import React, { useState, useEffect } from "react";
import Header from "../../Components/Admin/Header";
import AsideBar from "../../Components/Admin/AsideBar";
import axios from "axios";
import Pagination from "../../Components/Admin/Pagination/Pagination";
import Swal from "sweetalert2";

function AdminPackageBooking() {
  const base_url = import.meta.env.VITE_REACT_APP_BASE_URL_CONFIG;

  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const token = localStorage.getItem("access"); 
  const fetchBookings = () => {
    fetch(base_url + "/api/admin_side/package-bookings/")
      .then((response) => response.json())
      .then((data) => setBookings(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    // Fetch data from API when component mounts
    fetchBookings();
  }, []);

  // Get current packages
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = bookings.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const cancelBooking = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(
            base_url + `/api/admin_side/package-bookings/${id}/cancel/`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(() => {
            Swal.fire("Cancelled!", "The booking has been cancelled.", "success");
            fetchBookings(); // Refresh the bookings after cancellation
          })
          .catch((error) => console.error("Error cancelling booking:", error));
      }
    });
  };

  const confirmBooking = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(
            base_url + `/api/admin_side/package-bookings/${id}/confirm/`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(() => {
            Swal.fire("Confirmed!", "The booking has been confirmed.", "success");
            fetchBookings(); // Refresh the bookings after confirmation
          })
          .catch((error) => console.error("Error confirming booking:", error));
      }
    });
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
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <div className="flex items-center gap-x-3">
                            <button className="flex items-center gap-x-2">
                              <span>Booking ID</span>
                            </button>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Customer
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Package Name
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Guest
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="flex justify-center px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {currentBookings.map((booking) => (
                        <tr key={booking.id}>
                          <td className="px-4 py-4 text-xs font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              <span>{booking.booking_id}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {new Date(
                              booking.booking_date
                            ).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                              <h2 className="text-sm font-normal">
                                {booking.status}
                              </h2>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            <div className="flex items-center gap-x-2">
                              <img
                                className="object-cover w-8 h-8 rounded-full"
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                                alt=""
                              />
                              <div>
                                <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
                                  {booking.full_name}
                                </h2>
                                <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                                  {booking.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {booking.package_name}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {booking.no_of_guests}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {booking.total_amount}
                          </td>
                          <td className="flex px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {booking.status !== 'Cancelled' && (
                              <button
                                className="text-red-800 mx-3"
                                onClick={() => cancelBooking(booking.id)}
                              >
                                Cancel
                              </button>
                            )}
                            {booking.status !== 'Confirmed' && (
                              <button
                                className="text-green-400 mx-3"
                                onClick={() => confirmBooking(booking.id)}
                              >
                                Confirm
                              </button>
                            )}
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

export default AdminPackageBooking;
