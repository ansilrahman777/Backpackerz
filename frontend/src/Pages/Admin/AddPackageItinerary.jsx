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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="image">Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPackageItinerary;
