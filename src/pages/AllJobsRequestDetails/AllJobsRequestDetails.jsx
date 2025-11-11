import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosPublic from "@/utils/axiosPublic";
import Loading from "@/Shared/Loading/Loading";
import { ArrowLeft, MapPin, Phone, Clock } from "lucide-react";

const AllJobsRequestDetails = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await axiosPublic.get(`/api/requests/${id}`);
        setRequest(res.data);
      } catch (error) {
        console.error("Error fetching request details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [id]);

  if (loading) return <Loading />;

  if (!request)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Request not found
      </div>
    );

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-xl border
       border-gray-200 rounded-3xl shadow-lg p-8 relative">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* User Info */}
        <div className="flex flex-col items-center text-center mt-6">
          <img
            src={request.userAvatar || "https://i.ibb.co/5M7f9Zd/user.png"}
            alt={request.userName}
            className="w-24 h-24 rounded-full border-4 border-blue-100 shadow-md object-cover mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800">
            {request.userName}
          </h2>
          
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-200" />

        {/* Request Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-extrabold text-gray-900 text-center">
            {request.requestTitle}
          </h1>

          <p className="text-gray-700 text-center leading-relaxed max-w-xl mx-auto">
            {request.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 text-gray-700">
            <div className="flex items-center gap-3 bg-blue-50/50 rounded-xl p-4">
              <MapPin className="text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-semibold">
                  {request.upazila}, {request.district}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-blue-50/50 rounded-xl p-4">
              <Phone className="text-blue-500" />
              <div>
                <p className="text-sm text-red-400">Contact</p>
                <p className="font-bold text-red-400">{request.contact}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-blue-50/50 rounded-xl p-4">
              <Clock className="text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Urgency</p>
                <p className="font-semibold">{request.urgency}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-blue-50/50 rounded-xl p-4">
              <Clock className="text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Posted On</p>
                <p className="font-semibold">
                  {new Date(request.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mt-10 flex justify-center">
          <span
            className={`px-6 py-2 rounded-full text-sm font-semibold capitalize ${
              request.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : request.status === "approved"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Status: {request.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AllJobsRequestDetails;
