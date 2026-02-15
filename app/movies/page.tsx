import HeroBanner from "@/components/Hero/HeroBanner";
import FetchTrending from "@/components/Sections/FetchTrending";
import FetchPopularMovies from "@/components/Sections/FetchPopularMovies";
import FetchTopRated from "@/components/Sections/FetchTopRated";
import FetchActionMovies from "@/components/Sections/FetchActionMovie";
import { getTrendingMovies, getPopularMovies } from "@/lib/tmdb";

export default async function MoviesPage() {
  const trending = await getTrendingMovies();
  const popular = await getPopularMovies();       

  return (
    <>
      <HeroBanner movies={popular.results} />
      <FetchTrending movies={trending.results} />
      <FetchPopularMovies />
      <FetchTopRated />
      <FetchActionMovies />
    </>
  );
}
