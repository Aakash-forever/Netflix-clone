import MovieRow from "@/components/Rows/MovieRow";
import Heading from "@/components/UI/Heading";
import { getTopRatedTvShows } from "@/lib/tmdb";

export default async function FetchTopRatedTv() {
  const topRated = await getTopRatedTvShows();

  return (
    <section className="px-6 md:px-10 mt-10">
      <Heading className="mb-4">Top Rated TV</Heading>
      <MovieRow movies={topRated.results} />
    </section>
  );
}
