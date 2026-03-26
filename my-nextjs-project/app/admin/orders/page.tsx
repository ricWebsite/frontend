"use client";
import { useEffect, useState } from "react";
import { shopApi, unwrapCollection } from "@/lib/api";

type OrderItem = {
  _id?: string;
  productId?: string;
  name?: string;
  quantity: number;
  price: number;
};

type Order = {
  _id: string;
  email?: string;
  total: number;
  status?: string;
  items: OrderItem[];
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [sel, setSel] = useState<Order | null>(null);

  const fetch = async () => {
    try {
      const res = await shopApi.getAllOrders();
      setOrders(unwrapCollection(res));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(()=>{ fetch(); }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Orders</h1>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-2">Order ID</th>
              <th className="p-2">Email</th>
              <th className="p-2">Total</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o._id} className="border-b">
                <td className="p-2">{o._id}</td>
                <td className="p-2">{o.email}</td>
                <td className="p-2">Ksh {o.total}</td>
                <td className="p-2 capitalize">{o.status}</td>
                <td className="p-2">
                  <button onClick={()=>setSel(o)} className="px-3 py-1 bg-blue-600 text-white rounded">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white w-[800px] p-6 rounded shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Order {sel._id}</h2>
              <button onClick={()=>setSel(null)} className="text-gray-500">Close</button>
            </div>

            <div>
              <p><strong>Email:</strong> {sel.email}</p>
              <p><strong>Status:</strong> {sel.status}</p>
              <p><strong>Total:</strong> Ksh {sel.total}</p>

              <div className="mt-4">
                <h3 className="font-semibold">Items</h3>
                <ul className="mt-2">
                  {sel.items.map((it) => (
                    <li key={it._id || it.productId} className="py-2 border-b">
                      <div className="flex justify-between">
                        <div>
                          <div className="font-medium">{it.name}</div>
                          <div className="text-sm text-gray-500">Qty: {it.quantity}</div>
                        </div>
                        <div>Ksh {it.price}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
