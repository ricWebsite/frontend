import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-72 bg-white shadow-lg flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <nav className="flex flex-col gap-2 text-gray-700">
          <Link href="/admin/dashboard" className="p-2 rounded hover:bg-gray-100">Dashboard</Link>
          <Link href="/admin/products" className="p-2 rounded hover:bg-gray-100">Products</Link>
          <Link href="/admin/orders" className="p-2 rounded hover:bg-gray-100">Orders</Link>
          <Link href="/admin/users" className="p-2 rounded hover:bg-gray-100">Users</Link>
          <Link href="/admin/settings" className="p-2 rounded hover:bg-gray-100">Settings</Link>
          <a href="/home" className="p-2 mt-4 text-sm text-gray-500 hover:underline">Back to app</a>
        </nav>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
