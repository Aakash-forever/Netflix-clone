import HeroBanner from "@/components/Hero/HeroBanner";
import FetchTrending from "@/components/Sections/FetchTrending";
import FetchPopularMovies from "@/components/Sections/FetchPopularMovies";
import FetchTopRated from "@/components/Sections/FetchTopRated";
import FetchActionMovies from "@/components/Sections/FetchActionMovie";
import FetchPopularTv from "@/components/Sections/FetchPopularTv";
import FetchTopRatedTv from "@/components/Sections/FetchTopRatedTv";
import { getTrendingMovies } from "@/lib/tmdb";

export default async function Home() {
  const trendingMovies = await getTrendingMovies();

  return (
    <>
      <HeroBanner movies={trendingMovies.results} />
      <FetchTrending movies={trendingMovies.results} />
      <FetchPopularMovies />
      <FetchTopRated />
      <FetchActionMovies />
      <FetchPopularTv />
      <FetchTopRatedTv />
    </>
  );
}
