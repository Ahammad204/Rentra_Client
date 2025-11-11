import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosPublic from "@/utils/axiosPublic";
import Loading from "@/Shared/Loading/Loading";
import { Search } from "lucide-react";

const AllRentalItem = () => {
  const [rents, setRents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRents = async () => {
      try {
        const res = await axiosPublic.get("/api/rents");
        setRents(res.data);
      } catch (error) {
        console.error("Error fetching rents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRents();
  }, []);

  const filteredRents = rents.filter(
    (rent) =>
      rent.itemName.toLowerCase().includes(search.toLowerCase()) ||
      rent.category.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
          Explore Available Rentals
        </h1>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-12">
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by item name or category..."
            className="w-full py-3 pl-12 pr-4 rounded-2xl bg-white/70 backdrop-blur-md border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition text-gray-700 placeholder-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Rental Cards */}
        {filteredRents.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRents.map((rent) => (
              <div
                key={rent._id}
                onClick={() => navigate(`/rental-details/${rent._id}`)}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={rent.userAvatar || "https://i.ibb.co/5M7f9Zd/user.png"}
                    alt={rent.userName}
                    className="w-12 h-12 rounded-full border object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {rent.userName || "Anonymous"}
                    </h3>
                    <p className="text-sm text-gray-500">{rent.district}</p>
                  </div>
                </div>

                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  {rent.itemName}
                </h2>
                <p className="text-sm text-gray-500 mb-2">
                  Category: {rent.category}
                </p>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium text-gray-700">Rent Price:</span>{" "}
                    {rent.rentPrice ? `${rent.rentPrice}৳` : "Not specified"}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Upazila:</span>{" "}
                    {rent.upazila}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Contact:</span>{" "}
                    {rent.contact}
                  </p>
                </div>

                <p className="text-xs text-gray-400 mt-3">
                  Posted on {new Date(rent.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-8 text-lg">
            No rental items found
          </p>
        )}
      </div>
    </div>
  );
};

export default AllRentalItem;
