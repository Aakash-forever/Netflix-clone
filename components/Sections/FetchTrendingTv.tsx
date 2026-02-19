import HeroBanner from "@/components/Hero/HeroBanner";
import MovieRow from "@/components/Rows/MovieRow";
import Heading from "@/components/UI/Heading";
import { getTrendingTvShows } from "@/lib/tmdb";

export default async function FetchTrendingTv() {
  const trending = await getTrendingTvShows();

  return (
    <>
      <HeroBanner movies={trending.results} />
      <section className="px-6 md:px-10 mt-6">
        <Heading className="mb-3">Trending TV</Heading>
        <MovieRow movies={trending.results} />
      </section>
    </>
  );
}
