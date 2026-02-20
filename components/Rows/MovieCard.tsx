"use client";

import Image from "next/image";
import type { KeyboardEvent } from "react";
import type { Movie } from "@/lib/tmdb";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

type Props = {
  movie: Movie;
  loading?: "eager" | "lazy";
  priority?: boolean;
  onSelect?: (movie: Movie) => void;
};

export default function MovieCard({
  movie,
  loading = "lazy",
  priority = false,
  onSelect,
}: Props) {
  const openDetails = () => onSelect?.(movie);
  const handleKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openDetails();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={openDetails}
      onKeyDown={handleKey}
      title={`View details for ${movie.title || movie.name || "this title"}`}
      className="group relative min-w-[150px] sm:min-w-[180px] md:min-w-[200px] aspect-[2/3] overflow-visible focus:outline-none"
    >
      <div className="relative h-full w-full overflow-hidden bg-neutral-900 transition-transform duration-300 group-hover:scale-110">
        {movie.poster_path ? (
          <Image
            src={`${IMG_BASE}${movie.poster_path}`}
            alt={movie.title || movie.name || "Untitled"}
            loading={loading}
            priority={priority}
            fill
            className="object-cover"
            sizes="200px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-neutral-400">
            No poster
          </div>
        )}
      </div>
    </div>
  );
}
