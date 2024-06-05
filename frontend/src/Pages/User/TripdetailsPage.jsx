import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom"; // Import useParams hook
import Header from "../../Components/User/Header/Header";
import Footer from "../../Components/User/Footer/Footer";

function TripdetailsPage() {
  const base_url=import.meta.env.VITE_REACT_APP_BASE_URL_CONFIG
  const { id } = useParams(); // Destructure the id parameter using useParams
  const [packageDetail, setPackageDetail] = useState(null);
  console.log(id);

  useEffect(() => {
    // Fetch package details from the backend API
    axios
      .get(base_url+`/api/packages/${id}/`) // Use the id parameter
      .then((response) => {
        setPackageDetail(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching package details:", error);
      });
  }, [id]); // Add id to the dependency array

  return (
    <div>
      <div
        className="min-h-screen bg-cover"
        style={{
          backgroundImage: `url(${
            packageDetail ? packageDetail.image_url : ""
          })`,
          backgroundSize: "cover",
        }}
      >
        <Header />
        <div className="flex flex-col items-center justify-center flex-grow mt-32 cherry-bomb text-black text-4xl decoration-red-800">
          <h1 className="text-center cherry-bomb text-ba text-black decoration-red-800  font-extrabold text-8xl mb-4">
            {packageDetail ? packageDetail.package_name : ""}
          </h1>
          <p className=" items-center text-center cherry-bomb text-black text-5xl">
            {packageDetail ? packageDetail.price : ""} /-
          </p>
        </div>
        <div className="card w-48 bg-white border-solid border border-black absolute -bottom-16 right-[4%]">
          <div className="card-body items-center text-center">
            <p className="text-xl font-bold font-serif">
              ₹ {packageDetail ? packageDetail.price : ""}
            </p>
            <p className="text-xs font-bold font-serif">PER HEAD</p>
            <div className="justify-center">
              <Link
                to={`/package-booking?id=${id}`}
                className="rounded-md p-2 px-4 bg-emerald-600"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="m-10 items-start justify-center">
        <h1 className="text-2xl font-bold font-serif mb-2 ">
          {packageDetail ? packageDetail.package_name : ""}
        </h1>
        <p className="text-gray-700 font-semiboldfont-serif mb-4 ">
          {packageDetail ? packageDetail.description : ""}
        </p>
      </div>
      <div className="m-10 items-start justify-center flex ">
        <div className="w-3/4">
          <h2 className="text-2xl font-bold font-serif mb-2">
            Day Wise Itirary
          </h2>
          {packageDetail
            ? packageDetail.itinerary.map((item, index) => (
                <ol
                  key={index}
                  className="relative border-l border-gray-200 dark:border-gray-700"
                >
                  <li className=" ml-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <div key={index} className="collapse bg-base-200 mt-1">
                      <input type="checkbox" className="peer" />
                      <div className="collapse-title bg-slate-700 text-lg text-white peer-checked:bg-gray-500 peer-checked:text-black">
                        Day Itirary {item.day_number}
                      </div>
                      <div className="collapse-content flex bg-slate-700 text-primary-content peer-checked:bg-gray-500 peer-checked:text-black">
                        <p>{item.description}</p>
                        <div className="flex w-[500px]">
                          <div className="image-container rounded-lg bg-gray-100 w-[200px] overflow-hidden flex items-center justify-center">
                            <img
                              src={item.image}
                              alt={item.day_number}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ol>
              ))
            : ""}
        </div>
        <div className="w-2/4 p-2">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <p className="text-2xl font-bold font-serif mb-2">
                Inculsions and Exclusions
              </p>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
              <input type="radio" name="my-accordion-2" defaultChecked />
              <div className="collapse-title text-xl font-medium">
                <h2 className="mb-2 text-lg font-semibold text-gray-900">
                  Inculsions:
                </h2>
              </div>
              <div className="collapse-content">
                {packageDetail
                  ? packageDetail.inclusions && (
                      <>
                        <ul className="max-w-md space-y-1 text-black list-inside">
                          {packageDetail.inclusions.map((inclusion, index) => (
                            <li key={index} className="flex items-center">
                              <svg
                                className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                              </svg>
                              {inclusion.inclusion}
                            </li>
                          ))}
                        </ul>
                      </>
                    )
                  : ""}
              </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-xl font-medium">
                <h2 className="mb-2 text-lg font-semibold text-gray-900">
                  Exclusions:
                </h2>
              </div>
              <div className="collapse-content">
                {packageDetail
                  ? packageDetail.exclusions && (
                      <>
                        <ul className="max-w-md space-y-1 text-black list-inside">
                          {packageDetail.exclusions.map((exclusion, index) => (
                            <li key={index} className="flex items-center">
                              <svg
                                className="w-3.5 h-3.5 me-2 text-gray-500 dark:text-gray-400 flex-shrink-0"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                              </svg>
                              {exclusion.exclusion}
                            </li>
                          ))}
                        </ul>
                      </>
                    )
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="carousel carousel-center rounded-box m-8 gap-2">
        {packageDetail
          ? packageDetail.images && (
              <>
                {packageDetail.images.map((image, index) => (
                  <div
                    key={index}
                    className="carousel-item w-3/4 h-[300px] rounded-box "
                  >
                    <img
                      className="w-full h-full object-cover object-center"
                      src={image.image}
                      alt="image"
                    />
                  </div>
                ))}
              </>
            )
          : ""}
      </div>
      <Footer />
    </div>
  );
}

export default TripdetailsPage;
