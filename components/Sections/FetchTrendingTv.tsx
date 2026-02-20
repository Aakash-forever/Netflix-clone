import HeroBanner from "@/components/Hero/HeroBanner";
import MovieRow from "@/components/Rows/MovieRow";
import { getTrendingTvShows } from "@/lib/tmdb";

export default async function FetchTrendingTv() {
  const trending = await getTrendingTvShows();

  return (
    <>
      <HeroBanner movies={trending.results} />
      <section className="px-6 md:px-10 mt-6">
        <h2 className="mb-3 text-3xl md:text-4xl font-bold text-white">
          Trending TV
        </h2>
        <MovieRow movies={trending.results} />
      </section>
    </>
  );
}
