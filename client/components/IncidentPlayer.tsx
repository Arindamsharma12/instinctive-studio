import Image from "next/image";
import { Play, Volume2, Maximize } from "lucide-react";

export function IncidentPlayer() {
  return (
    // Main container with a modern dark background and padding
    <div className="flex w-full max-w-4xl flex-col bg-slate-800 rounded-xl p-2 sm:p-3 shadow-2xl">
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
        {/* Main Image/Video Feed */}
        <Image
          src="/image.png"
          alt="Main camera feed"
          fill
          // Refined sizes for optimal image loading on different devices
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
          className="object-cover"
          priority // Load the main image faster
        />

        {/* --- Overlays --- */}

        {/* Timestamp */}
        <div className="absolute top-3 left-3 bg-black/60 p-2 rounded-md">
          <p className="text-white text-sm font-semibold">
            1/7/2025 - 03:12:37
          </p>
        </div>

        {/* Main Camera Name (moved above control bar for visibility) */}
        <div className="absolute bottom-16 left-3 sm:bottom-20 sm:left-4 bg-black/60 p-2 rounded-md flex items-center gap-2">
          <span className="text-green-400">●</span>
          <p className="text-sm sm:text-base text-white font-medium">
            Camera - 01
          </p>
        </div>

        {/* Thumbnail Previews */}
        <div className="absolute bottom-16 right-3 sm:bottom-20 sm:right-4 flex flex-col md:flex-row gap-3">
          {/* Active Thumbnail */}
          <div className="w-28 md:w-36 relative aspect-video bg-black rounded-md border-2 border-blue-500 cursor-pointer transition-all overflow-hidden group">
            <Image
              src="/image1.jpg"
              alt="Camera 2 thumbnail"
              fill
              className="object-cover transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/30"></div>
            <p className="absolute bottom-1 left-1.5 text-xs text-white font-bold bg-black/50 px-1.5 py-0.5 rounded">
              Camera - 2
            </p>
          </div>

          {/* Inactive Thumbnail */}
          <div className="w-28 md:w-36 relative aspect-video bg-black rounded-md border-2 border-slate-600 hover:border-blue-500 cursor-pointer transition-all overflow-hidden group">
            <Image
              src="/image2.jpg"
              alt="Camera 3 thumbnail"
              fill
              className="object-cover transition-transform group-hover:scale-110"
            />
            <p className="absolute bottom-1 left-1.5 text-xs text-white font-bold bg-black/50 px-1.5 py-0.5 rounded">
              Camera - 3
            </p>
          </div>
        </div>

        {/* --- Player Controls Bar --- */}
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-black/80 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 flex items-center gap-4 px-4 py-3 text-white">
            {/* Play Button */}
            <button
              className="hover:text-blue-400 transition-colors"
              aria-label="Play/Pause"
            >
              <Play className="w-6 h-6" />
            </button>

            {/* Timeline / Scrubber */}
            <div className="w-full h-1.5 bg-slate-500/70 rounded-full cursor-pointer group flex items-center">
              <div className="w-1/3 h-full bg-blue-500 rounded-full relative">
                <div className="absolute right-0 top-1/2 -mt-2 w-4 h-4 bg-white rounded-full border-2 border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>

            {/* Volume Button */}
            <button
              className="hover:text-blue-400 transition-colors"
              aria-label="Volume"
            >
              <Volume2 className="w-6 h-6" />
            </button>

            {/* Fullscreen Button */}
            <button
              className="hover:text-blue-400 transition-colors"
              aria-label="Fullscreen"
            >
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
