import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AddHotelItinerary({ hotelId }) {
  const [itinerary, setItinerary] = useState({
    day: 1,
    description: "",
    activity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItinerary({ ...itinerary, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/admin_side/hotel-itineraries/add/`,
        { ...itinerary, hotel: hotelId },  // Including hotel ID in the payload
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Itinerary added successfully");
      setItinerary({ day: itinerary.day + 1, description: "", activity: "" });
    } catch (error) {
      toast.error("Error adding itinerary");
    }
  };

  return (
    <div>
      <h3>Add Hotel Itinerary</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="day"
          value={itinerary.day}
          onChange={handleChange}
          placeholder="Day"
          required
        />
        <textarea
          name="description"
          value={itinerary.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <textarea
          name="activity"
          value={itinerary.activity}
          onChange={handleChange}
          placeholder="Activity"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddHotelItinerary;
