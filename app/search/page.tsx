"use client";
import { useState, type ChangeEvent } from "react";
import MovieCollection from "@/components/Rows/MovieCollection";
import Heading from "@/components/UI/Heading";
import type { Movie } from "@/lib/tmdb";

export default function SearchPage() {
  const [UserInput, setUserInput] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(UserInput)}`);
      const json: Movie[] = await res.json();
      setResults(json || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const resultsWithPosters = results.filter((movie) => movie.poster_path);

  return (
    <section className="px-6 md:px-10 mt-6 space-y-10">
      <Heading level={1}>Search</Heading>
      <form onSubmit={onSubmit} className="flex gap-3">
        <input
          value={UserInput}
          onChange={onChange}
          placeholder="Search movies..."
          className="flex-1 rounded bg-neutral-900 px-4 py-2"
        />
        <button
          title="Search for matching titles"
          className="px-4 py-2 rounded bg-red-600 hover:bg-red-500"
        >
          {loading ? "..." : "Search"}
        </button>
      </form>

      {resultsWithPosters.length > 0 ? (
        <MovieCollection movies={resultsWithPosters} layout="grid" />
      ) : (
        <p className="text-sm text-gray-400">Try searching for something.</p>
      )}
    </section>
  );
}
