import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import Header from "../../Components/User/Header/Header";
import Footer from "../../Components/User/Footer/Footer";
import Pagination from "../../Components/User/Pagination/Pagination";
import home1 from "./../../assets/imageUser/home1.jpg";

function TripPage() {
  const base_url = import.meta.env.VITE_REACT_APP_BASE_URL_CONFIG;

  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Items per page

  useEffect(() => {
    // Fetch packages from the backend API
    axios
      .get(base_url + "/api/packages/")
      .then((response) => {
        setPackages(response.data);
        setFilteredPackages(response.data); // Initialize filtered packages
      })
      .catch((error) => {
        console.error("Error fetching packages:", error);
      });
  }, [base_url]);

  // Filter and sort packages based on search term and sort order
  useEffect(() => {
    let filtered = packages;

    // Filter packages based on search term
    if (searchTerm.trim() !== "") {
      filtered = packages.filter(
        (pkg) =>
          pkg.package_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort packages based on sort order
    if (sortOrder === "priceAsc") {
      filtered = filtered
        .slice()
        .sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortOrder === "priceDesc") {
      filtered = filtered
        .slice()
        .sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    setFilteredPackages(filtered);
    setCurrentPage(1); // Reset to first page when search term or sort order changes
  }, [packages, searchTerm, sortOrder]);

  // Get current packages for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPackages = filteredPackages.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle sort order change
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${home1})`,
          backgroundSize: "cover",
        }}
      >
        <Header />
        <div className="flex flex-col items-center justify-center text-black text-2xl sm:text-4xl">
          <h1 className="text-center font-extrabold text-4xl sm:text-6xl md:text-8xl text-neutral-800 mb-4"></h1>
          <p className="text-center text-black text-3xl cherry-bomb sm:text-3xl md:text-4xl px-4">
            Your Next Destination Starts Here: Explore Our Exclusive Packages
            with BACKPACKERZ!
          </p>
        </div>
      </div>

      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-8 sm:py-12 lg:max-w-none lg:py-16">
            <h2 className="text-2xl font-bold text-gray-900">Packages</h2>
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 mb-4 gap-4">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by package name or description..."
                className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-1/2"
              />
              <select
                value={sortOrder}
                onChange={handleSortChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-1/4"
              >
                <option value="default">Sort by</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
              </select>
            </div>
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {currentPackages.map((packageItem) => (
                <div key={packageItem.id} className="group relative">
                  <LazyLoad height={200} once>
                    <div className="relative h-48 sm:h-64 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 transition-opacity duration-200">
                      <Link
                        to={`/trip-details/${packageItem.id}`}
                        className="block relative h-full w-full overflow-hidden rounded-lg bg-white hover:scale-105 hover:shadow-lg transition-transform duration-200"
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
                    <h3 className="mt-4 text-sm text-gray-500">
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
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={filteredPackages.length}
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

export default TripPage;
