"use client";

import { useState, useRef } from "react";
import { IoPlay, IoPause, IoVolumeMute, IoVolumeHigh, IoExpand } from "react-icons/io5";

const featuredVideo = {
  title: "SS25 Collection Launch",
  description: "Experience the new season where urban edge meets luxury craftsmanship.",
  collection: "Summer 2025",
  videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  thumbnailUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&q=90",
};

const recentVideos = [
  {
    title: "Behind the Scenes",
    category: "BTS",
    duration: "3:24",
    thumbnail: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80",
  },
  {
    title: "Urban Collection",
    category: "Campaign",
    duration: "1:45",
    thumbnail: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&q=80",
  },
  {
    title: "Model Casting",
    category: "BTS",
    duration: "4:12",
    thumbnail: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
  },
  {
    title: "Accessories Line",
    category: "Product",
    duration: "2:30",
    thumbnail: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
  },
];

export default function VideoShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-3">Visual Stories</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Campaign Films</h2>
        </div>

        <div className="mb-10">
          <div className="relative group overflow-hidden aspect-video bg-neutral-900">
            <video
              ref={videoRef}
              src={featuredVideo.videoUrl}
              poster={featuredVideo.thumbnailUrl}
              className="w-full h-full object-cover"
              muted={isMuted}
              loop
              playsInline
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={togglePlay}
                className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center border-2 border-white/80 text-white/80 hover:bg-white hover:text-black transition-all rounded-full"
              >
                {isPlaying ? <IoPause size={28} /> : <IoPlay size={28} className="ml-1" />}
              </button>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-xs text-white/60 tracking-[0.2em] uppercase mb-1">
                {featuredVideo.collection}
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-white">{featuredVideo.title}</h3>
              <p className="text-sm text-white/70 mt-1 max-w-xl">{featuredVideo.description}</p>
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={toggleMute}
                className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/30 text-white transition-colors"
              >
                {isMuted ? <IoVolumeMute size={16} /> : <IoVolumeHigh size={16} />}
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Recent Videos</h3>
            <a href="/videos" className="text-xs text-white/60 hover:text-white tracking-wider uppercase transition-colors">
              View All
            </a>
          </div>
          <div
            className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {recentVideos.map((video, i) => (
              <div key={i} className="min-w-[260px] sm:min-w-[300px] group relative aspect-video overflow-hidden flex-shrink-0 cursor-pointer">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-10 h-10 flex items-center justify-center border border-white/80 text-white/80 group-hover:bg-white group-hover:text-black transition-all rounded-full">
                    <IoPlay size={16} className="ml-0.5" />
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] px-2 py-1 tracking-wider uppercase rounded">
                    {video.category}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-white text-sm font-medium">{video.title}</span>
                  <span className="text-white/70 text-xs">{video.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
