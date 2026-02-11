import MovieRow from "./MovieRow";
import { fetchTrending, type Movie } from "@/lib/tmdb";

export default async function FetchTrending(): Promise<JSX.Element> {
  const trending = await fetchTrending();
  const movies: Movie[] = trending?.results ?? [];

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">Trending</h2>
      <MovieRow movies={movies} />
    </section>
  );
}
