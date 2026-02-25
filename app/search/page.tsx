"use client";
import { useState, useEffect, useRef, type ChangeEvent } from "react";
import MovieCard from "@/components/Rows/MovieCard";
import MoviePreview from "@/components/Rows/MoviePreview";
import type { Movie } from "@/lib/tmdb";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Movie | null>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const debouncedSearch = (text: string) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      const trimmed = text.trim();
      if (trimmed.length < 2) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(
          `/api/search?query=${encodeURIComponent(query)}`,
        );
        const json: Movie[] = await res.json();
        setResults(json || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    debouncedSearch(event.target.value);
  };

  const resultsWithPosters = results.filter((movie) => movie.poster_path);

  return (
    <section className="px-6 md:px-10 mt-6 space-y-10">
      <div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">
          Search
        </h1>
        <p className="text-sm text-gray-400 mt-2">Find any movie by title.</p>
      </div>
      <form className="flex gap-3">
        <input
          value={query}
          onChange={onChange}
          placeholder="Search movies..."
          className="flex-1 rounded bg-neutral-900 px-4 py-2"
        />
      </form>

      {resultsWithPosters.length > 0 ? (
        <>
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-6">
            {resultsWithPosters.map((movie, index) => (
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
      ) : (
        <p className="text-sm text-gray-400">
          {loading ? "loading..." : "Try searching for something."}
        </p>
      )}
    </section>
  );
}
