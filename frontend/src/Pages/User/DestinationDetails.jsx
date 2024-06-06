import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Header from "../../Components/User/Header/Header";
import Footer from "../../Components/User/Footer/Footer";
import Pagination from "../../Components/User/Pagination/Pagination"; // Import the Pagination component

function DestinationDetails() {
  const base_url = import.meta.env.VITE_REACT_APP_BASE_URL_CONFIG;

  const { id } = useParams();
  const [destinationDetail, setDestinationDetail] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Items per page

  useEffect(() => {
    // Fetch destination details and associated hotels from the backend API
    axios
      .get(base_url + `/api/destination/${id}/`)
      .then((response) => {
        console.log(response);
        setDestinationDetail(response.data);
        setHotels(response.data.hotels); // Set the hotels associated with the destination
      })
      .catch((error) => {
        console.error("Error fetching destination details:", error);
      });
  }, [id, base_url]);

  // Get current hotels
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHotels = hotels.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div
        className="min-h-screen bg-cover"
        style={{
          backgroundImage: `url(${
            destinationDetail ? destinationDetail.image_url : ""
          })`,
          backgroundSize: "cover",
        }}
      >
        <Header />
        <div className="flex flex-col items-center justify-center flex-grow mt-32 cherry-bomb text-black text-4xl decoration-red-800">
          <h1 className="text-center cherry-bomb text-ba text-white decoration-red-800  font-extrabold text-8xl mb-4">
            {destinationDetail ? destinationDetail.destination_name : ""}
          </h1>
          <p className=" items-center text-center cherry-bomb text-white text-9xl">
            {destinationDetail ? destinationDetail.package_name : ""}
          </p>
        </div>
      </div>
      <div className="p-10 ">
        <h1 className="text-2xl font-bold font-serif mb-2 ml-16">
          {destinationDetail ? destinationDetail.destination_name : ""}
        </h1>
        <p className="text-gray-700 font-semibold font-serif mb-4 ml-16">
          {destinationDetail ? destinationDetail.description : ""}
        </p>
      </div>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray- sm:py-12">
        <div className="mx-auto max-w-screen-xl px-4 w-full">
          <h2 className="mb-4 font-bold text-xl text-gray-600">
            Our Destinations in{" "}
            {destinationDetail ? destinationDetail.destination_name : ""}
          </h2>
          <div className="grid w-full sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {currentHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="relative flex flex-col shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 max-w-sm"
              >
                <div className="h-auto overflow-hidden">
                  <div className="h-44 overflow-hidden relative">
                    <Link
                      to={`/hotel-detail/${hotel.id}`}
                      className="block relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64"
                    >
                      <img
                        src={
                          hotel.images.length > 0 ? hotel.images[0].image : ""
                        }
                        alt={hotel.hotel_name}
                      />
                    </Link>
                  </div>
                </div>
                <div className="bg-white py-4 px-3">
                  <h3 className="text-xs mb-2 font-medium">
                    {hotel.hotel_name}
                  </h3>
                  <p className="text-xs text-gray-400">{hotel.description}</p>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={hotels.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DestinationDetails;
