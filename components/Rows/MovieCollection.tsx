"use client";

import { useState } from "react";
import type { Movie } from "@/lib/tmdb";
import MovieCard from "./MovieCard";
import MoviePreview from "./MoviePreview";

type Props = {
  movies?: Movie[];
  layout?: "row" | "grid";
};

export default function MovieCollection({ movies = [], layout = "row" }: Props) {
  const [selected, setSelected] = useState<Movie | null>(null);

  const listClass =
    layout === "grid"
      ? "grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-6"
      : "flex gap-6 overflow-x-auto overflow-y-visible scrollbar-hide py-5";

  return (
    <>
      <div className={listClass}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onSelect={setSelected} />
        ))}
      </div>
      <MoviePreview movie={selected} onClose={() => setSelected(null)} />
    </>
  );
}
