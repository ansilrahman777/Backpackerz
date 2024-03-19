import home1 from "./../../assets/imageUser/home1.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Components/User/Header/Header";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";

function TripPage() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    // Fetch packages from the backend API
    axios
      .get("http://127.0.0.1:8000/api/packages/")
      .then((response) => {
        setPackages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching packages:", error);
      });
  }, []);

  return (
    <>
      <div
        className="min-h-screen bg-cover"
        style={{
          backgroundImage: `url(${home1})`,
          backgroundSize: "cover",
        }}
      >
        <Header />
        <div className="flex flex-col items-center justify-center flex-grow mt-32 cherry-bomb text-black text-4xl decoration-red-800">
          <h1 className="text-center cherry-bomb text-ba text-neutral-800 decoration-red-800  font-extrabold text-8xl mb-4"></h1>
          <p className=" items-center text-center  text-black  text-xxl">
            Your Next Destination Starts Here: Explore Our Exclusive Packages
            with BACKPACKERZ!
          </p>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-2xl font-bold text-gray-900">Packages</h2>
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {packages.map((packageItem) => (
                <div
                  key={packageItem.id}
                  className="group relative"
                  style={{ position: "relative" }}
                >
                  <LazyLoad height={200} once>
                    <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                      <Link
                        to={`/trip-details/${packageItem.id}`}
                        className="block relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64"
                      >
                        <img
                          src={packageItem.image_url}
                          alt={packageItem.package_name}
                          className="h-full w-full object-cover object-center"
                        />
                      </Link>
                    </div>
                  </LazyLoad>
                  <Link to={`/trip-details/${packageItem.id}`}>
                    <h3 className="mt-6 text-sm text-gray-500">
                      <span className="absolute inset-0" />
                      {packageItem.package_name}
                    </h3>
                  </Link>
                  <p className="text-base font-semibold text-gray-900">
                    {packageItem.destination}
                  </p>
                  <p className="text-base font-semibold text-gray-900">
                    {packageItem.price}₹
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TripPage;
