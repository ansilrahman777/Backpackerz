import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Components/User/Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function HotelConfirmBooking() {
  const base_url = import.meta.env.VITE_REACT_APP_BASE_URL_CONFIG;

  const { bookingId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  console.log(user.user_id);
  useEffect(() => {
    if (!user) {
      // Redirect to login page if user is not logged in
      navigate("/login");
      toast.success("Login for book you Hotel");

      return;
    }
    axios
      .get(base_url + `/api/hotelbookings/${bookingId}`)
      .then((response) => {
        setBookingDetails(response.data);
        if (response.data.status === "Payment Complete") {
          // Redirect to home page if booking status is "payment complete"
          toast.success("Booking completed.");
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error fetching booking details:", error);
      });
  }, [bookingId]); // Include bookingId in the dependency array
  const [bookingDetails, setBookingDetails] = useState(null);

  return (
    <div className="min-h-screen bg-cover">
      <Header />
      <div className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl text-center text-white font-bold mb-5">
          Hotel Booking Confirmation
        </h1>
        {bookingDetails ? (
          <div className="w-full max-w-lg px-4 py-8 mx-auto bg-gray-100 rounded-lg shadow-xl sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto space-y-6">
              <p className="text-gray-600">Booking Summary</p>
              <p>No Refund for Confirmed Bookings</p>

              <div className="text-base leading-7">
                <p>
                  <strong>Full Name:</strong> {bookingDetails.full_name}
                </p>
                <p>
                  <strong>Email:</strong> {bookingDetails.email}
                </p>
                <p>
                  <strong>Phone:</strong> {bookingDetails.phone}
                </p>
                <p>
                  <strong>Start Date:</strong> {bookingDetails.start_date}
                </p>
                <p>
                  <strong>End Date:</strong> {bookingDetails.end_date}
                </p>
                <p>
                  <strong>No. of Guests:</strong> {bookingDetails.no_of_guest}
                </p>
                <p>
                  <strong>No. of Rooms:</strong> {bookingDetails.no_of_room}
                </p>
                <p>
                  <strong>Total Amount:</strong> ₹ {bookingDetails.total}
                </p>

                <div className="mt-4">
                  <form
                    action={`${base_url}/api/create-checkout-session/`}
                    method="POST"
                  >
                    <input
                      type="hidden"
                      name="booking_id"
                      value={bookingDetails.id}
                    />
                    <input type="hidden" name="user_id" value={user.user_id} />

                    <button
                      className="block w-full px-4 py-2 font-medium tracking-wide text-center text-white capitalize transition-colors duration-300 transform bg-teal-400 rounded-md hover:bg-teal-500 focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80"
                      type="submit"
                    >
                      Make Payment
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default HotelConfirmBooking;
