"use client";

import { useState } from "react";
import Image from "next/image";

export default function PropertyGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="w-full h-[340px] rounded bg-[#e8e2d4] flex items-center justify-center text-ink-soft text-sm">
        No photos available yet
      </div>
    );
  }

  return (
    <div>
      <div className="w-full h-[340px] sm:h-[440px] relative rounded overflow-hidden bg-[#e8e2d4]">
        <Image
          src={images[active]}
          alt={`Photo ${active + 1} of ${title}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 66vw"
          className="object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-3 mt-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActive(i)}
              className={`relative w-20 h-16 shrink-0 rounded overflow-hidden border-2 transition-colors ${
                i === active ? "border-brass" : "border-transparent opacity-70 hover:opacity-100"
              }`}
              aria-label={`View photo ${i + 1} of ${title}`}
            >
              <Image src={img} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
