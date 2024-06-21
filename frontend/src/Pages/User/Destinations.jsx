import { useState, useEffect } from "react";
import home2 from "./../../assets/imageUser/home2.jpg";
import axios from "axios";
import Header from "../../Components/User/Header/Header";
import { Link } from "react-router-dom";
import Footer from "../../Components/User/Footer/Footer";
import Pagination from "../../Components/User/Pagination/Pagination"; // Import the Pagination component

function Destinations() {
  const base_url = import.meta.env.VITE_REACT_APP_BASE_URL_CONFIG;

  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2); // Items per page

  useEffect(() => {
    // Fetch destinations from the backend API
    axios
      .get(base_url + "/api/destinations/")
      .then((response) => {
        setDestinations(response.data);
        setFilteredDestinations(response.data); // Initialize filtered destinations
      })
      .catch((error) => {
        console.error("Error fetching destinations:", error);
      });
  }, [base_url]);

  // Filter destinations based on search term
  useEffect(() => {
    let filtered = destinations;

    if (searchTerm.trim() !== "") {
      filtered = destinations.filter(
        (destination) =>
          destination.destination_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          destination.season.toLowerCase().includes(searchTerm.toLowerCase()) ||
          destination.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (destination.description &&
            destination.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredDestinations(filtered);
    setCurrentPage(1); // Reset to first page when search term changes
  }, [destinations, searchTerm]);

  // Get current destinations for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDestinations = filteredDestinations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div
        className="min-h-screen flex flex-col bg-cover bg-center"
        style={{
          backgroundImage: `url(${home2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Header />
        <div className="flex flex-col items-center justify-center flex-grow text-black text-4xl decoration-red-800">
          <h1 className="text-center font-extrabold cherry-bomb text-4xl sm:text-6xl md:text-8xl text-neutral-800 mb-4"></h1>
          <p className="text-center text-black cherry-bomb text-xl sm:text-2xl md:text-4xl px-4">
            Your Next Destination Starts Here: Explore Our Exclusive
            Destinations with BACKPACKERZ!
          </p>
        </div>
      </div>

      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-8 sm:py-8 lg:max-w-none lg:py-8">
            <h2 className="text-2xl font-bold text-gray-900">Destinations</h2>
            <div className="flex justify-between items-center mt-4 mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by destination name or description..."
                className="border border-gray-300 rounded-md px-3 py-2 block w-1/2"
              />
            </div>
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {currentDestinations.map((destination) => (
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
                    {destination.state}, {destination.country}
                  </p>
                </div>
              ))}
            </div>
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={filteredDestinations.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Destinations;
