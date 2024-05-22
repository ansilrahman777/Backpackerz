import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Header from "../../Components/Admin/Header";
import AsideBar from "../../Components/Admin/AsideBar";

function AddPackageExclusion({ packageId }) {
  const navigate = useNavigate();
  const { id } = useParams(); // Access the id from URL parameters
  const location = useLocation(); // Access location to get state

  // Access packageId from state or fallback to URL parameter
  const finalPackageId = packageId || location.state?.packageId || id;

  const [formData, setFormData] = useState({
    exclusion: "",
  });

  useEffect(() => {
    // Fetch data based on packageId here if needed
  }, [finalPackageId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = {
      package: finalPackageId,
      exclusion: formData.exclusion,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/admin_side/exclusions/add/",
        formDataToSend
      );

      console.log("Exclusion added successfully:", response.data);
      toast.success("Exclusion added successfully");
      setFormData({
        exclusion: "",
      });
    } catch (error) {
      console.error("Error adding exclusion:", error);
      toast.error("Error adding exclusion");
    }
  };

  return (
    <div className="border m-2">
      {!packageId && <Header />}
      <div className="flex">
        {!packageId && <AsideBar />}
        <div className="flex">
          <form onSubmit={handleSubmit} className="ml-16 m-4">
            <div>
              <label htmlFor="exclusion">Exclusion:</label>
              <input
                type="text"
                id="exclusion"
                name="exclusion"
                value={formData.exclusion}
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

export default AddPackageExclusion;
