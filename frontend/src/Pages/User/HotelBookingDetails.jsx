import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../Components/User/Header/Header";
import Footer from "../../Components/User/Footer/Footer";
import axios from "axios";
import { toast } from "react-toastify";

function HotelBookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const base_url = import.meta.env.VITE_REACT_APP_BASE_URL_CONFIG;

  const [booking, setBooking] = useState(null);
  const [hotelDetails, setHotelDetails] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const [reviewForm, setReviewForm] = useState({
    rating: 5, 
    comment: "",
  });
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

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

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("access");
    const isValidComment = /^[a-zA-Z0-9\s]*$/.test(reviewForm.comment); 
    const isValidRating = reviewForm.rating >= 1 && reviewForm.rating <= 5; 

  if (!isValidRating) {
    toast.error("Please rate between 1 to 5.");
    return;
  }

    if (!isValidComment) {
      toast.error("Invalid Feedback. Please type proper Feedback.");
      return;
    }

    axios
      .post(
        base_url + "/api/hotel-reviews/",
        {
          hotel: hotelDetails.id,
          user: user.user_id,
          rating:reviewForm.rating,
          comment: reviewForm.comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        toast.success("Review Added Successfully");
        setReviewForm({ comment: "" });
        setShowModal(false); // Close the modal after submitting
      })
      .catch((error) => {
        console.error("Error adding review:", error);
      });
  };
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
                      <p className="text-lg font-semibold">
                        {hotelDetails.destination_name}
                      </p>
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
              {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                  <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div
                      className="fixed inset-0 transition-opacity"
                      aria-hidden="true"
                    >
                      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span
                      className="hidden sm:inline-block sm:align-middle sm:h-screen"
                      aria-hidden="true"
                    >
                      &#8203;
                    </span>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                      <div className="bg-white p-6">
                        <form onSubmit={handleReviewSubmit}>
                          <div className="mb-4">
                            <label
                              htmlFor="rating"
                              className="block text-lg font-medium text-gray-700"
                            >
                              Rating:
                            </label>
                            <input
                              type="number"
                              id="rating"
                              placeholder="Rate Out of 5"
                              value={reviewForm.rating}
                              onChange={(e) =>
                                setReviewForm({
                                  ...reviewForm,
                                  rating: e.target.value,
                                })
                              }
                              className="mt-1 border p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor="comment"
                              className="block text-lg font-medium text-gray-700"
                            >
                              Feedback
                            </label>
                            <textarea
                              id="comment"
                              value={reviewForm.comment}
                              rows={4}
                              onChange={(e) =>
                                setReviewForm({
                                  ...reviewForm,
                                  comment: e.target.value,
                                })
                              }
                              className="mt-1 border p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            ></textarea>
                          </div>
                          <div className="mt-4 flex justify-between">
                            <button
                              type="submit"
                              className="inline-block w-1/2 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Submit Review
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowModal(false)}
                              className="inline-block py-2 px-4 border border-transparent rounded-md shadow-sm text-gray-700 bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-center">
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-block mt-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Your Feedback
                </button>
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
