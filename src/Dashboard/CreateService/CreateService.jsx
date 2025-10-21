/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axiosPublic from "@/utils/axiosPublic";
import useAuth from "@/Hooks/useAuth";

const CreateService = () => {
  const { user } = useAuth();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState("");

  const [formData, setFormData] = useState({
    serviceType: "",
    description: "",
    district: "",
    upazila: "",
    contact: user?.phone || "",
    image: user?.avatar || "", // use user avatar by default
    availability: "",
  });

  const serviceOptions = [
    "Rider",
    "Househelp",
    "Doctor",
    "Teaching",
    "Plumber",
    "Electrician",
    "Cleaner",
    "Carpenter",
    "Delivery",
    "Other",
  ];

  // Fetch districts
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/geocode/districts`)
      .then((res) => res.json())
      .then((data) => setDistricts(data))
      .catch((err) => console.error("Error fetching districts:", err));
  }, []);

  // Fetch upazilas based on district
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

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.serviceType || !formData.description) {
      toast.error("Please fill required fields");
      return;
    }

    try {
      const res = await axiosPublic.post("/api/services", {
        ...formData,
        userId: user._id,
        createdAt: new Date().toISOString(),
      });

      if (res.status === 201) {
        toast.success("Service task created successfully!");
        setFormData({
          serviceType: "",
          description: "",
          district: "",
          upazila: "",
          contact: user?.phone || "",
          image: user?.avatar || "",
          availability: "",
        });
      }
    } catch (err) {
      toast.error("Failed to create service task");
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-center text-[#0fb894] mb-6">
        Create Service Task
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Service Type */}
        <select
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Service Type</option>
          {serviceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* Description */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your service in detail..."
          className="textarea textarea-bordered w-full"
          rows={5}
          required
        />

        {/* Location */}
        <select
          name="district"
          value={formData.district}
          onChange={(e) => {
            handleChange(e);
            const selected = districts.find((d) => d.name === e.target.value);
            setSelectedDistrictId(selected?.id || "");
          }}
          className="select select-bordered w-full"
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
          className="select select-bordered w-full"
        >
          <option value="">Select Upazila</option>
          {upazilas.map((u) => (
            <option key={u.id} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>

        {/* Contact */}
        <input
          type="tel"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Contact Number"
          className="input input-bordered w-full"
        />

        {/* Availability */}
        <input
          type="text"
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          placeholder="Availability (e.g., Weekdays, 9am-5pm)"
          className="input input-bordered w-full"
        />

        {/* User Image (display only) */}
        <div className="flex items-center space-x-4 mt-2">
          <img
            src={formData.image || "https://via.placeholder.com/100"}
            alt="User"
            className="w-16 h-16 rounded-full border-2 border-[#0fb894]"
          />
          <span className="text-gray-600">Your profile image will be used</span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn w-full bg-[#0fb894] text-white hover:bg-[#0ca885]"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateService;
