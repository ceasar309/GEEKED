"use client";

import { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import toast from "react-hot-toast";

export default function AdminBannersPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <AdminHeader title="Banners" />
        <Button onClick={() => setShowModal(true)} size="sm">Add Banner</Button>
      </div>
      <div className="bg-neutral-800 p-8 rounded text-center text-neutral-500">
        No banners yet
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Banner">
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Banner added!"); setShowModal(false); }} className="space-y-4">
          <input type="file" accept="image/*" className="w-full text-sm" />
          <input placeholder="Link URL" className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 outline-none text-sm" />
          <Button type="submit" className="w-full" size="lg">Save Banner</Button>
        </form>
      </Modal>
    </div>
  );
}
