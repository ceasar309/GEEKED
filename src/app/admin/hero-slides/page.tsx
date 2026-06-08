"use client";

import { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";

export default function AdminHeroSlidesPage() {
  const [showModal, setShowModal] = useState(false);
  const [slides, setSlides] = useState<any[]>([]);
  const [editSlide, setEditSlide] = useState<any>(null);

  const openAdd = () => {
    setEditSlide(null);
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <AdminHeader title="Hero Slides" />
        <Button onClick={openAdd} size="sm">Add Slide</Button>
      </div>

      {slides.length === 0 ? (
        <div className="bg-neutral-800 p-8 rounded text-center text-neutral-500">
          <p className="mb-2">No hero slides yet</p>
          <p className="text-sm">Add slides to display on the homepage hero carousel.</p>
          <Button onClick={openAdd} variant="outline" size="sm" className="mt-4">Add Your First Slide</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {slides.map((slide, i) => (
            <div key={i} className="bg-neutral-800 p-4 rounded flex items-center gap-4">
              <div className="w-24 h-16 bg-neutral-700 rounded overflow-hidden flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-white">{slide.title}</p>
                <p className="text-sm text-neutral-400">Order: {slide.displayOrder}</p>
              </div>
              <div className="flex gap-2">
                <button className="text-sm text-neutral-400 hover:text-white transition-colors">Edit</button>
                <button className="text-sm text-red-400 hover:text-red-300 transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editSlide ? "Edit Slide" : "Add Slide"}>
        <form onSubmit={(e) => { e.preventDefault(); toast.success(editSlide ? "Slide updated!" : "Slide added!"); setShowModal(false); }} className="space-y-4">
          <Input label="Title" defaultValue={editSlide?.title} required />
          <Input label="Subtitle" defaultValue={editSlide?.subtitle} />
          <Input label="Button Text" defaultValue={editSlide?.buttonText || "Shop Now"} />
          <Input label="Button Link" defaultValue={editSlide?.buttonLink || "/shop"} />
          <Input label="Display Order" type="number" defaultValue={editSlide?.displayOrder || slides.length + 1} />
          <Input label="Display Duration (seconds)" type="number" defaultValue={editSlide?.displayDuration || 5} />
          <div className="w-full">
            <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">Image</label>
            <input type="file" accept="image/*" className="w-full text-sm" />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" defaultChecked className="accent-black" />
            Active
          </label>
          <Button type="submit" className="w-full" size="lg">{editSlide ? "Update Slide" : "Save Slide"}</Button>
        </form>
      </Modal>
    </div>
  );
}
