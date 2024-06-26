import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../Components/User/Header/Header";
import { FaTent } from "react-icons/fa6";
import Footer from "../../Components/User/Footer/Footer";
import { toast } from "react-toastify";
import StarRating from "./../../Components/User/StarRating";

function HotelDetails() {
  const base_url = import.meta.env.VITE_REACT_APP_BASE_URL_CONFIG;
  const { id } = useParams();
  const [hotelDetails, setHotelDetails] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      toast.error("Login to view hotel details");
    }
  }, [user, navigate]);

  const fetchHotelDetails = () => {
    axios
      .get(base_url + `/api/hotels/${id}/`)
      .then((response) => {
        setHotelDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching hotel details:", error);
      });
  };

  useEffect(() => {
    fetchHotelDetails();
  }, [id]);

  return (
    <div className="overflow-x-hidden">
      {hotelDetails && (
        <div
          className="min-h-screen flex flex-col bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              hotelDetails.image_url ? hotelDetails.image_url : ""
            })`,
            backgroundSize: "cover",
          }}
        >
          <Header />
          <div className="flex flex-col items-center justify-center flex-grow cherry-bomb text-white text-4xl decoration-red-800 p-3">
            <h1 className="text-center cherry-bomb text-ba text-white decoration-red-800 font-extrabold text-5xl mb-4 sm:text-4xl md:text-6xl lg:text-8xl">
              {hotelDetails.hotel_name}
            </h1>
            <p className="items-center text-center cherry-bomb text-white text-5xl sm:text-2xl md:text-3xl lg:text-5xl">
              {hotelDetails.pricing} /-
            </p>
            <div className="items-center text-center mt-5 text-white font-serif text-lg">
              {hotelDetails.details.map((item, index) => (
                <div key={index} className="text-start">
                  <span className="flex gap-x-3">
                    <FaTent />
                    {item.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="card w-48 bg-white border-solid border border-black absolute -bottom-16 right-[4%] hidden md:flex">
            <div className="card-body items-center text-center">
              <p className="text-xl font-bold font-serif">
                ₹ {hotelDetails ? hotelDetails.pricing : ""}
              </p>
              <div className="justify-center">
                <Link
                  to={`/hotel-booking?id=${id}`}
                  className="rounded-md p-2 px-4 bg-emerald-600"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-black p-4 flex justify-between items-center z-50">
            <div>
              <p className="text-lg sm:text-xl font-bold font-serif">
                ₹ {hotelDetails ? hotelDetails.pricing : ""}
              </p>
              <p className="text-xs font-bold font-serif">PER HEAD</p>
            </div>
            <div className="justify-center">
              <Link
                to={`/hotel-booking?id=${id}`}
                className="rounded-md p-2 px-4 bg-emerald-600"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="m-10 items-start justify-center flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/4 mb-10 lg:mb-0">
          <h2 className="text-2xl font-bold font-serif mb-2">
            Day Wise Itinerary
          </h2>
          {hotelDetails ? (
            hotelDetails.itinerary.map((item, index) => (
              <ol
                key={index}
                className="relative border-l border-gray-200 dark:border-gray-700"
              >
                <li className="ml-4">
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                  <div key={index} className="collapse bg-base-200 mt-1">
                    <input type="checkbox" className="peer" />
                    <div className="collapse-title bg-slate-700 text-lg text-white peer-checked:bg-gray-500 peer-checked:text-black">
                      Day {item.day}
                    </div>
                    <div className="collapse-content flex bg-slate-700 text-primary-content peer-checked:bg-gray-500 peer-checked:text-black">
                      <p>{item.description}</p>
                      <p>{item.activity}</p>
                    </div>
                  </div>
                </li>
              </ol>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="w-full lg:w-2/4 p-2">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="max-w-lg text-3xl font-semibold leading-relaxed text-gray-900 dark:text-black">
              {hotelDetails && hotelDetails.hotel_name}
            </p>
            <p className="max-w-lg font-semibold leading-relaxed text-gray-900 dark:text-black">
              {hotelDetails && hotelDetails.hotel_description}
            </p>
            <p className="text-left rtl:text-right text-gray-900 dark:text-black">
              Contact No: {hotelDetails && hotelDetails.contact_no}
            </p>
            <p className="text-left rtl:text-right text-gray-900 dark:text-black">
              Hotel Type: {hotelDetails && hotelDetails.hotel_type}
            </p>
            <p className="text-left rtl:text-right text-gray-900 dark:text-black">
              Room available: {hotelDetails && hotelDetails.rooms} Rooms
            </p>
          </div>
        </div>
      </div>

      <div className="m-10">
        {hotelDetails && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {hotelDetails.images.map((item, index) => (
              <div key={index}>
                <img
                  src={item.image}
                  className="h-40 w-full max-w-full rounded-lg object-cover object-center"
                  alt={`Image ${index}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col bg-white m-auto p-auto">
        <h1 className="font-bold text-center text-lg m-2 text-black">
          Reviews
        </h1>
        <div
          className="flex overflow-x-scroll pb-10"
          style={{
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {hotelDetails && hotelDetails.reviews.length > 0 ? (
            <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 ">
              {hotelDetails.reviews.map((review, index) => (
                <div key={index} className="inline-block px-3">
                  <div className="w-72 h-28 max-w-xs overflow-hidden rounded-lg shadow-md border border-yellow-700 hover:shadow-xl transition-shadow duration-300 ease-in-out">
                    <div className="p-2">
                      <h2 className="font-normal text-base mb-2 text-black">
                        <StarRating rating={review.rating} />
                      </h2>
                      <h2 className="font-normal text-base mb-2 text-black">
                        <span className="font-semibold"></span> {review.comment}
                      </h2>
                      <p className="font-semibold text-black mb-2">
                        -{review.user.first_name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center w-full">
              No reviews available for this hotel.
            </p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HotelDetails;
