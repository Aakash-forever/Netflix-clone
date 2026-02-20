import MovieRow from "../Rows/MovieRow";
import { getTrendingMovies, type Movie } from "@/lib/tmdb";

type Props = {
  movies?: Movie[];
};

export default async function FetchTrending({ movies }: Props) {
  const trending = movies ?? (await getTrendingMovies()).results;

  return (
    <section className="px-6 md:px-10 mt-6">
      <div className="mb-3">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Trending
        </h2>
      </div>
      <MovieRow movies={trending} />
    </section>
  );
}
