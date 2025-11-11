import React, { useEffect, useState } from "react";
import axiosPublic from "@/utils/axiosPublic";
import Loading from "@/Shared/Loading/Loading";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AllJobsRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosPublic.get("/api/requests");
        setRequests(res.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

 const filteredRequests = requests.filter((req) => {
    const searchLower = search.toLowerCase();
    return (
      req.requestTitle?.toLowerCase().includes(searchLower) ||
      req.district?.toLowerCase().includes(searchLower) ||
      req.upazila?.toLowerCase().includes(searchLower)
    );
  });

  if (loading) return <Loading />;
    console.log(filteredRequests)

  return (
    <div className="min-h-screen  py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
          All Job Requests
        </h1>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-12">
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by request type..."
            className="w-full py-3 pl-12 pr-4 rounded-2xl bg-white/70 backdrop-blur-md border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition text-gray-700 placeholder-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Requests Grid */}
        {filteredRequests.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRequests.map((req) => (
              <div
                key={req._id}
                onClick={() => navigate(`/request-details/${req._id}`)}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={req.userAvatar || "https://i.ibb.co/5M7f9Zd/user.png"}
                    alt={req.userName}
                    className="w-12 h-12 rounded-full border object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {req.userName || "Anonymous"}
                    </h3>
                    <p className="text-sm text-gray-500">{req.district}</p>
                  </div>
                </div>

                <h2 className="text-lg font-bold text-gray-900 mb-2">
                  {req.requestType}
                </h2>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium text-gray-700">Upazila:</span>{" "}
                    {req.upazila}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">district:</span>{" "}
                    {req.district}
                  </p>
                </div>

                <p className="text-xs text-gray-400 mt-3">
                  Posted on {new Date(req.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-8 text-lg">
            No job requests found
          </p>
        )}
      </div>
    </div>
  );
};

export default AllJobsRequest;
