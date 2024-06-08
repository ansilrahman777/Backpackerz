import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Pie } from "react-chartjs-2";
import Header from "../../Components/Admin/Header";
import AsideBar from "../../Components/Admin/AsideBar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Registering components with ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function AdminDashboard() {
  const base_url = import.meta.env.VITE_REACT_APP_BASE_URL_CONFIG;
  const [dashboardData, setDashboardData] = useState({
    last_five_package_bookings: [],
    last_five_hotel_bookings: [],
    last_five_users: [],
    total_package_bookings: 0,
    total_hotel_bookings: 0,
    total_users: 0,
    total_hotel_revenue: 0,
    hotel_bookings_monthly: [],
    package_bookings_monthly: [],
  });

  useEffect(() => {
    axios
      .get(base_url + `/api/admin_side/dashboard/`)
      .then((response) => {
        console.log("API Response:", response.data);

        const { hotel_bookings_per_month, package_bookings_per_month } =
          response.data;

        const hotelBookingsMonthly = Array(12).fill(0);
        hotel_bookings_per_month.forEach((item) => {
          hotelBookingsMonthly[item.booking_date__month - 1] = item.count;
        });

        const packageBookingsMonthly = Array(12).fill(0);
        package_bookings_per_month.forEach((item) => {
          packageBookingsMonthly[item.booking_date__month - 1] = item.count;
        });

        setDashboardData({
          ...response.data,
          hotel_bookings_monthly: hotelBookingsMonthly,
          package_bookings_monthly: packageBookingsMonthly,
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the dashboard data!", error);
      });
  }, [base_url]);

  useEffect(() => {
    console.log("Updated dashboardData:", dashboardData);
  }, [dashboardData]);

  const {
    last_five_package_bookings,
    last_five_hotel_bookings,
    last_five_users,
    total_package_bookings,
    total_hotel_bookings,
    total_users,
    total_hotel_revenue,
    hotel_bookings_monthly,
    package_bookings_monthly,
  } = dashboardData;

  const lineChartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Hotel Bookings",
        data: hotel_bookings_monthly,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Package Bookings",
        data: package_bookings_monthly,
        fill: false,
        borderColor: "#742774",
      },
    ],
  };

  const pieChartData = (data, label) => ({
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label,
        data,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  });

  return (
    <div>
      <Header />
      <div className="flex">
        <AsideBar />

        <div className="bg-white w-full m-5 p-2">
          <div class="mb-12 mt-10 m-5 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
            <div class="relative flex flex-col bg-clip-border rounded-xl bg-gray-100 text-gray-700 shadow-md">
              <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  class="w-6 h-6 text-white"
                >
                  <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
                </svg>
              </div>
              <div class="p-4 text-right">
                {/* <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                  Today's Money ₹
                </p> */}
                <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  {total_package_bookings}
                </h4>
              </div>
              <div class="border-t border-blue-gray-50 p-4">
                <p class="block antialiased font-sans text-base leading-relaxed font-semibold text-blue-gray-600">
                  <strong class="text-green-500"></strong>&nbsp;Total Package
                  Booking
                </p>
              </div>
            </div>
            <div class="relative flex flex-col bg-clip-border rounded-xl bg-gray-100 text-gray-700 shadow-md">
              <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  class="w-6 h-6 text-white"
                >
                  <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
                </svg>
              </div>
              <div class="p-4 text-right">
                {/* <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                  Sales
                </p> */}
                <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  {total_hotel_bookings}
                </h4>
              </div>
              <div class="border-t border-blue-gray-50 p-4">
                <p class="block antialiased font-sans text-base leading-relaxed font-semibold text-blue-gray-600">
                  <strong class="text-green-500"></strong>&nbsp;Total Hotel
                  Booking
                </p>
              </div>
            </div>
            <div class="relative flex flex-col bg-clip-border rounded-xl bg-gray-100 text-gray-700 shadow-md">
              <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  class="w-6 h-6 text-white"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div class="p-4 text-right">
                {/* <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                  Today's Users
                </p> */}
                <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  {total_users}
                </h4>
              </div>
              <div class="border-t border-blue-gray-50 p-4">
                <p class="block antialiased font-sans text-base leading-relaxed font-semibold text-blue-gray-600">
                  <strong class="text-green-500"></strong>&nbsp;Users
                </p>
              </div>
            </div>
            <div class="relative flex flex-col bg-clip-border rounded-xl bg-gray-100 text-gray-700 shadow-md">
              <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  class="w-6 h-6 text-white"
                >
                  <path d="M12 1c-.552 0-1 .448-1 1v1.071c-1.671.143-3.29.693-4.68 1.59-.832.551-1.537 1.295-2.034 2.16-.496.865-.789 1.839-.84 2.829H2c-.552 0-1 .448-1 1s.448 1 1 1h1.446c.153 1.703.803 3.332 1.84 4.68.847 1.108 1.952 2.008 3.221 2.64 1.241.62 2.591 1.007 3.993 1.12V22c0 .552.448 1 1 1s1-.448 1-1v-1.071c1.671-.143 3.29-.693 4.68-1.59 1.108-.847 2.008-1.952 2.64-3.221.62-1.241 1.007-2.591 1.12-3.993H22c.552 0 1-.448 1-1s-.448-1-1-1h-1.446c-.153-1.703-.803-3.332-1.84-4.68-.847-1.108-1.952-2.008-3.221-2.64C15.661 4.61 14.311 4.223 12.909 4.109V2c0-.552-.448-1-1-1zm-2 6h4c.552 0 1 .448 1 1s-.448 1-1 1h-1v2h1c.552 0 1 .448 1 1s-.448 1-1 1h-4c-.552 0-1-.448-1-1s.448-1 1-1h1v-2h-1c-.552 0-1-.448-1-1s.448-1 1-1zm-1.896 5h2.792v2h-2.792c-.848-1.416-.848-2.584 0-4zm6.792-2h-2.792v-2h2.792c.848 1.416.848 2.584 0 4z" />
                </svg>
              </div>
              <div class="p-4 text-right">
                {/* <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                  New Clients
                </p> */}
                <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  {total_hotel_revenue} ₹
                </h4>
              </div>
              <div class="border-t border-blue-gray-50 p-4">
                <p class="block antialiased font-sans text-base leading-relaxed font-semibold text-blue-gray-600">
                  <strong class="text-red-500"></strong>&nbsp;Hotel Revenue
                </p>
              </div>
            </div>
          </div>
          <div className="relative flex justify-center m-5 bg-clip-border rounded-xl bg-gray-100 text-gray-700 shadow-md">
            <div className="mb-1 m-3 flex justify-center w-full">
              <div className="chart-container w-3/4">
                <Line data={lineChartData} />
                <h2 className="text-center">Bookings Over Time</h2>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-x-10 ">
            <div className="m-5 flex justify-between items-center w-[800px]">
              <div className="chart-container w-[400px]">
                <Pie
                  data={pieChartData(hotel_bookings_monthly, "Hotel Bookings")}
                />
                <h2 className="text-center">Hotel Bookings Distribution</h2>
              </div>
              <div className="chart-container  w-[400px]">
                <Pie
                  data={pieChartData(
                    package_bookings_monthly,
                    "Package Bookings"
                  )}
                />
                <h2 className="text-center">Package Bookings Distribution</h2>
              </div>
            </div>
          </div>
          <div>
            <div class="flex items-center m-5 justify-center">
              <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
                <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
                  <table class="w-full text-sm text-left text-black dark:text-gray-400">
                    <thead class="text-xs text-black uppercase bg-gray-50 dark:bg-gray-300 dark:text-gray-800">
                      <tr>
                        <th scope="col" class="py-3 px-6">
                          User
                        </th>
                        <th scope="col" class="py-3 px-6">
                          contact
                        </th>
                        <th scope="col" class="py-3 px-6">
                          Hotel
                        </th>
                        <th scope="col" class="py-3 px-6">
                          Date
                        </th>
                        <th scope="col" class="py-3 px-6">
                          Amount
                        </th>
                        <th scope="col" class="py-3 px-6">
                          Guest
                        </th>
                        <th scope="col" class="py-3 px-6">
                          Rooms
                        </th>
                        <th scope="col" class="py-3 px-6">
                          Payment
                        </th>
                        <th scope="col" class="py-3 px-6">
                          Payment Method
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {last_five_hotel_bookings.map((booking, index) => (
                        <tr
                          key={index}
                          class="bg-white text-black font-normal border-b dark:bg-gray-200 dark:border-gray-700"
                        >
                          <td class="py-4 px-6">{booking.full_name}</td>
                          <td class="py-4 px-6">{booking.phone}</td>
                          <td class="py-4 px-6">{booking.hotel_name}</td>
                          <td class="py-4 px-6"> {booking.start_date}</td>
                          <td class="py-4 px-6"> {booking.total}</td>
                          <td class="py-4 px-6"> {booking.no_of_guest}</td>
                          <td class="py-4 px-6"> {booking.no_of_room}</td>
                          <td class="py-4 px-6"> {booking.status}</td>
                          <td class="py-4 px-6"> {booking.payment_method}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="flex items-start m-5 justify-between">
              <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
                <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
                  <table class="w-full text-sm text-left text-black dark:text-gray-400">
                    <thead class="text-xs text-black uppercase bg-gray-50 dark:bg-gray-300 dark:text-gray-800">
                      <tr>
                        <th scope="col" class="py-3 px-6">
                          User
                        </th>
                        <th scope="col" class="py-3 px-6">
                          Package
                        </th>
                        <th scope="col" class="py-3 px-6">
                          Date
                        </th>
                        <th scope="col" class="py-3 px-6">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {last_five_package_bookings.map((booking, index) => (
                        <tr
                          key={index}
                          class="bg-white text-black font-normal border-b dark:bg-gray-200 dark:border-gray-700"
                        >
                          <td class="py-4 px-6">{booking.full_name}</td>
                          <td class="py-4 px-6">
                            <p>{booking.package_name}</p>
                            <p>{booking.destination}</p>
                          </td>
                          <td class="py-4 px-6"> {booking.start_date}</td>
                          <td class="py-4 px-6"> {booking.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
                <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
                  <table class="w-full text-sm text-left text-black dark:text-gray-400">
                    <thead class="text-xs text-black uppercase bg-gray-50 dark:bg-gray-300 dark:text-gray-800">
                      <tr>
                        <th scope="col" class="py-3 px-6">
                          Id
                        </th>
                        <th scope="col" class="py-3 px-6">
                          User
                        </th>
                        <th scope="col" class="py-3 px-6">
                          phone
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {last_five_users.map((user, index) => (
                        <tr
                          key={index}
                          class="bg-white text-black font-normal border-b dark:bg-gray-200 dark:border-gray-700"
                        >
                          <td class="py-4 px-6">{user.id}</td>
                          <td class="py-4 px-6">
                            <p>{user.first_name}</p>
                            {/* <p>{user.email}</p> */}
                          </td>
                          <td class="py-4 px-6"> {user.email}</td>
                          {/* <td class="py-4 px-6"> {user.mobile}</td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
