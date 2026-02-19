"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Movie } from "@/lib/tmdb";
import Heading from "@/components/UI/Heading";

const IMG_BASE = "https://image.tmdb.org/t/p/original";

type Props = {
  movies?: Movie[];
};

export default function HeroBanner({ movies = [] }: Props) {
  const slides = movies.filter((m) => m.backdrop_path || m.poster_path);
  const [index, setIndex] = useState(0);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [trailerLoading, setTrailerLoading] = useState(false);
  const [trailerError, setTrailerError] = useState<string | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    if (!slides.length || showTrailer) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 3500);
    return () => clearInterval(id);
  }, [slides, showTrailer]);

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
  const isTv =
    movie.media_type === "tv" ||
    (!!movie.first_air_date && !movie.title && movie.media_type !== "movie");

  const fetchTrailer = async () => {
    if (!movie?.id) return;
    setTrailerLoading(true);
    setTrailerError(null);
    setShowTrailer(true);
    try {
      const res = await fetch(
        `/api/trailer?id=${movie.id}&type=${isTv ? "tv" : "movie"}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Trailer unavailable");
      setTrailerUrl(data.url);
    } catch (error: any) {
      setTrailerError(error?.message || "Trailer unavailable");
    } finally {
      setTrailerLoading(false);
    }
  };

  const closeTrailer = () => {
    setShowTrailer(false);
    setTrailerUrl(null);
    setTrailerError(null);
  };

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

      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />

      <div className="absolute bottom-16 left-6 right-6 space-y-6">
        <span className="bg-red-600 text-xs px-3 py-1 rounded-full uppercase">
          Trending
        </span>
        <Heading level={1} className="mt-3">
          {title}
        </Heading>
        <div className="flex gap-3">
          <button
            title={`Play ${title}`}
            className="bg-white text-black px-5 py-2 rounded-md cursor-pointer"
          >
            Play
          </button>
          <button
            title={`Watch the trailer for ${title}`}
            onClick={fetchTrailer}
            className="bg-gray-700 text-white px-5 py-2 rounded-md cursor-pointer"
          >
            {trailerLoading ? "Loading..." : "Watch Trailer"}
          </button>
        </div>
        {trailerError ? (
          <p className="text-sm text-red-300">{trailerError}</p>
        ) : null}
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            title={`Jump to slide ${i + 1}`}
            className={`h-0.5 transition-all duration-300 rounded-full ${
              i === index ? "w-6 bg-red-600" : "w-3 bg-white/40"
            }`}
          />
        ))}
      </div>

      {showTrailer ? (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
          onClick={closeTrailer}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl overflow-hidden rounded-xl bg-neutral-900 border border-white/15 shadow-2xl"
          >
            <div
              className={`relative bg-neutral-800 ${
                trailerUrl ? "aspect-video" : "h-64"
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
              ) : imagePath ? (
                <Image
                  src={`${IMG_BASE}${imagePath}`}
                  alt={title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              ) : null}

              <button
                onClick={closeTrailer}
                className="absolute top-3 right-3 rounded-full bg-black/70 px-3 py-1 text-sm"
                title="Close trailer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 space-y-2">
              <Heading level={3}>{title}</Heading>
              {trailerError ? (
                <p className="text-sm text-red-300">{trailerError}</p>
              ) : null}
              {!trailerUrl && trailerLoading ? (
                <p className="text-sm text-gray-300">Loading trailer…</p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
