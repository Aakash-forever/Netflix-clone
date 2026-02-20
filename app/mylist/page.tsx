"use client";

import { useState } from "react";
import MovieCard from "@/components/Rows/MovieCard";
import MoviePreview from "@/components/Rows/MoviePreview";
import { useMyList } from "@/hooks/useMyList";

export default function MyList() {
  const { items, hydrated } = useMyList();
  const [selected, setSelected] = useState(null);

  if (!hydrated) {
    return <div className="p-6 text-gray-300">Loading your list…</div>;
  }

  if (!items.length) {
    return <div className="p-6 text-gray-300">Nothing saved yet.</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-baseline gap-3">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">
          My List
        </h1>
        <span className="text-sm text-gray-400">{items.length} saved</span>
      </div>
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-6">
        {items.map((movie, index) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            loading="eager"
            priority
            onSelect={setSelected}
          />
        ))}
      </div>
      <MoviePreview movie={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
