import MovieRow from "../Rows/MovieRow";
import { getTopRatedMovies } from "@/lib/tmdb";

export default async function FetchTopRated() {
  const topRated = await getTopRatedMovies();

  return (
    <section className="px-6 md:px-10 mt-10">
      <h2 className="mb-4 text-3xl md:text-4xl font-bold text-white">
        Top Rated
      </h2>
      <MovieRow movies={topRated.results} />
    </section>
  );
}
