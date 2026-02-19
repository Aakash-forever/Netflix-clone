import MovieRow from "../Rows/MovieRow";
import Heading from "../UI/Heading";
import { getTrendingMovies, type Movie } from "@/lib/tmdb";

type Props = {
  movies?: Movie[];
};

export default async function FetchTrending({ movies }: Props) {
  const trending = movies ?? (await getTrendingMovies()).results;

  return (
    <section className="px-6 md:px-10 mt-6">
      <Heading className="mb-3">Trending</Heading>
      <MovieRow movies={trending} />
    </section>
  );
}
