import HeroBanner from "@/components/Hero/HeroBanner";
import FetchTrending from "@/components/Sections/FetchTrending";
import FetchTopRated from "@/components/Sections/FetchTopRated";
import FetchActionMovies from "@/components/Sections/FetchActionMovie";
import { getTrendingMovies } from "@/lib/tmdb";

export default async function Home() {
  const trending = await getTrendingMovies();

  return (
    <>
      <HeroBanner movies={trending.results} />
      <FetchTrending movies={trending.results} />
      <FetchTopRated />
      <FetchActionMovies />
    </>
  );
}
