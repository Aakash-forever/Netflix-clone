import Image from "next/image";
import type { Movie } from "@/lib/tmdb";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div
      className="group relative min-w-[150px] sm:min-w-[180px] md:min-w-[200px]
                 aspect-[2/3] overflow-visible"
    >
      <div
        className="h-full w-full overflow-hidden bg-neutral-900
                   transition-transform duration-300 group-hover:scale-110"
      >
        {movie.poster_path ? (
          <Image
            src={`${IMG_BASE}${movie.poster_path}`}
            alt={movie.title ?? movie.name ?? "Untitled"}
            fill
            className="object-cover"
            sizes="200px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-neutral-400">
            No poster
          </div>
        )}
      </div>
    </div>
  );
}
