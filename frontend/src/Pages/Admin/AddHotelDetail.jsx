import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AddHotelDetail({ hotelId }) {
  const base_url=import.meta.env.VITE_REACT_APP_BASE_URL_CONFIG

  const [detail, setDetail] = useState("");
  const [errors, setErrors] = useState({});

  const validateDetail = () => {
    let formErrors = {};

    if (!detail || detail.length < 5 ) {
      formErrors.detail =
        "Detail should be at least 5 characters long.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (e) => {
    setDetail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateDetail()) {
      return;
    }

    try {
      const response = await axios.post(
        base_url+`/api/admin_side/hotel-details/add/`,
        { detail, hotel: hotelId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Detail added successfully");
      setDetail("");
    } catch (error) {
      toast.error("Error adding detail");
    }
  };

  return (
    <div className="m-3">
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        Add Hotel Deatils
      </h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={detail}
          onChange={handleChange}
          placeholder="Details Here"
          required
          className="block w-full rounded-md border-0 bg-gray-100 p-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
        />
        {errors.detail && (
          <p className="text-red-500 text-xs mt-1">{errors.detail}</p>
        )}
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 mt-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddHotelDetail;
