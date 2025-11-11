import Loading from "@/Shared/Loading/Loading";
import axiosPublic from "@/utils/axiosPublic";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AllItemRentalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axiosPublic.get(`/api/rents/${id}`);
        setItem(res.data);
      } catch (error) {
        console.error("Error fetching item details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) return <Loading />;

  if (!item)
    return <p className="p-4 text-center text-gray-500">Item not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-8 border border-gray-100 text-center">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition"
      >
        &larr; Back
      </button>

      {/* User Info */}
      <div className="flex flex-col items-center gap-4 mb-8">
        <img
          src={item.userAvatar}
          alt={item.userName}
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 shadow-sm"
        />
        <h2 className="text-2xl font-bold text-gray-800">{item.userName}</h2>
        <p className="text-gray-500 text-sm">
          Availability: {item.availability}
        </p>
        <p className="text-red-500 text-2xl font-bold">Contact: {item.contact}</p>
      </div>

      {/* Item Info */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Item Details
        </h3>

        <div className="grid grid-cols-3 items-center gap-4">
          <div className="w-full bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-gray-600 font-medium">Item Name</p>
            <p className="text-gray-800">{item.itemName}</p>
          </div>

          <div className="w-full bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-gray-600 font-medium">Category</p>
            <p className="text-gray-800">{item.category}</p>
          </div>

          <div className="w-full bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-gray-600 font-medium">District</p>
            <p className="text-gray-800">{item.district}</p>
          </div>

          <div className="w-full bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-gray-600 font-medium">Upazila</p>
            <p className="text-gray-800">{item.upazila}</p>
          </div>

          <div className="w-full bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-gray-600 font-medium">Rent Price</p>
            <p className="text-gray-800 font-semibold">{item.rentPrice} BDT/day</p>
          </div>

          <div className="w-full bg-gray-50 p-4 rounded-lg shadow-sm col-span-3">
            <p className="text-gray-600 font-medium">Description</p>
            <p className="text-gray-800">{item.description}</p>
          </div>
        </div>

        <p className="text-gray-400 text-sm mt-2">
          Created at: {new Date(item.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default AllItemRentalDetails;
