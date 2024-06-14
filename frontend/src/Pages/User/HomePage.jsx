import React from "react";
import Header from "../../Components/User/Header/Header";
import home_bg from "./../../assets/Images/home_bg.jpg";
import pic1 from "./../../assets/Images/pic1.jpg";
import pic2 from "./../../assets/Images/pic2.jpg";
import hotel from "./../../assets/Images/hotel.jpg";
import circles from "./../../assets/Images/home_circles.png";
import dubai_img from "./../../assets/Images/dubai_img.jpg";
import "./../../index.css";
import PropTypes from "prop-types";
import Footer from "../../Components/User/Footer/Footer";
import { Link } from "react-router-dom";
import { FlipWordsDemo } from "../../Components/User/FlipWordsDemo";

function HomePage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  return (
    <>
      <div
        className="min-h-screen bg-cover"
        style={{ backgroundImage: `url(${home_bg})`, backgroundSize: "cover" }}
      >
        <Header />
        <div className="flex flex-col items-center justify-center m-5 md:mx-40   text-black text-4xl decoration-red-800">
          <FlipWordsDemo />

        </div>
      </div>

      <div className="relative w-full h-full bg-cover flex items-center justify-center">
        <img src={circles} alt="" className="w-full h-full bg-cover" />
      </div>

      <section className="relative py-32 lg:py-36 bg-white">
        <div className="mx-auto w-full px-5 sm:px-10 md:px-12 lg:px-5 lg:max-w-7xl flex flex-col lg:flex-row gap-10 lg:gap-12">
          <div className="absolute w-full lg:w-1/2 inset-y-0 lg:right-0 hidden lg:block">
            <span className="absolute -left-6 md:left-4 top-24 lg:top-28 w-24 h-24 rotate-90 skew-x-12 rounded-3xl bg-green-400 blur-xl opacity-60 lg:opacity-95"></span>
            <span className="absolute right-4 bottom-12 w-24 h-24 rounded-3xl bg-blue-600 blur-xl opacity-80"></span>
          </div>
          <span className="w-4/12 lg:w-2/12 aspect-square bg-gradient-to-tr from-blue-600 to-green-400 absolute -top-5 lg:left-0 rounded-full skew-y-12 blur-2xl opacity-40 skew-x-12 rotate-90"></span>
          <div className="relative flex flex-col items-center text-center lg:text-left lg:py-7 xl:py-8 lg:items-start lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2">
            <h1 className="text-3xl leading-tight sm:text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900">
              YOur Perfect Travel Partner{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 from-20% via-blue-600 via-30% to-green-600">
                Backpackerz
              </span>{" "}
              join with us.
            </h1>
            <p className="mt-8 text-gray-700">
              Backpacker Travel offers budget-friendly holiday packages for
              adventurous travelers. From transport tickets to hotel bookings
              and tour guides, they take care of the entire trip
            </p>
            <div className="mt-10 w-full flex max-w-md mx-auto lg:mx-0">
              <div className="flex sm:flex-row flex-col gap-5 w-full">
                <form
                  action="/chat"
                  className="py-1 pl-6 w-full pr-1 flex gap-3 items-center text-gray-600 shadow-lg shadow-gray-200/20 border border-gray-200 bg-gray-100 rounded-full ease-linear focus-within:bg-white focus-within:border-blue-600"
                >
                  <span className="min-w-max pr-2 border-r border-gray-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"
                      />
                    </svg>
                  </span>
                  <input
                    type="email"
                    placeholder="backpackerz@gmail.com"
                    disabled
                    className="w-full py-3 outline-none bg-transparent"
                  />
                  <button className="flex text-white justify-center items-center w-max min-w-max sm:w-max px-6 h-12 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-[#172554] hover:after:opacity-100 hover:after:scale-[2.5] bg-blue-600 border-transparent hover:border-[#172554]">
                    <span className="hidden sm:flex relative z-[5]">
                      chat with us
                    </span>
                    <span className="flex sm:hidden relative z-[5]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                        />
                      </svg>
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="flex flex-1 lg:w-1/2 lg:h-auto relative lg:max-w-none lg:mx-0 mx-auto max-w-3xl">
            <img
              src={hotel}
              alt="Hero image"
              width="2350"
              height="2359"
              className="lg:absolute lg:w-full lg:h-full rounded-3xl object-cover lg:max-h-none max-h-96"
            />
          </div>
        </div>
      </section>

      {/* <div className="flex m-4 justify-center">
        <div className="flex flex-wrap justify-center">
          {topLocation.map((location) => (
            <TopLocationCard key={location.name} {...location} />
          ))}
        </div>
      </div> */}

      <Footer />
    </>
  );
}

export default HomePage;
