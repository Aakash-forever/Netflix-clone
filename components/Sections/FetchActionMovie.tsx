import MovieRow from "../Rows/MovieRow";
import { getActionMovies } from "@/lib/tmdb";

export default async function FetchActionMovies() {
  const actionMovies = await getActionMovies();

  return (
    <section className="px-6 md:px-10 mt-10">
      <h2 className="mb-4 text-3xl md:text-4xl font-bold text-white">
        Action Movies
      </h2>
      <MovieRow movies={actionMovies.results} />
    </section>
  );
}
