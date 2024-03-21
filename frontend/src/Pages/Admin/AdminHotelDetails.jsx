import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../Components/Admin/Header";
import AsideBar from "../../Components/Admin/AsideBar";

function AdminHotelDetails() {
    const { id } = useParams();

    const [hotel, setHotel] = useState({});

    useEffect(() => {
        // Fetch hotel details from the backend API
        axios
            .get(`http://127.0.0.1:8000/api/admin_side/hotels/${id}`)
            .then((response) => {
                console.log(response);
                setHotel(response.data);
            })
            .catch((error) => {
                console.error("Error fetching hotel details:", error);
                toast.error("Error fetching hotel details");
            });
    }, [id]);

    return (
        <div>
            <Header />
            <div className="flex">
                <AsideBar />
                <div className="m-3">
                    <div className="bg-white">
                        <div className="mt-5">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                                <div key={hotel.id} className="group">
                                    <Link to={`/admin/hotel-details/${hotel.id}`}>
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                            <img
                                                src={hotel.images && hotel.images.length > 0 ? hotel.images[0].image : ""}
                                                alt={hotel.hotel_name}
                                                className="h-[256px] w-[256px] object-cover object-center group-hover:opacity-75"
                                            />
                                        </div>
                                        <h3 className="mt-4 text-sm text-gray-700">{hotel.hotel_name}</h3>
                                        <p className="mt-1 text-lg font-medium text-gray-900">{hotel.pricing}</p>
                                    </Link>
                                    <Link
                                        to={`/admin/hotels/${hotel.id}/edit`}
                                        className="mt-2 inline-block text-sm font-semibold text-gray-700 hover:text-gray-900"
                                    >
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminHotelDetails;
