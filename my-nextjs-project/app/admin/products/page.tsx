"use client";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import ProductModal from "../components/admin/ProductModal";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<any | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/shop");
      setProducts(res.data);
    } catch (e) {
      console.error(e);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete product?")) return;
    await axios.delete(`/shop/${id}`);
    fetchProducts();
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Products</h1>
        <div>
          <button onClick={() => { setEditProduct(null); setOpen(true); }} className="px-4 py-2 bg-blue-600 text-white rounded">Add product</button>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        {loading ? <p>Loading...</p> : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2">Image</th>
                <th className="p-2">Name</th>
                <th className="p-2">Price</th>
                <th className="p-2">Stock</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p._id} className="border-b">
                  <td className="p-2"><img src={p.images?.[0] || '/placeholder.png'} alt="" className="w-16 h-12 object-cover rounded" /></td>
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">Ksh {p.price}</td>
                  <td className="p-2">{p.stock}</td>
                  <td className="p-2 flex gap-2">
                    <button onClick={() => { setEditProduct(p); setOpen(true); }} className="px-3 py-1 bg-yellow-500 text-white rounded">Edit</button>
                    <button onClick={() => handleDelete(p._id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ProductModal open={open} setOpen={setOpen} product={editProduct} onSaved={fetchProducts} />
    </>
  );
}
