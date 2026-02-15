import FetchTrendingTv from "@/components/Sections/FetchTrendingTv";
import FetchPopularTv from "@/components/Sections/FetchPopularTv";
import FetchTopRatedTv from "@/components/Sections/FetchTopRatedTv";

export default function TvPage() {
  return (
    <>
      <FetchTrendingTv />
      <FetchPopularTv />
      <FetchTopRatedTv />
    </>
  );
}
