import MovieRow from "../Rows/MovieRow";
import { getTrendingMovies, type Movie } from "@/lib/tmdb";

type Props = {
  movies?: Movie[];
};

export default async function FetchTrending({ movies }: Props) {
  const trending = movies ?? (await getTrendingMovies()).results;

  return (
    <section className="px-6 md:px-10 mt-10">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">
        Trending
      </h2>
      <MovieRow movies={trending} />
    </section>
  );
}
