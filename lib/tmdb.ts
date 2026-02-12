import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN ?? ""}`,
    accept: "application/json",
  },
});

export type Movie = {
  id: number;
  backdrop_path?: string | null;
  poster_path?: string | null;
  title?: string | null;
  name?: string | null;
  overview?: string | null;
  release_date?: string | null;
  first_air_date?: string | null;
  vote_average?: number | null;
};

export type TmdbResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
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
