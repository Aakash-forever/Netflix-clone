"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Movie } from "@/lib/tmdb";
import MovieCard from "./MovieCard";

type Props = {
  movies?: Movie[];
};

const isTv = (item: Movie) => {
  if (item.media_type)
   return item.media_type === "tv";
  return Boolean(item.first_air_date && !item.title);
};

export default function MovieRow({ movies = [] }: Props) {
  const [selected, setSelected] = useState<Movie | null>(null);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [trailerLoading, setTrailerLoading] = useState(false);
  const [trailerError, setTrailerError] = useState<string | null>(null);

  useEffect(() => {
    setTrailerUrl(null);
    setTrailerError(null);
    setTrailerLoading(false);
  }, [selected?.id]);

  const close = () => setSelected(null);

  const watchTrailer = async () => {
    if (!selected) return;
    setTrailerLoading(true);
    setTrailerError(null);
    try {
      const type = isTv(selected) ? "tv" : "movie";
      const res = await fetch(`/api/trailer?id=${selected.id}&type=${type}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Trailer unavailable");
      }
      setTrailerUrl(data.url);
    } catch (error: any) {
      setTrailerError(error?.message || "Trailer unavailable");
    } finally {
      setTrailerLoading(false);
    }
  };

  return (
    <>
      <div className="flex gap-6 overflow-x-auto overflow-y-visible scrollbar-hide py-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onSelect={setSelected} />
        ))}
      </div>

      {selected ? (
        <div
          onClick={close}
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
              ) : selected.backdrop_path || selected.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w780${
                    selected.backdrop_path || selected.poster_path
                  }`}
                  alt={selected.title || selected.name || "Poster"}
                  fill
                  sizes="(max-width: 768px) 100vw, 1024px"
                  className="object-cover"
                />
              ) : null}

              <button
                onClick={close}
                title="Close details"
                className="absolute top-3 right-3 rounded-full bg-black/60 px-3 py-1 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-2xl font-semibold">
                  {selected.title || selected.name || "Untitled"}
                </h3>
                <span className="text-sm text-gray-400">
                  {selected.release_date ||
                    selected.first_air_date ||
                    "Unknown date"}
                  {selected.vote_average
                    ? ` · ⭐ ${selected.vote_average.toFixed(1)}`
                    : ""}
                </span>
              </div>

              <p className="text-sm text-gray-200">
                {selected.overview || "No description available."}
              </p>

              {trailerError ? (
                <div className="text-sm text-red-400">{trailerError}</div>
              ) : null}

              <div className="flex gap-3 pt-1">
                <button
                  onClick={watchTrailer}
                  disabled={trailerLoading}
                  title={`Watch the trailer for ${
                    selected.title || selected.name || "this title"
                  }`}
                  className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium hover:bg-red-500 disabled:opacity-60"
                >
                  {trailerLoading
                    ? "Loading..."
                    : trailerUrl
                      ? "Replay Trailer"
                      : "Watch Trailer"}
                </button>
                <button
                  onClick={close}
                  title="Close details"
                  className="rounded-md border border-white/20 px-4 py-2 text-sm font-medium text-gray-100 hover:border-white/40"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
