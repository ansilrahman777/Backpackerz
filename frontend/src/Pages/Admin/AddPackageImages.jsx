import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import AsideBar from "../../Components/Admin/AsideBar";
import Header from "../../Components/Admin/Header";

function AddPackageImages({ packageId }) {
  const navigate = useNavigate();
  const { id } = useParams(); // Access the id from URL parameters
  const location = useLocation(); // Access location to get state

  // Access packageId from state or fallback to URL parameter
  const finalPackageId = packageId || location.state?.packageId || id;

  const [formData, setFormData] = useState({
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const allowedFormats = ["image/jpeg", "image/png"];
    if (file && allowedFormats.includes(file.type)) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
      setErrors({});
    } else {
      setErrors({
        image: "Invalid file format. Please select a PNG or JPG image.",
      });
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      setErrors({ image: "Please upload an image." });
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("package", finalPackageId); // Use finalPackageId here
    formDataToSend.append("image", formData.image);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/admin_side/package-images/add/",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Package image added successfully:", response.data);
      toast.success("Package image added successfully");

      // Reset the form fields
      setFormData({ image: null });
      setImagePreview(null);
      setErrors({});
      e.target.reset(); // Reset the file input field
    } catch (error) {
      console.error("Error adding package image:", error);
      toast.error("Error adding package image");
    }
  };

  return (
    <div className="border m-2">
      {!packageId && <Header />}
      <div className="flex">
        {!packageId && <AsideBar />}
        <div className="flex">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="ml-16 m-4"
          >
            <div className="mb-4">
              <label htmlFor="image" className="block mb-1">
                Image:
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                required
                className={`block w-full rounded-md border-0 bg-gray-100 p-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6 ${
                  errors.image ? "border-red-500" : ""
                }`}
              />
              {errors.image && <p className="text-red-500">{errors.image}</p>}
            </div>
            {imagePreview && (
              <div className="mb-4">
                <p className="mb-2">Image Preview:</p>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-40 h-40 rounded-md"
                />
              </div>
            )}
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

export default AddPackageImages;
