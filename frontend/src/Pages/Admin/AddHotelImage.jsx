import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AddHotelImage({ hotelId }) {
  const [image, setImage] = useState([]);

  const handleImageChange = (e) => {
    setImage(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("hotel", hotelId);  // Adding hotel ID to the form data
    for (let i = 0; i < image.length; i++) {
      formData.append("image", image[i]);
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/admin_side/hotel-images/add/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Image uploaded successfully");
      setImage([]); 
      e.target.reset();// Clear the images after successful upload
    } catch (error) {
      toast.error("Error uploading image");
    }
  };

  return (
    <div>
      <h3>Add Hotel Image</h3>
      <form onSubmit={handleSubmit}>
        <input type="file" multiple onChange={handleImageChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddHotelImage;

