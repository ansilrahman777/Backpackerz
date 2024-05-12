import React, { useState, useEffect } from "react";
import Header from "../../Components/User/Header/Header";
import home_bg from "./../../assets/Images/home_bg.jpg";
import axios from "axios";

const Payment = () => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [packageDetails, setPackageDetails] = useState(null);
  console.log(bookingDetails.id);
  console.log('hiiiii', bookingDetails.id);


  
  useEffect(() => {
    // Retrieve booking details from session storage
    const booking = JSON.parse(sessionStorage.getItem("bookingDetails"));
    setBookingDetails(booking);
    console.log(booking.id);

    if (booking) {
      // Fetch package details using package ID from booking details
      axios
        .get(`http://127.0.0.1:8000/api/packages/${booking.package}/`)
        .then((response) => {
          setPackageDetails(response.data);
        })
        .catch((error) => {
          console.error("Error fetching package details:", error);
        });
    }
  }, []);

  return (
    <div>
      <div
        className="h-1/2 bg-center"
        style={{
          backgroundImage: `url(${
            packageDetails &&
            packageDetails.images &&
            packageDetails.images.length > 0
              ? packageDetails.images[3].image
              : home_bg
          })`,
          backgroundSize: "cover",
        }}
      >
        <Header />
        <div className="flex flex-col items-center justify-center flex-grow mt-12 cherry-bomb text-black text-4xl decoration-red-800">
          <h1 className="text-center cherry-bomb text-ba text-black decoration-red-800  font-extrabold text-8xl mb-4">
            {packageDetails ? packageDetails.package_name : "Package not found"}
          </h1>
          <p className="items-center text-center cherry-bomb text-black text-4xl pb-6">
            {packageDetails ? packageDetails.duration : ""} Days
          </p>
        </div>
      </div>
      <div>
        <div className=" m-4 ">
          <h2 className="text-2xl font-bold text-center">Booking Summary</h2>

          <div className="flex">
            <div className="w-3/5">
              <div className="m-6 p-3  flex border-gray-300 rounded-lg shadow-gray-500 justify-start">
                <img
                  src={packageDetails ? packageDetails.image_url : ""}
                  alt="Tour image"
                  className="w-2/4 h-56 object-cover rounded-lg mr-4"
                />
                <div className="flex w-auto items-start">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {packageDetails
                        ? packageDetails.package_name
                        : "Package not found"}
                    </h2>
                    <p className="text-black">
                      {packageDetails ? packageDetails.destination : ""}
                    </p>
                    <p className="text-black">
                      {packageDetails ? packageDetails.duration : ""} Days
                    </p>
                    <div className="flex items-center">
                      <div className="ml-2  text-black text-xl font-medium ">
                        ₹ {packageDetails ? packageDetails.price : ""}/-
                      </div>
                      <div className="ml-4 text-xl font-bold text-black">
                        Per Head
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="m-6 p-3  flex border-gray-300 rounded-lg shadow-gray-500 justify-start">
                <div>
                  {bookingDetails && (
                    <>
                      <form className="mt-3" action={`http://127.0.0.1:8000/api/create-checkout-session/${bookingDetails.id}/`} method='post'>
                        <div className="grid md:grid-cols-2 md:gap-6">
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="full_name"
                              value={bookingDetails.full_name}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                              value={bookingDetails.email}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="floating_email"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Email address
                            </label>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="tel"
                              name="phone"
                              value={bookingDetails.phone}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="floating_mobile"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Mobile
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              name="start_date"
                              value={bookingDetails.start_date}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" date"
                              required
                            />
                            {/* <label
                      htmlFor="floating_date"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Date
                    </label> */}
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              name="no_of_guests"
                              value={bookingDetails.no_of_guests}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              htmlFor="floating_company"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              No of Guests
                            </label>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Pay Now
                        </button>
                      </form>
                      Total Payable Amount:{bookingDetails.total_amount}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
