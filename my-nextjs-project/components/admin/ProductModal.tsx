"use client";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";

export default function ProductModal({ open, setOpen, product, onSaved }: any) {
  const [form, setForm] = useState({ name: "", description: "", price: 0, category: "", stock: 0, images: [] as string[] });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (product) setForm({ name: product.name || "", description: product.description || "", price: product.price || 0, category: product.category || "", stock: product.stock || 0, images: product.images || [] });
    else setForm({ name: "", description: "", price: 0, category: "", stock: 0, images: [] });
  }, [product]);

  if (!open) return null;
  const close = () => setOpen(false);

  const handleSave = async () => {
    try {
      if (product) {
        await axios.put(`/shop/${product._id}`, form);
      } else {
        await axios.post(`/shop`, form);
      }
      onSaved();
      close();
    } catch (err) {
      console.error(err);
      alert("Failed to save.");
    }
  };

  // placeholder uploader - change to actual file upload endpoint if you have one
  const handleImageUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    // Simple client-side base64 (not ideal for production). Replace with real upload.
    const reader = new FileReader();
    reader.onload = () => {
      setForm((s: any) => ({ ...s, images: [...s.images, reader.result as string] }));
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white w-[760px] p-6 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{product ? "Edit product" : "Add product"}</h2>
          <button onClick={close} className="text-gray-500">Close</button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input className="p-2 border rounded" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
          <input className="p-2 border rounded" placeholder="Category" value={form.category} onChange={e=>setForm({...form, category: e.target.value})} />
          <textarea className="p-2 border rounded col-span-2" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description: e.target.value})} />
          <input type="number" className="p-2 border rounded" placeholder="Price" value={form.price} onChange={e=>setForm({...form, price: Number(e.target.value)})} />
          <input type="number" className="p-2 border rounded" placeholder="Stock" value={form.stock} onChange={e=>setForm({...form, stock: Number(e.target.value)})} />
        </div>

        <div className="mt-4">
          <label className="block mb-2">Images</label>
          <div className="flex gap-2 items-center">
            <input type="file" onChange={handleImageUpload} />
            {uploading && <span>Uploading...</span>}
          </div>
          <div className="flex gap-2 mt-3">
            {form.images.map((src:any, idx:number) => (
              <img key={idx} src={src} className="w-24 h-16 object-cover rounded" alt="img"/>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={close} className="px-4 py-2 border rounded">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
}
