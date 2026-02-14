"use client";
import { useState, type ChangeEvent } from "react";
import MovieCard from "@/components/Rows/MovieCard";
import type { Movie } from "@/lib/tmdb";

export default function SearchPage() {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(term)}`);
      const json: Movie[] = await res.json();
      setResults(json || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  const resultsWithPosters = results.filter((movie) => movie.poster_path);

  return (
    <section className="px-6 md:px-10 mt-6 space-y-10">
      <form onSubmit={onSubmit} className="flex gap-3">
        <input
          value={term}
          onChange={onChange}
          placeholder="Search movies..."
          className="flex-1 rounded bg-neutral-900 px-4 py-2"
        />
        <button className="px-4 py-2 rounded bg-red-600 hover:bg-red-500">
          {loading ? "..." : "Search"}
        </button>
      </form>

      {resultsWithPosters.length > 0 ? (
        <div className="grid gap-6 sm:gap-7 lg:gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {resultsWithPosters.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400">Try searching for something.</p>
      )}
    </section>
  );
}
