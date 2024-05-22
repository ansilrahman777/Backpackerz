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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      setFormData({
        image: null,
      });
      e.target.reset(); // Reset the file input field
    } catch (error) {
      console.error("Error adding package image:", error);
      toast.error("Error adding package image");
    }
  };

  return (
    <div className="border m-2">
      {" "}
      {!packageId && <Header />}
      <div className="flex">
        {!packageId && <AsideBar />}

        <div className="flex ">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="ml-16 m-4"
          >
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

export default AddPackageImages;
