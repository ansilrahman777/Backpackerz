import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdAddPhotoAlternate } from "react-icons/md";
import Header from "../../Components/Admin/Header";
import AsideBar from "../../Components/Admin/AsideBar";
import { useNavigate } from "react-router-dom";
import AddPackageExclusion from "../Admin/AddPackageExclusion";
import AddPackageItinerary from "../Admin/AddPackageItinerary";
import AddPackageInclusion from "../Admin/AddPackageInclusion";
import AddPackageImages from "../Admin/AddPackageImages";

function AddPackagePage() {
  const [packages, setPackages] = useState([]);
  const [formData, setFormData] = useState({
    packageName: "",
    description: "",
    price: "",
    duration: "",
    destination: "",
    no_of_nights: "",
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showAdditionalForms, setShowAdditionalForms] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [packageId, setPackageId] = useState(null);

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

  const validate = () => {
    const errors = {};
    const alphaRegex = /^[A-Za-z ]+$/;
    const alphaNumRegex = /^[A-Za-z0-9 ]+$/;

    if (
      !formData.packageName ||
      formData.packageName.length < 3 ||
      !alphaRegex.test(formData.packageName)
    ) {
      errors.packageName =
        "Package name should be at least 3 characters long and contain only alphabets.";
    }
    if (
      !formData.description ||
      formData.description.length < 5 ||
      !alphaNumRegex.test(formData.description)
    ) {
      errors.description =
        "Description should be at least 5 characters long and contain only alphabets and numbers.";
    }
    if (
      !formData.price ||
      !Number.isInteger(+formData.price) ||
      formData.price < 100 ||
      formData.price > 1000000
    ) {
      errors.price = "Price should be an integer between 100 and 1000000.";
    }
    if (
      !formData.duration ||
      !Number.isInteger(+formData.duration) ||
      formData.duration < 1 ||
      formData.duration > 50
    ) {
      errors.duration = "Duration should be an integer between 1 and 50.";
    }
    if (
      !formData.destination ||
      formData.destination.length < 3 ||
      !alphaNumRegex.test(formData.destination)
    ) {
      errors.destination =
        "Destination should be at least 3 characters long and contain only alphabets and numbers.";
    }
    if (
      !formData.no_of_nights ||
      !Number.isInteger(+formData.no_of_nights) ||
      formData.no_of_nights < 1 ||
      formData.no_of_nights > 50
    ) {
      errors.no_of_nights =
        "Number of nights should be an integer between 1 and 50.";
    }
    if (!formData.image) {
      errors.image = "Please upload an image.";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors in the form");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("package_name", formData.packageName);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("duration", formData.duration);
    formDataToSend.append("no_of_nights", formData.no_of_nights);
    formDataToSend.append("destination", formData.destination);
    formDataToSend.append("image_url", formData.image);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/admin_side/packages/add/",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Package added successfully");
      setPackages([...packages, response.data]);
      setPackageId(response.data.id);
      setErrors({});
      setShowAdditionalForms(true);
    } catch (error) {
      toast.error("Error adding package");
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
                Add New Package
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Add new package details like destinations, Description, etc..
              </p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="packageName"
                        value={formData.packageName}
                        placeholder="Package Name"
                        onChange={handleChange}
                        required
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.packageName && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.packageName}
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
                        required
                        rows="3"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.description && (
                      <p className="mt-2 text-sm text-red-600">
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
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Price"
                        required
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.price && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.price}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="Duration (in days)"
                        required
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.duration && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.duration}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="no_of_nights"
                        value={formData.no_of_nights}
                        onChange={handleChange}
                        placeholder="Nights (in days)"
                        required
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.no_of_nights && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.no_of_nights}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        placeholder="Destination"
                        required
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.destination && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.destination}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-span-12">
                  <div className="text-center border">
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleImageChange}
                          required
                          accept="image/*"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    {imagePreview && (
                      <div className="mt-4">
                        <img
                          src={imagePreview}
                          alt="Image Preview"
                          className="h-32 w-32 object-cover rounded-md shadow-md mx-auto"
                        />
                      </div>
                    )}
                    {errors.image && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.image}
                      </p>
                    )}
                  </div>
                </div>
                {!showAdditionalForms && (
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
                )}
              </div>
            </div>
          </div>
        </form>
        {showAdditionalForms && packageId && (
          <div>
            <AddPackageItinerary packageId={packageId} />
            <AddPackageInclusion packageId={packageId} />
            <AddPackageExclusion packageId={packageId} />
            <AddPackageImages packageId={packageId} />
          </div>
        )}
      </div>
    </div>
  );
}

export default AddPackagePage;
