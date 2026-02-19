import MovieRow from "../Rows/MovieRow";
import Heading from "../UI/Heading";
import { getTopRatedMovies } from "@/lib/tmdb";

export default async function FetchTopRated() {
  const topRated = await getTopRatedMovies();

  return (
    <section className="px-6 md:px-10 mt-10">
      <Heading className="mb-4">Top Rated</Heading>
      <MovieRow movies={topRated.results} />
    </section>
  );
}
