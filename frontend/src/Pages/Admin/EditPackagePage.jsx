import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../Components/Admin/Header";
import AsideBar from "../../Components/Admin/AsideBar";

function EditPackagePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState("");
  const [formData, setFormData] = useState({
    packageName: "",
    description: "",
    price: "",
    duration: "",
    destination: "",
    image: "",
  });
  const [loading, setLoading] = useState(true); // Initialize loading state as true

  useEffect(() => {
    setLoading(true); // Set loading to true when the component mounts
    axios
      .get(`http://127.0.0.1:8000/api/admin_side/packages/${id}/`)
      .then((response) => {
        const packageData = response.data;
        setFormData({
          packageName: packageData.package_name,
          description: packageData.description,
          price: packageData.price,
          duration: packageData.duration,
          destination: packageData.destination,
          image: packageData.image_url,
        });
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching package details:", error);
        toast.error("Error fetching package details");
        setLoading(false); // Set loading to false even if there's an error
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    const allowedFormats = ["image/jpeg", "image/png"];

    if (selectedImage && allowedFormats.includes(selectedImage.type)) {
      setFormData({ ...formData, image: selectedImage });

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      toast.error("Invalid file format. Please select a PNG or JPG image.");
      e.target.value = null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("package_name", formData.packageName);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("duration", formData.duration);
    formDataToSend.append("destination", formData.destination);

    // Check if image field is not empty
    if (formData.image instanceof File) {
      formDataToSend.append("image_url", formData.image);
    }

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/admin_side/packages/edit/${id}/`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Package updated successfully");
      console.log("Package updated successfully:", response.data);
      navigate("/admin/packages");
    } catch (error) {
      console.error("Error updating package:", error);
      toast.error("Error updating package");
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
        <form onSubmit={handleSubmit} className="ml-16 m-4">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Edit Package
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        name="packageName"
                        value={formData.packageName}
                        onChange={handleChange}
                        placeholder="Package Name"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
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
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Price"
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
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="Dutation(in days)"
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
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        placeholder="Destination"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="file-upload"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Package Image
                  </label>
                  <div className="mt-2 flex justify-start rounded-lg">
                    <div>
                      <img
                        src={previewImage || formData.image}
                        alt={formData.packageName}
                        className="rounded-md h-[256px] w-[256px] object-cover object-center group-hover:opacity-75"
                      />
                      <div className="text-center">
                        <div className="mt-4 flex text-sm leading-2 text-gray-600 justify-center items-center">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span className="flex ">Edit image</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              onChange={handleImageChange}
                              accept="image/*"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPackagePage;
