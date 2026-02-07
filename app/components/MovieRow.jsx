import Image from "next/image";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieRow({ movies = [] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {movies.map(movie => (
        <div key={movie.id} className="relative aspect-[2/3] rounded overflow-hidden bg-neutral-900">
          {movie.poster_path ? (
            <Image
              src={`${IMG_BASE}${movie.poster_path}`}
              alt={movie.title ?? movie.name ?? "Untitled"}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 200px, 33vw"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-neutral-400">No poster</div>
          )}
        </div>
      ))}
    </div>
  );
}
