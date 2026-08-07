"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { IconButton } from "./Button";

type MediaItem = { type: "image" | "video"; url: string };

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

function VideoThumb({ url }: { url: string }) {
  const ytId = getYouTubeId(url);
  if (ytId) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`https://img.youtube.com/vi/${ytId}/mqdefault.jpg`}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  }
  return <div className="absolute inset-0 bg-ink" />;
}

function VideoPlayer({ url, className }: { url: string; className?: string }) {
  const ytId = getYouTubeId(url);
  if (ytId) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${ytId}`}
        title="Property video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={className}
      />
    );
  }
  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video src={url} controls className={className} />
  );
}

export default function PropertyGallery({
  images,
  videos = [],
  title,
}: {
  images: string[];
  videos?: string[];
  title: string;
}) {
  const media: MediaItem[] = [
    ...images.map((url) => ({ type: "image" as const, url })),
    ...videos.map((url) => ({ type: "video" as const, url })),
  ];

  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const goPrev = useCallback(() => {
    setActive((i) => (i - 1 + media.length) % media.length);
  }, [media.length]);

  const goNext = useCallback(() => {
    setActive((i) => (i + 1) % media.length);
  }, [media.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen, goPrev, goNext]);

  if (media.length === 0) {
    return (
      <div className="w-full h-[340px] rounded-xl bg-paper-dim flex items-center justify-center text-ink-soft">
        No photos available yet
      </div>
    );
  }

  const activeItem = media[active];

  return (
    <div>
      <button
        onClick={() => setLightboxOpen(true)}
        className="w-full h-[340px] sm:h-[440px] relative rounded-xl overflow-hidden bg-paper-dim block group"
        aria-label="Open full-screen gallery"
      >
        {activeItem.type === "image" ? (
          <Image
            src={activeItem.url}
            alt={`Photo ${active + 1} of ${title}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 66vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0">
            <VideoThumb url={activeItem.url} />
            <div className="absolute inset-0 bg-ink/30 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-paper/90 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-ink ml-1">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        )}
        <div className="absolute bottom-3 right-3 bg-ink/75 text-paper text-sm font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
          {media.length} {media.length === 1 ? "item" : "items"} — Click to view
        </div>
      </button>

      {media.length > 1 && (
        <div className="flex gap-3 mt-3 overflow-x-auto pb-1">
          {media.map((item, i) => (
            <button
              key={item.url + i}
              onClick={() => setActive(i)}
              className={`relative w-20 h-16 shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                i === active ? "border-brass" : "border-transparent opacity-70 hover:opacity-100"
              }`}
              aria-label={`View ${item.type} ${i + 1} of ${title}`}
            >
              {item.type === "image" ? (
                <Image src={item.url} alt="" fill sizes="80px" className="object-cover" />
              ) : (
                <>
                  <VideoThumb url={item.url} />
                  <div className="absolute inset-0 bg-ink/30 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[150] bg-ink/95 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxOpen(false)}
        >
          <IconButton
            label="Close gallery"
            tone="onDark"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-5 right-5 z-10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </IconButton>

          <IconButton
            label="Previous"
            tone="onDark"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-3 sm:left-6 z-10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </IconButton>

          <div
            className="w-full max-w-4xl max-h-[80vh] px-14 sm:px-20"
            onClick={(e) => e.stopPropagation()}
          >
            {activeItem.type === "image" ? (
              <div className="relative w-full aspect-[4/3] sm:aspect-video">
                <Image
                  src={activeItem.url}
                  alt={`Photo ${active + 1} of ${title}`}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
            ) : (
              <VideoPlayer url={activeItem.url} className="w-full aspect-video rounded" />
            )}
            <p className="text-center text-paper/60 text-sm mt-4">
              {active + 1} / {media.length}
            </p>
          </div>

          <IconButton
            label="Next"
            tone="onDark"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-3 sm:right-6 z-10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </IconButton>
        </div>
      )}
    </div>
  );
}
