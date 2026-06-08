"use client";

import { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";

export default function AdminCouponsPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <AdminHeader title="Coupons" />
        <Button onClick={() => setShowModal(true)} size="sm">Add Coupon</Button>
      </div>
      <div className="bg-neutral-800 rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-700">
              <th className="text-left p-4 text-neutral-400 font-medium">Code</th>
              <th className="text-left p-4 text-neutral-400 font-medium">Discount</th>
              <th className="text-left p-4 text-neutral-400 font-medium">Uses</th>
              <th className="text-left p-4 text-neutral-400 font-medium">Status</th>
              <th className="text-right p-4 text-neutral-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="p-8 text-center text-neutral-500">No coupons yet</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Coupon">
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Coupon added!"); setShowModal(false); }} className="space-y-4">
          <Input label="Coupon Code" required />
          <Input label="Discount (%)" type="number" required />
          <Input label="Max Uses" type="number" />
          <Button type="submit" className="w-full" size="lg">Save Coupon</Button>
        </form>
      </Modal>
    </div>
  );
}
