import Loading from "@/Shared/Loading/Loading";
import axiosPublic from "@/utils/axiosPublic";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AllService = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const { data } = await axiosPublic.get("/api/services");
      setServices(data);
    } catch (error) {
      console.error("Failed to load services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await axiosPublic.delete(`/api/services/admin/${deleteId}`);
      setServices((prev) => prev.filter((service) => service._id !== deleteId));
      setShowModal(false);
      setDeleteId(null);
      toast.success("Service deleted successfully");
    } catch (error) {
      console.error("Failed to delete service:", error);
      toast.error("Failed to delete service");
    }
  };

  if (loading) return <Loading />;

  if (services.length === 0) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500 text-lg">No services found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">All Services</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="border p-4 rounded-xl shadow hover:shadow-lg transition relative"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={service.userAvatar || "https://via.placeholder.com/50"}
                alt={service.userName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{service.userName}</h3>
                <p className="text-sm text-gray-500">
                  {service.district}, {service.upazila}
                </p>
              </div>
            </div>

            <h4 className="text-lg font-semibold mb-2">{service.serviceType}</h4>
            <p className="text-gray-600 mb-3 line-clamp-3">{service.description}</p>

            <p className="text-sm">
              <span className="font-medium">Contact:</span> {service.contact}
            </p>
            <p className="text-sm">
              <span className="font-medium">Availability:</span>{" "}
              {service.availability || "Not specified"}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Status:{" "}
              <span
                className={`font-medium ${
                  service.status === "pending" ? "text-yellow-500" : "text-green-600"
                }`}
              >
                {service.status}
              </span>
            </p>

            <button
              onClick={() => confirmDelete(service._id)}
              className="mt-3 cursor-pointer bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#00000073] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 text-center">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this service?</p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 cursor-pointer bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllService;
