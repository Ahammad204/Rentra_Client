import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "@/Shared/Loading/Loading";
import axiosPublic from "@/utils/axiosPublic";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  //  Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axiosPublic.get("/api/users", { withCredentials: true });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  //  Handle role or status update
  const handleUpdate = async (id, field, value) => {
    try {
      const res = await axiosPublic.patch(
        `/api/users/${id}`,
        { [field]: value },
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success(`${field} updated successfully`);
        // Refresh user list after update
        fetchUsers();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update user");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5 text-center text-[#0fb894]">
        All Users
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u, idx) => (
              <tr key={u._id}>
                <td>{idx + 1}</td>

                <td>
                  <img
                    src={u.avatar || "/default-avatar.png"}
                    alt={u.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>

                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone || "-"}</td>

                {/*  Role Dropdown */}
                <td>
                  <select
                    value={u.roles}
                    onChange={(e) =>
                      handleUpdate(u._id, "roles", e.target.value)
                    }
                    className="border rounded px-2 py-1 focus:outline-none"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    
                  </select>
                </td>

                {/*  Status Dropdown */}
                <td>
                  <select
                    value={u.status}
                    onChange={(e) =>
                      handleUpdate(u._id, "status", e.target.value)
                    }
                    className={`border rounded px-2 py-1 focus:outline-none ${
                      u.status === "active"
                        ? "text-green-600"
                        : u.status === "blocked"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    <option value="active">Active</option>
                    <option value="blocked">Blocked</option>
                    <option value="pending">Pending</option>
                  </select>
                </td>

                {/*  Actions */}
                <td>
                  <button
                    onClick={() => handleUpdate(u._id, "roles", "admin")}
                    className="bg-blue-500 text-white px-3 py-1 rounded
                     hover:bg-blue-600 transition"
                  >
                    Update User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
