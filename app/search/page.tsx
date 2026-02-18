"use client";
import { useEffect, useState, type ChangeEvent } from "react";
import Image from "next/image";
import MovieCard from "@/components/Rows/MovieCard";
import type { Movie } from "@/lib/tmdb";

export default function SearchPage() {
  const [UserInput, setUserInput] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Movie | null>(null);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [trailerLoading, setTrailerLoading] = useState(false);
  const [trailerError, setTrailerError] = useState<string | null>(null);

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

  const close = () => setSelected(null);

  const watchTrailer = async () => {
    if (!selected) return;
    setTrailerLoading(true);
    setTrailerError(null);
    try {
      const type =
        selected.media_type === "tv"
          ? "tv"
          : selected.first_air_date && !selected.title
            ? "tv"
            : "movie";
      const res = await fetch(`/api/trailer?id=${selected.id}&type=${type}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Trailer unavailable");
      setTrailerUrl(data.url);
    } catch (err: any) {
      setTrailerError(err?.message || "Trailer unavailable");
    } finally {
      setTrailerLoading(false);
    }
  };

  useEffect(() => {
    setTrailerUrl(null);
    setTrailerError(null);
    setTrailerLoading(false);
  }, [selected?.id]);

  const resultsWithPosters = results.filter((movie) => movie.poster_path);

  return (
    <section className="px-6 md:px-10 mt-6 space-y-10">
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
        <div className="grid gap-6 sm:gap-7 lg:gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {resultsWithPosters.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onSelect={setSelected} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400">Try searching for something.</p>
      )}

      {selected ? (
        <div
          onClick={close}
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl rounded-xl bg-neutral-900 border border-white/10 shadow-2xl overflow-hidden"
          >
            <div
              className={`relative bg-neutral-800 ${
                trailerUrl ? "aspect-video" : "h-72"
              }`}
            >
              {trailerUrl ? (
                <iframe
                  title="Trailer player"
                  src={`${trailerUrl}?autoplay=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              ) : selected.backdrop_path || selected.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w780${selected.backdrop_path || selected.poster_path}`}
                  alt={selected.title || selected.name || "Poster"}
                  fill
                  sizes="(max-width: 768px) 100vw, 1024px"
                  className="object-cover"
                />
              ) : null}

              <button
                onClick={close}
                title="Close details"
                className="absolute top-3 right-3 rounded-full bg-black/60 px-3 py-1 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-2xl font-semibold">
                  {selected.title || selected.name || "Untitled"}
                </h3>
                <span className="text-sm text-gray-400">
                  {selected.release_date ||
                    selected.first_air_date ||
                    "Unknown date"}
                  {selected.vote_average
                    ? ` · ⭐ ${selected.vote_average.toFixed(1)}`
                    : ""}
                </span>
              </div>

              <p className="text-sm text-gray-200">
                {selected.overview || "No description available."}
              </p>

              {trailerError ? (
                <div className="text-sm text-red-400">{trailerError}</div>
              ) : null}

              <div className="flex gap-3 pt-1">
                <button
                  onClick={watchTrailer}
                  disabled={trailerLoading}
                  title={`Watch the trailer for ${
                    selected.title || selected.name || "this title"
                  }`}
                  className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium hover:bg-red-500 disabled:opacity-60"
                >
                  {trailerLoading
                    ? "Loading..."
                    : trailerUrl
                      ? "Replay Trailer"
                      : "Watch Trailer"}
                </button>
                <button
                  onClick={close}
                  title="Close details"
                  className="rounded-md border border-white/20 px-4 py-2 text-sm font-medium text-gray-100 hover:border-white/40"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
