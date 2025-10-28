import React, { useEffect, useState } from "react";
import axiosPublic from "@/utils/axiosPublic";
import toast from "react-hot-toast";
import useAuth from "@/Hooks/useAuth";

const MyServiceRequest = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRequest, setEditingRequest] = useState(null);
  const [editForm, setEditForm] = useState({
    description: "",
    urgency: "",
  });

  // ✅ Fetch user's requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosPublic.get("/api/my-requests", {
          withCredentials: true,
        });
        setRequests(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load your requests");
      } finally {
        setLoading(false);
      }
    };
    if (user?._id) fetchRequests();
  }, [user?._id]);

  // ✅ Handle delete request
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this request?")) return;
    try {
      const res = await axiosPublic.delete(`/api/requests/${id}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success("Request deleted successfully");
        setRequests((prev) => prev.filter((req) => req._id !== id));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete request");
    }
  };

  // ✅ Open edit mode
  const handleEditClick = (req) => {
    setEditingRequest(req._id);
    setEditForm({
      description: req.description,
      urgency: req.urgency,
    });
  };

  // ✅ Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Save edit
  const handleSaveEdit = async (id) => {
    try {
      const res = await axiosPublic.patch(`/api/requests/${id}`, editForm, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success("Request updated successfully");
        setRequests((prev) =>
          prev.map((r) =>
            r._id === id ? { ...r, ...editForm } : r
          )
        );
        setEditingRequest(null);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update request");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-20 text-gray-500">Loading...</div>
    );

  if (requests.length === 0)
    return (
      <div className="text-center mt-20 text-gray-500">
        You haven’t posted any service requests yet.
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-[#0fb894] mb-6">
        My Service Requests
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {requests.map((req) => (
          <div
            key={req._id}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            {editingRequest === req._id ? (
              <div>
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full mb-2"
                />
                <input
                  type="text"
                  name="urgency"
                  value={editForm.urgency}
                  onChange={handleChange}
                  className="input input-bordered w-full mb-2"
                />
                <button
                  onClick={() => handleSaveEdit(req._id)}
                  className="btn btn-sm bg-[#0fb894] text-white w-full"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-semibold text-lg text-[#0fb894]">
                  {req.requestTitle}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{req.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  📍 {req.district}, {req.upazila}
                </p>
                <p className="text-sm mt-1 text-gray-500">
                  ☎️ {req.contact} | ⏱️ {req.urgency || "N/A"}
                </p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEditClick(req)}
                    className="btn btn-sm bg-blue-500 text-white flex-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="btn btn-sm bg-red-500 text-white flex-1"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyServiceRequest;
