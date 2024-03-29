import { useState, useEffect } from "react";
import home2 from "./../../assets/imageUser/home2.jpg";
import axios from "axios";
import Header from "../../Components/User/Header/Header";
import { Link } from "react-router-dom";

function Destinations() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    // Fetch destinations from the backend API
    axios
      .get("http://127.0.0.1:8000/api/destinations/")
      .then((response) => {
        setDestinations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching destinations:", error);
      });
  }, []);

  return (
    <>
      <div
        className="min-h-screen bg-cover"
        style={{
          backgroundImage: `url(${home2})`,
          backgroundSize: "cover",
        }}
      >
        <Header />
        <div className="flex flex-col items-center justify-center flex-grow mt-32 cherry-bomb text-black text-4xl decoration-red-800">
          <h1 className="text-center cherry-bomb text-ba text-neutral-800 decoration-red-800  font-extrabold text-8xl mb-4"></h1>
          <p className=" items-center text-center  text-black  text-xxl">
            Your Next Destination Starts Here: Explore Our Exclusive
            Destinations with BACKPACKERZ!
          </p>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-2xl font-bold text-gray-900">Destinations</h2>
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {destinations.map((destination) => (
                <div key={destination.id} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                      <Link
                        to={`/destination-details/${destination.id}`}
                        className="block relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64"
                      >
                        <img
                          src={destination.image_url}
                          alt={destination.destination_name}
                          className="h-full w-full object-cover object-center"
                        />
                      </Link>
                    </div>
                  <Link to={`/destination-details/${destination.id}`}>
                    <h3 className="mt-6 text-sm text-gray-500">
                      {destination.destination_name}
                    </h3>
                  </Link>
             
                  <p className="text-base font-semibold text-gray-900">
                    {destination.state},{destination.country}
                  </p>
                  {/* Add more details as needed */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Destinations;
