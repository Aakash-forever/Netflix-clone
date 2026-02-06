import { fetchTrending } from "@/lib/tmdb";
import MovieRow from "./MovieRow";

export default async function Home() {
  const trending = await fetchTrending();

  return <MovieRow title="Trending" movies={trending.results} />;
}
