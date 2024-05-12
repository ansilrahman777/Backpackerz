import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Components/User/Header/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function HotelConfirmBooking() {
  const { bookingId } = useParams(); 
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  console.log(user.user_id);
  useEffect(() => {
    axios
    .get(`http://127.0.0.1:8000/api/hotelbookings/${bookingId}`)
    .then((response) => {
      setBookingDetails(response.data);
      if (response.data.status === 'Payment Complete') {
        // Redirect to home page if booking status is "payment complete"
        toast.error("Booking completed.");
        navigate('/');

      }

    })
    .catch((error) => {
      console.error('Error fetching booking details:', error);
    });
  }, [bookingId]); // Include bookingId in the dependency array
  const [bookingDetails, setBookingDetails] = useState(null);


  return (
    <div>
      <Header />
      <div className="container mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-5">Hotel Booking Confirmation</h1>
        {bookingDetails ? (
          <div>
            <p><strong>Booking ID:</strong> {bookingDetails.id}</p>
            <p><strong>Full Name:</strong> {bookingDetails.full_name}</p>
            <p><strong>Email:</strong> {bookingDetails.email}</p>
            <p><strong>Phone:</strong> {bookingDetails.phone}</p>
            <p><strong>Start Date:</strong> {bookingDetails.start_date}</p>
            <p><strong>End Date:</strong> {bookingDetails.end_date}</p>
            <p><strong>No. of Guests:</strong> {bookingDetails.no_of_guest}</p>
            <p><strong>No. of Rooms:</strong> {bookingDetails.no_of_room}</p>
            <p><strong>Total Amount:</strong> ₹ {bookingDetails.total}</p> 
            <p><strong>hotel:</strong> ₹ {bookingDetails.hotel}</p>

            <div className="">
            <form action='http://127.0.0.1:8000/api/create-checkout-session/' method='POST'>
                      <input type="hidden" name="booking_id" value={bookingDetails.id} />
                      <input type="hidden" name="user_id" value={user.user_id} />
                      
                      <button type='submit'>Make Payment</button>
                    </form>
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
