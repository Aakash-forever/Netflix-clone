import MovieRow from "@/components/Rows/MovieRow";
import Heading from "@/components/UI/Heading";
import { getPopularTvShows } from "@/lib/tmdb";

export default async function FetchPopularTv() {
  const popular = await getPopularTvShows();

  return (
    <section className="px-6 md:px-10 mt-10">
      <Heading className="mb-4">Popular on TV</Heading>
      <MovieRow movies={popular.results} />
    </section>
  );
}
