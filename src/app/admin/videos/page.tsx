"use client";

import { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";

export default function AdminVideosPage() {
  const [showModal, setShowModal] = useState(false);
  const [videos, setVideos] = useState<any[]>([]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <AdminHeader title="Video Management" />
        <Button onClick={() => setShowModal(true)} size="sm">Add Video</Button>
      </div>

      {videos.length === 0 ? (
        <div className="bg-neutral-800 p-8 rounded text-center text-neutral-500">
          <p className="mb-2">No videos yet</p>
          <p className="text-sm">Upload campaign videos, runway shows, or behind-the-scenes content.</p>
          <Button onClick={() => setShowModal(true)} variant="outline" size="sm" className="mt-4">Add Your First Video</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video, i) => (
            <div key={i} className="bg-neutral-800 rounded overflow-hidden">
              <div className="aspect-video bg-neutral-700" />
              <div className="p-4">
                <p className="font-medium text-white text-sm">{video.title}</p>
                <p className="text-xs text-neutral-400 mt-1">{video.category} | {video.duration}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Video">
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Video added!"); setShowModal(false); }} className="space-y-4">
          <Input label="Video Title" required />
          <Input label="Description" />
          <Input label="Video URL (YouTube/Vimeo)" placeholder="https://youtube.com/..." />
          <Input label="Category" placeholder="Campaign, Runway, BTS, Lookbook..." />
          <div className="w-full">
            <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">Upload File</label>
            <input type="file" accept="video/*" className="w-full text-sm" />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="accent-black" />
            Feature on homepage
          </label>
          <Button type="submit" className="w-full" size="lg">Save Video</Button>
        </form>
      </Modal>
    </div>
  );
}
