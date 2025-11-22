"use client";

import { useEffect, useState } from "react";
import axios from "../../../lib/axios";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get("/admin/users");
    setUsers(res.data);
  };

  const promote = async (id: string) => {
    await axios.put(`/admin/make-admin/${id}`);
    fetchUsers();
  };

  const demote = async (id: string) => {
    await axios.put(`/admin/remove-admin/${id}`);
    fetchUsers();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this user?")) return;
    await axios.delete(`/admin/delete-user/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Users</h1>

      <div className="bg-white shadow rounded-lg p-4">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u: any) => (
              <tr key={u._id} className="border-b">
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2 capitalize">{u.role}</td>

                <td className="p-2 flex gap-2">
                  {u.role === "user" && (
                    <button
                      onClick={() => promote(u._id)}
                      className="px-3 py-1 bg-green-500 text-white rounded"
                    >
                      Make Admin
                    </button>
                  )}

                  {u.role === "admin" && (
                    <button
                      onClick={() => demote(u._id)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded"
                    >
                      Demote
                    </button>
                  )}

                  {u.role !== "superadmin" && (
                    <button
                      onClick={() => remove(u._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
