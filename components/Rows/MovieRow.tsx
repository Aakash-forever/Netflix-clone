"use client";

import { useState } from "react";
import type { Movie } from "@/lib/tmdb";
import MovieCard from "./MovieCard";
import MoviePreview from "./MoviePreview";

type Props = {
  movies?: Movie[];
};

export default function MovieRow({ movies = [] }: Props) {
  const [selected, setSelected] = useState<Movie | null>(null);

  return (
    <>
      <div className="flex gap-6 overflow-x-auto overflow-y-visible scrollbar-hide py-5">
        {movies.map((movie, index) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            loading={index === 0 ? "eager" : "lazy"}
            priority={index === 0}
            onSelect={setSelected}
          />
        ))}
      </div>
      <MoviePreview movie={selected} onClose={() => setSelected(null)} />
    </>
  );
}
