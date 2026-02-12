import type { Movie } from "@/lib/tmdb";
import MovieCard from "./MovieCard";

type MovieRowProps = {
  movies?: Movie[];
};

export default function MovieRow({ movies = [] }: MovieRowProps) {
  return (
    <div className="flex gap-6 overflow-x-auto overflow-y-visible scrollbar-hide py-5">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
