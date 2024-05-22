import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Header from "../../Components/Admin/Header";
import AsideBar from "../../Components/Admin/AsideBar";

function AddPackageInclusion({ packageId }) {
  const navigate = useNavigate();
  const { id } = useParams(); // Access the id from URL parameters
  const location = useLocation(); // Access location to get state

  // Access packageId from state or fallback to URL parameter
  const finalPackageId = packageId || location.state?.packageId || id;

  const [formData, setFormData] = useState({
    inclusion: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = {
      package: finalPackageId, // Use finalPackageId here
      inclusion: formData.inclusion,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/admin_side/inclusions/add/",
        formDataToSend
      );

      console.log("Inclusion added successfully:", response.data);
      toast.success("Inclusion added successfully");

      // Reset the form fields
      setFormData({
        inclusion: "",
      });
    } catch (error) {
      console.error("Error adding inclusion:", error);
      toast.error("Error adding inclusion");
    }
  };

  return (
    <div className="border m-2">
      {!packageId && <Header />}
      <div className="flex ">
        {!packageId && <AsideBar />}
        <div className="flex ">
          <form onSubmit={handleSubmit} className="ml-16 m-4">
            <div>
              <label htmlFor="inclusion">Inclusion:</label>
              <input
                type="text"
                id="inclusion"
                name="inclusion"
                value={formData.inclusion}
                onChange={handleChange}
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

export default AddPackageInclusion;
