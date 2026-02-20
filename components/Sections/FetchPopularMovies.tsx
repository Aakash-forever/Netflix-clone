import MovieRow from "@/components/Rows/MovieRow";
import { getPopularMovies } from "@/lib/tmdb";

export default async function FetchPopularMovies() {
  const popular = await getPopularMovies();

  return (
    <section className="px-6 md:px-10 mt-10">
      <h2 className="mb-4 text-3xl md:text-4xl font-bold text-white">
        Popular Movies
      </h2>
      <MovieRow movies={popular.results} />
    </section>
  );
}
