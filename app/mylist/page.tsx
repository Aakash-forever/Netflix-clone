"use client";

import MovieCollection from "@/components/Rows/MovieCollection";
import Heading from "@/components/UI/Heading";
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
      <Heading level={1} addon={`${items.length} saved`}>
        My List
      </Heading>
      <MovieCollection movies={items} layout="grid" />
    </div>
  );
}
