"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Movie } from "@/lib/tmdb";

const IMG_BASE = "https://image.tmdb.org/t/p/original";

type Props = {
  movies?: Movie[];
};

export default function HeroBanner({ movies = [] }: Props) {
  const slides = movies.filter((m) => m.backdrop_path || m.poster_path);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!slides.length) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 3500);
    return () => clearInterval(id);
  }, [slides]);

  if (!slides.length) {
    return (
      <section className="relative h-[50vh] w-full bg-neutral-900 flex items-center justify-center">
        <p className="text-gray-400 text-sm">No movies to show</p>
      </section>
    );
  }

  const movie = slides[index];
  const title = movie.title || movie.name || "Movie";
  const imagePath = movie.backdrop_path || movie.poster_path;

  return (
    <section className="relative h-[65vh] w-full overflow-hidden bg-neutral-900">
      {imagePath ? (
        <Image
          src={`${IMG_BASE}${imagePath}`}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      ) : null}

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />

      <div className="absolute bottom-16 left-6 right-6 space-y-6">
        <span className="bg-red-600 text-xs px-3 py-1 rounded-full uppercase">
          Trending
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mt-3">{title}</h1>
        <div className="flex gap-3">
          <button className="bg-white text-black px-5 py-2 rounded-md cursor-pointer">
            Play
          </button>
          <button className="bg-gray-700 text-white px-5 py-2 rounded-md cursor-pointer">
            Watch Trailer
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-0.5 transition-all duration-300 rounded-full ${
              i === index ? "w-6 bg-red-600" : "w-3 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
