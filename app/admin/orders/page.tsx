"use client";

import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminOrdersPage() {
  return (
    <div>
      <AdminHeader title="Orders" />
      <div className="bg-neutral-800 rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-700">
              <th className="text-left p-4 text-neutral-400 font-medium">Order ID</th>
              <th className="text-left p-4 text-neutral-400 font-medium">Customer</th>
              <th className="text-left p-4 text-neutral-400 font-medium">Status</th>
              <th className="text-left p-4 text-neutral-400 font-medium">Total</th>
              <th className="text-left p-4 text-neutral-400 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="p-8 text-center text-neutral-500">No orders yet</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
