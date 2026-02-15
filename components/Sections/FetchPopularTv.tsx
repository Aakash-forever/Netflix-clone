import MovieRow from "@/components/Rows/MovieRow";
import { getPopularTvShows } from "@/lib/tmdb";

export default async function FetchPopularTv() {
  const popular = await getPopularTvShows();

  return (
    <section className="px-6 md:px-10 mt-10">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">Popular on TV</h2>
      <MovieRow movies={popular.results} />
    </section>
  );
}
