"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { IoPlay, IoSearch } from "react-icons/io5";

const allVideos = [
  { title: "SS25 Collection Launch", category: "Campaign", duration: "2:45", thumbnail: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80", featured: true },
  { title: "Behind the Scenes: Photoshoot", category: "BTS", duration: "4:30", thumbnail: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80" },
  { title: "Urban Collection Runway", category: "Runway", duration: "3:15", thumbnail: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&q=80" },
  { title: "Model Casting Sessions", category: "BTS", duration: "5:00", thumbnail: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80" },
  { title: "Accessories Line Launch", category: "Product", duration: "1:45", thumbnail: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80" },
  { title: "Winter Collection Preview", category: "Campaign", duration: "2:30", thumbnail: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80" },
  { title: "Fashion Lookbook Vol. 3", category: "Lookbook", duration: "6:20", thumbnail: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80" },
  { title: "Designer Interview", category: "BTS", duration: "8:15", thumbnail: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80" },
  { title: "Spring Essentials", category: "Campaign", duration: "1:30", thumbnail: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&q=80" },
];

const categories = ["All", "Campaign", "Runway", "BTS", "Product", "Lookbook"];

export default function VideosPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = allVideos.filter((v) => {
    const matchCategory = activeCategory === "All" || v.category === activeCategory;
    const matchSearch = v.title.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const featured = allVideos.find((v) => v.featured);

  return (
    <>
      <Header />
      <div className="pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Videos</h1>
            <p className="text-neutral-500">Explore our campaign films, runway shows, and behind-the-scenes content.</p>
          </div>

          {featured && (
            <div className="relative aspect-video overflow-hidden bg-neutral-900 mb-10 group">
              <img src={featured.thumbnail} alt={featured.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center border-2 border-white/80 text-white/80 hover:bg-white hover:text-black transition-all rounded-full cursor-pointer">
                  <IoPlay size={32} className="ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="text-white/60 text-xs tracking-wider uppercase">{featured.category}</span>
                <h2 className="text-white text-xl sm:text-2xl font-bold">{featured.title}</h2>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs tracking-wider uppercase transition-colors ${
                    activeCategory === cat
                      ? "bg-black dark:bg-white text-white dark:text-black"
                      : "border border-neutral-300 dark:border-neutral-600 hover:border-black dark:hover:border-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center border border-neutral-300 dark:border-neutral-600 w-full sm:w-auto">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search videos..."
                className="px-4 py-2 bg-transparent outline-none text-sm flex-1"
              />
              <IoSearch size={18} className="mr-3 text-neutral-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((video, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-12 h-12 flex items-center justify-center border border-white/80 text-white/80 group-hover:bg-white group-hover:text-black transition-all rounded-full">
                      <IoPlay size={20} className="ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm text-white text-[10px] px-2 py-1 tracking-wider uppercase rounded">
                    {video.category}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1">
                    {video.duration}
                  </span>
                </div>
                <h3 className="text-sm font-medium mt-3">{video.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
