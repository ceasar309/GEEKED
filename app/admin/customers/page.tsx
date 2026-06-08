"use client";

import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminCustomersPage() {
  return (
    <div>
      <AdminHeader title="Customers" />
      <div className="bg-neutral-800 rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-700">
              <th className="text-left p-4 text-neutral-400 font-medium">Name</th>
              <th className="text-left p-4 text-neutral-400 font-medium">Email</th>
              <th className="text-left p-4 text-neutral-400 font-medium">Orders</th>
              <th className="text-left p-4 text-neutral-400 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} className="p-8 text-center text-neutral-500">No customers yet</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
