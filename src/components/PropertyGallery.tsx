"use client";

import { useState } from "react";

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
      <div
        className="w-full h-[340px] sm:h-[440px] rounded bg-cover bg-center bg-[#e8e2d4]"
        style={{ backgroundImage: `url('${images[active]}')` }}
        role="img"
        aria-label={title}
      />
      {images.length > 1 && (
        <div className="flex gap-3 mt-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActive(i)}
              className={`w-20 h-16 shrink-0 rounded bg-cover bg-center border-2 transition-colors ${
                i === active ? "border-brass" : "border-transparent opacity-70 hover:opacity-100"
              }`}
              style={{ backgroundImage: `url('${img}')` }}
              aria-label={`View photo ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
