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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch data based on packageId here if needed
  }, [finalPackageId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const errors = {};
    const alphaNumRegex = /^[A-Za-z0-9 ]+$/;

    if (
      !formData.exclusion ||
      formData.exclusion.length < 5 ||
      !alphaNumRegex.test(formData.exclusion)
    ) {
      errors.exclusion = "Exclusion should be at least 5 characters.";
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
      setErrors({});
    } catch (error) {
      console.error("Error adding exclusion:", error);
      toast.error("Error adding exclusion");
    }
  };

  return (
    <div className="border m-2 p-4">
      {!packageId && <Header />}
      <div className="flex">
        {!packageId && <AsideBar />}
        <div className="flex w-full">
          <form onSubmit={handleSubmit} className="mx-auto max-w-md">
            <div className="mb-4">
              <label htmlFor="exclusion" className="block mb-1">
                Exclusion:
              </label>
              <input
                type="text"
                id="exclusion"
                name="exclusion"
                value={formData.exclusion}
                onChange={handleChange}
                placeholder="Exclusion"
                required
                className="block w-full rounded-md border-0 bg-gray-100 p-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
              {errors.exclusion && (
                <p className="text-red-500">{errors.exclusion}</p>
              )}
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

export default AddPackageExclusion;
