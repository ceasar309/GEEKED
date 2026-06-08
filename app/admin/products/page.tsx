"use client";

import { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";

export default function AdminProductsPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <AdminHeader title="Products" />
        <Button onClick={() => setShowModal(true)} size="sm">Add Product</Button>
      </div>

      <div className="bg-neutral-800 rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-700">
              <th className="text-left p-4 text-neutral-400 font-medium">Product</th>
              <th className="text-left p-4 text-neutral-400 font-medium">Price</th>
              <th className="text-left p-4 text-neutral-400 font-medium">Stock</th>
              <th className="text-left p-4 text-neutral-400 font-medium">Status</th>
              <th className="text-right p-4 text-neutral-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="p-8 text-center text-neutral-500">
                No products yet. Click &ldquo;Add Product&rdquo; to get started.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Product">
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Product added!"); setShowModal(false); }} className="space-y-4">
          <Input label="Product Name" required />
          <Input label="Price" type="number" required />
          <Input label="Stock" type="number" required />
          <Input label="SKU" required />
          <div className="w-full">
            <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">Description</label>
            <textarea className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 outline-none focus:border-black dark:focus:border-white transition-colors text-sm resize-none h-24" />
          </div>
          <Button type="submit" className="w-full" size="lg">Save Product</Button>
        </form>
      </Modal>
    </div>
  );
}
