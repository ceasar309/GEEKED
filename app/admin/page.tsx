"use client";

import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminDashboard() {
  return (
    <div>
      <AdminHeader title="Dashboard" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Revenue", value: "$0.00", change: "+0%" },
          { label: "Total Orders", value: "0", change: "+0" },
          { label: "Total Products", value: "0", change: "+0" },
          { label: "Total Customers", value: "0", change: "+0" },
        ].map((stat) => (
          <div key={stat.label} className="bg-neutral-800 p-6 rounded">
            <p className="text-neutral-400 text-sm">{stat.label}</p>
            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
            <p className="text-xs text-green-400 mt-1">{stat.change} this month</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-neutral-800 p-6 rounded">
          <h3 className="font-semibold text-white mb-4">Recent Orders</h3>
          <p className="text-neutral-400 text-sm">No orders yet</p>
        </div>
        <div className="bg-neutral-800 p-6 rounded">
          <h3 className="font-semibold text-white mb-4">Sales Overview</h3>
          <p className="text-neutral-400 text-sm">No data available</p>
        </div>
      </div>
    </div>
  );
}
