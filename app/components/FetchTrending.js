import { fetchTrending } from "@/lib/tmdb";
import MovieRow from "./MovieRow";

export default async function FetchTrending() {
  const trending = await fetchTrending();
  const movies = trending?.results ?? [];

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">Trending</h2>
      <MovieRow movies={movies} />
    </section>
  );
}
