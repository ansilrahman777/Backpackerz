import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../Components/User/Header/Header";
import Footer from "../../Components/User/Footer/Footer";

function PackageBookingDetails() {
  const base_url = import.meta.env.VITE_REACT_APP_BASE_URL_CONFIG;
  const { id } = useParams();
  const navigate = useNavigate();
  const [packageBooking, setPackageBooking] = useState(null);
  const [packageDetails, setPackageDetails] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`${base_url}/api/packagebookings/${id}`)
        .then((response) => {
          setPackageBooking(response.data);
          const package_id = response.data.package;
          if (package_id) {
            axios
              .get(`${base_url}/api/packages/${package_id}/`)
              .then((response) => {
                setPackageDetails(response.data);
              })
              .catch((error) => {
                console.error("Error fetching package details:", error);
                toast.error("Error fetching package details");
              });
          }
        })
        .catch((error) => {
          console.error("Error fetching booking:", error);
          toast.error("Error fetching booking");
        });
    }
  }, [base_url,id]);

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
          {packageBooking && packageDetails ? (
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
                      {packageBooking.full_name}
                    </h2>
                    <p className="text-gray-500">{packageBooking.email}</p>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">
                    Order ID: {packageBooking.booking_id}
                  </h2>
                </div>
              </div>
              <div className="flex justify-between items-center mb-6">
                <div className="w-1/3">
                  <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
                  <p className="text-gray-500">{packageBooking.payment_method}</p>
                </div>
                <div className="w-1/3">
                  <h3 className="text-lg font-semibold mb-2">Booking Dates</h3>
                  <p className="text-gray-500">
                    {packageBooking.start_date} to {packageBooking.end_date}
                  </p>
                </div>
                <div className="w-1/3">
                  <h3 className="text-lg font-semibold mb-2">Booking Status</h3>
                  <p className="text-gray-500">{packageBooking.booking_status}</p>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img
                      src={packageDetails.image_url || ""}
                      alt={packageDetails.package_name}
                      className="w-12 h-12 rounded-lg"
                    />
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold">
                        {packageDetails.package_name}
                      </h4>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{packageDetails.destination}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg mt-6">
                <h3 className="text-lg font-semibold mb-4">Total</h3>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-500">Subtotal</p>
                  <p className="text-gray-500">₹ {packageBooking.total_amount}</p>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between items-center">
                  <p className="font-semibold">Total</p>
                  <p className="font-semibold">₹ {packageBooking.total_amount}</p>
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

export default PackageBookingDetails;
