import MovieRow from "@/components/Rows/MovieRow";
import { getTopRatedTvShows } from "@/lib/tmdb";

export default async function FetchTopRatedTv() {
  const topRated = await getTopRatedTvShows();

  return (
    <section className="px-6 md:px-10 mt-10">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">Top Rated TV</h2>
      <MovieRow movies={topRated.results} />
    </section>
  );
}
