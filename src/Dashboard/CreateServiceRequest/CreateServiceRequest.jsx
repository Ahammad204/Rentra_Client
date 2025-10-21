/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axiosPublic from "@/utils/axiosPublic";
import useAuth from "@/Hooks/useAuth";

const CreateServiceRequest = () => {
  const { user } = useAuth();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState("");

  const [formData, setFormData] = useState({
    requestTitle: "",
    description: "",
    district: "",
    upazila: "",
    contact: user?.phone || "",
    urgency: "",
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

    if (!formData.requestTitle || !formData.description) {
      toast.error("Please fill required fields");
      return;
    }

    try {
      const res = await axiosPublic.post("/api/requests", {
        ...formData,
        userId: user._id,
        userName: user.name,
        userAvatar: user.avatar || "",
        createdAt: new Date().toISOString(),
      });

      if (res.status === 201) {
        toast.success("Service request created successfully!");
        setFormData({
          requestTitle: "",
          description: "",
          district: "",
          upazila: "",
          contact: user?.phone || "",
          urgency: "",
        });
      }
    } catch (err) {
      toast.error("Failed to create service request");
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-center text-[#0fb894] mb-6">
        Request a Service
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Service Type */}
        <select
          name="requestTitle"
          value={formData.requestTitle}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Service You Need</option>
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
          placeholder="Describe your request in detail..."
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

        {/* Urgency */}
        <input
          type="text"
          name="urgency"
          value={formData.urgency}
          onChange={handleChange}
          placeholder="Urgency (e.g., Immediate, Within 24h)"
          className="input input-bordered w-full"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="btn w-full bg-[#0fb894] text-white hover:bg-[#0ca885]"
        >
          Post Request
        </button>
      </form>
    </div>
  );
};

export default CreateServiceRequest;
