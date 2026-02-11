const BASE_URL = "https://api.themoviedb.org/3";

type Movie = {
  id: number;
  poster_path?: string | null;
  title?: string | null;
  name?: string | null;
};

type TmdbResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

const options: RequestInit = {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN ?? ""}`,
    accept: "application/json",
  },
  // Next.js defaults to fetch cache=force-cache for GET; keep default.
};

export const fetchTrending = async (): Promise<TmdbResponse> => {
  const res = await fetch(`${BASE_URL}/trending/movie/week`, options);
  return (await res.json()) as TmdbResponse;
};

export const fetchTopRated = async (): Promise<TmdbResponse> => {
  const res = await fetch(`${BASE_URL}/movie/top_rated`, options);
  return (await res.json()) as TmdbResponse;
};

export const fetchActionMovies = async (): Promise<TmdbResponse> => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?with_genres=28`,
    options
  );
  return (await res.json()) as TmdbResponse;
};

export type { Movie, TmdbResponse };
