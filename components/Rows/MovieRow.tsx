"use client";

import type { Movie } from "@/lib/tmdb";
import MovieCollection from "./MovieCollection";

type Props = {
  movies?: Movie[];
};

export default function MovieRow({ movies = [] }: Props) {
  return <MovieCollection movies={movies} layout="row" />;
}
