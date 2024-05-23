import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AddHotelDetail({ hotelId }) {
  const [detail, setDetail] = useState("");

  const handleChange = (e) => {
    setDetail(e.target.value);
  };
console.log("daf23423----",hotelId);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/admin_side/hotel-details/add/`,
        { detail, hotel: hotelId },  // Including hotel ID in the payload
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Detail added successfully");
      setDetail("");
    } catch (error) {
      toast.error("Error adding detail");
    }
  };

  return (
    <div>
      <h3>Add Hotel Details</h3>
      <form onSubmit={handleSubmit}>
        <textarea value={detail} onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddHotelDetail;

