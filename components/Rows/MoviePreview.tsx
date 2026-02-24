"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Movie } from "@/lib/tmdb";
import { useMyList } from "@/hooks/useMyList";
import WatchTrailerButton from "./WatchTrailerButton";

type Props = {
  movie: Movie | null;
  onClose: () => void;
  size?: "default" | "compact";
};

export default function MoviePreview({ movie, onClose, size = "default" }: Props) {
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [trailerError, setTrailerError] = useState<string | null>(null);
  const { isSaved, toggle, hydrated } = useMyList();

  useEffect(() => {
    if (!movie) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [movie]);

  if (!movie) return null;

  const previewKey = movie.id ?? movie.title ?? "preview";

  const title = movie.title || movie.name || "Untitled";
  const trailerActive = Boolean(trailerUrl);

  const isCompact = size === "compact";

  return (
    <div
      key={previewKey}
      onClick={onClose}
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/75 px-3 py-6 sm:px-4 sm:py-10"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`flex flex-col overflow-hidden rounded-xl border border-white/10 bg-neutral-900 shadow-2xl max-h-[90vh] ${
          isCompact
            ? "w-[88vw] max-w-90 sm:max-w-107.5"
            : "w-full max-w-3xl"
        }`}
      >
        <div
          className={`relative shrink-0 bg-neutral-800 ${
            trailerUrl
              ? isCompact
                ? "aspect-16/10"
                : "aspect-video"
              : isCompact
              ? "h-52 sm:h-60"
              : "h-60 sm:h-72"
          }`}
        >
          {trailerUrl ? (
            <iframe
              title="Trailer player"
              src={`${trailerUrl}?autoplay=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          ) : movie.backdrop_path || movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w780${
                movie.backdrop_path || movie.poster_path
              }`}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 1024px"
              className="object-cover"
            />
          ) : null}

          <button
            onClick={onClose}
            title="Close details"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-sm hover:bg-black/80"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-4 sm:p-5">
          <div className="flex flex-wrap items-baseline gap-2">
            <h3 className="text-lg font-semibold text-white sm:text-xl md:text-2xl">
              {title}
            </h3>
            <span className="text-sm text-gray-400">
              {movie.release_date || movie.first_air_date || "Unknown date"}
              {movie.vote_average ? ` · ⭐ ${movie.vote_average.toFixed(1)}` : ""}
            </span>
          </div>

          <p className="text-sm text-gray-200">
            {movie.overview || "No description available."}
          </p>

          {trailerError ? (
            <div className="text-sm text-red-400">{trailerError}</div>
          ) : null}

          <div className="flex flex-wrap gap-3 pt-1">
            {!trailerActive ? (
              <WatchTrailerButton
                movie={movie}
                title={title}
                onLoaded={(url) => {
                  setTrailerUrl(url);
                  setTrailerError(null);
                }}
                onError={(msg) => setTrailerError(msg)}
              />
            ) : null}
            <button
              onClick={() => toggle(movie)}
              title={
                isSaved(movie) ? "Remove from My List" : "Add to My List"
              }
              className="rounded-md border border-white/20 px-4 py-2 text-sm font-medium text-gray-100 hover:border-white/40"
            >
              {hydrated && isSaved(movie) ? "✓ In My List" : "+ My List"}
            </button>
            <button
              onClick={onClose}
              title="Close details"
              className="rounded-md border border-white/20 px-4 py-2 text-sm font-medium text-gray-100 hover:border-white/40"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
