import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Components/User/Header/Header";
import { FaTent } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function HotelBooking() {
  const location = useLocation();
  const navigate = useNavigate();

  const [hotelDetail, setHotelDetail] = useState(null);
  const [total, setTotal] = useState(0);
  
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    start_date: "",
    end_date: "",
    no_of_room: 1,
    no_of_guest: 1,
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    
    if (id) {
      axios
      .get(`http://127.0.0.1:8000/api/hotels/${id}/`)
      .then((response) => {
        setHotelDetail(response.data);
      })
      .catch((error) => {
        console.error("Error fetching package details:", error);
      });
    }
  }, [location.search,formData]);

  useEffect(() => {
    if (hotelDetail && formData.no_of_guest) {
      const totalAmount = hotelDetail.pricing * formData.no_of_guest;
    setTotal(totalAmount)
    }
  }, [hotelDetail, formData.no_of_guest]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const user = JSON.parse(localStorage.getItem("user")); // Fetch user from local storage
    const hotel = hotelDetail; // Use hotelDetail fetched earlier
    
    
    const updatedFormData = {
      ...formData,
      user: user.user_id, // Assuming user id is needed
      hotel: hotel.id, // Assuming hotel id is needed
      total: total
    };

    console.log(updatedFormData);

    let no_of_guest = parseInt(updatedFormData.no_of_guest)
    updatedFormData.no_of_guest=no_of_guest


    axios
      .post("http://127.0.0.1:8000/api/hotelbookings/", updatedFormData) // Send form data with user and hotel details
      .then((response) => {
        const bookingId = response.data.id;
        navigate(`/hotel-booking-details/${bookingId}`);

      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        toast.error("Error submitting form. Please try again later.");

      });
  };
  
  return (
    <div>
      <div className="h-1/2 bg-center" style={{
        backgroundImage: `url(${
          hotelDetail && hotelDetail.images && hotelDetail.images.length > 0
            ? hotelDetail.images[1].image
            : "home_bg"
        })`,
        backgroundSize: "cover",
      }}>
        <Header />
        <div className="flex flex-col items-center justify-center flex-grow mt-12 cherry-bomb text-black text-4xl decoration-red-800">
          <h1 className="text-center cherry-bomb text-ba text-white decoration-red-800  font-extrabold text-8xl mb-4">
            {hotelDetail ? hotelDetail.hotel_name : "Hotel not found"}
          </h1>
        </div>
      </div>
      <div className="m-6 p-3  flex border-gray-300 rounded-lg shadow-gray-500 justify-start">
        <img
          src={hotelDetail ? hotelDetail.image_url : ""}
          alt="Hotel image"
          className="w-2/4 h-56 object-cover rounded-lg mr-4"
        />
        <div className="flex w-auto items-start">
          <div>
            <h2 className="text-2xl font-bold">
              {hotelDetail ? hotelDetail.hotel_name : "Hotel not found"}
            </h2>
            <div className="text-black">
              {hotelDetail &&
                hotelDetail.details.map((item, index) => (
                  <div key={index} className="text-start">
                    <span className="flex gap-x-3">
                      <FaTent />
                      {item.detail}
                    </span>
                  </div>
                ))}
            </div>
            <p className="text-black">
              {hotelDetail ? hotelDetail.rooms : ""} Rooms
            </p>
            <p className="text-black">
              {hotelDetail ? hotelDetail.hotel_type : ""}
            </p>
            <div className="flex items-center">
              <div className="text-black text-xl font-medium ">
                ₹ {hotelDetail ? hotelDetail.pricing : ""}/-
              </div>
              <div className="ml-4 text-xl font-bold text-black">
                Per Room
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-6 p-3 items-start justify-center">
        <h1 className="text-2xl font-bold font-serif ">Booking Details</h1>
      </div>
      <div className="ml-6 p-3 flex">
        <div className="w-1/2">
          <div className="flex flex-col justify-between p-8">
            <p>TRAVELLER DETAILS</p>
            <div className="container mx-auto">
              <h1 className="text-3xl font-bold my-6">Hotel Booking</h1>
              <form className="mt-3" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleFormChange}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_full_name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Full Name
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_email"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_phone"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Phone
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="date"
                      name="start_date"
                      value={formData.start_date}
                      onChange={handleFormChange}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder="Start Date"
                      required
                    />
                    <label
                      htmlFor="floating_start_date"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Start Date
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="date"
                      name="end_date"
                      value={formData.end_date}
                      onChange={handleFormChange}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder="End Date"
                    />
                    <label
                      htmlFor="floating_end_date"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      End Date
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                  <input
                      type="number"
                      name="no_of_guest"
                      value={formData.no_of_guest}
                      onChange={handleFormChange}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder="No. of Guest"
                      required
                    />
                    <label
                      htmlFor="floating_no_of_guest"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      No. of Guests
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="number"
                      name="no_of_room"
                      value={formData.no_of_room}
                      onChange={handleFormChange}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder="No. of Rooms"
                      required
                    />
                    <label
                      htmlFor="floating_no_of_room"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      No. of Rooms
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div className="p-4 ">
            <div className="border rounded-lg border-gray-400 p-4 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-bold">
                    Adults X {formData.no_of_guest}
                  </p>
                  <p className="text-sm text-gray-500">Seirve Charge:0 </p>
                  <p className="text-sm text-gray-500">Tax:0 </p>
                </div>
                <div>
                  <p className="text-lg font-bold text-right">
                  {total}
                  </p>
                  <p className="text-sm text-right text-gray-500"> ₹ 0</p>
                  <p className="text-sm text-right text-gray-500"> ₹ 0</p>
                </div>
              </div>
            </div>
            <div className="border rounded-lg border-gray-400 p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-bold">Total</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-right">
                    ₹ {total}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelBooking;
