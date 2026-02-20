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
      <section className="relative h-[50vh] w-full bg-neutral-900 flex items-center justify-center">
        <p className="text-gray-400 text-sm">No movies to show</p>
      </section>
    );
  }

  const movie = slides[activeIndex];
  const title = pickTitle(movie);
  const imagePath = pickImage(movie);

  return (
    <section className="relative h-[65vh] w-full overflow-hidden bg-neutral-900">
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

      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />

      <div className="absolute bottom-16 left-6 right-6 space-y-6">
        <span className="bg-red-600 text-xs px-3 py-1 rounded-full uppercase">
          Trending
        </span>
        <h1 className="mt-3 text-4xl md:text-5xl font-black tracking-tight">
          {title}
        </h1>
        <div className="flex gap-3">
          <button
            title={`Play ${title}`}
            onClick={() => setPreviewMovie(movie)}
            className="bg-white text-black px-5 py-2 rounded-md cursor-pointer"
          >
            Play
          </button>
          <button
            title={`Watch the trailer for ${title}`}
            onClick={() => setPreviewMovie(movie)}
            className="bg-gray-700 text-white px-5 py-2 rounded-md cursor-pointer"
          >
            Watch Trailer
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            title={`Jump to slide ${i + 1}`}
            className={`h-0.5 transition-all duration-300 rounded-full ${
              i === activeIndex ? "w-6 bg-red-600" : "w-3 bg-white/40"
            }`}
          />
        ))}
      </div>

      <MoviePreview movie={previewMovie} onClose={() => setPreviewMovie(null)} />
    </section>
  );
}
