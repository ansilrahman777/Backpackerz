import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../Components/Admin/Header";
import AsideBar from "../../Components/Admin/AsideBar";

function EditDestination() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState("");

  const [formData, setFormData] = useState({
    destinationName: "",
    season: "",
    description: "",
    state: "",
    country: "",
    image: "",
  });

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/admin_side/destination/${id}/`)
      .then((response) => {
        const destinationData = response.data;
        setFormData({
          destinationName: destinationData.destination_name,
          season: destinationData.season,
          description: destinationData.description,
          state: destinationData.state,
          country: destinationData.country,
          image: destinationData.image_url,
        });
      })
      .catch((error) => {
        console.error("Error fetching destination details:", error);
        toast.error("Error fetching destination details");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setFormData({ ...formData, image: selectedImage });

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("destination_name", formData.destinationName);
    formDataToSend.append("season", formData.season);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("state", formData.state);
    formDataToSend.append("country", formData.country);
    if (formData.image) {
      formDataToSend.append("image_url", formData.image);
    }

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/admin_side/destination/edit/${id}/`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Destination updated successfully");
      console.log("Destination updated successfully:", response.data);
      navigate("/admin/destinations");
    } catch (error) {
      console.error("Error updating destination:", error);
      toast.error("Error updating destination");
    }
  };

  return (
    <div>
      <Header />
      <div className="flex">
        <AsideBar />
        <form onSubmit={handleSubmit} className="ml-16 m-4">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Edit Destination
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        name="destinationName"
                        value={formData.destinationName}
                        onChange={handleChange}
                        placeholder="Destination Name"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        name="season"
                        value={formData.season}
                        onChange={handleChange}
                        placeholder="Season"
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
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="State"
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
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Country"
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
                    Destination Image
                  </label>
                  <div className="mt-2 flex justify-start rounded-lg">
                    <div>
                      <img
                        src={previewImage || formData.image}
                        alt={formData.destinationName}
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

export default EditDestination;
