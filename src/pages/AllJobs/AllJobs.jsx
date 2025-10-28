import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosPublic from "@/utils/axiosPublic";
import Loading from "@/Shared/Loading/Loading";
import { Search } from "lucide-react";

const AllJobs = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axiosPublic.get("/api/tasks/");
        setTasks(res.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) =>
    task.serviceType.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen  py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
          Find the Service You Need
        </h1>

        {/* Modern Search Bar */}
        <div className="relative max-w-xl mx-auto mb-12">
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by service type..."
            className="w-full py-3 pl-12 pr-4 rounded-2xl bg-white/70 backdrop-blur-md border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition text-gray-700 placeholder-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Task Cards */}
        {filteredTasks.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTasks.map((task) => (
              <div
                key={task._id}
                onClick={() => navigate(`/service-details/${task._id}`)}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={task.userAvatar || "https://i.ibb.co/5M7f9Zd/user.png"}
                    alt={task.userName}
                    className="w-12 h-12 rounded-full border object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {task.userName || "Anonymous"}
                    </h3>
                    <p className="text-sm text-gray-500">{task.district}</p>
                  </div>
                </div>

                <h2 className="text-lg font-bold text-gray-900 mb-2">
                  {task.serviceType}
                </h2>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium text-gray-700">Upazila:</span>{" "}
                    {task.upazila}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Contact:</span>{" "}
                    {task.contact}
                  </p>
                </div>

                <p className="text-xs text-gray-400 mt-3">
                  Posted on {new Date(task.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-8 text-lg">
            No services found
          </p>
        )}
      </div>
    </div>
  );
};

export default AllJobs;
