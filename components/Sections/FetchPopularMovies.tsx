import MovieRow from "@/components/Rows/MovieRow";
import Heading from "@/components/UI/Heading";
import { getPopularMovies } from "@/lib/tmdb";

export default async function FetchPopularMovies() {
  const popular = await getPopularMovies();

  return (
    <section className="px-6 md:px-10 mt-10">
      <Heading className="mb-4">Popular Movies</Heading>
      <MovieRow movies={popular.results} />
    </section>
  );
}
