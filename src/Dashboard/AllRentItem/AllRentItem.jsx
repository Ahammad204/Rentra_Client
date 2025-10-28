import axiosPublic from "@/utils/axiosPublic";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const AllRentItem = () => {
  const [rents, setRents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedRentId, setSelectedRentId] = useState(null);

  // Fetch all rent items for admin
  const fetchAllRents = async () => {
    try {
      setLoading(true);
      const res = await axiosPublic.get("/api/rents/admin"); 
      setRents(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch rent items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRents();
  }, []);

  // Delete rent item
  const handleDelete = async () => {
    if (!selectedRentId) return;
    try {
      await axiosPublic.delete(`/api/rents/${selectedRentId}`);
      toast.success("Rent post deleted successfully!");
      setRents(rents.filter((rent) => rent._id !== selectedRentId));
      setShowModal(false);
      setSelectedRentId(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete rent post.");
    }
  };

  if (loading) return <p>Loading rent items...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Rent Items</h2>

      {rents.length === 0 ? (
        <p>No rent items found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">Item Name</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">District</th>
              <th className="border p-2">Upazila</th>
              <th className="border p-2">Contact</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rents.map((rent) => (
              <tr key={rent._id}>
                <td className="border p-2">{rent.itemName}</td>
                <td className="border p-2">{rent.category}</td>
                <td className="border p-2">{rent.rentPrice}</td>
                <td className="border p-2">{rent.district}</td>
                <td className="border p-2">{rent.upazila}</td>
                <td className="border p-2">{rent.contact}</td>
                <td className="border p-2">{rent.status}</td>
                <td className="border p-2">
                  <button
                    onClick={() => {
                      setSelectedRentId(rent._id);
                      setShowModal(true);
                    }}
                    className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#00000073] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this rent post?</p>
            <div className="flex justify-end gap-4">
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

export default AllRentItem;
