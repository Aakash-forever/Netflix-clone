import MovieRow from "../Rows/MovieRow";
import { getActionMovies } from "@/lib/tmdb";

export default async function FetchActionMovies() {
  const actionMovies = await getActionMovies();

  return (
    <section className="px-6 md:px-10 mt-10">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">Action Movies</h2>
      <MovieRow movies={actionMovies.results} />
    </section>
  );
}
