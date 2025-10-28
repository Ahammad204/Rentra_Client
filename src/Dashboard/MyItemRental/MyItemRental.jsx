import React, { useEffect, useState } from "react";
import axiosPublic from "@/utils/axiosPublic";
import toast from "react-hot-toast";
import useAuth from "@/Hooks/useAuth";

const MyItemRental = () => {
  const { user } = useAuth();
  const [rents, setRents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRent, setEditingRent] = useState(null);
  const [editForm, setEditForm] = useState({
    itemName: "",
    description: "",
    rentPrice: "",
  });

  // 🔹 Fetch user's rents
  useEffect(() => {
    const fetchRents = async () => {
      try {
        const res = await axiosPublic.get("/api/my-rents", {
          withCredentials: true,
        });
        setRents(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load your rent posts");
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) fetchRents();
  }, [user?._id]);

  // 🔹 Delete rent
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this rental post?")) return;
    try {
      const res = await axiosPublic.delete(`/api/rents/${id}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success("Rent post deleted successfully");
        setRents((prev) => prev.filter((r) => r._id !== id));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete post");
    }
  };

  // 🔹 Open edit mode
  const handleEditClick = (rent) => {
    setEditingRent(rent._id);
    setEditForm({
      itemName: rent.itemName,
      description: rent.description,
      rentPrice: rent.rentPrice,
    });
  };

  // 🔹 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Save edited rent
  const handleSaveEdit = async (id) => {
    try {
      const res = await axiosPublic.patch(`/api/rents/${id}`, editForm, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success("Rent post updated successfully");
        setRents((prev) =>
          prev.map((r) => (r._id === id ? { ...r, ...editForm } : r))
        );
        setEditingRent(null);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update rent post");
    }
  };

  // 🔹 Loading & Empty states
  if (loading)
    return <div className="text-center mt-20 text-gray-500">Loading...</div>;

  if (rents.length === 0)
    return (
      <div className="text-center mt-20 text-gray-500">
        You haven’t posted any rental items yet.
      </div>
    );

  // 🔹 UI
  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-[#0fb894] mb-6">
        My Rental Posts
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {rents.map((rent) => (
          <div
            key={rent._id}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            {editingRent === rent._id ? (
              <div>
                <input
                  type="text"
                  name="itemName"
                  value={editForm.itemName}
                  onChange={handleChange}
                  className="input input-bordered w-full mb-2"
                  placeholder="Item Name"
                />
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full mb-2"
                  placeholder="Description"
                />
                <input
                  type="number"
                  name="rentPrice"
                  value={editForm.rentPrice}
                  onChange={handleChange}
                  className="input input-bordered w-full mb-2"
                  placeholder="Rent Price"
                />
                <button
                  onClick={() => handleSaveEdit(rent._id)}
                  className="btn btn-sm bg-[#0fb894] text-white w-full"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-semibold text-lg text-[#0fb894]">
                  {rent.itemName}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {rent.description}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  📍 {rent.district}, {rent.upazila}
                </p>
                <p className="text-sm mt-1 text-gray-500">
                  💰 ৳{rent.rentPrice} / day
                </p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEditClick(rent)}
                    className="btn btn-sm bg-blue-500 text-white flex-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(rent._id)}
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

export default MyItemRental;
