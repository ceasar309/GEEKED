"use client";

import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminAnalyticsPage() {
  return (
    <div>
      <AdminHeader title="Analytics" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Total Sales", value: "$0.00" },
          { label: "Orders", value: "0" },
          { label: "Conversion Rate", value: "0%" },
          { label: "Avg. Order Value", value: "$0.00" },
          { label: "New Customers", value: "0" },
          { label: "Revenue Growth", value: "0%" },
        ].map((stat) => (
          <div key={stat.label} className="bg-neutral-800 p-6 rounded">
            <p className="text-neutral-400 text-sm">{stat.label}</p>
            <p className="text-xl font-bold text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-neutral-800 p-6 rounded">
        <h3 className="font-semibold text-white mb-4">Revenue Chart</h3>
        <div className="h-64 flex items-center justify-center text-neutral-500">
          No data available yet
        </div>
      </div>
    </div>
  );
}
