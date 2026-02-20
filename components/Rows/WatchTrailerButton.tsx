"use client";

import { useState } from "react";
import type { Movie } from "@/lib/tmdb";

type Props = {
  movie: Movie;
  onLoaded: (url: string) => void;
  onError: (message: string) => void;
  title: string;
};

const isTv = (item: Movie) => {
  if (item.media_type) return item.media_type === "tv";
  return Boolean(item.first_air_date && !item.title);
};

export default function WatchTrailerButton({
  movie,
  onLoaded,
  onError,
  title,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    onError("");
    try {
      const type = isTv(movie) ? "tv" : "movie";
      const res = await fetch(`/api/trailer?id=${movie.id}&type=${type}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Trailer unavailable");
      onLoaded(data.url);
    } catch (error: any) {
      onError(error?.message || "Trailer unavailable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      title={`Watch the trailer for ${title}`}
      className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium hover:bg-red-500 disabled:opacity-60"
    >
      {loading ? "Loading..." : "Watch Trailer"}
    </button>
  );
}
