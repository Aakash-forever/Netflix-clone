"use client";

import MovieCollection from "@/components/Rows/MovieCollection";
import { useMyList } from "@/hooks/useMyList";

export default function MyList() {
  const { items, hydrated } = useMyList();

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
      <MovieCollection movies={items} layout="grid" />
    </div>
  );
}
