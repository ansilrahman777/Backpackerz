import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import home_bg from "./../../assets/Images/home_bg.jpg";
import Header from "../../Components/User/Header/Header";
import { toast } from "react-toastify";

function PackageBooking() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [packageDetail, setPackageDetail] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    start_date: "",
    no_of_guests: 1,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");

    if (id) {
      axios
        .get(`http://127.0.0.1:8000/api/packages/${id}/`)
        .then((response) => {
          setPackageDetail(response.data);
        })
        .catch((error) => {
          console.error("Error fetching package details:", error);
        });
    }
  }, []);

  const [totalAmount, setTotalAmount] = useState(0); // Initialize totalAmount

    useEffect(() => {
      if (packageDetail && formData.no_of_guests) {
        const total = packageDetail.price * formData.no_of_guests;
        setTotalAmount(total);
      }
    }, [packageDetail, formData.no_of_guests]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check if all required fields are populated
    for (const key in formData) {
      if (formData.hasOwnProperty(key) && formData[key] === "") {
        toast.error(`${key} is required`);
        return; // Prevent submission if any required field is empty
      }
    }
  
    // Calculate total amount based on package price and number of guests
    const totalAmount = packageDetail.price * formData.no_of_guests;
  
    // Include total amount in formData
    const updatedFormData = { ...formData, total_amount: totalAmount,package: packageDetail.id,user: user.user_id
    };
  
    // Log updatedFormData to check if it's formatted correctly
    console.log("Submitting form data:", updatedFormData);
  
    axios
      .post("http://127.0.0.1:8000/api/package-bookings/", updatedFormData)
      .then((response) => {
        
        
        sessionStorage.setItem("bookingDetails", JSON.stringify(response.data));


        console.log("Booking created:", response.data);
        toast.success("Booking created:", response.data);
        navigate("/payment");
      })
      .catch((error) => {
        console.error("Error creating booking:", error);
        toast.error("Error creating booking:", error);
      });
  };
  

  return (
    <div>
      <div
        className="h-1/2 bg-center"
        style={{
          backgroundImage: `url(${
            packageDetail &&
            packageDetail.images &&
            packageDetail.images.length > 0
              ? packageDetail.images[2].image
              : home_bg
          })`,
          backgroundSize: "cover",
        }}
      >
        <Header />
        <div className="flex flex-col items-center justify-center flex-grow mt-12 cherry-bomb text-black text-4xl decoration-red-800">
          <h1 className="text-center cherry-bomb text-ba text-black decoration-red-800  font-extrabold text-8xl mb-4">
            {packageDetail ? packageDetail.package_name : "Package not found"}
          </h1>
          <p className="items-center text-center cherry-bomb text-black text-4xl pb-6">
            {packageDetail ? packageDetail.duration : ""} Days
          </p>
        </div>
      </div>
      <div>
        <div className="m-6 p-3  flex border-gray-300 rounded-lg shadow-gray-500 justify-start">
          <img
            src={packageDetail ? packageDetail.image_url : ""}
            alt="Tour image"
            className="w-2/4 h-56 object-cover rounded-lg mr-4"
          />
          <div className="flex w-auto items-start">
            <div>
              <h2 className="text-2xl font-bold">
                {packageDetail
                  ? packageDetail.package_name
                  : "Package not found"}
              </h2>
              <p className="text-black">
                {packageDetail ? packageDetail.destination : ""}
              </p>
              <p className="text-black">
                {packageDetail ? packageDetail.duration : ""} Days
              </p>
              <div className="flex items-center">
                <div className="ml-2  text-black text-xl font-medium ">
                  ₹ {packageDetail ? packageDetail.price : ""}/-
                </div>
                <div className="ml-4 text-xl font-bold text-black">
                  Per Head
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
            <div className="flex justify-between p-8">
              <div className="">
                <p>LOCATION</p>
                <div className="mt-2 h-20 w-52 object-cover object-center bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-lg flex justify-center items-center">
                  <p>
                    {packageDetail
                      ? packageDetail.destination
                      : "Package not found"}
                  </p>
                </div>
              </div>
              <div className="">
                <p>PACKAGE</p>
                <div className="mt-2 h-20 w-52 object-cover object-center bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500  rounded-lg flex justify-center items-center">
                  <p>
                    {packageDetail
                      ? packageDetail.package_name
                      : "Package not found"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between p-8">
              <p>TRAVELLER DETAILS</p>
              <form className="mt-3" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleFormChange}
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
                      value={formData.email}
                      onChange={handleFormChange}
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
                      value={formData.phone}
                      onChange={handleFormChange}
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
                      type="date"
                      name="start_date"
                      value={formData.start_date}
                      onChange={handleFormChange}
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
                      type="number"
                      name="no_of_guests"
                      value={formData.no_of_guests}
                      onChange={handleFormChange}
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
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div className="w-1/2">
            <div className="p-4 ">
              <div className="border rounded-lg border-gray-400 p-4 mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-bold">
                      Adults X {formData.no_of_guests}
                    </p>
                    <p className="text-sm text-gray-500">Tax: 0</p>
                    <p className="text-sm text-gray-500">Discount: 0</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-right">
                    ₹ {totalAmount}
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
                    ₹ {totalAmount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageBooking;
