"use client";

import { useEffect, useState } from "react";
import { adminApi, shopApi, unwrapCollection } from "@/lib/api";

export default function DashboardPage() {
  const [stats, setStats] = useState({ users: 0, orders: 0, products: 0 });

  useEffect(() => {
    (async () => {
      try {
        const [u, o, p] = await Promise.all([
          adminApi.getUsers().then((r) => unwrapCollection(r).length).catch(() => 0),
          shopApi.getAllOrders().then((r) => unwrapCollection(r).length).catch(() => 0),
          shopApi.getProducts().then((r) => unwrapCollection(r).length).catch(() => 0),
        ]);
        setStats({ users: u, orders: o, products: p });
      } catch { /* ignore */ }
    })();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 shadow rounded-xl">
          <h2 className="text-gray-500">Users</h2>
          <p className="text-3xl font-bold">{stats.users}</p>
        </div>

        <div className="bg-white p-6 shadow rounded-xl">
          <h2 className="text-gray-500">Orders</h2>
          <p className="text-3xl font-bold">{stats.orders}</p>
        </div>

        <div className="bg-white p-6 shadow rounded-xl">
          <h2 className="text-gray-500">Products</h2>
          <p className="text-3xl font-bold">{stats.products}</p>
        </div>
      </div>
    </div>
  );
}
