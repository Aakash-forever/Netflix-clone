import MovieRow from "@/components/Rows/MovieRow";
import { getPopularTvShows } from "@/lib/tmdb";

export default async function FetchPopularTv() {
  const popular = await getPopularTvShows();

  return (
    <section className="px-6 md:px-10 mt-10">
      <h2 className="mb-4 text-3xl md:text-4xl font-bold text-white">
        Popular on TV
      </h2>
      <MovieRow movies={popular.results} />
    </section>
  );
}
