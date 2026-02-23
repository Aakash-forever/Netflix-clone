"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Movie } from "@/lib/tmdb";
import MoviePreview from "../Rows/MoviePreview";

const IMG_BASE = "https://image.tmdb.org/t/p/original";
const SLIDE_DELAY_MS = 3500;

type Props = {
  movies?: Movie[];
};

const pickTitle = (movie: Movie) => movie.title || movie.name || "Movie";
const pickImage = (movie: Movie) => movie.backdrop_path || movie.poster_path;

export default function HeroBanner({ movies = [] }: Props) {
  const slides = movies.filter((m) => m.backdrop_path || m.poster_path);
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewMovie, setPreviewMovie] = useState<Movie | null>(null);

  // Auto-rotate slides when not showing the preview
  useEffect(() => {
    if (!slides.length || previewMovie) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % slides.length);
    }, SLIDE_DELAY_MS);
    return () => clearInterval(id);
  }, [slides, previewMovie]);

  if (!slides.length) {
    return (
      <section className="relative flex h-[50vh] w-full items-center justify-center bg-neutral-900">
        <p className="text-sm text-gray-400">No movies to show</p>
      </section>
    );
  }

  const movie = slides[activeIndex];
  const title = pickTitle(movie);
  const imagePath = pickImage(movie);

  return (
    <section className="relative h-[45vh] w-full overflow-hidden bg-neutral-900 sm:h-[55vh] md:h-[65vh]">
      {imagePath ? (
        <Image
          src={`${IMG_BASE}${imagePath}`}
          alt={title}
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="object-cover object-top"
        />
      ) : null}

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent" />

      <div className="absolute left-4 top-4 hidden md:block md:left-6 md:top-6">
        <span className="text-xl font-black uppercase tracking-[0.25rem] text-red-600 drop-shadow-[0_4px_12px_rgba(255,0,0,0.35)] sm:text-2xl">
          Netflix
        </span>
      </div>

      <div className="absolute bottom-10 left-4 right-4 space-y-3 sm:bottom-12 sm:left-6 sm:right-6 sm:space-y-6 md:bottom-16">
        <span className="inline-block rounded-full bg-red-600 px-3 py-1 text-[11px] uppercase tracking-wide">
          Trending
        </span>
        <h1 className="mt-1 max-w-2xl text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h1>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button
            title={`Play ${title}`}
            onClick={() => setPreviewMovie(movie)}
            className="cursor-pointer rounded-md bg-white px-4 py-2 text-sm font-semibold text-black sm:px-5"
          >
            Play
          </button>
          <button
            title={`Watch the trailer for ${title}`}
            onClick={() => setPreviewMovie(movie)}
            className="cursor-pointer rounded-md bg-gray-800/80 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700/90 sm:px-5"
          >
            Watch Trailer
          </button>
        </div>
      </div>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 sm:bottom-5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            title={`Jump to slide ${i + 1}`}
            className={`h-0.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-4 bg-red-600" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>

      <MoviePreview
        movie={previewMovie}
        onClose={() => setPreviewMovie(null)}
        size="compact"
      />
    </section>
  );
}
