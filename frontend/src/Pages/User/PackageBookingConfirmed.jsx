import React, { useEffect, useState } from "react";
import axios from "axios";
import home_bg from "./../../assets/Images/home_bg.jpg";
import travel_bg from "./../../assets/imageUser/travel.jpg";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../Components/User/Header/Header";

function PackageBookingConfirmed() {
  const base_url=import.meta.env.VITE_REACT_APP_BASE_URL_CONFIG

  const { booking_id } = useParams();
  const [packageBooking, setPackageBooking] = useState(null);
  console.log(packageBooking);
  const [packageDetails, setPackageDetails] = useState(null);
  console.log(packageDetails);
  useEffect(() => {
    if (booking_id) {
      axios
        .get(base_url+`/api/packagebookings/${booking_id}/`)
        .then((response) => {
          setPackageBooking(response.data);
          console.log("book", response.data);
          const package_id = response.data.package;
          if (package_id) {
            axios
              .get(base_url+`/api/packages/${package_id}/`)
              .then((response) => {
                setPackageDetails(response.data);
                console.log("packae", response.data);
              })
              .catch((error) => {
                console.error("Error fetching booking:", error);
                toast.error("Error fetching booking");
              });
          }
        })
        .catch((error) => {
          console.error("Error fetching booking:", error);
          toast.error("Error fetching booking");
        });
    }
  }, [booking_id]);

  return (
    <div>
      <div
        className="h-1/2 bg-center"
        style={{
          backgroundImage: `url(${
            packageDetails &&
            packageDetails.images &&
            packageDetails.images.length > 0
              ? packageDetails.images[2].image
              : home_bg
          })`,
          backgroundSize: "cover",
        }}
      >
        <Header />
        <div className="flex flex-col  items-center justify-center flex-grow mt-12 cherry-bomb text-black text-4xl decoration-red-800">
          <h1 className="text-center cherry-bomb text-ba text-black decoration-red-800 font-extrabold text-8xl mb-4">
            {packageDetails && packageDetails
              ? packageDetails.package_name
              : ""}
          </h1>
          <p className="items-center text-center cherry-bomb text-black text-4xl pb-6">
            {packageDetails && packageDetails ? packageDetails.duration : ""}{" "}
            Days /
            {packageDetails && packageDetails
              ? packageDetails.no_of_nights
              : ""}{" "}
            Nights
          </p>
        </div>
      </div>

      <div className="my-9">
        <div className="max-w-5xl mx-auto  shadow-lg rounded-lg overflow-hidden">
          {packageBooking && (
            <div className="">
              <div className="bg-emerald-700 text-white text-center p-2 text-lg font-bold">
                Booking Confirmed
              </div>
              <div className="mt-5">
                <div className="px-28 flex border-gray-900 rounded-lg shadow-gray-500 justify-start">
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
                        <div className="ml-2 text-black text-xl font-medium">
                          ₹ {packageDetails ? packageDetails.price : ""}
                          /-
                        </div>
                        <div className="ml-4 text-xl font-bold text-black">
                          Per Head
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="pt-5 bg-contain"
                  style={{
                    backgroundImage: `url(${travel_bg})`,
                    backgroundSize: "contain",
                  }}
                >
                  <div className="grid grid-cols-1 px-28 gap-4">
                    <div className="bg-green-300 border border-gray-400 bg-opacity-75 p-2 px-10 flex justify-between rounded">
                      <label className="block text-black">Booking ID</label>
                      <p className="font-bold ">{packageBooking.booking_id}</p>
                    </div>
                    <div className="bg-green-300 border border-gray-400 bg-opacity-75 p-2 px-10 flex justify-between rounded">
                      <label className="block text-black">Traveler Name</label>
                      <p className="font-bold">{packageBooking.full_name}</p>
                    </div>
                    <div className="bg-green-300 border border-gray-400 bg-opacity-75 p-2 px-10 flex justify-between rounded">
                      <label className="block text-black">Email</label>
                      <p className="font-bold">{packageBooking.email}</p>
                    </div>
                    <div className="bg-green-300 border border-gray-400 bg-opacity-75 p-2 px-10 flex justify-between rounded">
                      <label className="block text-black">Contact No</label>
                      <p className="font-bold">{packageBooking.phone}</p>
                    </div>
                    <div className="bg-green-300 border border-gray-400 bg-opacity-75 p-2 px-10 flex justify-between rounded">
                      <label className=" font-extrabold text-black">
                        Total Fare
                      </label>
                      <p className="font-bold text-xl text-black">
                        ₹ {packageBooking.total_amount}
                      </p>
                    </div>
                    <div className="flex mb-2 justify-center">
                      <div className="flex justify-center items-center group relative h-10 w-40 overflow-hidden rounded bg-emerald-700 text-lg font-bold text-white">
                        <Link to={"/"} className="relative z-10">
                          Explore More
                        </Link>
                        <div className="absolute inset-0 h-full w-full bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-30"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PackageBookingConfirmed;
