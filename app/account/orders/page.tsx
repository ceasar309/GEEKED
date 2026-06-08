"use client";

export default function OrdersPage() {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Order History</h2>
      <div className="text-center py-12 border border-neutral-200 dark:border-neutral-700">
        <p className="text-neutral-500">No orders yet</p>
        <p className="text-sm text-neutral-400 mt-1">Start shopping to see your orders here</p>
      </div>
    </div>
  );
}
