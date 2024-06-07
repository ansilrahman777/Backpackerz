import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../Components/User/Header/Header";
import Footer from "../../Components/User/Footer/Footer";
import axios from "axios";

function HotelBookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const base_url = import.meta.env.VITE_REACT_APP_BASE_URL_CONFIG;

  const [booking, setBooking] = useState(null);
  const [hotelDetails, setHotelDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`${base_url}/api/hotelbookings/${id}`)
      .then((response) => {
        setBooking(response.data);
        const hotel_id = response.data.hotel;
        if (hotel_id) {
          axios
            .get(`${base_url}/api/hotels/${hotel_id}/`)
            .then((response) => {
              setHotelDetails(response.data);
              console.log("hotel", response.data);
            })
            .catch((error) => {
              console.error("Error fetching booking:", error);
              toast.error("Error fetching booking");
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching booking details:", error);
      });
  }, [id, base_url]);

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 text-blue-500 hover:underline"
          >
            &larr; Back to bookings
          </button>
          {booking ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold">
                      {booking.full_name}
                    </h2>
                    <p className="text-gray-500">{booking.email}</p>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">
                    Order ID: {booking.booking_number}
                  </h2>
                </div>
              </div>
              <div className="flex justify-between items-center mb-6">
                <div className="w-1/3">
                  <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
                  <p className="text-gray-500">{booking.payment_method}</p>
                </div>
                <div className="w-1/3">
                  <h3 className="text-lg font-semibold mb-2">Booking Dates</h3>
                  <p className="text-gray-500">
                    {booking.start_date} to {booking.end_date}
                  </p>
                </div>
                <div className="w-1/3">
                  <h3 className="text-lg font-semibold mb-2">Booking Status</h3>
                  <p className="text-gray-500">{booking.booking_status}</p>
                </div>
              </div>

              {hotelDetails && (
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img
                        src={hotelDetails.image_url}
                        alt={hotelDetails.hotel_name}
                        className="w-12 h-12 rounded-lg"
                      />
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold">
                          {hotelDetails.hotel_name}
                        </h4>
                        
                      </div>
                    </div>
                    <div>
                    <p className="text-lg font-semibold">{hotelDetails.destination_name}</p>
                  </div>
                  </div>
                </div>
              )}
       
              <div className="bg-gray-100 p-4 rounded-lg mt-6">
                <h3 className="text-lg font-semibold mb-4">Total</h3>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-500">Subtotal</p>
                  <p className="text-gray-500">{booking.total}₹</p>
                </div>

                <hr className="my-2" />
                <div className="flex justify-between items-center">
                  <p className="font-semibold">Total</p>
                  <p className="font-semibold">{booking.total}₹</p>
                </div>
              </div>
            </>
          ) : (
            <p>Loading booking details...</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HotelBookingDetails;
