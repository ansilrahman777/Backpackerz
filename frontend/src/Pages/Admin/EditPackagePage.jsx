import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../Components/Admin/Header";
import AsideBar from "../../Components/Admin/AsideBar";
import "ldrs"; // import ldrs for the loader component

function EditPackagePage() {
  const base_url=import.meta.env.VITE_REACT_APP_BASE_URL_CONFIG

  const { id } = useParams();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState("");
  const [formData, setFormData] = useState({
    packageName: "",
    description: "",
    price: "",
    duration: "",
    noOfNights: "",
    destination: "",
    image: "",
    itinerary: [],
    inclusions: [],
    exclusions: [],
    images: [],
  });
  const [loading, setLoading] = useState(true); // Initialize loading state as true

  useEffect(() => {
    setLoading(true); // Set loading to true when the component mounts
    axios
      .get(base_url+`/api/admin_side/packages/${id}/`)
      .then((response) => {
        const packageData = response.data;
        setFormData({
          packageName: packageData.package_name,
          description: packageData.description,
          price: packageData.price,
          duration: packageData.duration,
          noOfNights: packageData.no_of_nights,
          destination: packageData.destination,
          image: packageData.image_url,
          itinerary: packageData.itinerary,
          inclusions: packageData.inclusions,
          exclusions: packageData.exclusions,
          images: packageData.images,
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

  const handleImagesChange = (index, e) => {
    const { files } = e.target;
    if (files && files[0]) {
      const updatedImages = [...formData.images];
      updatedImages[index] = files[0];
      setFormData({ ...formData, images: updatedImages });
    }
  };

  const handleAddImage = () => {
    setFormData({ ...formData, images: [...formData.images, null] });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });
  };

  const handleArrayChange = (index, e, arrayName) => {
    const { name, value, files } = e.target;
    const newArray = formData[arrayName].map((item, i) => {
      if (i === index) {
        if (files && files.length > 0) {
          return { ...item, [name]: files[0] };
        }
        return { ...item, [name]: value };
      }
      return item;
    });
    setFormData({ ...formData, [arrayName]: newArray });
  };

  const handleAddArrayItem = (arrayName, newItem) => {
    setFormData({
      ...formData,
      [arrayName]: [...formData[arrayName], newItem],
    });
  };

  const handleRemoveArrayItem = (index, arrayName) => {
    const newArray = formData[arrayName].filter((_, i) => i !== index);
    setFormData({ ...formData, [arrayName]: newArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("package_name", formData.packageName);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("duration", formData.duration);
    formDataToSend.append("no_of_nights", formData.noOfNights);
    formDataToSend.append("destination", formData.destination);

    if (formData.image instanceof File) {
      formDataToSend.append("image_url", formData.image);
    }

    formData.itinerary.forEach((item, index) => {
      formDataToSend.append(`itinerary[${index}].day_number`, item.day_number);
      formDataToSend.append(
        `itinerary[${index}].description`,
        item.description
      );
      if (item.image instanceof File) {
        formDataToSend.append(`itinerary[${index}].image`, item.image);
      }
    });

    formData.inclusions.forEach((item, index) => {
      formDataToSend.append(`inclusions[${index}].inclusion`, item.inclusion);
    });

    formData.exclusions.forEach((item, index) => {
      formDataToSend.append(`exclusions[${index}].exclusion`, item.exclusion);
    });

    formData.images.forEach((image, index) => {
      if (image instanceof File) {
        formDataToSend.append(`images[${index}]`, image);
      }
    });
    console.log("-----------------------dfg-----------------------------");
    console.log("---------------------dfd-------------------------------");
    console.log("itiiiii---", formData.itinerary);
    console.log("-----------------------dfg-----------------------------");
    console.log("invccccccc", formData.inclusions);
    console.log("-----------------------dfg-----------------------------");
    console.log("exclusiojino", formData.exclusions);
    console.log("ijmagweeeeeeeeeeeeeeeeeeeeeeee", formData.images);
    console.log("------------------------dfg----------------------------");
    console.log("-----------------------dfg-----------------------------");

    // Log FormData contents
    for (let pair of formDataToSend.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    try {
      const response = await axios.put(
        base_url+`/api/admin_side/packages/edit/${id}/`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Package updated successfully");
      console.log("Package updated successfully:---", response.data);
      navigate("/admin/packages");
    } catch (error) {
      console.error("Error updating package:", error);

      if (error.response) {
        console.log(formData.packageName);
        console.log(formData.image);
        console.log(formData.itinerary);
        console.log(formData.inclusions);
        console.log(formData.exclusions);
        console.log(formData.images);
        console.log(error, "errrrrrrrrrrrrrrrrrrrrrrrrr");
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.log("requesssssssssssssst---------");
        console.error("Request data:", error.request);
      } else {
        console.log("elseeeeeeeeeeeeeeeeeeeee");

        console.error("Error message:", error.message);
      }

      toast.error("Error updating package---", error.response.headers);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <l-infinity
          size="55"
          stroke="4"
          stroke-length="0.15"
          bg-opacity="0.1"
          speed="1.3"
          color="black"
        ></l-infinity>
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
                        placeholder="Duration (in days)"
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
                        name="noOfNights"
                        value={formData.noOfNights}
                        onChange={handleChange}
                        placeholder="Duration (in nights)"
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

                {formData.itinerary.map((item, index) => (
                  <div className="sm:col-span-6" key={index}>
                    <h3 className="text-base font-semibold leading-7 text-gray-900">
                      Itinerary - Day {item.day_number}
                    </h3>
                    <div className="flex space-x-4 mt-2">
                      <input
                        type="text"
                        name="day_number"
                        value={item.day_number}
                        onChange={(e) =>
                          handleArrayChange(index, e, "itinerary")
                        }
                        placeholder="Day Number"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                      <textarea
                        name="description"
                        value={item.description}
                        onChange={(e) =>
                          handleArrayChange(index, e, "itinerary")
                        }
                        placeholder="Description"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                      <input
                        type="file"
                        name="image"
                        onChange={(e) =>
                          handleArrayChange(index, e, "itinerary")
                        }
                        accept="image/*"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveArrayItem(index, "itinerary")
                        }
                        className="inline-flex items-center cursor-pointer rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    handleAddArrayItem("itinerary", {
                      day_number: "",
                      description: "",
                      image: "",
                    })
                  }
                  className="inline-flex items-center cursor-pointer rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Add Itinerary
                </button>

                {formData.inclusions.map((item, index) => (
                  <div className="sm:col-span-6" key={index}>
                    <h3 className="text-base font-semibold leading-7 text-gray-900">
                      Inclusion {index + 1}
                    </h3>
                    <div className="flex space-x-4 mt-2">
                      <input
                        type="text"
                        name="inclusion"
                        value={item.inclusion}
                        onChange={(e) =>
                          handleArrayChange(index, e, "inclusions")
                        }
                        placeholder="Inclusion"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveArrayItem(index, "inclusions")
                        }
                        className="inline-flex items-center cursor-pointer rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    handleAddArrayItem("inclusions", { inclusion: "" })
                  }
                  className="inline-flex items-center cursor-pointer rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Add Inclusion
                </button>

                {formData.exclusions.map((item, index) => (
                  <div className="sm:col-span-6" key={index}>
                    <h3 className="text-base font-semibold leading-7 text-gray-900">
                      Exclusion {index + 1}
                    </h3>
                    <div className="flex space-x-4 mt-2">
                      <input
                        type="text"
                        name="exclusion"
                        value={item.exclusion}
                        onChange={(e) =>
                          handleArrayChange(index, e, "exclusions")
                        }
                        placeholder="Exclusion"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveArrayItem(index, "exclusions")
                        }
                        className="inline-flex items-center cursor-pointer rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    handleAddArrayItem("exclusions", { exclusion: "" })
                  }
                  className="inline-flex items-center cursor-pointer rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Add Exclusion
                </button>

                <div className="col-span-full">
                  <h3 className="text-base font-semibold leading-7 text-gray-900">
                    Additional Images
                  </h3>
                  {formData.images.map((image, index) => (
                    <div key={index} className="flex space-x-4 mt-2">
                      <input
                        type="file"
                        name={`image-${index}`}
                        onChange={(e) => handleImagesChange(index, e)}
                        accept="image/*"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="inline-flex items-center cursor-pointer rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="inline-flex items-center cursor-pointer rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  >
                    Add Image
                  </button>
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
