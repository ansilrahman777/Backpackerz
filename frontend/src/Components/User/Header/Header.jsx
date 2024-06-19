import React, { useState, useEffect } from "react";
import logo from "./../../../assets/Images/logo.png";
import profile from "./../../../assets/Images/profile.png";
import { MdArticle, MdPermContactCalendar } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { PiTelegramLogoFill } from "react-icons/pi";
import { GiTripleGate } from "react-icons/gi";
import { FaBars } from "react-icons/fa6";
import { FaUserAstronaut } from "react-icons/fa6";

import HeaderItems from "./HeaderItems";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const controlHeader = () => {
    if (window.scrollY > lastScrollY && window.scrollY > 50) {
      setHeaderVisible(false);
    } else {
      setHeaderVisible(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlHeader);
    return () => {
      window.removeEventListener("scroll", controlHeader);
    };
  }, [lastScrollY]);

  const menu = [
    { name: "Home", icon: GoHomeFill, link: "/" },
    { name: "Trips", icon: PiTelegramLogoFill, link: "/trip" },
    { name: "Destination", icon: GiTripleGate, link: "/destination" },
    { name: "About", icon: MdArticle, link: "/about" },
    { name: "Contact", icon: MdPermContactCalendar, link: "/contact" },
  ];

  return (
    <div className="flex p-5 items-center justify-between">
      <div
        className={`fixed inset-x-0 top-0 z-30 transition-transform duration-500 ease-in-out ${
          isHeaderVisible ? "translate-y-0 md:mt-5" : "-translate-y-full mt-0"
        }`}
        style={{ height: "90px" }}
      >
        <header className="w-full max-w-screen-md mx-auto border border-gray-300 bg-white/50 py-3 px-6 shadow backdrop-blur-lg md:rounded-full lg:max-w-screen-lg">
          <div className="px-4">
            <div className="flex items-center justify-between">
              <div className="flex shrink-0">
                <Link aria-current="page" className="flex items-center" to="/">
                  <img
                    src={logo}
                    className="w-[100px] md:w-[150px] object-cover cursor-pointer mr-20"
                  />
                </Link>
              </div>
              <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
                {menu.map((item, index) => (
                  <Link
                    key={index}
                    to={item.link}
                    className="text-black hover:text-gray-500"
                  >
                    <HeaderItems name={item.name} Icon={item.icon} />
                  </Link>
                ))}
              </div>
              <div className="hidden md:flex items-center justify-end gap-3">
                <NavLink
                  to="/profile"
                  className="flex items-center font-semibold cursor-pointer text-[14px]"
                >
                  {user
                    ? `${user.first_name
                        .charAt(0)
                        .toUpperCase()}${user.first_name.slice(1)}`
                    : "Login"}
                  <FaUserAstronaut className="flex w-[40px] rounded-full cursor-pointer" />
                </NavLink>
              </div>
              <div className="md:hidden flex items-center">
                <button onClick={toggleSidebar} className="text-black">
                  <FaBars />
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={toggleSidebar}
        ></div>
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4">
          {menu.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="block py-2 px-4 text-black hover:text-gray-500"
              onClick={toggleSidebar}
            >
              <HeaderItems name={item.name} Icon={item.icon} />
            </Link>
          ))}
          <NavLink
            to="/profile"
            className="block py-2 px-4 text-black hover:text-gray-500"
          >
            <div className="flex items-center gap-2 font-semibold cursor-pointer text-[14px] hover:underline underline-offset-8">
              <FaUserAstronaut className="flex items-center gap-2 font-semibold cursor-pointer text-[14px] hover:underline underline-offset-8" />
              <h2>Profile</h2>
            </div>
          </NavLink>
        </div>
      </aside>
    </div>
  );
}

export default Header;
