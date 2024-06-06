import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Header from "../../Components/Admin/Header";
import AsideBar from "../../Components/Admin/AsideBar";
import AddHotelImage from "../Admin/AddHotelImage";
import AddHotelItinerary from "../Admin/AddHotelItinerary";
import AddHotelDetail from "../Admin/AddHotelDetail";

function AddHotelPage() {
  const base_url=import.meta.env.VITE_REACT_APP_BASE_URL_CONFIG

  const { destinationId } = useParams();
  const [hotels, setHotels] = useState([]);
  const [formData, setFormData] = useState({
    hotelName: "",
    destinationName: "",
    hotelDescription: "",
    pricing: "",
    contactNo: "",
    hotelType: "",
    isAvailable: true,
    rooms: "",
    rating: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showAdditionalForms, setShowAdditionalForms] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [hotelId, setHotelId] = useState(null);

  useEffect(() => {
    setLoading(true);
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const allowedFormats = ["image/jpeg", "image/png"];

    if (file && allowedFormats.includes(file.type)) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Invalid file format. Please select a PNG or JPG image.");
      e.target.value = null;
    }
  };

  const validateForm = () => {
    let formErrors = {};
    const alphaRegex = /^[A-Za-z ]+$/;
    const imageTypes = ["image/jpeg", "image/png"];
    const phoneRegex = /^\d{10}$/;

    if (
      !formData.hotelName ||
      formData.hotelName.length < 3 
    ) {
      formErrors.hotelName =
        "Hotel Name should be at least 3 characters .";
    }

    if (
      !formData.destinationName ||
      formData.destinationName.length < 3 
    ) {
      formErrors.destinationName =
        "Destination Name should be at least 3 characters.";
    }

    if (
      !formData.hotelDescription ||
      formData.hotelDescription.length < 5 
    ) {
      formErrors.hotelDescription =
        "Hotel Description should be at least 5 characters.";
    }

    if (
      !formData.pricing ||
      isNaN(formData.pricing) ||
      formData.pricing < 1 ||
      formData.pricing > 1000000
    ) {
      formErrors.pricing =
        "Pricing should be a number between 100 and 1,000,000.";
    }

    if (!formData.contactNo || !phoneRegex.test(formData.contactNo)) {
      formErrors.contactNo =
        "Contact Number should be a valid 10 digit phone number.";
    }

    if (
      !formData.hotelType ||
      isNaN(formData.hotelType) ||
      formData.hotelType < 1 ||
      formData.hotelType > 5
    ) {
      formErrors.hotelType = "Hotel Type should be a number between 1 and 5.";
    }

    if (
      !formData.rooms ||
      isNaN(formData.rooms) ||
      formData.rooms < 1 ||
      formData.rooms > 20
    ) {
      formErrors.rooms = "Rooms should be a number between 1 and 20.";
    }

    if (
      !formData.rating ||
      isNaN(formData.rating) ||
      formData.rating < 0.01 ||
      formData.rating > 5
    ) {
      formErrors.rating = "Rating should be a number between 1 and 5.";
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
    formDataToSend.append("destination", destinationId);
    formDataToSend.append("hotel_name", formData.hotelName);
    formDataToSend.append("destination_name", formData.destinationName);
    formDataToSend.append("hotel_description", formData.hotelDescription);
    formDataToSend.append("pricing", formData.pricing);
    formDataToSend.append("contact_no", formData.contactNo);
    formDataToSend.append("hotel_type", formData.hotelType);
    formDataToSend.append("is_available", formData.isAvailable);
    formDataToSend.append("rooms", formData.rooms);
    formDataToSend.append("rating", formData.rating);
    formDataToSend.append("image_url", formData.image);

    try {
      const response = await axios.post(
        base_url+"/api/admin_side/hotels/add/",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Hotel added successfully");
      setHotels([...hotels, response.data]);
      setHotelId(response.data.id);
      setShowAdditionalForms(true);
    } catch (error) {
      toast.error("Error adding hotel");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <l-miyagi size="35" stroke="3.5" speed="0.9" color="black"></l-miyagi>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

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
                Add New Hotel
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Add new hotel details like location, description, etc.
              </p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="hotelName"
                        value={formData.hotelName}
                        placeholder="Hotel Name"
                        onChange={handleChange}
                        required
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.hotelName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.hotelName}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="destinationName"
                        value={formData.destinationName}
                        placeholder="Destination Name"
                        onChange={handleChange}
                        required
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
                      <textarea
                        name="hotelDescription"
                        value={formData.hotelDescription}
                        onChange={handleChange}
                        placeholder="Hotel Description"
                        required
                        rows="3"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.hotelDescription && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.hotelDescription}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="pricing"
                        value={formData.pricing}
                        onChange={handleChange}
                        min="1"
                        placeholder="Pricing"
                        required
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.pricing && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.pricing}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="contactNo"
                        value={formData.contactNo}
                        onChange={handleChange}
                        placeholder="Contact No"
                        required
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.contactNo && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.contactNo}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="hotelType"
                        value={formData.hotelType}
                        onChange={handleChange}
                        placeholder="Hotel Type"
                        required
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.hotelType && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.hotelType}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <div className="mt-2">
                    <div className="flex items-center">
                      <label className="text-sm leading-6 text-gray-600 mr-4">
                        Is Available
                      </label>
                      <input
                        type="checkbox"
                        name="isAvailable"
                        checked={formData.isAvailable}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isAvailable: e.target.checked,
                          })
                        }
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="number"
                        name="rooms"
                        value={formData.rooms}
                        onChange={handleChange}
                        placeholder="Rooms"
                        min="1"
                        required
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.rooms && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.rooms}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="number"
                        name="rating"
                        step="0.01"
                        value={formData.rating}
                        onChange={handleChange}
                        placeholder="Rating"
                        min="0.01"
                        required
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.rating && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.rating}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="file"
                        name="image_url"
                        onChange={handleImageChange}
                        required
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.image && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.image}
                      </p>
                    )}
                  </div>
                </div>
                {imagePreview && (
                  <div className="sm:col-span-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mt-4 w-48 h-48 object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          {!showAdditionalForms && (
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          )}
        </form>
        {showAdditionalForms && hotelId && (
          <div>
            <AddHotelItinerary hotelId={hotelId} />
            <AddHotelDetail hotelId={hotelId} />
            <AddHotelImage hotelId={hotelId} />
          </div>
        )}
      </div>
    </div>
  );
}

export default AddHotelPage;
