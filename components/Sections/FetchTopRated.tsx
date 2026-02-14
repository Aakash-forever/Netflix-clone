import MovieRow from "../Rows/MovieRow";
import { getTopRatedMovies } from "@/lib/tmdb";

export default async function FetchTopRated() {
  const topRated = await getTopRatedMovies();

  return (
    <section className="px-6 md:px-10 mt-10">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">Top Rated</h2>
      <MovieRow movies={topRated.results} />
    </section>
  );
}
