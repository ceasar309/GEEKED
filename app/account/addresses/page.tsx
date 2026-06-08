"use client";

export default function AddressesPage() {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Saved Addresses</h2>
      <div className="text-center py-12 border border-neutral-200 dark:border-neutral-700">
        <p className="text-neutral-500">No saved addresses</p>
        <p className="text-sm text-neutral-400 mt-1">Add an address for faster checkout</p>
      </div>
    </div>
  );
}
