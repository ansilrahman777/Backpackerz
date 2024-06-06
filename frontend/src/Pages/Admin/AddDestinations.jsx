import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdAddPhotoAlternate } from "react-icons/md";
import Header from "../../Components/Admin/Header";
import AsideBar from "../../Components/Admin/AsideBar";
import { useNavigate } from "react-router-dom";

function AddDestinations() {
  const base_url=import.meta.env.VITE_REACT_APP_BASE_URL_CONFIG
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destinationName: "",
    season: "",
    description: "",
    state: "",
    country: "",
    image: null, // This will hold the selected image file
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const validateForm = () => {
    let formErrors = {};
    const alphaRegex = /^[A-Za-z ]+$/;
    const imageTypes = ["image/jpeg", "image/png"];

    if (
      !formData.destinationName ||
      formData.destinationName.length < 3 ||
      !alphaRegex.test(formData.destinationName)
    ) {
      formErrors.destinationName =
        "Destination Name should be at least 3 characters long and only contain alphabets.";
    }

    if (
      !formData.season ||
      formData.season.length < 3 ||
      !alphaRegex.test(formData.season)
    ) {
      formErrors.season =
        "Season should be at least 3 characters long and only contain alphabets.";
    }

    if (
      !formData.description ||
      formData.description.length < 3 ||
      !alphaRegex.test(formData.description)
    ) {
      formErrors.description =
        "Description should be at least 3 characters long and only contain alphabets.";
    }

    if (
      !formData.state ||
      formData.state.length < 3 
    ) {
      formErrors.state =
        "State should be at least 3 characters long .";
    }

    if (
      !formData.country ||
      formData.country.length < 3 ||
      !alphaRegex.test(formData.country)
    ) {
      formErrors.country =
        "Country should be at least 3 characters long and only contain alphabets.";
    }

    if (!formData.image || !imageTypes.includes(formData.image.type)) {
      formErrors.image = "Please upload a valid image (JPG or PNG).";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("destination_name", formData.destinationName);
    formDataToSend.append("season", formData.season);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("state", formData.state);
    formDataToSend.append("country", formData.country);
    formDataToSend.append("image_url", formData.image);

    try {
      const response = await axios.post(
        base_url+"/api/admin_side/destinations/add/",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type to multipart form data
          },
        }
      );

      console.log("Destination added successfully:", response.data);
      toast.success("Destination added successfully");
      navigate("/admin/destinations");
    } catch (error) {
      console.error("Error adding destination:", error);
      toast.error("Error adding destination");
    }
  };

  return (
    <div>
      <Header />
      <div className="flex">
        <AsideBar />
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="ml-16 m-4"
        >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Add New Destination
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Add new destination details like season, description, etc.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="destinationName"
                        value={formData.destinationName}
                        placeholder="Destination Name"
                        onChange={handleChange}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.destinationName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.destinationName}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="season"
                        value={formData.season}
                        placeholder="Season"
                        onChange={handleChange}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.season && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.season}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        rows="3"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.description && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        placeholder="State"
                        onChange={handleChange}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.state && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.state}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        placeholder="Country"
                        onChange={handleChange}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.country && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.country}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="file-upload"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  ></label>
                  <div className="mt-2 flex justify-start rounded-lg ">
                    <div className="text-center">
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a Image</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleImageChange} // Add onChange event listener
                            accept="image/*" // Add accept attribute to allow only image files
                          />
                        </label>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG
                      </p>
                    </div>
                  </div>
                  {errors.image && (
                    <p className="text-red-500 text-xs mt-1">{errors.image}</p>
                  )}
                  {imagePreview && (
                    <div className="mt-4">
                      <img
                        src={imagePreview}
                        alt="Selected"
                        className="w-32 h-32 object-cover rounded"
                      />
                    </div>
                  )}
                </div>
                <div className="mt-2 flex lg:ml-4 lg:mt-0">
                  <span className="sm:ml-3">
                    <button
                      type="submit"
                      className="inline-flex items-center cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Submit
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDestinations;
