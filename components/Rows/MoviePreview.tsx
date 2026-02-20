"use client";

import Image from "next/image";
import { useState } from "react";
import type { Movie } from "@/lib/tmdb";
import { useMyList } from "@/hooks/useMyList";
import WatchTrailerButton from "./WatchTrailerButton";

type Props = {
  movie: Movie | null;
  onClose: () => void;
};

export default function MoviePreview({ movie, onClose }: Props) {
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [trailerError, setTrailerError] = useState<string | null>(null);
  const [hideActions, setHideActions] = useState(false);
  const { isSaved, toggle, hydrated } = useMyList();

  if (!movie) return null;

  const previewKey = movie.id ?? movie.title ?? "preview";

  const title = movie.title || movie.name || "Untitled";

  return (
    <div
      key={previewKey}
      onClick={onClose}
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl rounded-xl bg-neutral-900 border border-white/10 shadow-2xl overflow-hidden"
      >
        <div
          className={`relative bg-neutral-800 ${
            trailerUrl ? "aspect-video" : "h-72"
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
            className="absolute top-3 right-3 rounded-full bg-black/60 px-3 py-1 text-sm"
          >
            ✕
          </button>
        </div>

        <div className="p-5 space-y-3">
          <div className="flex items-baseline gap-2">
            <h3 className="text-xl md:text-2xl font-semibold text-white">
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

          {!hideActions ? (
            <div className="flex gap-3 pt-1">
            <WatchTrailerButton
              movie={movie}
              title={title}
              hasTrailer={Boolean(trailerUrl)}
              onLoaded={(url) => {
                setTrailerUrl(url);
                setTrailerError(null);
              }}
              onError={(msg) => setTrailerError(msg)}
              onStart={() => setHideActions(true)}
            />
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
          ) : null}
        </div>
      </div>
    </div>
  );
}
