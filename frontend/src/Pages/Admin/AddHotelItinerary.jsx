import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AddHotelItinerary({ hotelId }) {
  const [itinerary, setItinerary] = useState({
    day: 1,
    description: "",
    activity: "",
  });
  const [errors, setErrors] = useState({});

  const validateItinerary = () => {
    const alphaNumRegex = /^[A-Za-z0-9 ]+$/;
    let formErrors = {};

    if (itinerary.day <= 0) {
      formErrors.day = "Day should be a positive integer.";
    }

    if (
      !itinerary.description ||
      itinerary.description.length < 5 ||
      !alphaNumRegex.test(itinerary.description)
    ) {
      formErrors.description =
        "Description should be at least 5 characters long and only contain alphabets, numbers, and spaces.";
    }

    // Activity field validation
    if (!alphaNumRegex.test(itinerary.activity)) {
      formErrors.activity = "Activity can contain alphabets, numbers, and spaces.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItinerary({ ...itinerary, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateItinerary()) {
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/admin_side/hotel-itineraries/add/`,
        { ...itinerary, hotel: hotelId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Itinerary added successfully");
      setItinerary({ day: itinerary.day + 1, description: "", activity: "" });
    } catch (error) {
      toast.error("Error adding itinerary");
    }
  };

  return (
    <div className="m-3">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Add Hotel Itinerary</h3>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="number"
          name="day"
          value={itinerary.day}
          onChange={handleChange}
          placeholder="Day"
          required
          className="block w-full rounded-md border-0 bg-gray-100 p-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
        />
        {errors.day && (
          <p className="text-red-500 text-xs mt-1">{errors.day}</p>
        )}
        <textarea 
          name="description" 
          value={itinerary.description} 
          onChange={handleChange} 
          placeholder="Description" 
          required 
          className="block w-full rounded-md border-0 bg-gray-100 p-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description}</p>
        )}
        <textarea 
          name="activity" 
          value={itinerary.activity} 
          onChange={handleChange} 
          placeholder="Activity" 
          className="block w-full rounded-md border-0 bg-gray-100 p-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
        />
        {errors.activity && (
          <p className="text-red-500 text-xs mt-1">{errors.activity}</p>
        )}
        <button 
          type="submit" 
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddHotelItinerary;
