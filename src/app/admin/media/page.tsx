"use client";

import { useEffect, useState, useRef } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { IoCopy, IoTrash, IoCloudUpload, IoImage, IoVideocam, IoGrid, IoList } from "react-icons/io5";

interface MediaFile {
  name: string;
  url: string;
  size: number;
  type: string;
  createdAt: string;
}

export default function AdminMediaPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const fetchFiles = async () => {
    try {
      const res = await fetch("/api/media");
      const data = await res.json();
      setFiles(data.files || []);
    } catch {
      toast.error("Failed to load media");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async (type: "image" | "video") => {
    const input = type === "image" ? fileInputRef : videoInputRef;
    input.current?.click();
  };

  const onFileSelect = async (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "video") => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    try {
      const res = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success(`${type === "image" ? "Image" : "Video"} uploaded`);
        fetchFiles();
      } else {
        const err = await res.json();
        toast.error(err.error || "Upload failed");
      }
    } catch {
      toast.error("Upload failed");
    }
    setUploading(false);
    e.target.value = "";
  };

  const handleDelete = async (file: MediaFile) => {
    if (!confirm(`Delete ${file.name}?`)) return;

    try {
      const res = await fetch("/api/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: file.name }),
      });

      if (res.ok) {
        toast.success("File deleted");
        fetchFiles();
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(window.location.origin + url);
    toast.success("URL copied");
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const filtered = filter === "all" ? files : files.filter((f) => f.type === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <AdminHeader title="Media Library" />
        <div className="flex items-center gap-3">
          <div className="flex border border-neutral-700 rounded overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "bg-white/10 text-white" : "text-neutral-500 hover:text-white"}`}
            >
              <IoGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${viewMode === "list" ? "bg-white/10 text-white" : "text-neutral-500 hover:text-white"}`}
            >
              <IoList size={16} />
            </button>
          </div>
          <Button onClick={() => handleUpload("image")} size="sm" disabled={uploading}>
            <IoImage size={16} className="mr-1" /> Upload Image
          </Button>
          <Button onClick={() => handleUpload("video")} size="sm" variant="outline" disabled={uploading}>
            <IoVideocam size={16} className="mr-1" /> Upload Video
          </Button>
        </div>
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => onFileSelect(e, "image")} />
      <input ref={videoInputRef} type="file" accept="video/*" className="hidden" onChange={(e) => onFileSelect(e, "video")} />

      <div className="flex gap-2 mb-6">
        {["all", "image", "video"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-1.5 text-xs tracking-wider uppercase rounded transition-colors ${
              filter === f
                ? "bg-white text-black"
                : "bg-neutral-800 text-neutral-400 hover:text-white"
            }`}
          >
            {f === "all" ? "All" : f === "image" ? "Images" : "Videos"} ({f === "all" ? files.length : files.filter((x) => x.type === f).length})
          </button>
        ))}
      </div>

      {uploading && (
        <div className="flex items-center gap-2 p-4 bg-neutral-800 rounded mb-4 text-sm text-neutral-300">
          <IoCloudUpload size={18} className="animate-pulse" />
          Uploading...
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="aspect-square bg-neutral-800 animate-pulse rounded" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-neutral-800 rounded p-12 text-center text-neutral-500">
          <IoCloudUpload size={40} className="mx-auto mb-3 opacity-50" />
          <p className="mb-1">No media files yet</p>
          <p className="text-sm">Upload images or videos to use across the site</p>
          <div className="flex gap-3 justify-center mt-4">
            <Button onClick={() => handleUpload("image")} size="sm">Upload Image</Button>
            <Button onClick={() => handleUpload("video")} size="sm" variant="outline">Upload Video</Button>
          </div>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filtered.map((file) => (
            <div key={file.name} className="group relative bg-neutral-800 rounded overflow-hidden">
              <div className="aspect-square overflow-hidden">
                {file.type === "image" ? (
                  <img src={file.url} alt={file.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-neutral-700">
                    <IoVideocam size={32} className="text-neutral-500" />
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => copyUrl(file.url)}
                  className="p-1.5 bg-white/20 hover:bg-white/40 text-white rounded"
                  title="Copy URL"
                >
                  <IoCopy size={14} />
                </button>
                <button
                  onClick={() => handleDelete(file)}
                  className="p-1.5 bg-red-500/60 hover:bg-red-500 text-white rounded"
                  title="Delete"
                >
                  <IoTrash size={14} />
                </button>
              </div>
              <div className="p-2 text-xs text-neutral-400 truncate">{file.name}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-neutral-800 rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-700">
                <th className="text-left p-3 text-neutral-400 font-medium">Preview</th>
                <th className="text-left p-3 text-neutral-400 font-medium">Name</th>
                <th className="text-left p-3 text-neutral-400 font-medium">Type</th>
                <th className="text-left p-3 text-neutral-400 font-medium">Size</th>
                <th className="text-right p-3 text-neutral-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((file) => (
                <tr key={file.name} className="border-b border-neutral-700/50 hover:bg-neutral-700/30">
                  <td className="p-3">
                    <div className="w-10 h-10 bg-neutral-700 rounded overflow-hidden">
                      {file.type === "image" ? (
                        <img src={file.url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <IoVideocam size={16} className="text-neutral-500" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-3 text-neutral-300 truncate max-w-[200px]">{file.name}</td>
                  <td className="p-3 text-neutral-400 capitalize">{file.type}</td>
                  <td className="p-3 text-neutral-400">{formatSize(file.size)}</td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => copyUrl(file.url)} className="text-neutral-400 hover:text-white transition-colors" title="Copy URL">
                        <IoCopy size={14} />
                      </button>
                      <button onClick={() => handleDelete(file)} className="text-neutral-400 hover:text-red-400 transition-colors" title="Delete">
                        <IoTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 p-4 bg-neutral-800/50 rounded text-xs text-neutral-500">
        <p className="font-medium mb-1">Uploaded Media URLs</p>
        <p>After uploading, copy the file URL and use it in Hero Slides, Banners, Product images, or anywhere across the site.</p>
      </div>
    </div>
  );
}
