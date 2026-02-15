import axios from "axios";

export type Movie = {
  id: number;
  title?: string | null;
  name?: string | null;
  poster_path?: string | null;
  backdrop_path?: string | null;
  overview?: string | null;
  vote_average?: number | null;
  release_date?: string | null;
  first_air_date?: string | null;
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
