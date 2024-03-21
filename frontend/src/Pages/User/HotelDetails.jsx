import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../../Components/User/Header/Header";

function HotelDetails() {
  const { id } = useParams();
  const [hotelDetails, setHotelDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/hotels/${id}/`)
      .then((response) => {
        setHotelDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching hotel details:", error);
      });
  }, [id]);

  return (
    <div>
      {hotelDetails && (
        <div
          className="min-h-screen bg-cover"
          style={{
            backgroundImage: `url(${
              hotelDetails.images.length > 0 ? hotelDetails.images[0].image : ""
            })`,
            backgroundSize: "cover",
          }}
        >
          <Header />
          <div className="flex flex-col items-center justify-center flex-grow mt-32 cherry-bomb text-white text-4xl decoration-red-800">
            <h1 className="text-center cherry-bomb text-ba text-white decoration-red-800  font-extrabold text-8xl mb-4">
              {hotelDetails.hotel_name}
            </h1>
            <p className="items-center text-center cherry-bomb text-white text-5xl">
              {hotelDetails.pricing} /-
            </p>
          </div>
        </div>
      )}
      <p>{hotelDetails?hotelDetails.description:''}</p>

      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div className="flex">
        {hotelDetails && (
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Day Wise Itinerary
            </h2>
            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              {hotelDetails.itinerary.map((item, index) => (
                <div key={index} className="border-t border-gray-200 pt-4">
                  <dt className="font-medium text-gray-900">{item.day}</dt>
                  <dd className="mt-2 text-sm text-gray-500">{item.description}</dd>
                  <dd className="mt-2 text-sm text-gray-500">{item.activity}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
        </div>

        <div className="flex ">
        {hotelDetails && (
          <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
            {hotelDetails.images.map((item, index) => (
              <div key={index} className="border-t border-gray-200 pt-4">
                <img src={item.image} className="rounded-lg bg-cover bg-gray-100" alt={`Image ${index}`} />
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default HotelDetails;
