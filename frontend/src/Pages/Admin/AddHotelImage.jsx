import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AddHotelImage({ hotelId }) {
  const base_url=import.meta.env.VITE_REACT_APP_BASE_URL_CONFIG
  
  const [image, setImage] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    setImage(files);

    // Create image previews
    const previews = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onloadend = () => {
        previews.push(reader.result);
        if (previews.length === files.length) {
          setImagePreviews(previews);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("hotel", hotelId); // Adding hotel ID to the form data

    // Image validation logic
    const allowedFormats = ["image/jpeg", "image/png"];
    for (let i = 0; i < image.length; i++) {
      if (allowedFormats.includes(image[i].type)) {
        formData.append("image", image[i]);
      } else {
        toast.error("Invalid file format. Please select PNG or JPG images.");
        return; // Stop the submission process if an invalid image format is found
      }
    }

    try {
      const response = await axios.post(
        base_url+`/api/admin_side/hotel-images/add/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Image uploaded successfully");
      setImage([]);
      setImagePreviews([]);
      e.target.reset(); // Clear the images after successful upload
    } catch (error) {
      toast.error("Error uploading image");
    }
  };

  return (
    <div className="m-3">
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        Add Hotel Image
      </h3>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          className="block w-full rounded-md border-0 bg-gray-100 p-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
          multiple
          onChange={handleImageChange}
        />
        <div className="mt-2 grid grid-cols-3 gap-4">
          {imagePreviews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`Preview ${index}`}
              className="h-32 w-32 object-cover"
            />
          ))}
        </div>
        <button
          type="submit"
          className="mt-4 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddHotelImage;
