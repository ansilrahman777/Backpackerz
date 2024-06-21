import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../Components/User/Header/Header";
import Footer from "../../Components/User/Footer/Footer";
import Pagination from "../../Components/User/Pagination/Pagination"; // Import the Pagination component
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function PackageBookingList() {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Items per page
  const base_url = import.meta.env.VITE_REACT_APP_BASE_URL_CONFIG;

  useEffect(() => {
    // Retrieve user details from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.user_id) {
      setUser(storedUser);

      axios
        .get(base_url + `/api/user-package-bookings/${storedUser.user_id}/`)
        .then((response) => {
          setBookings(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      console.error("User not found in local storage");
    }
  }, [base_url]);

  const cancelBooking = (bookingId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(base_url + `/api/package-bookings/${bookingId}/cancel/`)
          .then((response) => {
            // Update bookings state after cancellation
            setBookings((prevBookings) =>
              prevBookings.map((booking) => {
                if (booking.id === bookingId) {
                  return { ...booking, status: "Cancelled" };
                }
                return booking;
              })
            );
            Swal.fire({
              title: "Cancelled!",
              text: "Your booking has been cancelled.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error cancelling booking:", error);
            Swal.fire({
              title: "Error!",
              text: "Failed to cancel booking. Please try again later.",
              icon: "error",
            });
          });
      }
    });
  };

  // Get current bookings
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = bookings.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          <section className="m-4">
            <div className="flex flex-col">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
                    {bookings.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        <p>Make your first order!</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                              <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-x-3">
                                  <span>Booking ID</span>
                                </div>
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
                                No of Room
                              </th>
                              <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                Guests
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
                                  <div className="inline-flex items-center gap-x-3">
                                    <Link
                                      to={`/package-booking-view/${booking.id}`}
                                    >
                                      <span>{booking.booking_id}</span>
                                    </Link>
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
                                  {new Date(
                                    booking.start_date
                                  ).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                  {booking.no_of_guests}
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                  {booking.total_amount}
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                  {booking.status === "Pending" && (
                                    <button
                                      onClick={() => cancelBooking(booking.id)}
                                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-500"
                                    >
                                      Cancel
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {bookings.length > 0 && (
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={bookings.length}
                currentPage={currentPage}
                paginate={paginate}
              />
            )}
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PackageBookingList;
