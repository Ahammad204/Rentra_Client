import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosPublic from "@/utils/axiosPublic";
import useAuth from "@/Hooks/useAuth";
import { Pencil, Trash2, Loader2 } from "lucide-react";

const MyService = () => {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  // Fetch user's services
  const fetchMyServices = async () => {
    if (!user?._id) return;
    setLoading(true);
    try {
      const res = await axiosPublic.get("/api/my-services", { withCredentials: true });
      setServices(res.data);
    } catch (err) {
      toast.error("Failed to load services");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyServices();
  }, [user]);

  // Handle delete
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      await axiosPublic.delete(`/api/services/${id}`);
      toast.success("Service deleted!");
      setServices((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      toast.error("Failed to delete service");
      console.error(err);
    }
  };

  // Handle edit start
  const handleEdit = (service) => {
    setEditingService(service._id);
    setUpdatedData({
      serviceType: service.serviceType,
      description: service.description,
      contact: service.contact,
      availability: service.availability,
    });
  };

  // Handle edit submit
  const handleUpdate = async (id) => {
    try {
      const res = await axiosPublic.patch(`/api/services/${id}`, updatedData);
      if (res.status === 200) {
        toast.success("Service updated!");
        setEditingService(null);
        fetchMyServices();
      }
    } catch (err) {
      toast.error("Update failed!");
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-[#0fb894] mb-6">
        My Services
      </h2>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin w-8 h-8 text-[#0fb894]" />
        </div>
      ) : services.length === 0 ? (
        <p className="text-center text-gray-600">You haven’t created any services yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              className="border border-gray-200 rounded-xl p-5 shadow hover:shadow-md transition"
            >
              <img
                src={service.userAvatar || "https://via.placeholder.com/400"}
                alt={service.serviceType}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />

              {editingService === service._id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    name="serviceType"
                    value={updatedData.serviceType}
                    onChange={(e) =>
                      setUpdatedData({ ...updatedData, serviceType: e.target.value })
                    }
                    className="input input-bordered w-full"
                  />
                  <textarea
                    name="description"
                    value={updatedData.description}
                    onChange={(e) =>
                      setUpdatedData({ ...updatedData, description: e.target.value })
                    }
                    className="textarea textarea-bordered w-full"
                    rows={3}
                  ></textarea>
                  <input
                    type="text"
                    name="contact"
                    value={updatedData.contact}
                    onChange={(e) =>
                      setUpdatedData({ ...updatedData, contact: e.target.value })
                    }
                    className="input input-bordered w-full"
                  />
                  <input
                    type="text"
                    name="availability"
                    value={updatedData.availability}
                    onChange={(e) =>
                      setUpdatedData({ ...updatedData, availability: e.target.value })
                    }
                    className="input input-bordered w-full"
                  />

                  <div className="flex justify-between mt-3">
                    <button
                      onClick={() => handleUpdate(service._id)}
                      className="btn bg-[#0fb894] text-white hover:bg-[#0ca885]"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingService(null)}
                      className="btn bg-gray-200 hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {service.serviceType}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {service.description}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    📍 {service.district}, {service.upazila}
                  </p>
                  <p className="text-sm text-gray-500">📞 {service.contact}</p>
                  <p className="text-sm text-gray-500">
                    ⏰ {service.availability || "Not specified"}
                  </p>

                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleEdit(service)}
                      className="btn btn-sm bg-blue-100 text-blue-600 hover:bg-blue-200 flex items-center gap-1"
                    >
                      <Pencil className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="btn btn-sm bg-red-100 text-red-600 hover:bg-red-200 flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyService;
