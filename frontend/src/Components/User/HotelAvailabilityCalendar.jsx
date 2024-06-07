import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import 'react-calendar/dist/Calendar.css';
import { toast } from "react-toastify";

const HotelAvailabilityCalendar = ({ hotelId }) => {
  const [bookings, setBookings] = useState([]);
  const [dateAvailability, setDateAvailability] = useState([]);

  const base_url = import.meta.env.VITE_REACT_APP_BASE_URL_CONFIG;

  useEffect(() => {
    if (hotelId) {
      axios
        .get(`${base_url}/api/hotels/${hotelId}/bookings/`)
        .then((response) => {
          setBookings(response.data);
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
          toast.error("Error fetching bookings. Please try again later.");
        });
    }
  }, [hotelId]);

  useEffect(() => {
    const availability = bookings.map(booking => {
      return {
        start: new Date(booking.start_date),
        end: new Date(booking.end_date)
      };
    });
    setDateAvailability(availability);
  }, [bookings]);

  const tileDisabled = ({ date, view }) => {
    if (view === 'month') {
      return dateAvailability.some(
        booking =>
          date >= booking.start &&
          date <= booking.end
      );
    }
    return false;
  };

  return (
    <div>
      <Calendar
        tileDisabled={tileDisabled}
      />
    </div>
  );
};

export default HotelAvailabilityCalendar;
