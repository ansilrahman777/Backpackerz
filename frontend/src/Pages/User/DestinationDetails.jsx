import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Header from "../../Components/User/Header/Header";
import Footer from "../../Components/User/Footer/Footer";
import Pagination from "../../Components/User/Pagination/Pagination";

function DestinationDetails() {
  const base_url = import.meta.env.VITE_REACT_APP_BASE_URL_CONFIG;

  const { id } = useParams();
  const [destinationDetail, setDestinationDetail] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Items per page

  useEffect(() => {
    // Fetch destination details and associated hotels from the backend API
    axios
      .get(base_url + `/api/destination/${id}/`)
      .then((response) => {
        setDestinationDetail(response.data);
        setHotels(response.data.hotels); // Set the hotels associated with the destination
        setFilteredHotels(response.data.hotels); // Initialize filtered hotels
      })
      .catch((error) => {
        console.error("Error fetching destination details:", error);
      });
  }, [id, base_url]);

  // Filter and sort hotels based on search term and sort order
  useEffect(() => {
    let filtered = hotels;

    // Filter hotels based on search term
    if (searchTerm.trim() !== "") {
      filtered = hotels.filter(
        (hotel) =>
          hotel.hotel_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hotel.hotel_description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          hotel.destination_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Sort hotels based on sort order
    if (sortOrder === "priceAsc") {
      filtered = filtered
        .slice()
        .sort((a, b) => parseFloat(a.pricing) - parseFloat(b.pricing));
    } else if (sortOrder === "priceDesc") {
      filtered = filtered
        .slice()
        .sort((a, b) => parseFloat(b.pricing) - parseFloat(a.pricing));
    }

    setFilteredHotels(filtered);
    setCurrentPage(1); // Reset to first page when search term or sort order changes
  }, [hotels, searchTerm, sortOrder]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHotels = filteredHotels.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <div>
      <div
        className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${
            destinationDetail ? destinationDetail.image_url : ""
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Header />
        <div className="flex flex-col items-center justify-center flex-grow text-center text-white text-4xl cherry-bomb decoration-red-800">
          <h1 className="font-extrabold text-4xl sm:text-6xl md:text-8xl mb-4">
            {destinationDetail ? destinationDetail.destination_name : ""}
          </h1>
        </div>
      </div>
      <div className="p-4 sm:p-10">
        <h1 className="text-2xl font-bold font-serif mb-2">
          {destinationDetail ? destinationDetail.destination_name : ""}
        </h1>
        <p className="text-gray-700 font-semibold font-serif">
          {destinationDetail ? destinationDetail.description : ""}
        </p>
      </div>
      <div className="relative flex flex-col justify-center p-4 sm:p-10">
        <div className="mx-auto max-w-screen-xl w-full">
          <h2 className="font-bold text-xl text-gray-600">
            Our Destinations in{" "}
            {destinationDetail ? destinationDetail.destination_name : ""}
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-center mt-4 mb-4 gap-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by hotel name or description..."
              className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-1/2"
            />
            <select
              value={sortOrder}
              onChange={handleSortChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-1/4"
            >
              <option value="default">Sort by</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="relative flex flex-col shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-44 overflow-hidden">
                  <Link
                    to={`/hotel-detail/${hotel.id}`}
                    className="block relative h-44 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75"
                  >
                    <img
                      src={hotel.image_url ? hotel.image_url : ""}
                      alt={hotel.hotel_name}
                      className="h-full w-full object-cover"
                    />
                  </Link>
                </div>
                <div className="bg-white p-4">
                  <h3 className="text-sm font-medium mb-2">
                    {hotel.hotel_name}
                  </h3>
                  <p className="text-xs text-gray-400">{hotel.description}</p>
                  <p className="text-xs text-gray-400">{hotel.pricing}₹</p>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={filteredHotels.length}
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
