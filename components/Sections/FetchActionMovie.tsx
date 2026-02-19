import MovieRow from "../Rows/MovieRow";
import Heading from "../UI/Heading";
import { getActionMovies } from "@/lib/tmdb";

export default async function FetchActionMovies() {
  const actionMovies = await getActionMovies();

  return (
    <section className="px-6 md:px-10 mt-10">
      <Heading className="mb-4">Action Movies</Heading>
      <MovieRow movies={actionMovies.results} />
    </section>
  );
}
