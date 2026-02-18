import axios from "axios";

export type Movie = {
  id: number;
  title?: string | null;
  name?: string | null;
  media_type?: "movie" | "tv";
  poster_path?: string | null;
  backdrop_path?: string | null;
  overview?: string | null;
  vote_average?: number | null;
  release_date?: string | null;
  first_air_date?: string | null;
};

export type TmdbVideo = {
  id: string;
  key: string;
  name?: string;
  site?: string;
  type?: string;
  official?: boolean;
};

export type TmdbVideosResponse = {
  id: number;
  results: TmdbVideo[];
};

export type TmdbResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN || ""}`,
    accept: "application/json",
  },
});

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const { data } = await api.get<TmdbResponse>("/search/movie", {
    params: { query: trimmed, include_adult: true },
  });

  return data.results;
};

export const getPopularMovies = async (): Promise<TmdbResponse> => {
  const { data } = await api.get<TmdbResponse>("/movie/popular");
  return data;
};

export const getTrendingMovies = async (): Promise<TmdbResponse> => {
  const { data } = await api.get<TmdbResponse>("/trending/movie/week");
  return data;
};

export const getTopRatedMovies = async (): Promise<TmdbResponse> => {
  const { data } = await api.get<TmdbResponse>("/movie/top_rated");
  return data;
};

export const getActionMovies = async (): Promise<TmdbResponse> => {
  const { data } = await api.get<TmdbResponse>("/discover/movie", {
    params: { with_genres: 28 },
  });
  return data;
};

export const getTrendingTvShows = async (): Promise<TmdbResponse> => {
  const { data } = await api.get<TmdbResponse>("/trending/tv/week");
  return data;
};

export const getPopularTvShows = async (): Promise<TmdbResponse> => {
  const { data } = await api.get<TmdbResponse>("/tv/popular");
  return data;
};

export const getTopRatedTvShows = async (): Promise<TmdbResponse> => {
  const { data } = await api.get<TmdbResponse>("/tv/top_rated");
  return data;
};

export const getVideos = async (
  id: number,
  type: "movie" | "tv",
): Promise<TmdbVideo[]> => {
  const { data } = await api.get<TmdbVideosResponse>(`/${type}/${id}/videos`);
  return data.results;
};

export const getBestYoutubeTrailerKey = async (
  id: number,
  type: "movie" | "tv",
): Promise<string | null> => {
  const videos = await getVideos(id, type);
  if (!videos?.length) return null;

  const byPriority = [
    (v: TmdbVideo) =>
      v.site === "YouTube" && v.type === "Trailer" && v.official,
    (v: TmdbVideo) => v.site === "YouTube" && v.type === "Trailer",
    (v: TmdbVideo) => v.site === "YouTube",
  ];

  for (const matcher of byPriority) {
    const found = videos.find(matcher);
    if (found?.key) return found.key;
  }

  return null;
};
