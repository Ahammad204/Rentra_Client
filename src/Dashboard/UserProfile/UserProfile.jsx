/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import useAuth from "@/Hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";
import axiosPublic from "@/utils/axiosPublic";
import { Edit3, CheckCircle, XCircle } from "lucide-react";

const UserProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    bloodGroup: "",
    district: "",
    upazila: "",
    avatar: "",
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // Fetch districts
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/geocode/districts`)
      .then((res) => res.json())
      .then((data) => setDistricts(data))
      .catch((err) => console.error("Error fetching districts:", err));
  }, []);

  // Fetch upazilas
  useEffect(() => {
    if (!selectedDistrictId) return;
    fetch(`${import.meta.env.VITE_API_BASE_URL}/geocode/upazilas`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((u) => u.district_id === selectedDistrictId);
        setUpazilas(filtered);
      })
      .catch((err) => console.error("Error fetching upazilas:", err));
  }, [selectedDistrictId]);

  // Load user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        bloodGroup: user.bloodGroup || "",
        district: user.address?.district || "",
        upazila: user.address?.upazila || "",
        avatar: user.avatarUrl || user.avatar || "",
      });
      const selectedDistrict = districts.find((d) => d.name === user.address?.district);
      if (selectedDistrict) setSelectedDistrictId(selectedDistrict.id);
    }
  }, [user, districts]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      handleImageUpload(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Upload image
  const handleImageUpload = async (file) => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        formData
      );
      setFormData((prev) => ({ ...prev, avatar: res.data.data.url }));
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error("Image upload failed!");
    } finally {
      setLoading(false);
    }
  };

  // Save profile
  const handleSave = async () => {
    try {
      setLoading(true);
      const updatedUser = {
        name: formData.name,
        phone: formData.phone,
        bloodGroup: formData.bloodGroup,
        avatarUrl: formData.avatar,
        address: {
          district: formData.district,
          upazila: formData.upazila,
        },
      };

      const res = await axiosPublic.patch(`/api/users/${user?.email}`, updatedUser);
      if (res.status === 200) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-gradient-to-br from-white/80 to-gray-50/70 backdrop-blur-md border border-gray-200 shadow-2xl rounded-3xl overflow-hidden transition-all duration-500">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-blue-500 to-teal-400 h-36 flex items-center justify-center">
        <div className="absolute -bottom-14">
          <div className="relative">
            <img
              src={formData.avatar || "https://via.placeholder.com/150"}
              alt="User"
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
            />
            {isEditing && (
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>

      <div className="mt-16 px-6 pb-6 text-center">
        {/* Edit button */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="absolute top-4 right-4 bg-white shadow-md hover:bg-blue-50 p-2 rounded-full transition-all"
        >
          {isEditing ? (
            <XCircle className="w-5 h-5 text-red-500" />
          ) : (
            <Edit3 className="w-5 h-5 text-blue-600" />
          )}
        </button>

        {/* Name + Email */}
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="text-lg font-semibold text-center border-b-2 border-blue-400 focus:outline-none focus:border-blue-600 transition-all w-full mb-2"
          />
        ) : (
          <h2 className="text-2xl font-bold text-gray-800">{formData.name}</h2>
        )}
        <p className="text-gray-500 text-sm">{user?.email}</p>

        {/* Details */}
        <div className="mt-6 space-y-3 text-left">
          {isEditing ? (
            <>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option value="">Select Blood Group</option>
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
              <select
                name="district"
                value={formData.district}
                onChange={(e) => {
                  handleChange(e);
                  const selected = districts.find((d) => d.name === e.target.value);
                  setSelectedDistrictId(selected?.id || "");
                }}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option value="">Select District</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
              <select
                name="upazila"
                value={formData.upazila}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option value="">Select Upazila</option>
                {upazilas.map((u) => (
                  <option key={u.id} value={u.name}>
                    {u.name}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <div className="space-y-1 text-gray-700">
              <p>
                <strong>📞 Phone:</strong> {formData.phone || "N/A"}
              </p>
              <p>
                <strong>🩸 Blood Group:</strong> {formData.bloodGroup || "N/A"}
              </p>
              <p>
                <strong>🏙️ District:</strong> {formData.district || "N/A"}
              </p>
              <p>
                <strong>📍 Upazila:</strong> {formData.upazila || "N/A"}
              </p>
            </div>
          )}
        </div>

        {/* Save button */}
        {isEditing && (
          <button
            onClick={handleSave}
            disabled={loading}
            className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium py-2 rounded-lg transition-all disabled:opacity-70"
          >
            {loading ? "Saving..." : <><CheckCircle className="w-4 h-4" /> Save Changes</>}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
