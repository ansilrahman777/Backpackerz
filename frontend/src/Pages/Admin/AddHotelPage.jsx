import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Header from "../../Components/Admin/Header";
import AsideBar from "../../Components/Admin/AsideBar";
import AddHotelImage from '../Admin/AddHotelImage';
import AddHotelItinerary from '../Admin/AddHotelItinerary';
import AddHotelDetail from '../Admin/AddHotelDetail';

function AddHotelPage() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        "http://127.0.0.1:8000/api/admin_side/hotels/add/",
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
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="ml-16 m-4">
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
                        placeholder="Pricing"
                        required
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
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
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <div className="mt-2">
                    <div className="flex items-center">
                      <label className="text-sm leading-6 text-gray-600 mr-4">Is Available</label>
                      <input
                        type="checkbox"
                        name="isAvailable"
                        checked={formData.isAvailable}
                        onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
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
                        required
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
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
                        required
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
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
