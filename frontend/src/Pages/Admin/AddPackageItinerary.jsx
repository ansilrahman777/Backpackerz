import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Header from "../../Components/Admin/Header";
import AsideBar from "../../Components/Admin/AsideBar";

function AddPackageItinerary({ packageId }) {
  const navigate = useNavigate();
  const { id } = useParams(); // Access the id from URL parameters
  const location = useLocation(); // Access location to get state

  // Access packageId from props, state, or fallback to URL parameter
  const finalPackageId = packageId || location.state?.packageId || id;

  const [formData, setFormData] = useState({
    dayNumber: "",
    description: "",
    image: null,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const validate = () => {
    const errors = {};
    const alphaNumRegex = /^[A-Za-z0-9 ]+$/;
    const allowedFormats = ["image/jpeg", "image/png"];

    if (
      !formData.dayNumber ||
      !Number.isInteger(+formData.dayNumber) ||
      formData.dayNumber < 1 ||
      formData.dayNumber > 50
    ) {
      errors.dayNumber = "Day number should be an integer between 1 and 50.";
    }
    if (
      !formData.description ||
      formData.description.length < 5 ||
      !alphaNumRegex.test(formData.description)
    ) {
      errors.description = "Description should be at least 5 characters";
    }
    if (!formData.image) {
      errors.image = "Please upload an image.";
    } else if (!allowedFormats.includes(formData.image.type)) {
      errors.image = "Invalid file format.select a PNG or JPG ";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("package", finalPackageId); // Use finalPackageId here
    formDataToSend.append("day_number", formData.dayNumber);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("image", formData.image);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/admin_side/itineraries/add/",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Itinerary added successfully:", response.data);
      toast.success("Itinerary added successfully");
      setFormData({
        dayNumber: "",
        description: "",
        image: null,
      });
      setErrors({});
      e.target.reset();
    } catch (error) {
      console.error("Error adding itinerary:", error);
      toast.error("Error adding itinerary");
    }
  };

  return (
    <div className="border m-2">
      {!packageId && <Header />}
      <div className="flex">
        {!packageId && <AsideBar />}
        <div className="flex ">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="ml-16 m-4 "
          >
            <div>
              <label htmlFor="dayNumber">Day Number:</label>
              <input
                type="number"
                id="dayNumber"
                name="dayNumber"
                value={formData.dayNumber}
                onChange={handleChange}
                required
                placeholder="Day Number"
                className="block w-full rounded-md border-0 bg-gray-100 p-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
              {errors.dayNumber && (
                <p className="text-red-500">{errors.dayNumber}</p>
              )}
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                required
                className="block w-full rounded-md border-0 bg-gray-100 p-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
              {errors.description && (
                <p className="text-red-500">{errors.description}</p>
              )}
            </div>
            <div>
              <label htmlFor="image">Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                required
                className="block w-full rounded-md border-0 bg-gray-100 p-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
              {errors.image && <p className="text-red-500">{errors.image}</p>}
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPackageItinerary;
