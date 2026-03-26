"use client";

import { useEffect, useState } from "react";
import { adminApi, unwrapCollection } from "@/lib/api";

type AdminUser = {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "superadmin";
};

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);

  const fetchUsers = async () => {
    const res = await adminApi.getUsers();
    setUsers(unwrapCollection(res));
  };

  const promote = async (id: string) => {
    await adminApi.makeAdmin(id);
    fetchUsers();
  };

  const demote = async (id: string) => {
    await adminApi.removeAdmin(id);
    fetchUsers();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this user?")) return;
    await adminApi.deleteUser(id);
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
            {users.map((u) => (
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
