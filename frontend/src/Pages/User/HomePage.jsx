import Header from "../../Components/User/Header/Header";
import home_bg from "./../../assets/Images/home_bg.jpg";
import dubai_img from "./../../assets/Images/dubai_img.jpg";
import "./../../index.css";

import PropTypes from "prop-types";
import Footer from "../../Components/User/Footer/Footer";

function HomePage() {
  const user = JSON.parse(localStorage.getItem("user"));

  const locations = [
    { name: "DUBAI", color: "bg-orange-500" },
    { name: "WAYANAD", color: "bg-green-500" },
    { name: "MUNNAR", color: "bg-blue-500" },
    { name: "KOCHI", color: "bg-yellow-500" },
    { name: "PALAKKAD", color: "bg-red-500" },
    { name: "CALICUT", color: "bg-orange-500" },
    { name: "HIMACHAL", color: "bg-teal-500" },
    { name: "DELHI", color: "bg-red-500" },
  ];

  const LocationCard = ({ name, color }) => (
    <div
      className={`w-24 h-24 rounded-full ${color} m-2 mb-1 flex items-center justify-center cursor-pointer`}
    >
      <p className="text-white text-sm">{name}</p>
    </div>
  );

  LocationCard.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  };

  const topLocation = [{ name: "DUBAI", image: dubai_img }];

  const TopLocationCard = ({ name, image }) => (
    <div className="relative w-full h-full bg-cover flex items-center justify-center">
      <img
        src={image}
        alt={name}
        className="w-[970px] h-[450px] bg-cover rounded-2xl shadow-lg"
      />
      <p className="absolute inset-0 flex items-center justify-center text-center font-extrabold text-white text-9xl rounded-md cherry-bomb">
        {name}
      </p>
    </div>
  );
  TopLocationCard.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  };

  return (
    <>
      <div
        className="min-h-screen bg-cover"
        style={{ backgroundImage: `url(${home_bg})`, backgroundSize: "cover" }}
      >
        <Header />
        <div className="flex flex-col items-center justify-center flex-grow mt-32 cherry-bomb text-black text-4xl decoration-red-800">
          <h1 className="text-center cherry-bomb text-ba text-neutral-800 decoration-red-800  font-extrabold text-8xl mb-4">
            Welcome {user && user.name}
          </h1>
          We are aware of your travel arrangements
          <p className=" items-center text-center cherry-bomb text-black  text-xl">
            BACKPACKERZ is a platform for adventurers to connect,{" "}
          </p>
          <p className=" items-center text-center cherry-bomb text-black text-xl">
            offering thrilling experiential stays in breathtaking properties and
            curated destination tours.
          </p>
        </div>
      </div>

      <div className="p-10">
        <h1 className="text-2xl font-bold font-serif mb-2 ml-16">
          OUR LOCATIONS
        </h1>
        <p className="text-gray-700 font-semiboldfont-serif mb-4 ml-16">
          Browse destinations for your next holiday plan.
        </p>
        <div className="flex flex-wrap gap-10 justify-center p-10 ">
          {locations.map((location) => (
            <LocationCard key={location.name} {...location} />
          ))}
        </div>
      </div>

      <div className="flex m-48 mt-0  justify-center">
        <div className="flex flex-wrap justify-center">
          {topLocation.map((location) => (
            <TopLocationCard key={location.name} {...location} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
